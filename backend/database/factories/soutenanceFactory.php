<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Stage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\soutenance>
 */
class soutenanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $start_time = fake()->time('H:i:s');
        $end_time = date('H:i:s', strtotime($start_time) + rand(1, 5) * 3600);

        return [
            'salle' => rand(1,100),
            'heure_debut' => $start_time,
            'heure_fin' => $end_time,
            'date' => fake()->date(),
            'id_stage'=> Stage::factory()
        ];
    }
}
