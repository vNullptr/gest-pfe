<?php

namespace App\Http\Controllers;

use App\Enums\StatutEtudiant;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Enums\Roles;
use App\Enums\StatutStage;
use App\Models\User;
use App\Models\Stage;

class statController extends Controller
{
    public function stats(Request $request){
        $users_count = User::count();
        $prof_count = User::where("role", Roles::PROF)->count();
        $etd_count = User::where("role", Roles::ETUDIANT)->count();
        $in_internships = User::where("role", Roles::ETUDIANT)->where("statut", StatutEtudiant::EN_STAGE)->count();

        $internship_total = Stage::count();
        $internship_waiting = Stage::where("statut", StatutStage::EN_ATTENTE)->count();
        $internship_active = Stage::where("statut", StatutStage::EN_COURS)->count();

        return response()->json([
            "users"=>[
                "total"=> $users_count,
                "professors"=> $prof_count,
                "students"=> $etd_count,
                "active_internship"=> $in_internships,
            ],
            "stage"=>[
                "total"=> $internship_total,
                "waiting"=> $internship_waiting,
                "active" => $internship_active,
            ]
        ], 200);
    }
}
