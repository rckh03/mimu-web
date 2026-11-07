@extends('layouts.app')

@section('content')
<div class="shell">
    <aside class="side" id="side">
        <div class="sh">
            <div class="lg">
                <img src="{{ asset('assets/logo_nav.png') }}" alt="mimu" height="40">
            </div>
            <button class="hb" type="button" id="menuBtn" aria-label="Menú" aria-expanded="false">☰</button>
        </div>

        <nav>
            @yield('menu')
        </nav>

        {{-- Temporal: más adelante será un formulario POST que cierre la sesión --}}
        <form method="GET" action="{{ route('landing') }}">
            <button class="out" type="submit">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M10 3a9 9 0 1 0 0 18V3zM14 8l4 4-4 4v-3H9v-2h5z" fill="#fff"/>
                </svg>
                Cerrar sesión
            </button>
        </form>
    </aside>

    <main class="mn">
        @yield('main')
    </main>
</div>

<script>
    // Abre y cierra el menú en pantallas pequeñas
    document.getElementById('menuBtn').addEventListener('click', function () {
        const open = document.getElementById('side').classList.toggle('open');
        this.textContent = open ? '✕' : '☰';
        this.setAttribute('aria-expanded', open);
    });
</script>
@endsection