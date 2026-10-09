import * as yup from 'yup';
import i18next from 'i18next';
import resources from './locales/index.js';
import _ from 'lodash';
import initView from './view.js';
import { snapshot } from 'valtio';
import { state } from './store.js';
import refreshData from './refresh-data.js';
import tryCatchValid from './controller.js'; 

yup.setLocale({
    mixed: {
        required: () => 'errors.validation.required',
        notOneOf: () => 'errors.unique',
    },
    string: {
        url: () => 'errors.validation.url',
    }
})

export let urlList = [];

const createSchema = (existingUrls) => {
    return yup.object({
        link: yup.string().url().trim().lowercase().notOneOf(existingUrls).required(),
    });
}

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
            messages.push(err.message)
        })
        return { success: false, message: messages };
    }
}


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

        if (isLink && isValidLink) {
            state.form.valid = true;
            state.form.errors = '';
        } else {
            state.form.valid = false;
            state.form.errors = errors;
            state.form.processState = 'error';
        }
        
    });

    elements.formVal.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const urlValue = Object.fromEntries(formData);
        let trimmedLink = urlValue.url.trim();
        
        const requestError = await tryCatchValid(trimmedLink, urlList);
        
        state.form.processState = 'pending';
        if (requestError){
            state.form.errors = {
                success: false, 
                message: 'errors.networkError'
            }
            state.form.processState = 'error';
        } else {
           const data = snapshot(state.form)
            if (!data.errors){
                state.form.response = {
                success: true, 
                message: 'success'
            };
            state.form.processState = 'success';
            } 
        }
    })
};
