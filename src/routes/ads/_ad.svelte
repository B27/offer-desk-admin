<script>
    import {apiBaseUrl} from '../../config.js';
    export let ad;
    // ad = {
    //     photos: [
    //         "upload_959f181525451b7f8c05d8ef56ca6cdf",
    //         "upload_1f473bab2b8e4dfafa7874a984553fab",
    //         "upload_c41eaba0cf7ac0c35a536734103e04fb"
    //     ],
    //     rating: 5,
    //     rateCount: 4,
    //     title: "Редиска своя очень вкусная",
    //     description: "Мы выращиваем редиску в г Ангарске в теплицах",
    //     category: {
    //         name:"Надо допилить",
    //         id:"5dce99338c13611cb6ed53de",
    //     },
    //     region: {
    //         name: "Иркутск",
    //         createdAt: "2019-11-14T12:32:05.050Z",
    //         updatedAt: "2019-11-14T12:32:05.050Z",
    //         id: "5dcd4944b79ae34828e79040"
    //     },
    //     phoneNumber: "+7 964 111-55-50",
    //     price: "70",
    //     manufacturer: {
    //         name: "СНТ мичюринец",
    //         id: "5de0ca50067f5466ebdbe86d"
    //     },
    //     preview: "upload_959f181525451b7f8c05d8ef56ca6cdfthumb",
    //     createdAt: "2019-11-29T07:41:06.328Z",
    //     updatedAt: "2019-12-01T05:19:56.805Z",
    //     id: "5de0cb8e067f5466ebdbe86e"
    // };
    let pad = ad;
    $: ad, pad = {
        ...ad,
        category:(ad.category || {}).name,
        region:(ad.region || {}).name,
        manufacturer:(ad.manufacturer || {}).name
    }
</script>

<div class="container">
    <div class="category">
        <span class="category_name" class:lose_data={!pad.category}>{pad.category || "Данные отсутствуют"}</span>
        <span class="grow"></span>
        <button>
            &#x2714
        </button>
    </div>
    <div class="photos">
        {#each ad.photos as photo}
            <img width=128px height=128px src={`${apiBaseUrl}/api/images/${photo}`} alt="nope">
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
    .lose_data{
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