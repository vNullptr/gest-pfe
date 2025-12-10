<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Correction extends Model
{
    protected $fillable = [
        "statut",
        "commentaire",
        // "date_assignation",
    ];

    public function stage(){
        return $this->belongsTo(Stage::class, "id_stage","id");
    }

    public function rapporteur(){
        return $this->belongsTo(User::class, "id_rapporteur", "id");
    }

}
