<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermissionUser extends Model
{
    use HasFactory;
    /**
  * The attributes that are mass assignable.
  *
  * @var array<int, string>
  */
 protected $guarded = [];

 /**
  * The table associated with the model.
  *
  * @var string
  */
 protected $table = 'permission_user';
 /**
  * The attributes that should be hidden for serialization.
  *
  * @var array<int, string>
  */
 protected $hidden = [
     'created_at',
     'updated_at',
 ];
}
