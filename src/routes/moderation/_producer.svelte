<script>
    export let producer = {region:{}};
    let show = false;
</script>

<style>
    button{
        margin-left: 2px;
        background: none;
        border:none;
        box-shadow: none;
        outline:none;
        float:right;
    }
    button:hover{
        background:#e7e7e7 
    }
    .producer:hover{
        background:#e1e1e1;
    }

    .producer{
        width:100%;
        display: flex;
        flex-direction: column;
        margin-top: 2px;
        padding:2px;
        background-color: #d3d3d3;
        border: 1px solid gray;
        font-size:0.8em;
    }
    .info{
        display:inline-block;
        margin:2px;
        /* border:1px solid green; */
    }
    .full-desc{
        margin:2px;
        /* width:100%; */
        /* max-height:5em; */
        /* border:1px solid green; */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition:0.15s;
        
    }
    .show{
        white-space: normal;
    }
</style>

<div class="producer">
    <div style="flex-direction:row">
        <div class="info">{producer.name}</div>
        <div class="info">{producer.phoneNumber}</div>
        <div class="info">{producer.region.name}</div>
        <div class="info" style="float:right;">{producer.feedbackPhoneNumber}</div>
    </div>
    <div class={"full-desc" + (show?" show":"")} on:click={() => show = !show}>
        {producer.productionDescription}
    </div>
    <div style="flex-direction:row">
        {#if producer.isConfirmed}
            <button>&#x2714</button>
        {:else}
            <button>&#x2716</button>
        {/if}
    </div>
</div>