<?php

use App\Http\Controllers\Api\V1\Admin\CertificateController as AdminCertificateController;
use App\Http\Controllers\Api\V1\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\PublicApi\CertificateController as PublicCertificateController;
use App\Http\Controllers\Api\V1\PublicApi\ProjectController as PublicProjectController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::prefix('public')->middleware('throttle:60,1')->group(function (): void {
        Route::get('projects', [PublicProjectController::class, 'index']);
        Route::get('projects/{project:slug}', [PublicProjectController::class, 'show']);
        Route::get('certificates', [PublicCertificateController::class, 'index']);
    });

    Route::post('auth/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::get('auth/me', [AuthController::class, 'me']);
        Route::post('auth/logout', [AuthController::class, 'logout']);

        Route::prefix('admin')->group(function (): void {
            Route::apiResource('projects', AdminProjectController::class);
            Route::apiResource('certificates', AdminCertificateController::class);
        });
    });
});
