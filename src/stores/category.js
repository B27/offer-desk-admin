import Axios from 'axios';
import { createCRUDStore } from './type/crud.js';

export const category = createCRUDStore('category', {
    create(store, modelName) {
        return async form => {
            try {
                const formData = new FormData(form);
                const res = await Axios.post(`/api/category`, formData);
                console.log(
                    'category formData custom create, response data',
                    res.data
                );
                store.update(arr => [...arr, res.data]);
                return true;
            } catch (err) {
                console.log(
                    `#${modelName.toUpperCase()} CUSTOM CREATION ERROR`
                );
                console.log(err);

                return false;
            }
        };
    }
});
