import * as yup from 'yup';
//import onChange from 'on-change';
import change from './view.js';

export default () => {
    console.log('gjkhg');
    const form = document.querySelector('div.row');
    const formVal = document.querySelector('form');
    const inputVal = document.querySelector('input.form-control');
    const objWithLinks = {};
    let array = [];
    //let i = 1;
    //const ghhj = document.querySelector('form > div.row');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        //const list = document.createElement('ul');
        const dataDiv = document.querySelector('div.posts');
        const ent = [...formData.entries()];
        ent.forEach((ert) => {
            const [key, value] = ert;
            let linkSchema = yup.string().url().lowercase().trim().nullable()
            
            .test( value => fetch(`https://allorigins.hexlet.app/get?url=${value}`).then(
                response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('not ok');
                    
                }
            )).test('checkLinkUnique', (val) => {
                if (array.includes(val)) {
                    throw new Error(`${val} is not unique`);
                }
                array.push(val);
                return val;
            });
            const validateData = async () => {
                try {
                    console.log("value", value);
                    const data = await linkSchema.validate(value);
                    //list.innerHTML  = `<li>${data}</li>`;
                    //console.log("Valid!", data);
                    //objWithLinks[i++] = data;
                    //console.log(JSON.stringify(objWithLinks));
                    dataDiv.append(change(data, objWithLinks));
                    inputVal.classList.remove('is-invalid');
                    document.querySelector('form').reset();
                    document.querySelector('input').focus();
                } catch (error) {
                    console.log("Validation failed:", error.message);
                    inputVal.classList.add('is-invalid');
                }
            }
            validateData();
            
        });

        
    });
};
//https://buzzfeed.com/world.xml
//https://lorem-rss.hexlet.app/feed