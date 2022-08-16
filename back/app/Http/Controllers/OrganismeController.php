<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Organisme;
use Illuminate\Support\Facades\Validator;

class OrganismeController extends Controller
{
    //Renvoie tous les organismes de la table
    public function getOrganismes() {
        $organismes = organisme::all();
        return Response()->json([
            'organismes' => $organismes,
            'status' => 200,
        ]);
    }

        /*
        *  Renvoie tous les organismes actifs
        */
        public function getActiveOrganismes() {
        
            $organismes = Organisme::where('archive', 0)->get();

            return Response()->json([
                'organismes' => $organismes,
                'status' => 200,
            ], 200);
        }
        

        /*
        *  Renvoie tous les organismes archivés
        */
        public function getArchivedOrganismes() {
        
            $organismes = Organisme::where('archive', 1)->get();

            return Response()->json([
                'organismes' => $organismes,
                'status' => 200,
            ], 200);
        }
        

    //Renvoie le organisme d'id $organisme_id
    public function getOrganisme($organisme_id) {
        $organisme = Organisme::where('id','=',$organisme_id)->first();
        return Response()->json([
            'organisme' => $organisme
        ], 200);
    }

    //Crée un organisme selon les paramètres passés dans $request
    public function store(Request $request) {
        $validator = Validator::make($request->all(),[
            'nom' => 'required|string',
        ]);
        if ($validator->fails()) {
            return Response()->json([
                'erreurs' => $validator->errors(),
                'status' => 400,
            ], 200);
        }
        $organisme = Organisme::create([
            'nom' => $request->nom,
            'adresse' => $request->adresse,
            'complement_adresse' => $request->complement_adresse,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'site' => $request->site,
            'notes' => $request->notes
        ]);
        return Response()->json([
            'message' => 'Organisme créé',
            'status' => 200,
        ], 200);
    }

    //Supprime le organisme d'id $organisme_id
    public function delete($organisme_id) {
        Organisme::where('id','=',$organisme_id)->delete();
        return Response()->json([
            'message' => 'Organisme supprimé'
        ], 200);
    }

    /**
    * Archive l'organisme d'id $organisme_id
    */
    public function archive($organisme_id) {
    

        $organisme = Organisme::where('id','=',$organisme_id)->first();
        
        $organisme->archive = 1;
        $organisme->update();
        return Response()->json([
            'message' => 'Organisme archivé',
            'status' =>200
        ], 200);
    }

    /**
    * Restaure l'organisme d'id $organisme_id
    */
    public function restore($organisme_id) {
    
        $organisme = Organisme::where('id','=',$organisme_id)->first();
        $organisme->archive = 0;
        $organisme->update();
        return Response()->json([
            'message' => 'Organisme restauré',
            'status' =>200
            
        ], 200);
    }

    /**
    *   Modifie l'organisme d'id $organisme_id avec les paramètres passés dans $request
    */
    public function update(Request $request, $organisme_id) {
    
        $organisme = Organisme::where('id', '=', $organisme_id)->first();
    
        $validator = Validator::make($request->all(),[
            'nom' => 'required|string',
        ]);

        if ($validator->fails()) {
            return Response()->json([
                'errors' => $validator->errors(),
                'status' => 400,
            ], 200);
        }
        
        $organisme->nom = $request->nom; 
        $organisme->adresse = $request->adresse; 
        $organisme->complement_adresse = $request->complement_adresse; 
        $organisme->email = $request->email; 
        $organisme->site = $request->site; 
        $organisme->telephone = $request->telephone; 
        $organisme->notes = $request->notes; 
        $organisme->update();

        return Response()->json([
            'message' => 'Organisme modifié',
            'status' => 200,
        ], 200);
    }
}