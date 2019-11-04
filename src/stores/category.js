import Axios from 'axios';
import { createCRUDStore } from './type/crud.js';
import { apiBaseUrl } from '../config';

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

                const newRes = {
                    ...res.data,
                    image: `${apiBaseUrl}/api/images/${res.data.image}`
                };
                store.update(arr => [...arr, newRes]);
                return true;
            } catch (err) {
                console.log(
                    `#${modelName.toUpperCase()} CUSTOM CREATION ERROR`
                );
                console.log(err);

                return false;
            }
        };
    },

    load(store, modelName) {
        return async (skip = 0, limit = 100) => {
            try {
                const res = await Axios.get(`/api/crud/${modelName}`, {
                    params: {
                        __limit: limit,
                        __skip: skip
                    }
                });
                const newRes = res.data.map(category => ({
                    ...category,
                    image: `${apiBaseUrl}/api/images/${category.image}`
                }));
                store.set(newRes);
                return newRes;
            } catch (err) {
                console.log(`#${modelName.toUpperCase()} LOAD ERROR`);
                console.log(err);

                return false;
            }
        };
    },

    sync(store, modelName) {
        return async (id, value) => {
            console.log('sync category called');
            try {
                const res = await Axios.patch(`/api/crud/${modelName}`, value, {
                    params: { id }
                });
                store.update(arr => {
                    arr[id] = res.data;
                    return arr;
                });
                return true;
            } catch (err) {
                console.log(`#${modelName.toUpperCase()} SYNC ERROR`);
                console.log(err);

                return false;
            }
        };
    }
});
