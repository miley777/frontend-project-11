import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import resources from './locales/index.js';
import _ from 'lodash';
import initView from './view.js';
import createPosts from './create-posts.js';

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

    const defaultLanguage = 'en';
    
    const state = {
        ui: {
            lng: defaultLanguage,
        },
        form: {
            field: {
                link: '',
            },
            response: '',
            error: {},
            processState: 'filling',
            processError: null,
            isValid: false,
        },
    }

    const i18nInstance = i18next.createInstance();

    await i18nInstance.init({
        lng: state.ui.lng,
        debug: false,
        resources: resources,
    })


    const watchState = initView(state, elements, i18nInstance);

    elements.formVal.addEventListener('submit', async (e) => {
        e.preventDefault();
        //watchState.form.processState = 'sending';
        //console.log(watchState.form.processState);
        const formData = new FormData(e.target);
        const urlValue = Object.fromEntries(formData);
        watchState.form.field.link = urlValue.url.trim();
        const errors = await validate(watchState.form.field, urlList);
        console.log(urlList);
        watchState.form.isValid = errors.success;
        //watchState.form.error = errors;
        if (watchState.form.isValid) {
            //console.log('ok');'window.location.host', { url:}
            urlList.push(watchState.form.field.link);
            try {
                console.log(window.location.host);
                //const response = await axios.get( watchState.form.field.link );
                //console.log(response);

                fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(watchState.form.field.link)}`)
                    .then(resp => {
                        if (resp.ok) {
                            //const posts = resp.json()
                            //createPosts(posts);
                            return resp.json()
                        }
                        throw newError('Network response was not ok.')
                    }).then (data => {
                        const posts = data.contents
                        createPosts(posts);
                        //console.log('con:', data.contents)
                    });
            }
            catch (error) {
                console.error(error);
            }
            watchState.form.response = errors;
            watchState.form.processState = 'sent';
            console.log(watchState.form.processState)
        }
        else {
            //console.log('not ok')
            
            if (watchState.form.error !== undefined) {
                watchState.form.processState = 'processError';
                console.log(watchState.form.processState);
            }
            else {
                watchState.form.processState = 'networkError';
                console.log(watchState.form.processState)
            }
            watchState.form.error = errors;
        }
    });
};






//const errorMessage = {
 //   network: {
//        error: 'Network connection problem. Try again',
 //   }
//}

