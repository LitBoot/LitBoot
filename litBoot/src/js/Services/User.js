import {} from "../requests/user.js"
import {message} from "ant-design-vue";
import {localStorageKeyNames} from "../Config.js"

let emailPattern = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/

export function isLoggedIn() {
    if (localStorage.getItem(localStorageKeyNames.user.token) === null) {
        return false
    }
    else {
        return true
    }
}

export function handleRegister(username, email, password) {
    return new Promise((res)=>{
        // check whether input is valid
        if (username.length <= 0) {
            message.warn("你需要提供有效的用户名！")
            res({status: false})
        }
        if (password.length <= 8) {
            message.warn("密码不可以小于8位！")
            res({status: false})
        }
        if (emailPattern.test(email) === false) {
            message.warn("请输入合法的邮箱地址")
            res({status: false})
        }
    })
}