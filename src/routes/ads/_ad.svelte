<script>
    import axios from 'axios';
    import {apiBaseUrl} from '../../config.js';
    import { createEventDispatcher } from 'svelte';
    
    export let ad;

    const dispatch = createEventDispatcher();

    let pad = ad;
    let disable = false;
    let error = false;
    let changeHidden = async () => {
        let status = !pad.hidden;
        disable = true;
        error = false;
        try{
            // console.log(ad.id);
            const ans = await axios.patch('/api/crud/ad',{
                id:ad.id,
                hidden:status
            });
            ad.hidden = status;
            dispatch('hide',ad.id);
        }catch(err){
            error = true;
        }
        disable = false;
    }

    $: ad, pad = {
        ...ad,
        createdAt:new Date(ad.createdAt),
        category:(ad.category || {}).name,
        region:(ad.region || {}).name,
        manufacturer:(ad.manufacturer || {}).name
    }
</script>

<div class="container">
    <div class="category">
        <span class="category_name" class:lose_data={!pad.category}>{pad.category || "Данные отсутствуют"}</span>
        <span class="grow"></span>
        <span class="date">{pad.createdAt.toLocaleDateString("ru-RU")}</span>
        
        <button {disable} class:deleted={pad.hidden} class:error={error} on:click={changeHidden}>
                &#x2716
        </button>
        
    </div>
    <div class="photos">
        {#each ad.photos as photo}
            <img width=128px height=128px src={`${apiBaseUrl}/api/images/${photo}`} alt="nope" on:error={e => e.target.style.display = "none"}>
        {/each}
    </div>
    <div class="tittle">{ad.title}</div>
    <div class="desc">{ad.description}</div>
    <div class="status">
        <span>
            <span class="rating">Рейтинг: {ad.rating}</span>
            <span class="price">Цена: {ad.price}р.</span>
        </span>
        <span class="grow"></span>
        <span>
            <span class="phone">{ad.phoneNumber}</span>
            <span class="manufacturer" class:lose_data={!pad.manufacturer}>"{pad.manufacturer || "Данные отсутствуют"}"</span>
        </span>
        <span class="region" class:lose_data={!pad.region}>{pad.region || "Данные отсутствуют"}</span>
    </div>
</div>

<style>
    .deleted{
        color: green;
    }
    .lose_data,.error{
        color: rgba(128,0,0);
    }
    img{
        margin-right:0.5em;
        object-fit: cover;
    }
    .grow{
        flex: 1
    }
    .status,.category{
        display: flex;
        justify-content: space-between;
    }
    .status > span:not(:last-child){
        margin-right: 0.5em;
    }
    .container{
        background-color: #d3d3d3;
        border: 1px solid gray;
        padding: 0.5em;
        margin-top: 0.5em;
    }
    button {
        font-size: 1.3em;
        margin-left: 2px;
        background: none;
        border: none;
        box-shadow: none;
        outline: none;
    }
    button:hover{
        background: #e7e7e7;
    }
</style>