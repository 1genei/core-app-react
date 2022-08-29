<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Codepostalville;

class CodepostalvilleController extends Controller
{
    
    
    /**
    *   Retourne toutes les villes d'un code postal
    */
    
    public function getVillesByCodePostal($codePostal){
    
        $villes = Codepostalville::where('code_postal', $codePostal)->select('ville')->get();
        
        $tab_ville = [];
        foreach ($villes as $ville) {
            $tab_ville [] = $ville['ville'];
        }
        
    
        if( sizeof($villes) >0 ){
            return Response()->json([
                "villes" => $tab_ville,
                "status" => 200
            
            ], 200);
        }else{
            return Response()->json([
                "message" => "Aucune ville trouvée",
                "status" => 400
            
            ], 200);
        }
        
        
    }
    

    /**
    *   Retourne le code postal lié à une ville
    */
    
    public function getCodePostalByVille($ville){
    
        $codePostal = Codepostalville::where('ville', $ville)->select('code_postal')->first();
        
   
        if( $codePostal != null ){
            return Response()->json([
                "code_postal" => $codePostal->code_postal,
                "status" => 200
            
            ], 200);
        }else{
            return Response()->json([
                "message" => "Aucun code postal trouvé",
                "status" => 400
            
            ], 200);
        }
        
        
    }

}
