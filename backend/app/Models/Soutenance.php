<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Soutenance extends Model
{

    use HasFactory;
    
    protected $fillable = [
        "salle",
        "heure_debut",
        "heure_fin",
        "date_soutenance",
    ];

    public function stage(){
        return $this->belongsTo(Stage::class, "id_stage", "id");
    }

}
