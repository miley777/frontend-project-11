import { state } from './store.js';
import { tryCatchValid } from './input.js'

export default (urlList, state) => {
    let i = 0;
    console.log('iiiiii')
    if (urlList.length !== 0){
        i++;
        console.log(`count ${i}`)
        urlList.forEach((url) => {
            const res = tryCatchValid(url);
            if (res !== undefined) {
                state.form.response = res;
            }
        })
    }
        
}