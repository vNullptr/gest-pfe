<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Stage extends Model
{

    use HasFactory;
    
    protected $fillable = [
        "entreprise",
        "debut",
        "fin",
    ];


    public function etudiant(){
        return $this->belongsTo(User::class, "id_etudiant","id");
    }

    public function encadrant(){
        return $this->belongsTo(User::class, "id_encadrant", "id");
    }

    public function document(){
        return $this->hasOne(Document::class, "id_stage", "id");
    }

    public function correction(){
        return $this->hasMany(Correction::class, "id_stage", "id");
    }

    public function soutenanec(){
        return $this->hasOne(Soutenance::class, "id_stage","id");
    }
}
