<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Individu;
use App\Models\User;
use App\Models\Codepostalville;
use App\Models\Paysindicatif;
use App\Models\TypeContact;
use Illuminate\Support\Facades\Validator;
use App\Models\Contact;



class IndividuController extends Controller
{
    /**
    *   Renvoie tous les individus 
    */
    public function getIndividus() {
        
        $individus = Individu::all();
        foreach ($individus as $individu) {
            $individu->user;
        }
        return Response()->json([
            'individus' => $individus,
            'status' => 200,
        ], 200);
    }
    
    /*
    *  Renvoie tous les individus actifs
    */
    public function getActiveIndividus() {
    
        $individus = Individu::where('archive', 0)->get();
        foreach ($individus as $individu) {
            $individu->user;
        }
        return Response()->json([
            'individus' => $individus,
            'status' => 200,
        ], 200);
    }
    

    /*
    *  Renvoie tous les individus archivés
    */
    public function getArchivedIndividus() {
    
        $individus = Individu::where('archive', 1)->get();
        foreach ($individus as $individu) {
            $individu->user;
        }
        return Response()->json([
            'individus' => $individus,
            'status' => 200,
        ], 200);
    }
    
    
    
    /**
    *   Renvoie tous les individus qui ne sont pas des utlisateurs
    */
    public function getNoUsers() {
        
        
        $ids = User::select('individu_id')->get();
        $individu_ids = [];

        foreach ($ids as $id) {
            $individu_ids[] = $id['individu_id']; 
        }        

        $individus = Individu::whereNotIn('id', $individu_ids)->get();
        return Response()->json([
            'individus' => $individus,
            'status' => 200,
        ], 200);
    }



    //**
    /*  Renvoie le individu d'id $individu_id
    */
    public function getIndividu($individu_id) {
    
        $individu = Individu::where('id','=',$individu_id)->first();
        $individu->user;
        $individu->typecontacts;
        return Response()->json([
            'individu' => $individu,
            'status' => 200
        ], 200);
    }

    
    /**
    *   Création de individu
    */
    public function store(Request $request) {
    

        $validator = Validator::make($request->all(),[
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'types' => 'required',
            'email' => 'required|unique:individus|email',
        ]);
        
        
        if ($validator->fails()) {
            return Response()->json([
                'errors' => $validator->errors(),
                'status' => 400,
            ], 200);
        }
        
        // return $request->all();
       
       try {
            $individu = Individu::create([
                'nom' => $request->input('nom'),
                'prenom' => $request->input('prenom'),
                'email' => $request->input('email'),
                'adresse' => $request->input('adresse'),
                'date_naissance' => $request->input('date_naissance'),
                'telephone1' => $request->input('telephone1'),
                'telephone2' => $request->input('telephone2'),
                'notes' => $request->input('notes'),
                'code_postal' => $request->input('code_postal'),
                'ville' => $request->input('ville'),
                'pays' => $request->input('pays'),
                'indicatif1' => $request->input('indicatif1'),
                'indicatif2' => $request->input('indicatif2'),
                'provence' => $request->input('provence'),
                'region' => $request->input('region'),
                'etat' => $request->input('etat'),
            ]);
                      
            $contact = Contact::create([
                "categorie" => "individu",
                "individu_id" => $individu->id,
            ]);
            
            foreach ($request->types as $type) {
                $typecontact = Typecontact::where('type', $type)->first();
                $contact->typecontacts()->attach($typecontact->id);

            }
            
            
       } catch (\Throwable $th) {
        
        return $th;
       }
        
       
        
        return Response()->json([
            'message' => 'Individu créé',
            'status' => 200,
            
        ], 200);
        
    }
    
    

    /**
    * Supprime le individu d'id $individu_id
    */
    public function delete($individu_id) {
    
        Individu::where('id','=',$individu_id)->delete();
        return Response()->json([
            'message' => 'Individu supprimé'
        ], 200);
    }
    

    /**
    *   Modifie le individu d'id $individu_id avec les paramètres passés dans $request
    */
    public function update(Request $request, $individu_id) {
    
        $individu = Individu::where('id', '=', $individu_id)->first();
    
   
        if($individu->email == $request->email){
        
            $validator = Validator::make($request->all(),[
                'nom' => 'required|string',
                'prenom' => 'required|string',
                'email' => 'required',
            ]);
        
       
        }
        else{
            $validator = Validator::make($request->all(),[
                'nom' => 'required|string',
                'prenom' => 'required|string',
                'email' => 'required|unique:individus|email',
            ]);        
        }
        
        if ($validator->fails()) {
            return Response()->json([
                'errors' => $validator->errors(),
                'status' => 400,
            ], 200);
        }
        
        $individu->nom = $request->nom; 
        $individu->prenom = $request->prenom; 
        $individu->date_naissance = $request->date_naissance; 
        $individu->adresse = $request->adresse; 
        $individu->email = $request->email; 
        $individu->telephone1 = $request->telephone1; 
        $individu->telephone2 = $request->telephone2; 
        $individu->notes = $request->notes; 
        $individu->ville = $request->ville ;
        $individu->pays = $request->pays ;
        $individu->indicatif1 = $request->indicatif1 ;
        $individu->indicatif2 = $request->indicatif2 ;
        $individu->provence = $request->provence ;
        $individu->region = $request->region ;
        $individu->etat = $request->etat ;
        $individu->update();

        return Response()->json([
            'message' => 'Individu modifié',
            'status' => 200,
        ], 200);
    }
    
     /**
    * Archive le individu d'id $individu_id
    */
    public function archive($individu_id) {
    

        $individu = Individu::where('id','=',$individu_id)->first();
        
        $individu->archive = 1;
        $individu->update();
        return Response()->json([
            'message' => 'Individu archivé',
            'status' =>200
        ], 200);
    }

    /**
    * Restaure le individu d'id $individu_id
    */
    public function restore($individu_id) {
    
        $individu = Individu::where('id','=',$individu_id)->first();
        $individu->archive = 0;
        $individu->update();
        return Response()->json([
            'message' => 'Individu restauré',
            'status' =>200
            
        ], 200);
    }

    
}
