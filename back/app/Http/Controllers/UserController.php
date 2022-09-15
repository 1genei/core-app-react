<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cookie;
use Auth;
use DB;
use App\Mail\NewUserCredentials;
use Illuminate\Support\Facades\Mail;


class UserController extends Controller
{
    /**
    *    Fonction de register (ne login pas l'utilisateur automatiquement avec le compte créé)
    */
    public function register(Request $request) {

        try {
            // Verify if fields are ok
            $validator = Validator::make($request->all(),[
                'role_id' => 'required|integer',
                'individu_id' => 'required|unique:users|integer',
            ]);
            // If not return an error
            if($validator->fails()){
                return Response()->json([
                    'erreurs' => $validator->errors(),
                    'status' => 400,
                ], 200);
            }
            
            $email = DB::table('individus')->select('email')->where('id',$request->individu_id)->first()->email;
            $password = 'admin123'; // A modifier : générer le password par défaut selon nom et prénom
            
            
            $user = User::create([
                'email' => $email,
                'password' => Hash::make($password),
                'individu_id' => $request->individu_id,
                'role_id' => $request->role_id
            ]);
    
            // Get role permissions and assign them to user
            $permissions = DB::table('permission_role')->where('role_id', $request->role_id)->get();
            foreach ($permissions as $i) {
                $row = array('permission_id'=>$i->permission_id,'user_id'=>$user->id);
                DB::table('permission_user')->insert($row);
            }
            
            Mail::to($user->email)->send(new NewUserCredentials($user,$password));
    
            // Return confirmation
            return Response()->json([
                'message' => 'Utilisateur créé',
                'status' => 200,
                
            ], 200);
        
        
        } catch (\Throwable $th) {
        
            return json_encode( $th);
            // return json_encode( end($th->errorInfo));
        }
    }
    
    
    
    /**
    *    Fonction de login
    */
    public function login (Request $request) {
    
        if(!Auth::attempt($request->only(['email', 'password']))){
            return Response()->json([
                'message' => 'Login failed'  
            ], 401);
        }
        
        // ***************************
          // Get username
            $user = Auth::user();
          
          $names = DB::table('individus')->select('nom', 'prenom')->where('id',$user->individu_id)->first();
        // return  $names;
          
          $token = $user->createToken('token')->plainTextToken;
          $cookie = cookie('jwt', $token, 60*24); // One day

          // Return user infos
          return Response()->json([   
              'message' => 'Login successful',
              'user' => $user,
              'name' => $names,
              'permissionsName' => $user->permissionsName()
          ], 200)->withCookie($cookie);
        
        
        
        // ***************************
        
        
        
        // Authenticate user
        $user = Auth::user();
        $user->individu;
        // Create personal access token
        $token = $user->createToken('token')->plainTextToken;

        // Create cookie and set lifetime depending on remember choice
        if ($request->remember) {
            $cookie = cookie('jwt', $token, 60*24*365); // One year
        }
        else {
            $cookie = cookie('jwt', $token, 60*24); // One day
        }

        // Get username
        $names = DB::table('individus')->select('nom', 'prenom')->where('id',$user->individu_id)->first();

        // Return user infos
        return Response()->json([   
            'message' => 'Login successful',
            'user' => $user,
            'name' => $names,
            'permissionsName' => $user->permissionsName()
        ], 200)->withCookie($cookie);
    }

    
    /**
    * Déconnexion
    */
    public function logout() {

        // Remove cookie
        $cookie = Cookie::forget('jwt');

        // Return confirmation
        return Response()->json([
            'message' => 'Logout successful'
        ], 200)->withCookie($cookie);
    }


