import { AxiosRequestConfig } from './typs'
import xhr from './xhr'
import { buildURL } from './helpers/url';
import { transformRequest, transformResponse } from './helpers/data'

import { proccessHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig) {
    processConfig(config)
    return xhr(config).then(res => {
        return transformResponseData(res)
    })
}

function processConfig(config: AxiosRequestConfig): void{
    config.url = transformUrl(config)
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
    const { url, params } = config
    return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any{
    return transformRequest(config.data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transformResponse(res.data)
    return res
}

function transformHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config
    return proccessHeaders(headers, data)
}

export default axios