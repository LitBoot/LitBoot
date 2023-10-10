import axios from 'axios'

export async function getRandomWallpaper(resolutionCode) {
    return new Promise((res)=>{
        console.log("Sending request")
        axios({
            method: 'GET',
            url: 'https://bing.biturl.top/?resolution=' + 1366 + '&format=json&index=0&mkt=zh-CN',
        }).then((resp)=>{
            console.log(resp)
            res(resp)
        }).catch((err)=>{
            console.log(err)
            res(err)
        })
    })
}