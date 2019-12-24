<script context="module">
    import { manufacturer } from '../../stores/manufacturer.js';
    import { region } from '../../stores/region.js'
    export async function preload() {
        console.log('load manufacturer');
        const manufacturers = await manufacturer.load()
        const regions = await region.load();
        return { manufacturers, regions };
    }
</script>

<script>
    import { get } from 'svelte/store';
    import Manufacturer from './_manufacturer.svelte';
    export let manufacturers;
    export let regions;

    region.set(regions)
    manufacturer.set(manufacturers);

    function regionName(regionId) {
       const findedRegion = get(region).find(region => region.id === regionId);
       return findedRegion && findedRegion.name;
    }
</script>

<svelte:head>
    <title>Модерация</title>
</svelte:head>

<h4>Модерация пользователей</h4>
{#each $manufacturer as man, lid}
    <Manufacturer bind:manufacturer={man} regionName={regionName(man.region)} save={() => manufacturer.sync(man.id, man)} />
{/each}
