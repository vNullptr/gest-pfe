<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\Tags;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Stage;
use Illuminate\Support\Facades\DB;

class dbSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = ['PHP', 'Python', 'C++', 'Merise', 'Frontend', 'Backend'];
        foreach ($tags as $tag) {
            Tags::create(['nom'=> $tag]);
        }

        User::factory()->count(20)->create();
        Stage::factory()->count(10)->create();


    }
}
