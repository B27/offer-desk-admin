<script>
    import Producer from './_producer.svelte'
    function changeConfirm(id){
        return ()=>{};
    }
</script>
<svelte:head>
    <title>Модерация</title>
</svelte:head>

<h4>Модерация пользователей</h4>
<Producer producer={{name:"prod",region:{name:"buriatiy"}}} confirm={() => {}}/>
<Producer/>
<Producer/>