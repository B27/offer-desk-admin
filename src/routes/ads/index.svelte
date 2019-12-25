<script context="module">
    import axios from 'axios';
    export async function preload() {
        try{
            const ans = await axios.get('/api/crud/ad?__limit=10&__populate=region manufacturer category');
            return {ads:ans.data}
        }catch(err){}
        return {ads:[]}
    }
    import Ad from './_ad.svelte'
</script>
<script>
    export let ads;

    let offset = 0;
    let limit = 10;
    let end = ads.length < limit;
    async function reload(){
        const ans = await axios.get(`/api/crud/ad?__skip=${offset}&__limit=${limit}&__populate=region manufacturer category`)
        ads = ans.data;
        end = ads.length < limit;
    }
    async function next(){
        offset += limit;
        reload();
    }
    async function back(){
        offset -= limit;
        reload();
    }

    async function hide(e){
        ads = ads.filter(v => v.id != e.detail);
    }
</script>

<svelte:head>
    <title>Модерация объявлений</title>
</svelte:head>

<div class="pages">
    <span class="page" class:show={offset} on:click={back}>Назад</span>
    <span class="grow">WWW</span>
    <span class="page" class:show={!end} on:click={next}>Вперёд</span>
</div>

{#each ads as ad}
    <Ad {ad} on:hide={hide}/>
{/each}

<style>
    .pages{
        background-color: #d3d3d3;
        border: 1px solid gray;
        display: flex;
    }
    .grow{
        padding:0.25em;
        flex-grow: 1;
        color:transparent;
    }
    .page{
        padding:0.25em;
        cursor: pointer;
        display: none;
    }
    .show{
        display: block;
    }
    .page:hover{
        background: #e7e7e746;
    }
</style>