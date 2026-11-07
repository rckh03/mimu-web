<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>@yield('title', 'MIMU · La escuela en tu bolsillo')</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&family=Fredoka:wght@400;500;600;700&family=Baloo+2:wght@600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/tokens.css') }}">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <link rel="stylesheet" href="{{ asset('css/responsive.css') }}">
    <link rel="stylesheet" href="{{ asset('css/laravel.css') }}">
</head>
<body>
    @yield('content')
</body>
</html>