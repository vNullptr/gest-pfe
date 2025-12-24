<?php

namespace App\Models;

use App\Enums\StatutStage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use \Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    
    use HasFactory, HasApiTokens;
      
    protected $fillable = [
        "nom",
        "prenom",
        "email",
        "telephone",
        "groupe",
        "statut",
        "role",
        "password",
        "remember_token"
    ];

    protected $hidden = [
        "password"
    ];


    public function stages(){
        return $this->hasMany(Stage::class, "id_etudiant", "id");
    }

    public function currentStage(){
        return $this->hasOne(Stage::class,"id_etudiant","id")->where("statut", StatutStage::EN_COURS);
    }

    public function stageEncadrer(){
        return $this->hasMany(Stage::class, "id_encadrant", "id");
    }

    public function rapportCorriger(){
        return $this->hasMany(Correction::class, "id_rapporteur", "id");
    }

    public function tags(){
        return $this->belongsToMany(Tags::class, "tag_user", "user_id", "tag_id", "id", "id");
    }

}
