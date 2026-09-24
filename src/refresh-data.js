//import { state } from './store.js';
import { tryCatchValid } from './app.js'

export default (urlList, state) => {
    if (urlList.length !== 0){
        urlList.forEach(async (url) => {
            const networkError = (error) => { return error ? { success: false, message: `errors.networkError` } : ''};
            const resp = await tryCatchValid(url);
            const fail = networkError(resp);
            if (resp === undefined){
                state.form.response = { success: true, message: 'success' }
                state.form.processState = 'success'
            } else {
                state.form.errors = fail;
                state.form.processState = 'error'
            }
        })
    }
}