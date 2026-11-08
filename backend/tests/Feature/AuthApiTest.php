<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_login_with_username_and_receive_token(): void
    {
        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@portfolio.test',
            'password' => Hash::make('admin123'),
        ]);

        $this->postJson('/api/v1/auth/login', [
            'username' => 'admin',
            'password' => 'admin123',
        ])->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonStructure(['data' => ['token', 'user' => ['id', 'name', 'email']]]);
    }

    public function test_login_rejects_invalid_credentials(): void
    {
        User::factory()->create([
            'name' => 'admin',
            'password' => Hash::make('secret'),
        ]);

        $this->postJson('/api/v1/auth/login', [
            'username' => 'admin',
            'password' => 'wrong',
        ])->assertUnauthorized();
    }

    public function test_authenticated_user_can_fetch_profile_and_logout(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('dashboard')->plainTextToken;

        $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/v1/auth/me')
            ->assertOk()
            ->assertJsonPath('data.id', $user->id);

        $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/v1/auth/logout')
            ->assertOk();

        $this->assertDatabaseCount('personal_access_tokens', 0);
    }
}