   /**
    *    Fonction de register (ne login pas l'utilisateur automatiquement avec le compte créé)
    */
    public function update(Request $request, $user_id) {

        try {
           
            $user = User::where('id', $user_id)->first();
            
          
            if($user){
            
                $user->role_id = $request->role_id;
                $user->update();
                return Response()->json([
                    'message' => 'Rôle de l\'utilisateur modifié',
                    'status' => 200,
                ], 200);
            
            }else{
                
                return Response()->json([
                    'message' => 'Utilisateur non existant',
                    'status' => 200,
                ], 200);
            
            }
         
            
        
        
        } catch (\Throwable $th) {
        
            return json_encode( end($th->errorInfo));
        }
    }
    
    // VERIFY TOKEN
    public function verifyToken(Request $request) {
        // Check if cookie exists
        if ($request->hasCookie('jwt') != false) {
            // Find token in table
            [$id, $token] = explode('|', $request->cookie('jwt'), 2);
            $accessToken = DB::table('personal_access_tokens')->where('id', $id)->first();
            // Check if token is valid
            if (hash_equals($accessToken->token, hash('sha256', $token))) {
                // Retreive user infos
                $user = User::where('id', $accessToken->tokenable_id)->first();
                $user->role;
                // $user = DB::table('users')->select('email','created_at')->where('id', $accessToken->tokenable_id)->first();
                // $individu_id = DB::table('users')->select('individu_id')->where('id', $accessToken->tokenable_id)->first()-individu_id;
                // $names = DB::table('individus')->select('nom', 'prenom')->where('id',$user->individu->id)->first();
                $names = $user->individu->nom . " ".$user->individu->prenom;
                
                $ternary = DB::table('permission_user')->where('user_id', $accessToken->tokenable_id)->get();
                $permissions = array();
                foreach ($ternary as $i) {
                    $name = DB::table('permissions')->select('name')->where('id', $i->permission_id)->first()->name;
                    array_push($permissions, $name);
                }
                // Return infos
                return Response()->json([
                    'status' => 200,
                    'message' => 'Valid token',
                    'user' => $user,
                    'name' => $names,
                    'permissions' => $permissions
                ], 200);
            }
            // If not
            else {
                return Response()->json([
                    'status' => 401,
                    'message' => 'Token is invalid'
                ], 200);
            }
        }
        // If not
        else {
            return Response()->json([
                'status' => 400,
                'message' => 'No token was found'
            ], 200);
        }
    }


    /*
    *  Renvoie tous les utilisateurs actifs
    */
    public function getActiveUsers() {
    
        $users = User::where('archive', 0)->get();
        foreach ($users as $user) {
            $user->role;
            $user->individu;
        }
        return Response()->json([
            'utilisateurs' => $users
        ], 200);
    }

    /*
    *  Renvoie tous les utilisateurs actifs
    */
    public function getArchivedUsers() {
    
        $users = User::where('archive', 1)->get();
        foreach ($users as $user) {
            $user->role;
            $user->individu;
        }
        return Response()->json([
            'utilisateurs' => $users,
            'status' => 200,
        ], 200);
    }


    /*
    *  Renvoie l'utilisateur d'id $user_id
    */
    public function getUser($user_id) {
    
        $user = User::where('id','=',$user_id)->first();
        
        $user->individu;
        $user->role;
        
        return Response()->json([
            'utilisateur' => $user,
            'status' => 200,
        ], 200);
    }
 
    /**
    * Supprime l'user d'id $user_id
    */
    public function delete($user_id) {
    
        Contact::where('id','=',$user_id)->delete();
        return Response()->json([
            'message' => 'Contact supprimé',
            'status' => 200,
        ], 200);
    }

    /**
    * Archive l'user d'id $user_id
    */
    public function archive($user_id) {
    
        $user = User::where('id','=',$user_id)->first();
        $user->archive = 1;
        $user->update();
        return Response()->json([
            'message' => 'Utilisateur archivé',
            'status' => 200,
        ], 200);
    }

        /**
    * Restaure l'user d'id $user_id
    */
    public function restore($user_id) {
    
        $user = User::where('id','=',$user_id)->first();
        $user->archive = 0;
        $user->update();
        return Response()->json([
            'message' => 'Utilisateur restauré',
            'status' => 200,
        ], 200);
    }
}