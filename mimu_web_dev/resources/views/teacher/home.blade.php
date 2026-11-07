@extends('layouts.teacher')

@section('title', 'Inicio · MIMU')

@section('page')
<div class="ttl">
    <h1>{{ $teacherName ? 'Bienvenid@, '.$teacherName : 'Bienvenid@' }}</h1>
    <p>Resumen de hoy</p>
</div>

<div class="stats">
    <div class="st"><b>{{ $studentsCount }}</b><span>Estudiantes en mi grupo</span></div>
    <div class="st"><b>{{ $pendingStudents->count() }}</b><span>Pendientes de registrar hoy</span></div>
    <div class="st"><b>{{ $toGradeCount }}</b><span>Tareas por calificar</span></div>
</div>

<h3 class="q" style="margin-bottom:12px">Pendientes de hoy</h3>

<div class="tw">
    @if ($pendingStudents->isNotEmpty())
        <table>
            <tr><th>Estudiante</th><th>Estado</th><th>Acción</th></tr>
            @foreach ($pendingStudents as $student)
                <tr>
                    <td class="l">{{ $student->name }}</td>
                    <td><span class="pill no">Sin registrar</span></td>
                    <td><a class="act" href="{{ url('docente/seguimiento') }}">Registrar</a></td>
                </tr>
            @endforeach
        </table>
    @else
        <p class="mut" style="padding:16px">No hay estudiantes pendientes de registrar.</p>
    @endif
</div>
@endsection