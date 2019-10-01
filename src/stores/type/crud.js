import Axios from 'axios';
import { writable } from 'svelte/store';

export function createCRUDStore(modelName){
    const store = writable([]);
    
    const create = async (value) => {
        try{
            const res = await Axios.post(`/api/crud/${modelName}`,value);
            console.log(res.data);
            store.update(arr => [...arr,res.data]);
            return true;
        }catch(err){
            console.log(`#${modelName.toUpperCase()} CREATION ERROR`);
            console.log(err);

            return false;
        }
    }
    const sync = async (local_id,value) => {
        try{
            const res = await Axios.patch(`/api/crud/${modelName}`,value);
            store.update(arr => {
                arr[local_id] = res.data;
                return arr;
            });
            return true;
        }catch(err){
            console.log(`#${modelName.toUpperCase()} SYNC ERROR`);
            console.log(err);

            return false;
        }
    }
    const remove = async (_id) => {
        try{
            await Axios.delete(`/api/crud/${modelName}?_id=${_id}`);
            store.update(arr => arr.filter(v => _id !== v.id));
            return true;
        }catch(err){
            console.log(`#${modelName.toUpperCase()} REMOVE ERROR`);
            console.log(err);

            return false;
        }
    }

    async function load(skip = 0,limit = 100){
        try{
            const res = await Axios.get(
                `/api/crud/${modelName}?__limit=${limit}&__skip=${skip}`
            );
            store.set(res.data);
            return res.data;
        }catch(err){
            console.log(`#${modelName.toUpperCase()} LOAD ERROR`);
            console.log(err);
            
            return false;
        }
    }
    return {
        subscribe:store.subscribe,
        set:store.set,
        load,
        sync,
        remove,
        create
    }
}