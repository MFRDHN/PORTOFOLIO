<?php

namespace App\Http\Controllers\Api\V1\PublicApi;

use App\Http\Controllers\Controller;
use App\Http\Resources\CertificateResource;
use App\Models\Certificate;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class CertificateController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        $certificates = Certificate::query()->latest()->get();

        return $this->successResponse(CertificateResource::collection($certificates));
    }
}
