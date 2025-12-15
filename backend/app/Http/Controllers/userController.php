<?php

namespace App\Http\Controllers;

use App\Enums\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Enums\RoleEnum;

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

    public function check(Request $request){
        return auth()->user();
    }

    public function show(Request $request){
        $user = User::findOrFail($request->id);

        if ( $user ) {
            return response()->json($user);
        }

    }

    public function index(Request $request){

        $query = User::query();

        if ($request->has('role')) {
            if (Roles::tryFrom($request->role)){
                return response()->json(['message'=>'Invalid role', 404]);
            }
            $query->where('role', $request->role);
        }
        if ($request->has('groupe')) {
            $query->where('groupe', $request->groupe);
        }

        $users = $query->get();

        if ($users->isEmpty()) {
            return response()->json(['message' => 'No users found'], 404);
        }

        return $users;
    }

}
