@extends('layouts.teacher')

@section('title', 'Mi grupo · MIMU')

@section('page')
<div class="ttl">
    <h1>{{ $groupName ? 'Grupo '.$groupName : 'Mi grupo' }}</h1>
    <p>{{ $students->count() }} estudiantes</p>
</div>

@if ($students->isEmpty())
    <div class="tw">
        <p class="mut" style="padding:16px">Todavía no hay estudiantes en tu grupo.</p>
    </div>
@else
    <p><input id="q" placeholder="Buscar" aria-label="Buscar estudiante" style="max-width:280px"></p>

    <div class="tw">
        <table>
            <tr><th>Estudiante</th><th>Grado</th><th>Estado</th><th>Acción</th></tr>
            @foreach ($students as $student)
                <tr data-name="{{ mb_strtolower($student->name.' '.$student->last_name) }}">
                    <td class="l">{{ $student->name }} {{ $student->last_name }}</td>
                    <td>{{ $gradeName ?? '—' }}</td>
                    <td>
                        @if ($registeredIds->contains($student->id))
                            <span class="pill ok">Registrado</span>
                        @else
                            <span class="pill no">Sin registrar</span>
                        @endif
                    </td>
                    <td><a class="act" href="{{ route('teacher.tracking.create') }}">Registrar</a></td>
                </tr>
            @endforeach
        </table>
    </div>

    <script>
        // Filtra la tabla mientras escribes en el buscador
        document.getElementById('q').addEventListener('input', function () {
            const q = this.value.toLowerCase();
            document.querySelectorAll('tr[data-name]').forEach(function (row) {
                row.hidden = !row.dataset.name.includes(q);
            });
        });
    </script>
@endif
@endsection