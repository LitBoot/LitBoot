import axios from "axios";
import {baseURL} from "../Config.js"

export function register(username, email, password) {
    return new Promise((res)=>{
        let payloadData = {
            username : username,
            email: email,
            password: password
        }
        axios({
            method: "POST",
            url: baseURL + "/api/user/register",
            data: payloadData
        }).then((resp)=>{
            console.log(resp)
            res(resp)
        }).catch((err)=>{
            console.log(err)
            res(err)
        })
    })
}