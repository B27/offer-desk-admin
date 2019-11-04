import Axios from 'axios';
import { writable } from 'svelte/store';

export function createCRUDStore(
    modelName,
    customFn = { create: null, sync: null, update: null, remove: null }
) {
    const store = writable([]);

    const create = customFn.create
        ? customFn.create(store, modelName)
        : async value => {
              try {
                  const res = await Axios.post(`/api/crud/${modelName}`, value);
                  console.log(res.data);
                  store.update(arr => [...arr, res.data]);
                  return true;
              } catch (err) {
                  console.log(`#${modelName.toUpperCase()} CREATION ERROR`);
                  console.log(err);

                  return false;
              }
          };

    const sync = customFn.sync
        ? customFn.sync(store, modelName)
        : async (id, value) => {
              try {
                  const res = await Axios.patch(
                      `/api/crud/${modelName}`,
                      value,
                      {
                          params: {
                              id
                          }
                      }
                  );
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

    const remove = customFn.remove
        ? customFn.remove(store, modelName)
        : async id => {
              try {
                  await Axios.delete(`/api/crud/${modelName}`, {
                      params: {
                          id
                      }
                  });
                  store.update(arr => arr.filter(v => id !== v.id));
                  return true;
              } catch (err) {
                  console.log(`#${modelName.toUpperCase()} REMOVE ERROR`);
                  console.log(err);

                  return false;
              }
          };

    const load = customFn.load
        ? customFn.load(store, modelName)
        : async (skip = 0, limit = 100) => {
              try {
                  const res = await Axios.get(`/api/crud/${modelName}`, {
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

    return {
        subscribe: store.subscribe,
        set: store.set,
        load,
        sync,
        remove,
        create
    };
}
