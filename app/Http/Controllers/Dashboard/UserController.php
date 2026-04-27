<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
        $users = User::latest()->paginate(10);

        return Inertia::render('Dashboard/Users/Index', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => ['required', 'string', 'max:255'],
            'email'     => ['required', 'email:dns', 'max:255', 'unique:users,email'],
            'password'  => ['required', 'string', 'min:8', 'confirmed'],
            'avatar'    => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            //                           ↑ harus file gambar    ↑ max 2MB
        ]);

        $avatarPath = null;
        if ($request->hasFile('avatar')) {
            // Simpan ke storage/app/public/avatars/
            // Laravel otomatis beri nama unik supaya tidak bentrok
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
        }

        User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'avatar'   => $avatarPath, // null kalau tidak upload
        ]);

        return redirect()
            ->route('dashboard.users.index')
            ->with('success', 'User berhasil dibuat!');
    }
}
