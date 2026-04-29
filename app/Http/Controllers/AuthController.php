<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended(route('dashboard'));
        }

        return back()
            ->with('error', 'Email atau password yang kamu masukkan salah.')
            ->onlyInput('email');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(): RedirectResponse
    {
        $googleUser = Socialite::driver('google')->user();
        $avatarPath = $this->saveGoogleAvatar($googleUser->id, $googleUser->avatar);

        $user = User::updateOrCreate(
            ['email' => $googleUser->email],
            [
                'name'      => $googleUser->name,
                'google_id' => $googleUser->id,
                'avatar'    => $avatarPath,
            ]
        );

        Auth::login($user, remember: true);

        return redirect()->route('dashboard');
    }

    // ============================================================
    // Private Helpers
    // ============================================================

    private function saveGoogleAvatar(string $googleId, string $avatarUrl): string
    {
        $path = "avatars/{$googleId}.jpg";

        // Kalau sudah pernah disimpan, tidak perlu download ulang
        if (Storage::disk('public')->exists($path)) {
            return $path;
        }

        $contents = file_get_contents($avatarUrl);
        Storage::disk('public')->put($path, $contents);

        return $path;
    }
}