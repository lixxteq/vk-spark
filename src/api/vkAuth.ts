import {VK} from 'vk-io'
import {AudioAPI} from 'easyvk-audio'


function parseResponse(url : string) {
    var response = new URL(url)
    if (response.pathname.includes('blank')) {
        var sq = response.searchParams
        if (sq.has('access_token')) return {
            state: 'ok',
            payload: [sq.get('access_token'), sq.get('expires_in')]
        }
        return {
            state: 'error',
            payload:  sq.toString()
        }
    }
    return {
        state: 'await',
    }
}

async function implicitFlow() {
    var params: {[key: string] : string} = {
        client_id: process.env.REACT_APP_VK_CLIENT_ID,
        redirect_uri: process.env.REACT_APP_VK_REDIRECT_URI,
        display: process.env.REACT_APP_VK_DISPLAY,
        scope: process.env.REACT_APP_VK_SCOPE,
        response_type: process.env.REACT_APP_VK_RESPONSE_TYPE
    }

    var authLink = new URL('https://oauth.vk.com/authorize')
    for (let p in params) {
        authLink.searchParams.set(p, params[p])
    }

    // function locchghandle() {
    //     var current = parseResponse(window.location.href)
    //     if (current.state !== 'await') {
    //         window.removeEventListener('popstate', locchghandle)
    // }

    return await new Promise<any>((resolve, reject) => {
        window.location.assign(authLink);
        const polling = setInterval(() => {
            var current = parseResponse(window.location.href)
            if (current.state === 'ok') {
                console.log('ok', current)
                resolve(current)
                clearInterval(polling)
            }
            if (current.state === 'error') {
                console.log('error', current);
                reject(current)
                clearInterval(polling)
            }
        }, 1000)
    })
}

export default implicitFlow;