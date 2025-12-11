<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class testController extends Controller
{
    

    public function index(Request $r){
        $user = User::find($r->id);
        $user->password = Hash::make("testpassword");
        $user->save();

        return $user;
    }
}
