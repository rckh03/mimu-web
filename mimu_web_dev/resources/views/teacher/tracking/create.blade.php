@extends('layouts.teacher')

@section('title', 'Seguimiento diario · MIMU')

@section('page')
<div class="ttl">
    <h1>Seguimiento diario</h1>
    <p>{{ $groupName ? 'Grupo '.$groupName.' · ' : '' }}{{ $todayLabel }}</p>
</div>

@if ($students->isEmpty())
    <div class="tw">
        <p class="mut" style="padding:16px">Todavía no hay estudiantes en tu grupo.</p>
    </div>
@else
    <form method="POST" action="{{ route('teacher.tracking.store') }}">
        @csrf

        <div class="tw">
            <table style="min-width:760px">
                <tr><th>Estudiante</th><th>Asistencia</th><th>Alimentación</th><th>Ánimo</th></tr>

                @foreach ($students as $student)
                    <tr>
                        <td class="l">{{ $student->name }} {{ $student->last_name }}</td>

                        <td>
                            <div class="sg">
                                @foreach ($attendanceOptions as $value => $label)
                                    <label>
                                        <input type="radio" name="attendance[{{ $student->id }}]" value="{{ $value }}"
                                               @checked(($attendance[$student->id]->status ?? 'PRESENT') === $value)>
                                        <span>{{ $label }}</span>
                                    </label>
                                @endforeach
                            </div>
                        </td>

                        <td>
                            <div class="sg">
                                @foreach ($mealOptions as $value => $label)
                                    <label>
                                        <input type="radio" name="meal[{{ $student->id }}]" value="{{ $value }}"
                                               @checked(($tracking[$student->id]->meal_status ?? 'GOOD') === $value)>
                                        <span>{{ $label }}</span>
                                    </label>
                                @endforeach
                            </div>
                        </td>

                        <td class="mood">
                            @foreach ($moodOptions as $value => $mood)
                                <label>
                                    <input type="radio" name="mood[{{ $student->id }}]" value="{{ $value }}"
                                           aria-label="{{ $mood['label'] }}"
                                           @checked(($tracking[$student->id]->mood_status ?? 'HAPPY') === $value)>
                                    <span>{{ $mood['emoji'] }}</span>
                                </label>
                            @endforeach
                        </td>
                    </tr>
                @endforeach
            </table>
        </div>

        <p style="display:flex;gap:12px;flex-wrap:wrap;margin-top:18px">
            <button class="btn" type="submit">Guardar todo</button>
            <button class="btn alt" type="button" id="markAllPresent">Marcar a todo el grupo como presente</button>
        </p>

        @include('partials.flash')
    </form>

    <script>
        document.getElementById('markAllPresent').addEventListener('click', function () {
            document.querySelectorAll('input[type=radio][value=PRESENT]').forEach(function (radio) {
                radio.checked = true;
            });
        });
    </script>
@endif
@endsection