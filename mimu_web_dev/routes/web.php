<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Teacher\GroupController;
use App\Http\Controllers\Teacher\HomeController as TeacherHomeController;
use App\Http\Controllers\Teacher\TrackingController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/docente', function () {
    return view('teacher.home', [
        'teacherName'     => null,
        'studentsCount'   => 0,
        'pendingStudents' => collect(),
        'toGradeCount'    => 0,
    ]);
})->name('teacher.home');

Route::view('/', 'landing')->name('landing');

Route::get('/login', [LoginController::class, 'create'])->name('login');
Route::post('/login', [LoginController::class, 'store'])->name('login.store');
Route::prefix('docente')->name('teacher.')->group(function () {
    Route::get('/', [TeacherHomeController::class, 'index'])->name('home');

    Route::get('grupo', [GroupController::class, 'index'])->name('group.index');

    Route::get('seguimiento', [TrackingController::class, 'create'])->name('tracking.create');
    Route::post('seguimiento', [TrackingController::class, 'store'])->name('tracking.store');
});
