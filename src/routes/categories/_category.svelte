<script>
    import { onMount } from 'svelte';
    export let onInputFocus;
    export let save;
    export let remove;
    export let onMountFocus = false;
    export let category;

    let fileInput;
    let nameInput;
    let pending;
    let saveStatus;
    let deleteError = false;
    let form;

    if (onMountFocus) {
        onMount(() => nameInput.focus());
    }

    const saveCategory = async () => {
        pending = true;
        saveStatus = await save(form);
        pending = false;
    };

    const removeCategory = async () => {
        pending = true;
        deleteError = !(await remove());
        pending = false;
    };

    let imageClick = () => {
        fileInput.click();
    };

    function showLocalImg(file) {
        let fr = new FileReader();
        console.log('selected file', file);
        
        fr.onload = (result) => {
            category.image = window.URL.createObjectURL(file);
            console.log('FileReader result', result);
        };

        fr.readAsArrayBuffer(file);
    }

    function readUrl({ target: input }) {
        if (input.files && input.files[0]) {
            showLocalImg(input.files[0]);
        }
    }

    function drag(args) {
        showLocalImg(args.dataTransfer.files[0]);
    }
</script>

<style>
    input {
        font-size: 1.3em;
        width: 100%;
        margin-left: 0.3em;
        display: inline-block;
        border: none;
        box-shadow: none;
        outline: none;
        transition: 0.15s;
        background-color: transparent;
    }
    input:focus {
        border-bottom: 1px solid gray;
    }

    button {
        font-size: 1.3em;
        margin-left: 2px;
        background: none;
        border: none;
        box-shadow: none;
        outline: none;
    }
    button:hover,
    img:hover {
        background: #e7e7e7;
    }
    .category:hover {
        background: #e1e1e1;
    }

    .category {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 2px;
        padding: 2px;
        background-color: #d3d3d3;
        border: 1px solid gray;
        font-size: 0.8em;
    }
    img {
        min-width: 64px;
        min-height: 64px;
        border: 1px dashed gray;
    }
    .err {
        color: red;
    }
    .succ {
        color: green;
    }
</style>

<form bind:this={form} enctype="multipart/form-data" on:submit|preventDefault={saveCategory}>
    <input
        type="file"
        name="image"
        style="display:none"
        accept="image/jpeg,image/png"
        bind:this={fileInput}
        on:change={readUrl} />
    <div class="category" on:drop|preventDefault={drag}>
        <img
            width="64px"
            height="64px"
            src={category.image}
            alt=""
            on:click={imageClick} />
        <input
            type="text"
            name="name"
            on:click={onInputFocus}
            bind:value={category.name}
            bind:this={nameInput} />
        <button
            class:err={saveStatus === false}
            type="submit"
            class:succ={saveStatus}
            on:click={saveCategory}
            disabled={pending}>
            &#x2714
        </button>
        <button
            class:err={deleteError}
            on:click={removeCategory}
            disabled={pending}>
            &#x2716
        </button>
    </div>
</form>
