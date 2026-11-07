<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\View\View;

class GroupController extends Controller
{
    //
      public function index(): View
    {
        // Por ahora vacíos; luego vendrán de la base de datos.
        return view('teacher.group.index', [
            'groupName'     => null,
            'gradeName'     => null,
            'students'      => collect(),
            'registeredIds' => collect(), // ids de estudiantes ya registrados hoy
        ]);
    }
}
