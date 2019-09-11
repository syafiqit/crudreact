import requestBluePrint from './requestBluePrint';
import API from '../API';

export function request_create(name,age,address)
{

    const data = JSON.stringify({

        name    : name,
        age     : age,
        address : address,

    });

    return requestBluePrint(data ,API.request_create).then((res)=> res);
}
