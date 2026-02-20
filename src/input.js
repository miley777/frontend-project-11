import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import resources from './locales/index.js';
import _ from 'lodash';
import initView from './view.js';

yup.setLocale({
    mixed: {
        default: () => ({ key: 'errors.validation.required' }),
        notOneOf: () => 'errors.unique',

    },
    string: {
        url: () => 'errors.validation.url',
    }
})

let urlList = [];

const createSchema = (existingUrls) => {
    return yup.object({
        link: yup.string().url().trim().lowercase().notOneOf(existingUrls),
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
        watchState.form.processState = 'sending';
        const formData = new FormData(e.target);
        const urlValue = Object.fromEntries(formData);
        watchState.form.field.link = urlValue.url.trim();
        const errors = await validate(watchState.form.field, urlList);
        console.log(urlList);
        watchState.form.isValid = errors.success;
        watchState.form.error = errors;
        if (watchState.form.isValid) {
            console.log('ok');
            urlList.push(watchState.form.field.link);
            try {
                console.log(window.location.host);
                const response = await axios.post('window.location.host', { url: watchState.form.field.link });
            }
            catch (error) {

            }
            //watchState.form.error = errors;
            watchState.form.processState = 'sent';
        }
        else {
            console.log('not ok')
            if (watchState.form.error !== undefined) {
                watchState.form.processState = 'processError';
                console.log(watchState.form.processState);
            }
            else {
                watchState.form.processState = 'networkError';
            }
            
        }
    });
};






//const errorMessage = {
 //   network: {
//        error: 'Network connection problem. Try again',
 //   }
//}

