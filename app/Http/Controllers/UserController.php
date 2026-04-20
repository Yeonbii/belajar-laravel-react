<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        return Inertia::render('Users/Index', [
            'filters' => [
                'search' => $search,
            ],
            'users' => User::query()
                    ->when($search, function ($query, $search) {
                        $query->where('name', 'like', "%{$search}%")
                              ->orWhere('email', 'like', "%{$search}%");
                    })
                    ->latest()
                    ->select('id', 'name', 'email')
                    ->get()
                    // ->withQueryString()
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email:dns|unique:users,email',
            'password' => 'required|min:6'
        ]);
    
        $validated['password'] = Hash::make($validated['password']);
    
        User::create($validated);
    
        //return redirect()->route('users.index');
        return redirect()->back();
    }
    
    public function listScroll(Request $request)
    {
        $search = $request->input('search');
    
        return Inertia::render('Users/ListScroll', [
            'filters' => [
                'search' => $search,
            ],
    
            'users' => Inertia::scroll(fn () =>
                User::query()
                    ->when($search, function ($query, $search) {
                        $query->where('name', 'like', "%{$search}%")
                              ->orWhere('email', 'like', "%{$search}%");
                    })
                    ->latest()
                    ->select('id', 'name', 'email')
                    ->paginate(10)
                    ->withQueryString() // 🔥 penting!
            )
        ]);
    }

    public function show()
    {
        $user = [
            'name' => 'Aliandra Kahfi'
        ];

        return Inertia::render('Users/Show', [
            'user' => $user
        ]);
    }
}
