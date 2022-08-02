<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Auth;

class UserController extends Controller
{
    /**
    *    Fonction de register (ne login pas l'utilisateur automatiquement avec le compté créé)
    */
    public function register(Request $request) {
        
        
        $validator = Validator::make($request->all(),[
            'role' => 'required|string',
            'contact_id' => 'required|unique:users',
            
        ]);
        
        if($validator->fails()){
            return Response()->json([
                'erreurs' => $validator->errors(),
                'status' => 400,
            ], 200);
        }
        
        
        $user = User::create([
            'role' => $request->input('email'),
            'contact_id' => $request->input('name'),
            'password' => Hash::make($request->input('password'))
        ]);
        return Response()->json([
            'message' => 'Profil créé'
        ], 200);
    }
    
    
    
    /**
    *    Fonction de login
    */
    public function login (Request $request) {
    
        if(!Auth::attempt($request->only(['email', 'password']))){
            return Response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 401);
        }
        
        
        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;
        return Response()->json([
            'token' => $token,
            'user' => $user
        ], 200);
        
        
    }
}
