import * as yup from 'yup';
import i18next from 'i18next';
import resourses from './locales/index.js';
import _ from 'lodash';
import initView from './view.js';

yup.setLocale({
    mixed: {
        default: () => ({ key: 'errors.validation.required' }),
    },
})

const schema = yup.object({
    link: yup.string().required().url().trim().lowercase(),
});


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
            processState: '',
            response: {},
            error: {},
            processError: null,
            isValid: null,
        },
    }

    const i18nInstance = i18next.createInstance();

    await i18nInstance.init({
        lng: state.ui.lng,
        debug: false,
        resourses,
    })

    //let urlList = [];

    const watchState = initView(state, elements, i18nInstance);

    elements.formVal.addEventListener('submit', async (e) => {
        e.preventDefault();
        watchState.form.processState = 'sending';
        const formData = new FormData(e.target);
        const urlValue = Object.fromEntries(formData);
        //console.log(urlValue);
        watchState.form.field.link = urlValue.url.trim();
         //console.log(watchState.form.field.link);
        //const errors = await validate(watchState.form.field);
        try {
            await schema.validate(watchState.form.field, { abortEarly: false });
            watchState.form.isValid = true;
            watchState.form.error = {};
            console.log('try');
            //return {};
        }
        catch (err) {
             console.log(err);
            console.log(err.errors);
            const validationErrors = err.inner.reduce((acc, cur) => {
                const { path, message } = cur;
                const errorData = acc[path] || [];
                return { ...acc, [path]: [...errorData, message] };
            }, {});
            watchState.form.error = validationErrors;
            //const message = err.errors.map((err) => err);
            //console.log(message);
            //const message = err.key;
            //console.log(message);
            //return _.keyBy(e.inner, 'path');
            console.log('catch')
        }
        
        
        
    });
};






//const errorMessage = {
 //   network: {
//        error: 'Network connection problem. Try again',
 //   }
//}


//nullable().
//const validate = async (fields) => {
    //try {
        //await schema.validate(fields, { abortEarly: false });
      //  return {};
    //}
    //catch (err) {
   
    //const messages = {}
    //err.inner.forEach((err) => {
        //const pathKey = err.path
      //  messages[`${pathKey}`] = err.message
    //})
    //return messages;

        //const message = err.errors.map((err) => err);
        //console.log(message);
       //  //const message = err.key;
     //   //console.log(message);
   //     //return _.keyBy(e.inner, 'path');
 //   }
//}
