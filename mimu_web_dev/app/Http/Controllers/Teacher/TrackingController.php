<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    //
     /** Muestra el formulario del seguimiento de hoy. */
    public function create(): View
    {
        return view('teacher.tracking.create', [
            'groupName'  => null,
            'todayLabel' => ucfirst(now()->locale('es')->translatedFormat('l, j \d\e F')),
            'students'   => collect(),
            'attendance' => collect(), // registros de hoy, por id de estudiante
            'tracking'   => collect(), // comida y ánimo de hoy, por id de estudiante

            // código de la base que se hizo con el js de plantilla texto que ve el docente
            'attendanceOptions' => ['PRESENT' => 'Presente', 'LATE' => 'Tarde', 'ABSENT' => 'Ausente'],
            'mealOptions'       => ['GOOD' => 'Bien', 'FAIR' => 'Regular', 'DID_NOT_EAT' => 'No comió'],
            'moodOptions'       => [
                'HAPPY'    => ['emoji' => '😀', 'label' => 'Feliz'],
                'CHEERFUL' => ['emoji' => '🙂', 'label' => 'Contento'],
                'SAD'      => ['emoji' => '😟', 'label' => 'Triste'],
                'ANGRY'    => ['emoji' => '😠', 'label' => 'Enojado'],
            ],
        ]);
    }

    /** TEMPORAL: todavía no guarda nada. */
    public function store(): RedirectResponse
    {
        // TODO: validar y guardar en attendance_records y daily_tracking
        return redirect()->route('teacher.tracking.create');
    }

}
