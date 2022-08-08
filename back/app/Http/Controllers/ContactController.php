<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
  
    /**
    *   Renvoie tous les contacts 
    */
    public function getContacts() {
    
        $contacts = Contact::all();
        foreach ($contacts as $contact) {
            $contact->user;
        }
        return Response()->json([
            'contacts' => $contacts
        ], 200);
    }
    
    /**
    *   Renvoie tous les contacts qui ne sont pas des utlisateurs
    */
    public function getNoUsers() {
        
        
        $ids = User::select('contact_id')->get();
        $contact_ids = [];

        foreach ($ids as $id) {
            $contact_ids[] = $id['contact_id']; 
        }        

        $contacts = Contact::whereNotIn('id', $contact_ids)->get();
        return Response()->json([
            'contacts' => $contacts
        ], 200);
    }



    //**
    /*  Renvoie le contact d'id $contact_id
    */
    public function getContact($contact_id) {
    
        $contact = Contact::where('id','=',$contact_id)->first();
        return Response()->json([
            'contact' => $contact
        ], 200);
    }

    
    /**
    *   Création de contact
    */
    public function store(Request $request) {
    
        $validator = Validator::make($request->all(),[
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'adresse' => 'string|required',
            'email' => 'required|unique:contacts|email',
            'telephone1' => 'string|required',
            'telephone2' => 'string|required',
            'notes' => 'string'
        ]);
        
        if ($validator->fails()) {
            return Response()->json([
                'errors' => $validator->errors(),
                'status' => 400,
            ], 200);
        }
        
        
        $contact = Contact::create([
            'nom' => $request->input('nom'),
            'prenom' => $request->input('prenom'),
            'email' => $request->input('email'),
            'adresse' => $request->input('adresse'),
            'telephone1' => $request->input('telephone1'),
            'telephone2' => $request->input('telephone2'),
            'notes' => $request->input('notes')
        ]);
        
        return Response()->json([
            'message' => 'Contact créé',
            'status' => 200,
            
        ], 200);
        
    }
    
    

 
    /**
    * Supprime le contact d'id $contact_id
    */
    public function delete($contact_id) {
    
        Contact::where('id','=',$contact_id)->delete();
        return Response()->json([
            'message' => 'Contact supprimé'
        ], 200);
    }
    

    /**
    *   Modifie le contact d'id $contact_id avec les paramètres passés dans $request
    */
    public function update(Request $request, $contact_id) {
    
        $contact = Contact::where('id', '=', $contact_id)->first();
    
   
        if($contact->email == $request->email){
        
            $validator = Validator::make($request->all(),[
                'nom' => 'required|string',
                'prenom' => 'required|string',
                'adresse' => 'string',
                'email' => 'required',
            ]);
        
       
        }
        else{
            $validator = Validator::make($request->all(),[
                'nom' => 'required|string',
                'prenom' => 'required|string',
                'adresse' => 'string',
                'email' => 'required|unique:contacts|email',
            ]);        
        }
        
        if ($validator->fails()) {
            return Response()->json([
                'errors' => $validator->errors(),
                'status' => 400,
            ], 200);
        }
        
        $contact->nom = $request->nom; 
        $contact->prenom = $request->prenom; 
        $contact->date_naissance = $request->date_naissance; 
        $contact->adresse = $request->adresse; 
        $contact->email = $request->email; 
        $contact->telephone1 = $request->telephone1; 
        $contact->telephone2 = $request->telephone2; 
        $contact->notes = $request->notes; 
        $contact->update();

        return Response()->json([
            'message' => 'Contact modifié',
            'status' => 200,
        ], 200);
    }
}
