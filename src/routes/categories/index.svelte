<script context="module">
  import { category } from "../../stores/category.js";
  export async function preload({ params, query }) {
    console.log("load category");
    return { categoryArr: await category.load() };
  }
</script>

<script>
  import Category from "./_category.svelte";
  export let categoryArr;

  let newCategory = undefined;
  const newEdit = () => (newCategory = { image: "", name: "" });
  const newReset = () => (newCategory = undefined);

  category.set(categoryArr);
</script>

<style>
  .new_pane {
    width: 100%;
    margin-top: 2px;
    padding: 2px;
    background-color: #d3d3d3;
    border: 1px solid gray;
    font-size: 1.3em;
    vertical-align: middle;
  }
  .big {
    display: inline-block;
    min-width: 64px;
    min-height: 64px;
    border: 1px dashed gray;
    font-size: 2em;
    text-align: center;
    vertical-align: middle;
  }
</style>

<svelte:head>
  <title>Управление категориями</title>
</svelte:head>
<h4>Управление категориями</h4>
{#each $category as cr, lid}
  <Category
    bind:category={cr}
    save={() => category.sync(lid, cr)}
    remove={() => category.remove(cr._id)}
    onInputFocus={newReset} />
{/each}
{#if newCategory}
  <Category
    bind:category={newCategory}
    save={async () => {
      const s = await category.create(newCategory);
      if (s) newReset();
      return s;
    }}
    remove={newReset}
    onMountFocus />
{:else}
  <div class="new_pane" on:click={newEdit}>
    <div class="big">+</div>
    Создать новый регион
  </div>
{/if}
