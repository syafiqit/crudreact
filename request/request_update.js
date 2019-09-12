import requestBluePrint from './requestBluePrint';
import API from '../API';

export function request_update(id,name,age,address)
{

    const data = JSON.stringify({

        id      : id,
        name    : name,
        age     : age,
        address : address,

    });

    return requestBluePrint(data, API.request_update).then((res)=> res);
}
