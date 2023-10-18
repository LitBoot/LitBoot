import axios from 'axios'

export const supportedRegions = {
    China: "zh-CN",
    Japan: "ja-JP",
    Australia: "en-AU",
    British: "en-GB",
    German: "de-DE",
    Canada: "en-CA",
    Random: "random"
}

export const supportedResolutions = {
    Fast: "1366",
    Normal: "1920",
    FourK: "3840"
}

export const defaultValues = {
    resolutionKeyName: "wallpaper:resolution",
    defaultResolution: supportedResolutions.Fast,
    regionKeyName: "wallpaper:region",
    defaultRegion: supportedRegions.China
}

export async function getWallpaperRequestsInfo(key) {
    return new Promise((res)=>{
        if (key === "wallpaper:resolution") {
            if (localStorage.getItem(defaultValues.resolutionKeyName) === null) {
                // set as the default value
                localStorage.setItem(defaultValues.resolutionKeyName, defaultValues.defaultResolution)
            }
            res(localStorage.getItem(defaultValues.resolutionKeyName))
        }
        else if (key === "wallpaper:region") {
            if (localStorage.getItem(defaultValues.regionKeyName) === null) {
                // set as the default value
                localStorage.setItem(defaultValues.regionKeyName, defaultValues.defaultRegion)
            }
            res(localStorage.getItem(defaultValues.regionKeyName))
        }
        else {
            res(undefined)
        }
    })
}

export async function setWallpaperRequestsInfo(key, value) {
    return new Promise((res)=>{
        if (localStorage.getItem(key) === null) {
            // means the target element does not exist, prevent user to allocate the localStorage
            res(false)
        }
        else {
            // set the item
            localStorage.setItem(key, value)
        }
    })
}

export async function getRandomWallpaper(resolutionCode) {
    return new Promise(async (res)=>{
        let currentResolution = await getWallpaperRequestsInfo(defaultValues.resolutionKeyName)
        console.log(currentResolution)
        let currentRegion = await getWallpaperRequestsInfo(defaultValues.regionKeyName)
        console.log("Sending request")
        axios({
            method: 'GET',
            url: 'https://bing.biturl.top/?resolution=' + currentResolution + '&format=json&index=0&mkt=' + currentRegion,
        }).then((resp)=>{
            console.log(resp)
            res(resp)
        }).catch((err)=>{
            console.log(err)
            res(err)
        })
    })
}