<script context="module">
    import { region } from '../../stores/region.js';
    export async function preload({ params, query }) {
        console.log('load');
        return { regions: await region.load() };
    }
</script>

<script>
    export let component;
    import Region from './_region.svelte';

    export let regions;

    let newRegion = undefined;
    const newEdit = () => (newRegion = { name: '' });
    const newReset = () => (newRegion = undefined);
    region.set(regions);
</script>

<style>
    .new_pane {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 2px;
        padding: 2px;
        background-color: #d3d3d3;
        border: 1px solid gray;
        font-size: 0.8em;
    }
</style>

<svelte:head>
    <title>Управление регионами</title>
</svelte:head>
<h4>Управление регионами</h4>
{#each $region as cr, lid}
    <Region
        bind:region={cr}
        save={() => region.sync(lid, cr)}
        remove={() => region.remove(cr._id)}
        onInputFocus={newReset} />
{/each}
{#if newRegion}
    <Region
        bind:region={newRegion}
        save={async () => {
            const s = await region.create(newRegion);
            newReset();
            return s;
        }}
        remove={newReset}
        onMountFocus />
{:else}
    <div class="new_pane" on:click={newEdit}>
        <b>+</b>
        Создать новый регион
    </div>
{/if}
