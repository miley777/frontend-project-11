import { proxy, useSnapshot } from 'valtio';

export default (data) => {
    //console.log(typeof data);
    const toDom = new DOMParser.parseFromString(data, "text/html");
    console.log(toDom.contentType);
}