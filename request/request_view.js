import requestBluePrint from './requestBluePrint';
import API from '../API';

export function request_view()
{
    return requestBluePrint('',API.request_view).then((res)=> console.log(res));
}
