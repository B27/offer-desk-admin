<script>
    import {onMount} from 'svelte';

    export let region;
    export let save;
    export let remove;
    export let onInputFocus;
    export let onMountFocus = false;

    let nameInput;
    let pending;
    let saveStatus;
    let deleteError = false;

    if(onMountFocus)onMount(()=>nameInput.focus());

    const saveRegion = async () => {
        pending = true;
        saveStatus = await save();
        pending = false;
    };
    const removeRegion = async () =>{
        pending = true;
        deleteError = !await remove();
        pending = false;
    };
    
</script>
<style>
    input{
        width:100%;
        margin-left:0.3em;
        display:inline-block;
        border:none;
        box-shadow: none;
        outline:none;
        background-color: transparent;
    }
    input:focus{
        border-bottom: 1px solid gray;
    }

    button{
        margin-left: 2px;
        background: none;
        border:none;
        box-shadow: none;
        outline:none;
    }
    button:hover{
        background:#e7e7e7 
    }

    .err{
        color:red;
    }
    .succ{
        color:green;
    }
    .region:hover{
        background:#e1e1e1;
    }

    .region{
        width:100%;
        display: flex;
        flex-direction: row;
        margin-top: 2px;
        padding:2px;
        background-color: #d3d3d3;
        border: 1px solid gray;
        font-size:0.8em;
    }
</style>

<form on:submit|preventDefault={saveRegion}>
    <div class="region">    
        <input 
            type="text" 
            class={"edit"}
            placeholder="Название региона"
            bind:value={region.name}
            bind:this={nameInput}
            on:focus = {onInputFocus}
        >
        <button 
            class:err={saveStatus === false}
            type="submit"
            class:succ={saveStatus}
            disabled={pending}
        >&#x2714</button>
        <button 
            class:err={deleteError} 
            on:click={removeRegion}
            disabled={pending}
        >&#x2716</button>
    </div>
</form>    