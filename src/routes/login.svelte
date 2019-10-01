<script>
    import {user} from '../stores/user.js'
    import SignInForm from '../components/SignInForm.svelte'
</script>

<svelte:head>
    <title>
        Вход
    </title>
</svelte:head>

<SignInForm signin={(u,l) => user.signin(u,l)} successRedirect="moderation"/>    