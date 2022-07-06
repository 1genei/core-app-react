<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Organisme;
use Illuminate\Support\Facades\Validator;

class OrganismeController extends Controller
{
//Renvoie tous les organismes de la table
public function index() {
    $organismes = organisme::all();
    return Response()->json([
        'organismes' => $organismes
    ]);
}

//Renvoie le organisme d'id $organisme_id
public function show($organisme_id) {
    $organisme = Organisme::where('id','=',$organisme_id)->first();
    return Response()->json([
        'organisme' => $organisme
    ], 200);
}

//Crée un organisme selon les paramètres passés dans $request
public function store(Request $request) {
    $validator = Validator::make($request->all(),[
        'nom' => 'required|string',
        'adresse' => 'required|string',
        'email' => 'required|email',
        'telephone' => 'required|string',
        'site' => 'required|string'
    ]);
    if ($validator->fails()) {
        return Response()->json([
            'erreurs' => $validator->errors()
        ], 400);
    }
    $organisme = Organisme::create([
        'nom' => $request->input('nom'),
        'adresse' => $request->input('adresse'),
        'email' => $request->input('email'),
        'telephone' => $request->input('telephone'),
        'site' => $request->input('site')
    ]);
    return Response()->json([
        'message' => 'Organisme créé'
    ], 200);
}

//Supprime le organisme d'id $organisme_id
public function delete($organisme_id) {
    Organisme::where('id','=',$organisme_id)->delete();
    return Response()->json([
        'message' => 'Organisme supprimé'
    ], 200);
}

//Modifie le organisme d'id $organisme_id avec les paramètres passés dans $request
public function update(Request $request, $organisme_id) {
    $validator = Validator::make($request->all(),[
        'nom' => 'required|string',
        'adresse' => 'required|string',
        'email' => 'required|email',
        'telephone' => 'required|string',
        'site' => 'required|string'
    ]);
    if ($validator->fails()) {
        return Response()->json([
            'erreurs' => $validator->errors()
        ], 400);
    }
    $organisme = Organisme::where('id', '=', $organisme_id)->first();
    $organisme->nom = $request->nom; 
    $organisme->adresse = $request->adresse; 
    $organisme->email = $request->email; 
    $organisme->telephone = $request->telephone;
    $organisme->site = $request->site; 
    $organisme->update();
    return Response()->json([
        'message' => 'Organisme modifié'
    ], 200);
}
}
