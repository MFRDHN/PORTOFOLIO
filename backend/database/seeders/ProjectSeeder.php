<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'slug' => 'Donate_Platform',
                'title' => 'Donate Platform',
                'category' => 'Web Application',
                'desc' => 'Online Donation Website is a digital solution designed to simplify the process of fundraising and donation distribution. With a secure and transparent system, users can donate anytime and anywhere, as well as view donation reports in real time.',
                'images' => ['/aset/Web_donasiLP.png', '/aset/Web-donasi.png', '/aset/web_donasi1.png'],
                'technologies' => ['Laravel', 'MySQL', 'Bootstrap', 'Livewire'],
                'repo_url' => 'https://github.com/MFRDHN/Donasi_umat.git',
                'live_url' => '',
                'featured' => true,
            ],
            [
                'slug' => 'e-commerce-system',
                'title' => 'E-Commerce System',
                'category' => 'Online Store',
                'desc' => 'E-commerce Platform',
                'images' => ['/aset/ecomerce.png', '/aset/ecomerce2.png', '/aset/ecomerce3.png'],
                'technologies' => ['Codeigniter', 'MySQL', 'Bootstrap'],
                'repo_url' => 'https://github.com/MFRDHN/Ecommerse_laravel.git',
                'live_url' => '',
                'featured' => false,
            ],
            [
                'slug' => 'Task_Management',
                'title' => 'Task Management',
                'category' => 'System Application',
                'desc' => 'Workflow Management',
                'images' => ['/aset/M_tugas.png', '/aset/M_tugas1.png', '/aset/M_tugas2.png'],
                'technologies' => ['Next.js', 'Laravel', 'TailwindCSS'],
                'repo_url' => 'https://github.com/MFRDHN/Manajemen_Tugas.git',
                'live_url' => '',
                'featured' => false,
            ],
            [
                'slug' => 'School_Website',
                'title' => 'School Website',
                'category' => 'Wordpress Website',
                'desc' => 'School Website',
                'images' => ['/aset/wp1.png', '/aset/wp2.png', '/aset/wp3.png'],
                'technologies' => ['Elementor', 'Wordpress', 'MySQL'],
                'repo_url' => '',
                'live_url' => '',
                'featured' => false,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(['slug' => $project['slug']], $project);
        }
    }
}
