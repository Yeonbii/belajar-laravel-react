<?php

namespace App\Http\Controllers;

use App\Models\User;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show()
    {
        $user = [
            'name' => 'Aliandra Kahfi'
        ];

        return Inertia::render('Users/Show', [
            'user' => $user
        ]);
    }

    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::latest()->paginate(10)
        ]);
    }
}
