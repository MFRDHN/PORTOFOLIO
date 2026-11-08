<?php

namespace App\Http\Resources;

use App\Support\MediaUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'category' => $this->category,
            'desc' => $this->desc,
            'cover' => MediaUrl::toUrl($this->cover),
            'images' => array_values(array_map(
                fn (string $image): string => MediaUrl::toUrl($image),
                $this->images ?? []
            )),
            'technologies' => $this->technologies ?? [],
            'repoUrl' => $this->repo_url,
            'liveUrl' => $this->live_url,
            'featured' => (bool) $this->featured,
            'createdAt' => $this->created_at?->toIso8601String(),
        ];
    }
}
