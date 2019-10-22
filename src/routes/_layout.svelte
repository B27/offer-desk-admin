<script>
    import Nav from '../components/Nav.svelte';
    import { user } from '../stores/user.js';
    import { onMount } from 'svelte';
    import * as sapper from '@sapper/app';

    export let segment;

    let oldSession;
    onMount(async () => {
        if (segment === 'login') {
            return;
        }
        oldSession = user.refresh();
        if (!(await oldSession)) {
            return sapper.goto('/login');
        }
    });
</script>

<style>
    main {
        position: relative;
        background-color: white;
        padding: 1em;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>

{#if segment === 'login'}
    <slot />
{:else}
    <Nav {segment} />
    <main>
        <slot />
    </main>
{/if}
