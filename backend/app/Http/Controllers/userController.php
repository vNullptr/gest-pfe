<?php

namespace App\Http\Controllers;

use App\Enums\Roles;
use App\Models\Stage;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Enums\RoleEnum;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class userController extends Controller
{
    public function login(Request $request){

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

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

    public function stages(Request $request){
        $stages = auth()->user()->stages;
        return response()->json($stages, 200);
    }

    public function all_stages(Request $request){
        if (auth()->user()->role < 1){
            return Response()->json(['message'=> 'Insufficient permissions'], 401);
        }
        
        $users = User::with('stages')->whereHas("stages")->get();

        return Response()->json($users,200);
    }

    public function all_prof(Request $request){
        if (auth()->user()->role !== 2){
            return Response()->json(['message'=> 'Insufficient permissions'], 401);
        }

        $prof = User::where("role", Roles::PROF)->get();

        return Response()->json($prof,200);
    }

    public function new(Request $request){

        if (auth()->user()->role !== 2){
            return Response()->json(['message'=> 'Insufficient permissions'], 401);
        }

        $data = $request->validate([
            'prenom'     => ['required', 'string', 'max:255'],
            'nom'        => ['required', 'string', 'max:255'],
            'telephone'  => ['required', 'string', 'max:20'],
            'email'      => ['required', 'email', 'max:255', 'unique:users,email'],
            'role'       => ['required', Rule::enum(Roles::class)],
            'groupe'     => ['nullable', 'integer'],
            'password'   => ['required', 'string'],
        ]);

        $data["password"] = Hash::make($data["password"]);

        $user = User::create($data);

        return response()->json($user,200);
    }
}
