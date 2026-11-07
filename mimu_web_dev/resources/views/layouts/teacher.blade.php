@extends('layouts.panel')

@section('menu')
    <a href="{{ url('docente') }}"
       class="{{ request()->is('docente') ? 'on' : '' }}">Inicio</a>

    <a href="{{ url('docente/grupo') }}"
       class="{{ request()->is('docente/grupo*') ? 'on' : '' }}">Mi grupo</a>

    <a href="{{ url('docente/seguimiento') }}"
       class="{{ request()->is('docente/seguimiento*') ? 'on' : '' }}">Seguimiento diario</a>

    <a href="{{ url('docente/academico') }}"
       class="{{ request()->is('docente/academico*') ? 'on' : '' }}">Académico</a>

    <a href="{{ url('docente/avisos') }}"
       class="{{ request()->is('docente/avisos*') ? 'on' : '' }}">Avisos</a>

    <a href="{{ url('docente/calendario') }}"
       class="{{ request()->is('docente/calendario*') ? 'on' : '' }}">Calendario</a>
@endsection

@section('main')
    @yield('page')
@endsection