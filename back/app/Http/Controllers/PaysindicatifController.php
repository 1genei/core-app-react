<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paysindicatif;

class PaysindicatifController extends Controller
{
        

    /**
    *   Retourne l'indicatif lié au pays
    */
    
    public function getIndicatifByPays($pays){
    
        $indicatif = Paysindicatif::where('pays', $pays)->select('indicatif')->first();
        
   
        if( $indicatif != null ){
            return Response()->json([
                "indicatif" => $indicatif->indicatif,
                "status" => 200
            
            ], 200);
        }else{
            return Response()->json([
                "message" => "Aucun n'indicatif trouvé",
                "status" => 400
            
            ], 200);
        }
        
        
    }
    
    /**
    *   Retourne tous les pays
    */
    
    public function getPays(){
    
        $pays = Paysindicatif::orderBy('pays', 'asc')->get();
        
   
        if( $pays != null ){
            return Response()->json([
                "pays" => $pays,
                "status" => 200
            
            ], 200);
        }else{
            return Response()->json([
                "message" => "Aucun pays trouvé",
                "status" => 400
            
            ], 200);
        }
        
        
    }

}
