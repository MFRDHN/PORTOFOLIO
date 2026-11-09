<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->successResponse(ProjectResource::collection(Project::query()->latest()->get()));
    }

    public function store(StoreProjectRequest $request): JsonResponse
    {
        $project = Project::create([
            ...$this->payload($request),
            'cover' => $this->cover($request),
            'images' => $this->images($request),
        ]);

        return $this->successResponse(new ProjectResource($project), 'Project berhasil dibuat.', 201);
    }

    public function show(Project $project): JsonResponse
    {
        return $this->successResponse(new ProjectResource($project));
    }

    public function update(UpdateProjectRequest $request, Project $project): JsonResponse
    {
        $oldCover = $project->cover ?? '';
        $oldImages = $project->images ?? [];
        $newCover = $this->cover($request, $oldCover);
        $newImages = $this->images($request, $oldImages);

        $project->update([
            ...$this->payload($request),
            'cover' => $newCover,
            'images' => $newImages,
        ]);

        if ($oldCover !== $newCover) {
            $this->deleteStoredFile($oldCover);
        }

        foreach (array_diff($oldImages, $newImages) as $removed) {
            $this->deleteStoredFile($removed);
        }

        return $this->successResponse(new ProjectResource($project->fresh()), 'Project berhasil diperbarui.');
    }

    public function destroy(Project $project): JsonResponse
    {
        $cover = $project->cover ?? '';
        $images = $project->images ?? [];

        $project->delete();

        $this->deleteStoredFile($cover);
        foreach ($images as $image) {
            $this->deleteStoredFile($image);
        }

        return $this->successResponse(null, 'Project berhasil dihapus.');
    }

    /**
     * @return array<string, mixed>
     */
    private function payload(Request $request): array
    {
        $validated = $request->validated();

        return [
            'slug' => $validated['slug'],
            'title' => $validated['title'],
            'category' => $validated['category'],
            'desc' => $validated['desc'],
            'technologies' => $validated['technologies'] ?? [],
            'repo_url' => $validated['repoUrl'] ?? '',
            'live_url' => $validated['liveUrl'] ?? '',
            'featured' => $request->boolean('featured'),
        ];
    }

    private function cover(Request $request, string $fallback = ''): string
    {
        if ($request->hasFile('cover_file')) {
            return $request->file('cover_file')->store('projects', 'public');
        }

        if ($request->exists('cover')) {
            return (string) $request->input('cover', '');
        }

        return $fallback;
    }

    /**
     * @param  array<int, string>  $fallback
     * @return array<int, string>
     */
    private function images(Request $request, array $fallback = []): array
    {
        if (! $request->exists('images') && ! $request->hasFile('image_files')) {
            return $fallback;
        }

        $images = array_values(array_filter(
            (array) $request->input('images', []),
            fn ($image) => is_string($image) && $image !== ''
        ));

        foreach ((array) $request->file('image_files', []) as $file) {
            $images[] = $file->store('projects', 'public');
        }

        return array_values(array_unique($images));
    }

    private function deleteStoredFile(?string $path): void
    {
        if (! $path || str_starts_with($path, 'http') || str_starts_with($path, '/')) {
            return;
        }

        Storage::disk('public')->delete($path);
    }
}
