<?php

namespace Tests\Feature;

use App\Models\Certificate;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CertificateApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_can_list_certificates(): void
    {
        Certificate::factory()->count(3)->create();

        $this->getJson('/api/v1/public/certificates')
            ->assertOk()
            ->assertJsonCount(3, 'data');
    }

    public function test_admin_can_create_certificate_with_upload(): void
    {
        Storage::fake('public');
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/v1/admin/certificates', [
            'title' => 'New Certificate',
            'date' => '2026',
            'image_file' => UploadedFile::fake()->image('certificate.jpg'),
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.title', 'New Certificate');

        $certificate = Certificate::firstWhere('title', 'New Certificate');
        Storage::disk('public')->assertExists($certificate->image);
        $this->assertNotEmpty($certificate->color);
        $this->assertStringStartsWith('linear-gradient', $certificate->gradient);
    }

    public function test_admin_can_update_certificate(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $certificate = Certificate::factory()->create(['title' => 'Old']);

        $this->postJson('/api/v1/admin/certificates/'.$certificate->id, [
            '_method' => 'PUT',
            'title' => 'Updated',
            'subtitle' => 'Issuer',
            'date' => '2026',
            'image' => 'https://example.com/certificate.jpg',
        ])->assertOk()
            ->assertJsonPath('data.title', 'Updated')
            ->assertJsonPath('data.image', 'https://example.com/certificate.jpg');
    }

    public function test_certificate_create_requires_valid_payload(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/v1/admin/certificates', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['title', 'date']);
    }

    public function test_certificate_rejects_unsafe_style_and_link_values(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/v1/admin/certificates', [
            'title' => 'Unsafe',
            'date' => '2026',
            'color' => 'red; background:url(http://evil.test)',
            'gradient' => 'linear-gradient(red,blue);background:url(javascript:alert(1))',
            'credentialUrl' => 'javascript:alert(1)',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors(['color', 'gradient', 'credentialUrl']);
    }
}
