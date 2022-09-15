<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

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
        'role_id',
        'contact_id',
        'password',
        'remember_token',
        'updated_at',
        'email_verified_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function contact() {
        return $this->belongsTo(Contact::class);
    }
    public function individu() {
        return $this->belongsTo(Individu::class);
    }
    
    public function role() {
        return $this->belongsTo(Role::class);
    }
    
    /**
     * The permissions that belong to the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }
    
    /**
     * The permissions that belong to the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function permissionsName()
    {
        $permissions = $this->permissions;
        $permissionsName = array();
        
        foreach ($permissions as $permission) {
            array_push($permissionsName, $permission->name);
        }
        return $permissionsName;
    }
    
    
    /**
    * Vérifie si le user a la permission passée en paramètre
    */
    public function havePermission($permission_id) {
        
        $permission_user = PermissionUser::where([['permission_id', $permission_id], ['user_id', $this->id] ])->count();
      
        return $permission_user > 0 ? true : false;
        
    }
}
