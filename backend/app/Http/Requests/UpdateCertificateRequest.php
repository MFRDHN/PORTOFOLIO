<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCertificateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:1000'],
            'image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:5120'],
            'color' => ['nullable', 'string', 'max:20'],
            'gradient' => ['nullable', 'string', 'max:500'],
            'date' => ['required', 'string', 'max:50'],
            'credentialUrl' => ['nullable', 'string', 'max:500'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul sertifikat wajib diisi.',
            'date.required' => 'Tanggal wajib diisi.',
            'image_file.image' => 'File harus berupa gambar.',
            'image_file.max' => 'Ukuran gambar maksimal 5MB.',
        ];
    }
}
