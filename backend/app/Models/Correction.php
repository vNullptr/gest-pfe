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
}
