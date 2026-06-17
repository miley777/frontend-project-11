import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import resources from './locales/index.js';
import _ from 'lodash';
import initView from './view.js';
import parsingData from './parsing-data.js';
import { proxy, snapshot } from 'valtio';
import { state } from './store.js';
import refreshData from './refresh-data.js';

yup.setLocale({
    mixed: {
        required: () => 'errors.validation.required',
        notOneOf: () => 'errors.unique',
    },
    string: {
        url: () => 'errors.validation.url',
        matches: () => 'errors.validation.matches',
    }
})

export let urlList = [];

const createSchema = (existingUrls) => {
    return yup.object({
        link: yup.string().url().trim().lowercase().notOneOf(existingUrls).matches(/rss/).required(),
    });
}



const validate = async (fields, existingUrls) => {

    const currentSchema = createSchema(existingUrls);

    //console.log(existingUrls);
    try {
        await currentSchema.validate(fields, { abortEarly: false });
        return { success: true, message: 'success' };
    }
    catch (err) {
   
    //const messages = {}
    const messages = [];
    //let messages = '';
    console.log(err);
    //err.inner.forEach((err) => {
    //    const pathKey = err.path;
    //    messages[`${pathKey}`] = err.message;
        
        //console.log(messages);
    //})

    err.inner.forEach((err) => {
        messages.push(err.message)
    })

    //const messages = err.inner.message;
    console.log(messages);
    return { success: false, message: messages };

    }
}

export const tryCatchValid = async (link) => {
    try {
        //console.log('try')        
        return await fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
            .then(resp => {
                if (resp.ok) {
                    console.log(resp.ok)
                    if (!urlList.includes(link)) {
                        urlList.push(link);
                    }
                console.log(urlList)
                return resp.json() 
                } else {
                    throw new Error(`Error`)
                }
                
            }).then (data => {
                const posts = data.contents
                parsingData(state, posts);
            }).catch( error => {
                console.log(error.message);
                return error.message;
            })
    } catch (error) {
        console.log(error.message);
        return error.message;    
    }
};



export default async () => {
    setTimeout(refreshData, 5000, urlList, state);
    
    const elements = {
        formVal: document.querySelector('form'),
        inputVal: document.querySelector('input.form-control'),
    }
    

    const i18nInstance = i18next.createInstance();

    await i18nInstance.init({
        lng: state.ui.lng,
        debug: false,
        resources: resources,
    })

    //const watchState = initView(state, elements, i18nInstance);
    
    initView(elements, i18nInstance);
    //const snap = snapshot(state);

    

    elements.formVal.addEventListener('submit', async (e) => {
        e.preventDefault();
        //watchState.form.processState = 'sending';
        //console.log(watchState.form.processState);
        const formData = new FormData(e.target);
        const urlValue = Object.fromEntries(formData);
        //state.form.field.link = urlValue.url.trim();
        //linkList = [];
        const trimmedLink = urlValue.url.trim();
        //watchState.form.urlList.forEach(({link}) => liskList.push(link)))state.form.field
        const errors = await validate({ link: trimmedLink }, urlList);//linkList
        //console.log(urlList);
        
        const isValidLink = errors.success;
        console.log(isValidLink)
        //watchState.form.error = errors;
        
        if (isValidLink) {
           // console.log("isValidLink: ", isValidLink)
           // message: { link: `errors.networkError` }} : ''};
            const networkError = (error) => { return error ? { success: false, message: `errors.networkError`, } : ''};
            const requestError = await tryCatchValid(trimmedLink);
            //console.log(requestError);
            const fail = networkError(requestError);
            //console.log(networkError(requestError)) 
            //refreshData(urlList);

            if (requestError !== undefined){
                state.form.errors = fail;
            } 
            state.form.response = errors;

            //state.form.response = requestError === undefined ? errors : fail
            
        } 
        else {
            state.form.errors = errors;
        }
        
    setTimeout(refreshData, 5000, urlList, state);
        
    });
   
};
