<?php

namespace App\Http\Resources;

use App\Support\MediaUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificateResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'image' => MediaUrl::toUrl($this->image),
            'color' => $this->color,
            'gradient' => $this->gradient,
            'date' => $this->date,
            'credentialUrl' => $this->credential_url,
        ];
    }
}
