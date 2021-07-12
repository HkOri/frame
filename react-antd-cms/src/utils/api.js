import instance from "./axios";

export function fetchMusic(params) {
    return instance({
        url: '/soso/fcgi-bin/client_search_cp',
        method: 'get',
        params,
    })
}