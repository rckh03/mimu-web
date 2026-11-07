<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\View\View;

class HomeController extends Controller
{
    //empezando para la parte de los profesores
     public function index(): View
    {
        // Por ahora vacíos; luego vendrán de la base de datos.
        return view('teacher.home', [
            'teacherName'     => null,
            'studentsCount'   => 0,
            'pendingStudents' => collect(),
            'toGradeCount'    => 0,
        ]);
    }
}
