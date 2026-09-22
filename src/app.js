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
        //matches: () => 'errors.validation.matches',
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
    console.log(urlList);
    try { 
        
        const response = await fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`);
        console.log(response)
        if (!response.ok) {
            throw new Error('errors.networkError')
        }
        const data = await response.json();

        const postsAndFeeds = data.contents
        parsingData(state, postsAndFeeds, urlList, link);
    
    } catch (error) {
        console.log(error.message)
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
        state.form.processState = 'filling'
        const urlValue = e.target.value
        const link = urlValue.trim();
        const isLink = isUrl(link)
        
        const errors = await validate({ link: link }, urlList);
        const isValidLink = errors.success;
        console.log('isLink:', isLink)
        console.log('isValidLink:', isValidLink)
        console.log('isLink && isValidLink:', isLink && isValidLink)

        if (isLink && isValidLink) {
            console.log('valid')
            state.form.valid = true;
            state.form.errors = '';
            console.log(state.form.valid)
            console.log(state.form.errors)
            //
        } else {
            console.log('invalid isLink && isValidLink:', isLink && isValidLink)
            state.form.valid = false;
            state.form.errors = errors;
            state.form.processState = 'error';
        }
        
    });

    elements.formVal.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData)
        const urlValue = Object.fromEntries(formData);
        let trimmedLink = urlValue.url.trim();
        
        const requestError = await tryCatchValid(trimmedLink);
        state.form.processState = 'pending';
        console.log(`requestError:`, requestError)
        if (requestError){
            state.form.errors = {
                success: false, 
                message: requestError
            }
            state.form.processState = 'error';
            const snapFormErrors = snapshot(state.form.errors)
            console.log('Error state:', snapFormErrors)
        } else {
            //console.log('sucessssssssssssssss')
            const snapFormErrors = snapshot(state.form.errors)
            console.log(snapFormErrors)
            //console.log(state.form.errors)
            if (!snapFormErrors){
                state.form.response = {
                success: true, 
                message: 'success'
            };
            state.form.processState = 'success';
            const snapFormSuccess = snapshot(state.form.response)
            console.log('Success state:', snapFormSuccess)
            } 
        }
    })
   
};
