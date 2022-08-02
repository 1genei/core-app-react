<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

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
}
