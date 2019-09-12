import requestBluePrint from './requestBluePrint';
import API from '../API';

export function request_read(id)
{

    const data = JSON.stringify({

        id      : id,

    });

    return requestBluePrint(data, API.request_read).then((res)=> res);
}
