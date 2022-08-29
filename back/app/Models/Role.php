<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];


    /**
    * Retournes toutes les permissions du rôle
    */
    public function permissions() {
        return $this->belongsToMany(Permission::class);
    }
    
    /**
    * Vérifie si le rôle a la permission passée en paramètre
    */
    public function havePermission($permission_id) {
        
        $permission_role = PermissionRole::where([['permission_id', $permission_id], ['role_id', $this->id] ])->count();
      
        return $permission_role > 0 ? true : false;
        
    }
    
    /**
     * Get all of the users for the Role
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }
    
}   
