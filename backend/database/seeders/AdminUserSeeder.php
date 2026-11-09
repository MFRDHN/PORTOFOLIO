<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $username = (string) config('app.admin_username', 'admin');
        $email = (string) config('app.admin_email', 'admin@portfolio.test');
        $password = (string) config('app.admin_password');

        if ($password === '') {
            throw new RuntimeException('ADMIN_PASSWORD belum diisi. Set di .env sebelum menjalankan seeder.');
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $username,
                'password' => Hash::make($password),
            ]
        );
    }
}
