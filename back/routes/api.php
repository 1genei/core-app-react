<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OrganismeController;

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
    Route::get('/contacts', 'index');
    Route::get('/contact/{id}', 'show');
    Route::post('/add-contact', 'store');
    Route::put('/edit-contact/{id}', 'update');
    Route::delete('/delete-contact/{id}', 'delete');
});

//Routes organismes
Route::controller(OrganismeController::class)->group(function () {
    Route::get('/organismes', 'index');
    Route::get('/organisme/{id}', 'show');
    Route::post('/add-organisme', 'store');
    Route::put('/edit-organisme/{id}', 'update');
    Route::delete('/delete-organisme/{id}', 'delete');
});