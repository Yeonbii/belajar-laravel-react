<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show()
    {
        $user = [
            'name' => 'Aliandra Kahfi'
        ];

        return Inertia::render('User/Show', [
            'user' => $user
        ]);
    }
}
