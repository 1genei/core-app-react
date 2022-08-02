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
Route::controller(ContactController::class)->group(function () {
    Route::get('/contacts', 'getContacts');
    Route::get('/contact/{id}', 'getContact');
    Route::get('/contacts-no-users', 'getContactNoUsers');
    Route::post('/contact/store', 'store');
    Route::put('/contact/update/{id}', 'update');
    Route::delete('/contact/delete/{id}', 'delete');
});



//Routes organismes
Route::controller(OrganismeController::class)->group(function () {
    Route::get('/organismes', 'index');
    Route::get('/organisme/{id}', 'show');
    Route::post('/add-organisme', 'store');
    Route::put('/edit-organisme/{id}', 'update');
    Route::delete('/delete-organisme/{id}', 'delete');
});

//Authentication related routes
Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [UserController::class, 'register']);
    Route::post('login', [UserController::class, 'login']);
    Route::post('logout', [UserController::class, 'logout']);
    Route::post('verifyToken', [UserController::class, 'verifyToken']);
    Route::get('get-roles', [RoleController::class, 'getRoles']);
    
});
