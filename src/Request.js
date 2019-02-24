import axios from 'axios';
import config from './config'

export async function send_request(path,data,method) {
    const request = axios(`${config.API_ADDRESS}/${path}`, {
        method: method,
        data:data,
       headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
            },

      })
    return request
}
