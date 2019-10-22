<script context="module">
    import { producer } from '../../stores/producer.js';
    export async function preload({ params, query }) {
        console.log('load producer');
        return { producers: await producer.load() };
    }
</script>

<script>
    import Producer from './_producer.svelte';
    export let producers;

    producer.set(producers);
    $: console.log($producer);
</script>

<svelte:head>
    <title>Модерация</title>
</svelte:head>

<h4>Модерация пользователей</h4>
{#each $producer as cr, lid}
    <Producer bind:producer={cr} save={() => producer.sync(lid, cr)} />
{/each}
