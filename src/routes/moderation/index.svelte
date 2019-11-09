<script context="module">
    import { manufacturer } from '../../stores/manufacturer.js';
    export async function preload() {
        console.log('load manufacturer');
        return { manufacturers: await manufacturer.load() };
    }
</script>

<script>
    import Manufacturer from './_manufacturer.svelte';
    export let manufacturers;

    manufacturer.set(manufacturers);
    $: console.log($manufacturer);
</script>

<svelte:head>
    <title>Модерация</title>
</svelte:head>

<h4>Модерация пользователей</h4>
{#each $manufacturer as cr, lid}
    <Manufacturer bind:manufacturer={cr} save={() => manufacturer.sync(cr.id, cr)} />
{/each}
