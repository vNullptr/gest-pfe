<?php

use App\Http\Controllers\stageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;

Route::get("/users/{user}",[userController::class,"show"])->middleware("auth:sanctum");
Route::patch("/users/{user}",[userController::class,"update"])->middleware("auth:sanctum");
Route::delete("/users/{user}",[userController::class,"destroy"])->middleware("auth:sanctum");

Route::get("/users", [userController::class,"index"])->middleware("auth:sanctum");
Route::post("/users", [userController::class,"new"])->middleware("auth:sanctum");
Route::get("/me/stages", [userController::class,"stages"])->middleware("auth:sanctum");
Route::get("/students/stages", [userController::class,"all_stages"])->middleware("auth:sanctum");
Route::get("/supervisors", [userController::class,"all_prof"])->middleware("auth:sanctum");


Route::get("/stage", [stageController::class,"index"])->middleware("auth:sanctum");
Route::post("/stage", [stageController::class,"new"])->middleware("auth:sanctum");
Route::get("/stage/{stage}/doc", [stageController::class,"docs"])->middleware("auth:sanctum");
Route::get("/stage/{stage}/doc/download", [stageController::class,"download"])->middleware("auth:sanctum");
Route::patch("/stage/{stage}/supervisor", [stageController::class,"set_encadrant"])->middleware("auth:sanctum");