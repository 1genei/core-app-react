<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OrganismeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProprietaireController;
use App\Http\Controllers\CodepostalVilleController;
use App\Http\Controllers\PaysindicatifController;
use App\Http\Controllers\IndividuController;

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
    Route::get('active', [ContactController::class, 'getActiveContacts']);
    Route::get('archived', [ContactController::class, 'getArchivedContacts']);
    Route::get('no-user', [ContactController::class, 'getNoUsers']);
    Route::post('store', [ContactController::class, 'store']);
    Route::put('archive/{id}', [ContactController::class, 'archive'])->where('id', '[0-9]+');
    Route::put('restore/{id}', [ContactController::class, 'restore'])->where('id', '[0-9]+');
    Route::put('update/{id}', [ContactController::class, 'update'])->where('id', '[0-9]+');
    Route::delete('delete/{id}', [ContactController::class, 'delete'])->where('id', '[0-9]+');
    Route::get('type/all', [ContactController::class, 'getTypeContacts']);
    Route::post('type/store', [ContactController::class, 'storeTypeContact']);
    Route::put('type/archive/{id}', [ContactController::class, 'archiveTypeContact'])->where('id', '[0-9]+');
    Route::put('type/restore/{id}', [ContactController::class, 'restoreTypeContact'])->where('id', '[0-9]+');
    Route::put('type/update/{id}', [ContactController::class, 'updateTypeContact'])->where('id', '[0-9]+');
    
});


//Routes individus
Route::group(['prefix' => 'individu'], function () {
    Route::get('all', [IndividuController::class, 'getIndividus']);
    Route::get('{id}', [IndividuController::class, 'getIndividu'])->where('id', '[0-9]+');
    Route::get('active', [IndividuController::class, 'getActiveIndividus']);
    Route::get('archived', [IndividuController::class, 'getArchivedIndividus']);
    Route::get('no-user', [IndividuController::class, 'getNoUsers']);
    Route::post('store', [IndividuController::class, 'store']);
    Route::put('archive/{id}', [IndividuController::class, 'archive'])->where('id', '[0-9]+');
    Route::put('restore/{id}', [IndividuController::class, 'restore'])->where('id', '[0-9]+');
    Route::put('update/{id}', [IndividuController::class, 'update'])->where('id', '[0-9]+');
    Route::delete('delete/{id}', [IndividuController::class, 'delete'])->where('id', '[0-9]+');
    Route::get('type/all', [IndividuController::class, 'getTypeIndividus']);
    Route::post('type/store', [IndividuController::class, 'storeTypeIndividu']);
    Route::put('type/archive/{id}', [IndividuController::class, 'archiveTypeIndividu'])->where('id', '[0-9]+');
    Route::put('type/restore/{id}', [IndividuController::class, 'restoreTypeIndividu'])->where('id', '[0-9]+');
    Route::put('type/update/{id}', [IndividuController::class, 'updateTypeIndividu'])->where('id', '[0-9]+');
});



//Routes utilisateurs
Route::group(['prefix' => 'utilisateur'], function () {
    Route::get('all', [UserController::class, 'getUsers']);
    Route::get('{id}', [UserController::class, 'getUser'])->where('id', '[0-9]+');
    Route::get('active', [UserController::class, 'getActiveUsers']);
    Route::get('archived', [UserController::class, 'getArchivedUsers']);
    Route::put('archive/{id}', [UserController::class, 'archive'])->where('id', '[0-9]+');
    Route::put('restore/{id}', [UserController::class, 'restore'])->where('id', '[0-9]+');
    Route::put('update/{id}', [UserController::class, 'update'])->where('id', '[0-9]+');
    Route::delete('delete/{id}', [UserController::class, 'delete'])->where('id', '[0-9]+');
});

//Routes organismes
Route::group(['prefix' => 'organisme'], function () {
    Route::get('all', [OrganismeController::class, 'getOrganismes']);
    Route::get('{id}', [OrganismeController::class, 'getOrganisme'])->where('id', '[0-9]+');
    Route::get('active', [OrganismeController::class, 'getActiveOrganismes']);
    Route::get('archived', [OrganismeController::class, 'getArchivedOrganismes']);
    Route::post('store', [OrganismeController::class, 'store']);
    Route::put('archive/{id}', [OrganismeController::class, 'archive'])->where('id', '[0-9]+');
    Route::put('restore/{id}', [OrganismeController::class, 'restore'])->where('id', '[0-9]+');
    Route::put('update/{id}', [OrganismeController::class, 'update'])->where('id', '[0-9]+');
    Route::delete('delete/{id}', [OrganismeController::class, 'delete'])->where('id', '[0-9]+');
    Route::get('type/all', [OrganismeController::class, 'getTypeOrganismes']);
    Route::post('type/store', [OrganismeController::class, 'storeTypeOrganisme']);
    Route::put('type/archive/{id}', [OrganismeController::class, 'archiveTypeOrganisme'])->where('id', '[0-9]+');
    Route::put('type/restore/{id}', [OrganismeController::class, 'restoreTypeOrganisme'])->where('id', '[0-9]+');
    Route::put('type/update/{id}', [OrganismeController::class, 'updateTypeOrganisme'])->where('id', '[0-9]+');
    
});


//Authentication related routes
Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [UserController::class, 'register']);
    Route::post('login', [UserController::class, 'login']);
    Route::post('logout', [UserController::class, 'logout']);
    Route::post('verify-token', [UserController::class, 'verifyToken']);
    Route::get('get-roles', [RoleController::class, 'getRoles']);
    Route::get('get-roles-permissions', [RoleController::class, 'getRolesPermissions']);
    Route::put('update-roles-permissions', [RoleController::class, 'updateRolesPermissions']);
    Route::get('get-user-permissions/{user_id}', [RoleController::class, 'getUserPermissions']);
    Route::put('update-user-permissions/{user_id}', [RoleController::class, 'updateUserPermissions']);
});

//Routes proprietaire
Route::group(['prefix' => 'owner'], function () {
    Route::get('infos', [ProprietaireController::class, 'getInfos']);
    Route::put('update', [ProprietaireController::class, 'update']);
});

//Routes codes postaux et villes
Route::get('get-codepostal-by-ville/{ville}', [CodepostalvilleController::class, 'getCodePostalByVille']);
Route::get('get-villes-by-codepostal/{code_postal}', [CodepostalvilleController::class, 'getVillesByCodePostal']);


//Routes indicatif et pays
Route::get('get-indicatif-by-pays/{pays}', [PaysindicatifController::class, 'getIndicatifByPays']);
Route::get('get-pays/', [PaysindicatifController::class, 'getPays']);

