<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->unique()->catchPhrase();

        return [
            'slug' => Str::slug($title),
            'title' => $title,
            'category' => fake()->randomElement(['Web Application', 'Online Store', 'System Application']),
            'desc' => fake()->paragraph(),
            'images' => [],
            'technologies' => fake()->randomElements(['Laravel', 'Next.js', 'React', 'MySQL', 'TailwindCSS'], 3),
            'repo_url' => fake()->url(),
            'live_url' => '',
            'featured' => false,
        ];
    }
}
