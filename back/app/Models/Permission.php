<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
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
     * Retourne le group de permission auquel appartient la permission
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function permissionGroup()
    {
        return $this->belongsTo(PermissionGroup::class);
    }
    
    /**
     * The roles that belong to the Permission
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
