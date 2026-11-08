<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Http\Resources\CertificateResource;
use App\Models\Certificate;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    use ApiResponse;

    private const PALETTES = [
        ['#991b1b', '#1a1a2e'],
        ['#1d4ed8', '#0f172a'],
        ['#0f766e', '#052e2b'],
        ['#7e22ce', '#1e1b4b'],
        ['#b45309', '#1c1917'],
        ['#be123c', '#111827'],
        ['#15803d', '#052e16'],
        ['#0369a1', '#082f49'],
    ];

    public function index(): JsonResponse
    {
        return $this->successResponse(CertificateResource::collection(Certificate::query()->latest()->get()));
    }

    public function store(StoreCertificateRequest $request): JsonResponse
    {
        $certificate = Certificate::create([
            ...$this->payload($request),
            'image' => $this->image($request),
        ]);

        return $this->successResponse(new CertificateResource($certificate), 'Sertifikat berhasil dibuat.', 201);
    }

    public function show(Certificate $certificate): JsonResponse
    {
        return $this->successResponse(new CertificateResource($certificate));
    }

    public function update(UpdateCertificateRequest $request, Certificate $certificate): JsonResponse
    {
        $certificate->update([
            ...$this->payload($request),
            'image' => $this->image($request, $certificate->image),
        ]);

        return $this->successResponse(new CertificateResource($certificate->fresh()), 'Sertifikat berhasil diperbarui.');
    }

    public function destroy(Certificate $certificate): JsonResponse
    {
        $certificate->delete();

        return $this->successResponse(null, 'Sertifikat berhasil dihapus.');
    }

    /**
     * @return array<string, mixed>
     */
    private function payload(Request $request): array
    {
        $validated = $request->validated();
        $palette = $this->palette($validated['title']);

        return [
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'] ?? '',
            'color' => $validated['color'] ?? $palette['color'],
            'gradient' => $validated['gradient'] ?? $palette['gradient'],
            'date' => $validated['date'],
            'credential_url' => $validated['credentialUrl'] ?? '',
        ];
    }

    /**
     * @return array{color: string, gradient: string}
     */
    private function palette(string $title): array
    {
        [$color, $dark] = self::PALETTES[abs(crc32($title)) % count(self::PALETTES)];

        return [
            'color' => $color,
            'gradient' => "linear-gradient(145deg,{$color},{$dark})",
        ];
    }

    private function image(Request $request, ?string $fallback = ''): string
    {
        if ($request->hasFile('image_file')) {
            return $request->file('image_file')->store('certificates', 'public');
        }

        if ($request->exists('image')) {
            return (string) $request->input('image', '');
        }

        return $fallback ?? '';
    }
}
