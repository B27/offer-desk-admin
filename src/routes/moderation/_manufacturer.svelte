<script>
    export let manufacturer = {};
    export let regionName = 'Регион производителя удалён из БД';
    export let save;

    let show = false;
    let saveStatus;
    let pending;

    const saveManufacturer = cf => async () => {
        manufacturer.isConfirmed = cf;
        pending = true;
        saveStatus = await save();
        if (!saveStatus) {
            manufacturer.isConfirmed = !cf;
        }
        pending = false;
    };
</script>

<style>
    button {
        margin-left: 2px;
        padding: 12px;
        padding-top: 8px;
        padding-bottom: 8px;
        font-size: 18px;
        background: none;
        border: none;
        box-shadow: none;
        outline: none;
        float: right;
    }
    button:hover {
        background: #e7e7e7;
    }
    .manufacturer:hover {
        background: #e1e1e1;
    }

    .manufacturer {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 2px;
        padding: 2px;
        background-color: #d3d3d3;
        border: 1px solid gray;
        font-size: 0.8em;
    }
    .info {
        display: inline-block;
        margin: 2px;
    }
    .full-desc {
        margin: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: 0.15s;
    }
    .show {
        white-space: normal;
    }
    .err {
        color: red;
    }
</style>

<div class="manufacturer">
    <div style="flex-direction:row">
        <div class="info">{manufacturer.name}</div>
        <!-- <div class="info">{manufacturer.phoneNumber}</div> -->
        <div class="info">
            {`Регион: ${regionName}`}
        </div>
        <div class="info" style="float:right;">
            {`Контактный номер: ${manufacturer.feedbackPhoneNumber}`}
        </div>
    </div>
    <div
        class={'full-desc' + (show ? ' show' : '')}
        on:click={() => (show = !show)}>
        {manufacturer.productionDescription}
    </div>
    <div style="flex-direction:row">
        {#if manufacturer.isConfirmed}
            <button
                on:click={saveManufacturer(false)}
                disabled={pending}
                class:err={saveStatus === false}>
                &#x2716
            </button>
        {:else}
            <button
                on:click={saveManufacturer(true)}
                disabled={pending}
                class:err={saveStatus === false}>
                &#x2714
            </button>
        {/if}
    </div>
</div>
