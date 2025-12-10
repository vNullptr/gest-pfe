<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        "type_doc",
        "nom_fichier",
        "type_fichier",
        "chemin_fichier",
        "date_upload",
    ];
}
