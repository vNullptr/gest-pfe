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
        Schema::create('corrections', function (Blueprint $table) {
            $table->id();
            $table->smallInteger("statut")->unsigned();
            $table->string("commentaire");
            $table->timestamps();

            // FK

            $table->foreignId("id_stage")
            ->constrained("stages","id")
            ->onDelete("cascade");

            $table->foreignId("id_rapporteur")
            ->constrained("users","id")
            ->onDelete("cascade");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('corrections');
    }
};
