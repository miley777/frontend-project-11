import { state } from './store.js';
import { tryCatchValid } from './input.js'

export default (urlList, state) => {
    let i = 0;
    console.log('iiiiiiiii')
    //console.log(urlList.length !== 0)
    if (urlList.length !== 0){
        i++;
        console.log('aaaaa')
        //console.time(`count ${i}`)
        urlList.forEach(async (url) => {
            console.log('----------------------------------------------------------------------')
            const networkError = (error) => { return error ? { success: false, message: `errors.networkError` } : ''};
            const res = await tryCatchValid(url);
            const fail = networkError(res);
            console.log(res)
            if (res === undefined){
                state.form.response = { success: true, message: 'success' }
            } else {
                console.log('fail')
                state.form.errors = fail;
            }
        })
    }
        
}