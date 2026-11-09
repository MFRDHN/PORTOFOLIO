<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ProjectApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_can_list_projects(): void
    {
        Project::factory()->count(2)->create();

        $this->getJson('/api/v1/public/projects')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'data');
    }

    public function test_public_can_view_project_by_slug(): void
    {
        $project = Project::factory()->create(['slug' => 'demo-project']);

        $this->getJson('/api/v1/public/projects/demo-project')
            ->assertOk()
            ->assertJsonPath('data.slug', $project->slug);
    }

    public function test_admin_can_create_project_with_uploaded_images(): void
    {
        Storage::fake('public');
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/v1/admin/projects', [
            'slug' => 'new-project',
            'title' => 'New Project',
            'category' => 'Web Application',
            'desc' => 'Description',
            'technologies' => ['Laravel', 'Next.js'],
            'image_files' => [UploadedFile::fake()->image('cover.jpg')],
            'featured' => true,
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.slug', 'new-project')
            ->assertJsonPath('data.featured', true);

        $project = Project::firstWhere('slug', 'new-project');
        $this->assertCount(1, $project->images);
        Storage::disk('public')->assertExists($project->images[0]);
    }

    public function test_admin_can_create_project_with_empty_image_slot(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->post('/api/v1/admin/projects', [
            'slug' => 'no-image-project',
            'title' => 'No Image',
            'category' => 'Web Application',
            'desc' => 'Description',
            'images' => [''],
            'featured' => '0',
        ])->assertCreated()
            ->assertJsonPath('data.images', []);
    }

    public function test_admin_can_create_project_with_cover(): void
    {
        Storage::fake('public');
        Sanctum::actingAs(User::factory()->create());

        $this->post('/api/v1/admin/projects', [
            'slug' => 'cover-project',
            'title' => 'Cover Project',
            'category' => 'Web Application',
            'desc' => 'Description',
            'cover_file' => UploadedFile::fake()->image('cover.png'),
            'featured' => '0',
        ])->assertCreated()
            ->assertJsonPath('data.cover', fn (string $cover) => str_contains($cover, '/storage/projects/'));

        $project = Project::firstWhere('slug', 'cover-project');
        Storage::disk('public')->assertExists($project->cover);
    }

    public function test_project_description_is_limited(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/v1/admin/projects', [
            'slug' => 'long-desc',
            'title' => 'Long',
            'category' => 'Web',
            'desc' => str_repeat('a', 1501),
        ])->assertUnprocessable()
            ->assertJsonValidationErrors(['desc']);
    }

    public function test_admin_can_update_project(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $project = Project::factory()->create(['slug' => 'old-slug', 'images' => ['/aset/old.png']]);

        $this->postJson('/api/v1/admin/projects/'.$project->id, [
            '_method' => 'PUT',
            'slug' => 'new-slug',
            'title' => 'Updated',
            'category' => 'Web Application',
            'desc' => 'Updated description',
            'technologies' => ['React'],
            'images' => ['/aset/new.png'],
            'featured' => false,
        ])->assertOk()
            ->assertJsonPath('data.slug', 'new-slug')
            ->assertJsonPath('data.images.0', '/aset/new.png');
    }

    public function test_project_create_requires_valid_payload(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/v1/admin/projects', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['slug', 'title', 'category', 'desc']);
    }

    public function test_guest_cannot_access_admin_projects(): void
    {
        $this->getJson('/api/v1/admin/projects')->assertUnauthorized();
    }

    public function test_project_rejects_non_http_links(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/v1/admin/projects', [
            'slug' => 'xss-project',
            'title' => 'XSS',
            'category' => 'Web',
            'desc' => 'Description',
            'liveUrl' => 'javascript:alert(1)',
        ])->assertUnprocessable()->assertJsonValidationErrors(['liveUrl']);
    }
}
