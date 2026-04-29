<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Dashboard\IndexController as DashboardController;
use App\Http\Controllers\Dashboard\UserController as DashboardUserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::group(['middleware' => ['guest']], function () {
    Route::get('/login', [AuthController::class, 'index'])->name('login');
    Route::post('/login', [AuthController::class, 'authenticate']);
});

Route::group(['middleware' => ['auth']], function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/users', [DashboardUserController::class, 'index'])->name('dashboard.users.index');
    Route::post('/dashboard/users', [DashboardUserController::class, 'store'])->name('dashboard.users.store');
});

Route::get('/auth/google', [AuthController::class, 'redirect']);
Route::get('/auth/google/callback', [AuthController::class, 'callback']);
