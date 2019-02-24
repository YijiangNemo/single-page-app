import axios from 'axios';
import config from './config'

export async function send_request(path,data,method,header) {
    function UserException(message) {
           this.message = message;
           this.name = "UserException";
        }
    const request = axios(`${config.API_ADDRESS}/${path}`, {
        method: method,
        data:data,
       headers: header,

      }).then((res)=>{
          return res
    }).catch((error)=>{

        throw new UserException(error.response.data.message);
    })
    return request
}
