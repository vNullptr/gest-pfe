<?php

use App\Http\Controllers\testController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/user/{id}', [testController::class, 'index']);
Route::post("/login",[userController::class, 'login'])->middleware("web");
