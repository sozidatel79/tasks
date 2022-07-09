<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static find($id)
 * @method static create(array $array)
 */

class Task extends Model
{
    /**
     * @var string[]
     */
    protected $fillable = ['title', 'date', 'completed'];

    /**
     * @var bool
     */
    public $timestamps = false;
}
