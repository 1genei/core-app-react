<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OrganismeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Routes contacts
Route::group(['prefix' => 'contact'], function () {
    Route::get('index', [ContactController::class, 'index']);
    Route::get('{id}', [ContactController::class, 'show']);
    Route::post('store', [ContactController::class, 'store']);
    Route::put('update/{id}', [ContactController::class, 'update']);
    Route::delete('delete/{id}', [ContactController::class, 'delete']);
});



//Routes organismes
Route::group(['prefix' => 'organisme'], function () {
    Route::get('index', [OrganismeController::class, 'index']);
    Route::get('{id}', [OrganismeController::class, 'show']);
    Route::post('add', [OrganismeController::class, 'store']);
    Route::put('edit/{id}', [OrganismeController::class, 'update']);
    Route::delete('delete/{id}', [OrganismeController::class, 'delete']);
});

//Authentication related routes
Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [UserController::class, 'register']);
    Route::post('login', [UserController::class, 'login']);
    Route::post('logout', [UserController::class, 'logout']);
    Route::post('verify-token', [UserController::class, 'verifyToken']);
    Route::get('get-roles', [RoleController::class, 'getRoles']);
});
