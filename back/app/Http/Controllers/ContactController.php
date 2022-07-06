<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    //Renvoie tous les contacts de la table
    public function index() {
        $contacts = Contact::all();
        return Response()->json([
            'contacts' => $contacts
        ]);
    }

    //Renvoie le contact d'id $contact_id
    public function show($contact_id) {
        $contact = Contact::where('id','=',$contact_id)->first();
        return Response()->json([
            'contact' => $contact
        ], 200);
    }

    //Crée un contact selon les paramètres passés dans $request
    public function store(Request $request) {
        $validator = Validator::make($request->all(),[
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'date_naissance' => 'required|date',
            'adresse' => 'required|string',
            'email' => 'required|email',
            'telephone1' => 'required|string',
            'telephone2' => 'string',
            'notes' => 'string'
        ]);
        if ($validator->fails()) {
            return Response()->json([
                'erreurs' => $validator->errors()
            ], 400);
        }
        $contact = Contact::create([
            'nom' => $request->input('nom'),
            'prenom' => $request->input('prenom'),
            'date_naissance' => $request->input('date_naissance'),
            'adresse' => $request->input('adresse'),
            'email' => $request->input('email'),
            'telephone1' => $request->input('telephone1'),
            'telephone2' => $request->input('telephone2'),
            'notes' => $request->input('notes')
        ]);
        return Response()->json([
            'message' => 'Contact créé'
        ], 200);
    }

    //Supprime le contact d'id $contact_id
    public function delete($contact_id) {
        Contact::where('id','=',$contact_id)->delete();
        return Response()->json([
            'message' => 'Contact supprimé'
        ], 200);
    }

    //Modifie le contact d'id $contact_id avec les paramètres passés dans $request
    public function update(Request $request, $contact_id) {
        $validator = Validator::make($request->all(),[
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'date_naissance' => 'required|date',
            'adresse' => 'required|string',
            'email' => 'required|email',
            'telephone1' => 'required|string',
            'telephone2' => 'string',
            'notes' => 'string'
        ]);
        if ($validator->fails()) {
            return Response()->json([
                'erreurs' => $validator->errors()
            ], 400);
        }
        $contact = Contact::where('id', '=', $contact_id)->first();
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
            'message' => 'Contact modifié'
        ], 200);
    }
}
