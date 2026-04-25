<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    // Tampilkan halaman login
    public function index(): Response
    {
        return Inertia::render('Auth/Login');
    }

    // Proses login
    public function authenticate(Request $request): RedirectResponse
    {
        // Validasi input
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Coba login
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            // return redirect()->intended('dashboard'); // Ini ke url (/dashboard)
            return redirect()->intended(route('dashboard'));
        }

        // Kalau gagal, kembalikan error
        return back()
            ->with('error', 'Email atau password yang kamu masukkan salah.')
            ->onlyInput('email');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/login');
    }
}
