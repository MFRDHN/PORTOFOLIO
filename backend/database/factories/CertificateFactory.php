<?php

namespace Database\Factories;

use App\Models\Certificate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Certificate>
 */
class CertificateFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'subtitle' => fake()->company(),
            'image' => '',
            'color' => '#991b1b',
            'gradient' => 'linear-gradient(145deg,#991b1b,#1a1a2e)',
            'date' => (string) fake()->year(),
            'credential_url' => fake()->url(),
        ];
    }
}
