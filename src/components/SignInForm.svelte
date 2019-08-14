<script>
    import axios from 'axios'
    import {user} from '../stores/user.js'
    import * as sapper from '@sapper/app'
    import { onMount } from 'svelte';
    let login = "";
    let password = "";

    export let signin;
    export let successRedirect;

    let loginPromise;
    
    async function _signin(){
        loginPromise = signin(login,password);
        if(await loginPromise)sapper.goto(successRedirect);
    }
</script>

<style>
    .auth{
        position: absolute;
        text-align: center;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .item{
        position: relative;
    }
    input{
        margin:0.5em;
        display:inline-block;
        height:2em;
        border:0px;
        border-bottom:1px solid black;
        outline:none;
    }
    label{
        position: absolute;
        pointer-events: none;
        top:0.4em;
        left:0.5em;
        transition:0.3s;
        color:#3f3f3f;
        /* float:left; */
    }
    input:focus~label,input:not(:focus):valid~label{
        color:black;
        font-size:0.8em;
        top:-0.3em;
    }
</style>


<div class="auth">
<h3><b>Выполните вход</b></h3>
{#await loginPromise then value}
{#if value === false}
    <div>
        Не удалось войти повторите попытку.
    </div>
{/if}
{/await}
<form on:submit|preventDefault={_signin}>
    <div class="item">
        <input id="login" bind:value={login} type="text" required>
        <label for="login">Логин</label>
    </div>

    <div class="item">
        <input id="pass" bind:value={password} type="password" required>
        <label for="pass">Пароль</label>
    </div>
    <button type="submit">Войти</button><br>
</form>
</div>
    

