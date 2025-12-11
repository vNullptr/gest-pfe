<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{

    use HasFactory;
    protected $fillable = [
        "type_doc",
        "nom_fichier",
        "type_fichier",
        "chemin_fichier",
        //"date_upload",
    ];


    public function stage(){
        return $this->belongsTo(Stage::class, "id_stage", "id");
    }
}
