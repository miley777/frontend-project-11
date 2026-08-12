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
        link: yup.string().url().trim().lowercase().notOneOf(existingUrls).required(),
    });
}
//.matches(/rss/)
const isUrl = (text) => /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(text);



const validate = async (fields, existingUrls) => {

    const currentSchema = createSchema(existingUrls);

    try {
        await currentSchema.validate(fields, { abortEarly: false });
        return { success: true, message: 'success' };
    }
    catch (err) {
        const messages = [];
        err.inner.forEach((err) => {
            console.log(err.message)
            messages.push(err.message)
        })
        return { success: false, message: messages };
    }
}


export const tryCatchValid = async (link) => {
    setTimeout(refreshData, 5000, urlList, state);
    try {       
        return await fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
            .then(resp => {
                if (resp.ok) {
                    if (!urlList.includes(link)) {
                        urlList.push(link);
                    }
                    return resp.json() 
                } else {
                    throw new Error(`Error`)
                }
                
            }).then (data => {
                const postsAndFeeds = data.contents
                parsingData(state, postsAndFeeds);
            }).catch( error => {
                return error.message;
            })
    } catch (error) {
        return error.message;    
    }
};


export default async () => {
    
    setTimeout(refreshData, 5000, urlList, state);
    
    const elements = {
        formVal: document.querySelector('form'),
        inputVal: document.querySelector('input.form-control'),
        submit: document.querySelector('button')
    }
    

    const i18nInstance = i18next.createInstance();

    await i18nInstance.init({
        lng: state.ui.lng,
        debug: false,
        resources: resources,
    })
    
    initView(elements, i18nInstance);
 
    elements.inputVal.addEventListener('input', async (e) => {
        //const formData = ;Object.fromEntries(formData);
        const urlValue = e.target.value
        const link = urlValue.trim();
        const isLink = isUrl(link)
        //let errors;
        const errors = await validate({ link: link }, urlList);
        if (isLink) {
            state.form.valid = true;
        } else {
            state.form.valid = false;
            state.form.errors = errors;
        }
    });

    elements.formVal.addEventListener('submit', async (e) => {
        const formData = new FormData(e.target);
        const urlValue = Object.fromEntries(formData);
        let trimmedLink = urlValue.url;
        const errors = (trimmedLink) = await validate({ link: trimmedLink }, urlList);
        const isValidLink = errors.success;

            if (isValidLink) {
                const networkError = (error) => { return error ? { success: false, message: `errors.networkError`, } : ''};
                const requestError = await tryCatchValid(trimmedLink);
                const fail = networkError(requestError);

                if (requestError !== undefined){
                    state.form.errors = fail;
                    const snapFormErrors = snapshot(state.form.errors)
                    console.log(snapFormErrors)
                } else {
                    state.form.response = errors;
                }
            } 
            else {
                state.form.errors = errors;
                
                const snapFormErrors = snapshot(state.form.errors)
                console.log(snapFormErrors)
            }
    })
   
};
