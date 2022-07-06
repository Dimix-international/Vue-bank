import axios from "axios";
const KEY = process.env.VUE_APP_FB_KEY;

export const instance = axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/`,
})

export const authApi =  {
   async login (payload) {
       try {
           const { data } = await instance.post(`v1/accounts:signInWithPassword?key=${KEY}`,
               {...payload, returnSecureToken: true}
           );
           return data;
       } catch (e) {
           const {response: {data : {error : {message}}}} = e;
           return message;
       }
    }
}