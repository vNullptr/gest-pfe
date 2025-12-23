<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stages', function (Blueprint $table) {
            $table->id();
            $table->string("entreprise");
            $table->integer("statut");
            $table->date("debut");
            $table->date("fin");
            $table->timestamps();

            // FK

            $table->foreignId("id_etudiant")
            ->constrained("users","id")
            ->onDelete("cascade");

            $table->foreignId("id_encadrant")->nullable()
            ->constrained("users","id")
            ->onDelete("set null");
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stages');
    }
};
