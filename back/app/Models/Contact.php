<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
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

    /**
    * Retourne l'utlisateur lié à ce contact
    */
    public function user() {
        return $this->hasOne(User::class);
    }
    
    /**
     * Retourne tous les types d'un contact
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function typecontacts()
    {
        return $this->belongsToMany(Typecontact::class);
    }


}
