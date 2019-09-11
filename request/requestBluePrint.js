export default function requestBluePrint(jsonKeyData,APIRequest){
    return fetch(APIRequest,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: jsonKeyData,
    }).then((response) => response.json())
      .then((responseJson) => responseJson)
      .catch((error)=>console.log(error));
};
