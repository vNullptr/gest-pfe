<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;

Route::get("/users/{id}",[userController::class,"show"]);
Route::get("/users", [userController::class,"index"]);

Route::get("/stages", [userController::class,"index"]);