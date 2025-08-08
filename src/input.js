import * as yup from 'yup';
//import onChange from 'on-change';
import change from './view.js';

const schema = yup.object().shape({
    url: yup.string().url().lowercase().trim().nullable(),
});

const validation = (valueUrl, array = []) => {
    console.log('val 10');
    //try {
        //const data = schema.validate(fields).
        ////console.log('val 13', data);
        //test( 
        
        //if (array.includes(valueUrl)) {
        //    throw new Error(`${valueUrl} is not unique`);
        //}
        //array.push(valueUrl);
        
        //console.log(array);
        //let array = [];


        fetch(`https://allorigins.hexlet.app/get?url=${valueUrl}`).then(
            response => {
                if (!response.ok) {
                    throw new Error('not ok');     
                }
                return {};
            }
            )
            //.then(
                //val => {
                //if (array.includes(val)) {
                  //  throw new Error(`${val} is not unique`);
                //}
                //array.push(val);
                //return val;
            //})
           //.then((res) => console.log(res))
            .catch((e) => {
                console.log("Validation failed:mmmm", e);
            });
    
}

export default () => {
    console.log('gjkhg');
    const form = document.querySelector('div.row');
    const formVal = document.querySelector('form');
    const inputVal = document.querySelector('input.form-control');
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
    formVal.addEventListener('submit', async (e) => {
        e.preventDefault();
        state.form.processState = 'sending';
        console.log('error');
        //const error = validate(state.form.field);
        
        
        //state.form.error = error;
        //if (Object.values(state.form.error).length === 0) {
            //console.log('ok');
        //}
        const formData = new FormData(e.target);
        const list = document.createElement('ul');
        const dataDiv = document.querySelector('div.feeds');
        //const ent = [...formData.entries()];
        const urlValue = formData.get('url');
        console.log('83:',urlValue);
        state.form.field.url = urlValue;
        const data = await schema.validate(state.form.field);
        console.log('86', data.url);
        const error = validation()
        if (array.includes(data.url)) {
            throw new Error(`${data} is not unique`);
        }
        array.push(data);
        console.log('92:', error);
        
        //fetch(`https://allorigins.hexlet.app/get?url=${valueUrl}`).then(
            //response => {
                //if (!response.ok) {
                  //  throw new Error('not ok');     
                //}
                //console.log('string 20', response.json());
                //return response.json();
            //}
            //)


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

        
    });
};
//https://buzzfeed.com/world.xml
//https://lorem-rss.hexlet.app/feed
//https://www.nbcnews.com/podcasts
//https://rt.com/rss/news
//http://www.dp.ru/exportnews.xml
//http://www.fontanka.ru/fontanka.rss
//http://lenta.ru/l/r/EX/import.rss