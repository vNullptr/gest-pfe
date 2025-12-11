<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\stage>
 */
class stageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $start_date = fake()->dateTimeBetween('-1 year','now');
        $end_date = (clone $start_date)->modify('+'.rand(1,30).' days');

        return [
            'entreprise' => fake()->company(),
            'debut' => $start_date,
            'fin' => $end_date,
            'id_etudiant' => User::factory(),
            'id_encadrant' => User::factory()
        ];
    }
}
