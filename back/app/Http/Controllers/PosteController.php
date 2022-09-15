<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Poste;

class PosteController extends Controller
{
    
    /**
    * Retourne la liste de tous les postes
    */
    public function getPostes(){
        $postes = Poste::all();
        
        return  response()->json([
            "postes" => $postes,
            "status" => 200
        ], 200);
    }
}
