import * as yup from 'yup';
import onChange from 'on-change';
//import change from './view.js';
import initView from './view.js';

const array = [];

const schema = yup.object().shape({
    url: yup.string().url().lowercase().trim().nullable()
    .test('checkLinkUnique', (val) => {
        if (array.includes(val)) {
            throw new Error(`${val} is not unique`);
        }
        array.push(val);
        console.log(array)
        return val;
    }),
});

console.log('log');
const validate = (fields) => {
    try {
        schema.validate(fields, { abortEarly: false });
        return {};
    }
    catch (e) {
        return e.inner;
    }
}

const errorMessage = {
    network: {
        error: 'Network connection problem. Try again',
    }
}

export default () => {
    console.log('gjkhg');
    //const form = document.querySelector('div.row');
    const elements = {
        formVal: document.querySelector('form'),
        inputVal: document.querySelector('input.form-control'),
    }
    //const formVal = document.querySelector('form');
    //const inputVal = document.querySelector('input.form-control');
    const objWithLinks = {};
    const state = {
        form: {
            field: {
                url: '',
            },
            processState: '',
            responce: {},
            error: {},
            processError: null,
        },
    }
    let array = [];
    console.log('after array');

    const watchState = onChange(state, (path) => {
            initView(state, elements, path);
        });
    console.log('54')
    elements.formVal.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('57')
        watchState.form.processState = 'sending';
        console.log('sending');
        const formData = new FormData(e.target);
        //const list = document.createElement('ul');
        //const dataDiv = document.querySelector('div.feeds');
        //const ent = [...formData.entries()];
        const urlValue = formData.get('url');
        console.log('83:',urlValue);
        watchState.form.field.url = urlValue;
        const errors = validate(watchState.form.field);
        watchState.form.error = errors;
        const empt = Object.keys(watchState.form.error);
        if (empt.length > 0) {
            console.log('errrrrrror')
        }
    });
};
// import * as yup from 'yup';
// //import onChange from 'on-change';
// import change from './view.js';

// const schema = yup.object().shape({
//     url: yup.string().url().lowercase().trim().nullable(),
// });

// export default () => {
//     console.log('gjkhg');
//     const formVal = document.querySelector('form');
//     const inputVal = document.querySelector('input.form-control');
//     const objWithLinks = {};
//     const state = {
//         form: {
//             field: {
//                 url: '',
//             },
//             processState: '',
//             responce: {},
//             error: {},
//             processError: null,
//         },
//     }
//     let array = [];
//     console.log('after array');

//     const watchState = change(state, initView(formVal));

    // formVal.addEventListener('submit', async (e) => {
    //     e.preventDefault();
    //     watchState.form.processState = 'sending';
    //     console.log('error');

    //     const formData = new FormData(e.target);
    //     //const list = document.createElement('ul');
    //     //const dataDiv = document.querySelector('div.feeds');
    //     //const ent = [...formData.entries()];
    //     const urlValue = formData.get('url');
    //     console.log('83:',urlValue);
    //     watchState.form.field.url = urlValue;
    //     const data = await schema.validate(watchState.form.field);
    //     console.log('86', data.url);
    //     if (array.includes(data.url)) {
    //         throw new Error(`${data} is not unique`);
    //     }
    //     array.push(data);


        //ent.forEach((ert) => {
            //const [key, value] = ert;
            //let linkSchema = yup.string().url().lowercase().trim().nullable()
            
            //.test( urlValue => fetch(`https://allorigins.hexlet.app/get?url=${urlValue}`).then(
                //response => {
                    //if (response.ok) {
                        //console.log(response.json());
                        //return response.json();
                    //}
                    //throw new Error('not ok');
                    
                //}
            //)).test('checkLinkUnique', (val) => {
                //if (array.includes(val)) {
                    //throw new Error(`${val} is not unique`);
                //}
                //array.push(val);
                //return val;
            //});
            
            
            
            //const validateData = async () => {
                //try {
                    ////console.log("value", value);
                    //const data = await linkSchema.validate(urlValue);
                    //const valChange = change(data, objWithLinks);
                    //list.innerHTML = `<li>${valChange}</li>`;
                    ////console.log(change(data, objWithLinks));
                    ////console.log("Valid!", data);
                    ////objWithLinks[i++] = data;
                    ////console.log(JSON.stringify(objWithLinks));
                    //dataDiv.append(list);
                    //inputVal.classList.remove('is-invalid');
                    //document.querySelector('form').reset();
                    //document.querySelector('input').focus();
                //} catch (error) {
                    //console.log("Validation failed:", error.message);
                    //inputVal.classList.add('is-invalid');
                //}
            //}
            //validateData();
            
        //});

        
    //});
//};
//https://buzzfeed.com/world.xml
//https://lorem-rss.hexlet.app/feed
//https://www.nbcnews.com/podcasts
//https://rt.com/rss/news
//http://www.dp.ru/exportnews.xml
//http://www.fontanka.ru/fontanka.rss
//http://lenta.ru/l/r/EX/import.rss