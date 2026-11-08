<?php

namespace App\Http\Controllers\Api\V1\PublicApi;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        $projects = Project::query()
            ->orderByDesc('featured')
            ->orderByDesc('created_at')
            ->get();

        return $this->successResponse(ProjectResource::collection($projects));
    }

    public function show(Project $project): JsonResponse
    {
        return $this->successResponse(new ProjectResource($project));
    }
}
