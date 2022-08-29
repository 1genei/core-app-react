<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Codepostalville extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
      
    
        /**
    * Sauvegarde Les villes et leur code postal dans la base de données
    */
    
    public static function createCodePostalVille(){
       
        ini_set('max_execution_time', '3000');
       
        $row = 1;
        if (($handle = fopen("datas/codepostal_ville.csv", "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
             
             
                for ($c=0; $c < count($data); $c++) {
                    
                    $ville = explode(';', $data[$c])[0];
                    $code = explode(';', $data[$c])[1];
                    
                    echo $code . "<br />\n";
                    
                    $checkcVille = Codepostalville::where('ville', $ville)->first();
                    
                    if($checkcVille == null){
                        Codepostalville::create([
                            "code_postal" => $code,
                            "ville" => $ville
                        ]);
                    
                    }
                
                    
                }
            }
            fclose($handle);
        }
        
        return true;
    }
}
