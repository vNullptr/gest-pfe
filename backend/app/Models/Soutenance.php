<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Soutenance extends Model
{
    
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
