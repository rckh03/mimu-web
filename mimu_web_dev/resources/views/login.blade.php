@extends('layouts.app')

@section('title', 'Iniciar sesión · MIMU')

@section('content')
<div class="login">
    <form class="lf" method="POST" action="{{ route('login.store') }}" novalidate>
        @csrf

        <div class="lg">
            <img src="{{ asset('assets/logo.png') }}" alt="mimu" width="150">
        </div>

        <input type="email" name="email" value="{{ old('email') }}"
               placeholder="Email" aria-label="Email" autocomplete="username">
        <input type="password" name="password"
               placeholder="Contraseña" aria-label="Contraseña" autocomplete="current-password">

        <button type="button" class="fg">¿Olvidaste tu contraseña?</button>

        <p class="e" role="alert">{{ $errors->first() }}</p>

        <button class="btn" type="submit">Login</button>
    </form>
</div>
@endsection