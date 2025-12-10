<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    
    protected $fillable = [
        "nom",
    ];

    public function user(){
        return $this->belongsToMany(User::class, "tag_user", "tag_id", "user_id", "id", "id");
    }
}
