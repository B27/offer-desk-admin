import { createCRUDStore } from './type/crud.js';
import Axios from 'axios'
export const manufacturer = createCRUDStore('manufacturer',{
    load(store,modelName){
        return async (skip = 0, limit = 100) => {
            try {
                const res = await Axios.get(`/api/crud/${modelName}?isSmsConfirmed=true&__sort=-createdAt`, {
                    params: {
                        __limit: limit,
                        __skip: skip
                    }
                });
                store.set(res.data);
                return res.data;
            } catch (err) {
                console.log(`#${modelName.toUpperCase()} LOAD ERROR`);
                console.log(err);

                return false;
            }
        };
    }
});

