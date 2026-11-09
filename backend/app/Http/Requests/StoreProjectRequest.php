<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'slug' => ['required', 'string', 'max:255', 'regex:/^[A-Za-z0-9_-]+$/', Rule::unique('projects', 'slug')],
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'desc' => ['required', 'string', 'max:1500'],
            'cover' => ['nullable', 'string', 'max:1000'],
            'cover_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:5120'],
            'images' => ['nullable', 'array', 'max:10'],
            'images.*' => ['nullable', 'string', 'max:1000'],
            'image_files' => ['nullable', 'array', 'max:3'],
            'image_files.*' => ['image', 'mimes:jpg,jpeg,png,webp,avif', 'max:5120'],
            'technologies' => ['nullable', 'array', 'max:20'],
            'technologies.*' => ['string', 'max:100'],
            'repoUrl' => ['nullable', 'string', 'max:500', 'url:http,https'],
            'liveUrl' => ['nullable', 'string', 'max:500', 'url:http,https'],
            'featured' => ['sometimes', 'boolean'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'slug.regex' => 'Slug hanya boleh berisi huruf, angka, tanda hubung, dan garis bawah.',
            'slug.unique' => 'Slug sudah digunakan.',
            'title.required' => 'Judul project wajib diisi.',
            'category.required' => 'Kategori wajib diisi.',
            'desc.required' => 'Deskripsi wajib diisi.',
            'desc.max' => 'Deskripsi maksimal 1500 karakter.',
            'cover_file.image' => 'File sampul harus berupa gambar.',
            'cover_file.max' => 'Ukuran gambar sampul maksimal 5MB.',
            'image_files.*.image' => 'File harus berupa gambar.',
            'image_files.max' => 'Maksimal 3 gambar.',
            'image_files.*.max' => 'Ukuran gambar maksimal 5MB.',
        ];
    }
}
