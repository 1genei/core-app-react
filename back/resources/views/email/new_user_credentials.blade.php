@component('mail::message')
# Bonjour {{$user->contact->prenom}} {{$user->contact->nom}}

Félicitation vous pouvez maintenant vous connecter sur CORE APP : <a href="{{config('app.url')}}">Cliquez ici</a> pour vous connecter<br>
<br>
@component('mail::panel')
<strong> Login :</strong>  {{$user->email}} <br>
<strong> Mot de passe : </strong> {{$password}} <br>
@endcomponent

@component('mail::button', ['url' => config('app.url') ])
Se connecter
@endcomponent

Bien cordialement,<br>
L'Équipe CORE APP. 
<br>
<br>
<br>
<img src="{{asset('images/logo.jpg')}}" width="130px" height="65px" alt="logo">

@endcomponent