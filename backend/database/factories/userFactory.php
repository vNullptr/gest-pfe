<?php

namespace Database\Factories;

use App\Enums\Roles;
use App\Enums\StatutEtudiant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\user>
 */
class userFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    private function fakeStatus($role){
        return $role === Roles::ETUDIANT ? fake()->randomElement(StatutEtudiant::cases()) : null;
    }

    public function definition(): array
    {
        $role = rand(1,3);
        return [
            'nom' => fake()->lastName(),
            'prenom' => fake()->firstName(),
            'email' => fake()->safeEmail(),
            'password'=> bcrypt(fake()->password()),
            'role' => $role,
            'groupe' => rand(1,3),
            'statut' => $this->fakeStatus($role),
    
        ];
    }
}
