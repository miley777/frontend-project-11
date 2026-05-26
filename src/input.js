import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import resources from './locales/index.js';
import _ from 'lodash';
import initView from './view.js';
import createPosts from './create-posts.js';
import { proxy, snapshot } from 'valtio';
import { state } from './store.js';

yup.setLocale({
    mixed: {
        default: () => ({ key: 'errors.validation.required' }),
        notOneOf: () => 'errors.unique',

    },
    string: {
        url: () => 'errors.validation.url',
        matches: () => 'errors.validation.matches',
    }
})

let urlList = [];

const createSchema = (existingUrls) => {
    return yup.object({
        link: yup.string().url().trim().lowercase().notOneOf(existingUrls).matches(/rss/),
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
   
    const messages = {}
    console.log(err);
    err.inner.forEach((err) => {
        const pathKey = err.path;
        messages[`${pathKey}`] = err.message;
    })
    console.log(messages);
    return { success: false, message: messages };

    }
}


export default async () => {
    
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
        console.log(urlList);
        state.form.isValid = errors.success;
        //watchState.form.error = errors;
        if (state.form.isValid) {
            console.log(state.form.isValid)
            urlList.push(trimmedLink);
            try {
                //console.log(window.location.host);
                //const response = await axios.get( watchState.form.field.link );
                //console.log(response);

                fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(trimmedLink)}`)
                    .then(resp => {
                        if (resp.ok) {
                            //console.log('resp ok')
                            return resp.json()
                        }
                        throw newError('Network response was not ok.')
                    }).then (data => {
                        //console.log('resp ok resp ok')
                        const posts = data.contents
                        createPosts(state, posts);
                    });
            }
            catch (error) {
                console.error(error);
            }
            state.form.response = errors;
            //console.log(await state.form.response);
            state.form.processState = 'sent';
            console.log(state.form.processState)
        }
        else {
            //console.log('not ok')
            
            if (state.form.response !== undefined) {
                state.form.processState = 'processError';
                console.log(state.form.processState);
            }
            else {
                state.form.processState = 'networkError';
                console.log(state.form.processState)
            }
            state.form.response = errors
            //state.form.error = errors;
        }
    });
};






//const errorMessage = {
 //   network: {
//        error: 'Network connection problem. Try again',
 //   }
//}

