@extends('layouts.app')

@section('content')
<div class="top">
    <div class="lg">
        <img src="{{ asset('assets/logo_nav.png') }}" alt="mimu" height="36">
    </div>
    <a class="btn" href="{{ route('login') }}">Iniciar sesión</a>
</div>

<section class="hero">
    <div>
        <h1>La escuela en tu bolsillo</h1>
        <p>Tareas, notas, asistencia, avisos y mensajes de tus hijos en un solo lugar, siempre al día.</p>
        <p><a class="btn" href="{{ route('login') }}">Iniciar sesión</a></p>
    </div>
    <div class="blob">
        <img src="{{ asset('assets/logo.png') }}" alt="Mascota de MIMU"
             style="width:100%;max-width:240px;height:auto">
    </div>
</section>

<section class="stp">
    <h2 class="q" style="font-size:1.6rem;margin-bottom:14px">Así llega una tarea a tu celular</h2>
    <ol>
        <li><h3>El profesor la publica</h3>Elige materia y fecha límite desde el panel web.</li>
        <li><h3>El sistema la guarda y avisa</h3>Se notifica a los tutores del grupo.</li>
        <li><h3>El tutor la ve al instante</h3>Aparece en Tareas y suma a los pendientes de Inicio.</li>
    </ol>
</section>
@endsection