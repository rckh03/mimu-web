<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class LoginController extends Controller
{
    //Empezando el login: 
     /** Muestra el formulario de login. */
    public function create(): View
    {
        return view('login');
    }

    /**
     * TEMPORAL: valida el formulario, pero todavía NO verifica la contraseña
     * ni inicia sesión. Eso se hace en el siguiente paso.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ], [
            'email.required'    => 'Completa el correo y la contraseña.',
            'password.required' => 'Completa el correo y la contraseña.',
            'email.email'       => 'Escribe un correo válido.',
        ]);

        // TODO: verificar contra la tabla credentials y abrir sesión
        return redirect()->route('teacher.home');
    }
}
