import requestBluePrint from './requestBluePrint';
import API from '../API';

export function request_delete(id)
{

    const data = JSON.stringify({

        id      : id,

    });

    return requestBluePrint(data, API.request_delete).then((res)=> res);
}
