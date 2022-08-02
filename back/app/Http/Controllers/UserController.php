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

class UserController extends Controller {
    // REGISTER
    public function register(Request $request) {

        // Verify if fields are ok
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|min:4',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'role_id' => 'required|integer'
        ]);
        
        // If not return an error
        if($validator->fails()){
            return Response()->json([
                'message' => 'Registration failed' 
            ], 400);
        }

        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id
        ]);

        // Get role permissions and assign them to user
        $permissions = DB::table('permission_role')->where('role_id', $request->role_id)->get();
        foreach ($permissions as $i) {
            $row = array('permission_id'=>$i->permission_id,'user_id'=>$user->id);
            DB::table('permission_user')->insert($row);
        }

        // Return confirmation
        return Response()->json([
            'message' => 'Registration successful'
        ], 200);
    }
    
    // LOGIN
    public function login(Request $request) {
        
        // Verify credentials
        if(!Auth::attempt($request->only(['email', 'password']))) {
            // If no match return error
            return Response()->json([
                'message' => 'Login failed'  
            ], 401);
        }
        
        // Authenticate user
        $user = Auth::user();

        // Get permissions from role
        $ternary = DB::table('permission_user')->where('user_id', $user->id)->get();
        $permissions = array();
        foreach ($ternary as $i) {
            $name = DB::table('permissions')->select('name')->where('id', $i->permission_id)->first()->name;
            array_push($permissions, $name);
        }
        
        // Create personal access token
        $token = $user->createToken('token')->plainTextToken;

        // Create cookie and set lifetime depending on remember choice
        if ($request->remember) {
            $cookie = cookie('jwt', $token, 60*24*365); // One year
        }
        else {
            $cookie = cookie('jwt', $token, 60); // One hour
        }

        // Return user infos
        return Response()->json([   
            'message' => 'Login successful',
            'user' => $user,
            'permissions' => $permissions
        ], 200)->withCookie($cookie);
    }

    // LOGOUT
    public function logout() {

        // Remove cookie
        $cookie = Cookie::forget('jwt');

        // Return confirmation
        return Response()->json([
            'message' => 'Logout successful'
        ], 200)->withCookie($cookie);
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
                $user = DB::table('users')->select('name','email','created_at')->where('id', $accessToken->tokenable_id)->first();
                $role_id = DB::table('users')->select('role_id')->where('id', $accessToken->tokenable_id)->first()->role_id;
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
}