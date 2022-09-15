<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organisme extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    /**
     * Retourne les indivdus liées à l'organisme
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function individus()
    {
        return $this->belongsToMany(Individu::class)->withPivot('poste_id', 'archive');
    }
}
