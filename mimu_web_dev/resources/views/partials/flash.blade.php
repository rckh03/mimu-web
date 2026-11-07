@if (session('status'))
    <p class="msg" role="status">{{ session('status') }}</p>
@endif

@if ($errors->any())
    <p class="msg e" role="alert">{{ $errors->first() }}</p>
@endif