<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    
    use HasFactory;
      
    protected $fillable = [
        "nom",
        "prenom",
        "email",
        "telephone",
        "groupe",
        "statut",
        "role",
        "password"
    ];

    protected $hidden = [
        "password"
    ];


    public function stage(){
        return $this->hasOne(Stage::class, "id_etudiant", "id");
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
