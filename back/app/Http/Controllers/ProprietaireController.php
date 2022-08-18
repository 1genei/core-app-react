<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Proprietaire;
use Illuminate\Support\Facades\Validator;

class ProprietaireController extends Controller
{
    public function getInfos() {
        $owner = Proprietaire::first();
        return Response()->json([
            'owner' => $owner,
            'status' => 200,
        ], 200);
    }

    /**
    *   Modifie le contact d'id $contact_id avec les paramètres passés dans $request
    */
    public function update(Request $request) {
    
        $owner = Proprietaire::first();

        $validator = Validator::make($request->all(),[
            'nom' => 'required|string',
            'siret' => 'required|string',
            'email' => 'required|email',
            'adresse' => 'required|string',
            'pays' => 'required|string',
            'ville' => 'required|string',
            'telephone' => 'required|string',
        ]);
        
        if ($validator->fails()) {
            return Response()->json([
                'errors' => $validator->errors(),
                'status' => 400,
            ], 200);
        }
        
        $owner->nom = $request->nom;
        $owner->email = $request->email;
        $owner->telephone = $request->telephone;
        $owner->pays = $request->pays;
        $owner->province = $request->province;
        $owner->ville = $request->ville;
        $owner->adresse = $request->adresse;
        $owner->complement_adresse = $request->complement_adresse;
        $owner->siret = $request->siret;
        $owner->created_at = $request->created_at;
        $owner->update();

        return Response()->json([
            'message' => 'Informations modifiées',
            'status' => 200,
        ], 200);
    }
}