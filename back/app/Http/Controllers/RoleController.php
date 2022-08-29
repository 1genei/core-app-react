<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Permission;
use App\Models\Permissiongroup;
use App\Models\PermissionRole;
use App\Models\User;
use App\Models\PermissionUser;

class RoleController extends Controller
{
    public function getRoles() {
        // Get all roles
        $roles = Role::all();

        // Return them
        return Response()->json([
            'roles' => $roles
        ], 200);
    }
    
    
    /**
    * retourne les roles et  les permissions et les groupes
    */
    public function getRolesPermissions() {
        
        $roles = Role::all();
        $permissionGroups = Permissiongroup::all();
        $permissionRoles = PermissionRole::all();
        
        foreach ($permissionGroups as $group) {
           $group->permissions;
        }
        
      
        foreach ($roles as $role) {
        
            $role->permissions->makeHidden('pivot');
        }
        
        $permissionroles = [];
        foreach ($permissionRoles as $key => $permissionRole) {
           $permissionroles [] = $permissionRole->permission_id . '_'.$permissionRole->role_id; 
        }
        
        // Return them
        return Response()->json([
            'roles' => $roles,
            'permissionGroups' => $permissionGroups,
            'permissionRoles' => $permissionroles,
            'status' => 200
            
        ], 200);
    }
    
    
    /**
    * Modifie les permissions des rôles
    */
    public function UpdateRolesPermissions(Request $request) {
        
        $roles = Role::all();
        
        $permissions_roles = $request->all();
      
        foreach ($request->all() as $permission_role => $value) {
                
            $tab = explode('_',$permission_role);
            $permission_id = $tab[0];
            $role_id = $tab[1];
            
            
            $role = Role::where('id', $role_id)->first();
            
            if($value == true){
        
                $role->havePermission($permission_id)  ? null  : $role->permissions()->attach($permission_id);
            }else{
            
                $role->permissions()->detach($permission_id);
            
            }
            
            // Pour tous les users du role, on met à jour la permission
            
            $users = $role->users;
            
            
            foreach ($users as $user) {
                if($value == true){
                    $user->havePermission($permission_id)  ? null  : $user->permissions()->attach($permission_id);
                }else{
                
                    $user->permissions()->detach($permission_id);
                }
            }
                
        }
        
        // Return them
        return Response()->json([
           
            'message' => 'Permissions modifiées',
            'status' => 200
            
        ], 200);
    }
    
    /**
    * retourne les permissions de l'utilisateur
    */
    public function getUserPermissions($user_id) {
        
        $user = User::where('id', $user_id)->first();
        $permissionGroups = Permissiongroup::all();
        $permissionUsers = $user->permissions->makeHidden('pivot');
        
        foreach ($permissionGroups as $group) {
           $group->permissions;
        }
        
      
       
        $permissionuser = [];
        foreach ($permissionUsers as $key => $permissionUser) {
           $permissionuser [] = $permissionUser->id ; 
        }
        
        // Return them
        return Response()->json([
            
            'permissionGroups' => $permissionGroups,
            'permissionUser' => $permissionuser,
            'status' => 200
            
        ], 200);
    }
    
    
    /**
    * Modifie les permissions de l'utilisateur
    */
    public function UpdateUserPermissions(Request $request, $user_id) {
        
        $user = User::where('id', $user_id)->first();

        
        $permissions_ids = $request->all();
        
    
        
        foreach ($permissions_ids as $permission_id => $value) {
                
            if($value == true){
        
               
                $user->havePermission($permission_id)  ? null  : $user->permissions()->attach($permission_id);
                
            }else{
            
                $user->permissions()->detach($permission_id);
            }
            
                            
        }
        
       
        
        // Return them
        return Response()->json([
           
            'message' => 'Permissions modifiées',
            'status' => 200
            
        ], 200);
    }
}