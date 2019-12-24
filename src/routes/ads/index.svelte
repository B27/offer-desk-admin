<script context="module">
    import axios from 'axios';
    export async function preload() {
        try{
            const ans = await axios.get('/api/crud/ad');
            return {ads:ans.data}
        }catch(err){}
        return {ads:[]}
    }
    import Ad from './_ad.svelte'
</script>
<script>
    export let ads;
</script>
{#each ads as ad}
    <Ad {ad}/>
{/each}