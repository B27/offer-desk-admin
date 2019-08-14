import Axios from "axios";
import { writable } from "svelte/store";
import { apiBaseUrl } from "../config.js";
Axios.defaults.headers = { "Content-Type": "application/json" };
Axios.defaults.baseURL = apiBaseUrl;

function createUserStorage() {
    const store = writable({});
    const refresh = async () => {
        const token = localStorage.getItem("authToken");
        if(!token)return false;
        Axios.defaults.headers = { Authorization: `Bearer ${token }`};
        try{
            const ans = await Axios.get("/api/refreshToken");
            
            if(!ans.data.isAdmin){
                localStorage.setItem("authToken","");
                return false;
            }

            localStorage.setItem("authToken", ans.data.token);

            Axios.defaults.headers = { Authorization: `Bearer ${ans.data.token }`};
            store.set(ans.data);
        }catch(err){
            return false;
        }
        return true;
    };
    const signin = async (login, password) => {
        try {
            const ans = await Axios.post("/api/adminSignIn", { login, password });
            localStorage.setItem("authToken", ans.data.token);
            Axios.defaults.headers = { Authorization: `Bearer ${ans.data.token }`};
            // console.log(ans.data);
            store.set(ans.data);
            return true;
        } catch (err) {
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        Axios.defaults.headers = { Authorization: ""};
        store.set({});
        location.reload();
    }

    return {
        subscribe: store.subscribe,
        signin,
        refresh,
        logout
    };
}
export const user = createUserStorage();
