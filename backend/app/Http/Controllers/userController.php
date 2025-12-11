<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class userController extends Controller
{
    public function login(Request $request){

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        // does the check for us since we extended the user model with Authenticatable
        if ( Auth::attempt($credentials, true) ) {
            $request->session()->regenerate();
            return response()->json([
                'message' => "Logged in successful",
                'user' => Auth::user()
            ], 200);
        }

        return response()->json([
                'message' => "Invalid credentials"
            ], 401);

    }
}
