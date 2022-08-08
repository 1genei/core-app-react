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
    Route::get('all', [ContactController::class, 'getContacts']);
    Route::get('{id}', [ContactController::class, 'getContact'])->where('id', '[0-9]+');
    Route::get('no-user', [ContactController::class, 'getNoUsers']);
    Route::post('store', [ContactController::class, 'store']);
    Route::put('update/{id}', [ContactController::class, 'update']);
    Route::delete('delete/{id}', [ContactController::class, 'delete']);
});

//Routes utilisateurs
Route::group(['prefix' => 'utilisateur'], function () {
    Route::get('active', [UserController::class, 'getActiveUsers']);
    Route::get('archived', [UserController::class, 'getArchivedUsers']);
    Route::get('{id}', [UserController::class, 'getUser']);
    Route::delete('delete/{id}', [UserController::class, 'delete']);
    Route::put('archive/{id}', [UserController::class, 'archive']);
    Route::put('restore/{id}', [UserController::class, 'restore']);
});

//Routes organismes
Route::group(['prefix' => 'organisme'], function () {
    Route::get('all', [OrganismeController::class, 'getOrganismes']);
    Route::get('{id}', [OrganismeController::class, 'getOrganisme']);
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
