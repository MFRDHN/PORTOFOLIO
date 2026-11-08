<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle');
            $table->string('image')->default('');
            $table->string('color', 20)->default('#991b1b');
            $table->string('gradient')->default('linear-gradient(145deg,#991b1b,#1a1a2e)');
            $table->string('date');
            $table->string('credential_url')->default('');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
