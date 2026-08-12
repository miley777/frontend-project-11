import _ from 'lodash';
import { proxy, snapshot, subscribe, unstable_enableOp } from 'valtio';
import { state } from './store.js';
import bootstrap from 'bootstrap';
import createAlertWindow from './create-alert-windows.js'
import { makePostsHandler } from './output-posts.js'

unstable_enableOp(true);

const renderError = async (state, elements,  i18n) => {
    const errors = state.form.errors;
    const snapErrors = snapshot(errors);
    const mapMessages = [];
    if(Array.isArray(snapErrors.message)) {
        snapErrors.message.forEach((mess) => {
            mapMessages.push(mess);
        })
    } else {
        mapMessages.push(snapErrors.message);
    }
    mapMessages.forEach((message) => {
        setTimeout(() => {
            console.log('setT')
            const example = document.querySelector('p.text-muted');
            const inputElement = elements.inputVal;
            const oldFeedback = example.nextElementSibling;
            if (oldFeedback !== null) {
                oldFeedback.remove();
            }
            const divFormGroup = document.querySelector('div.text-white');
            inputElement.classList.add('is-invalid');
            const errorFeedback = document.createElement('p');
            errorFeedback.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger');
            const errMessage = i18n.t(message);
            console.log(errMessage)
            errorFeedback.textContent = errMessage;
            errorFeedback.style.display = 'block';
            divFormGroup.append(errorFeedback);
            console.log(divFormGroup.innerHTML)
        }, 2000, message)
        
    })
    
};

const makeResponseHandler = (state, elements, i18n) => {
    const divFormGroup = document.querySelector('div.text-white');
    elements.inputVal.classList.remove('is-invalid');
    const example = document.querySelector('p.text-muted');
    const oldFeedback = example.nextElementSibling;
    if (oldFeedback !== null) {
        oldFeedback.remove();
    }
    const successFeedback = document.createElement('p');
    successFeedback.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-success');
    const response = state.form.response;
    successFeedback.textContent = i18n.t(response.message);
    successFeedback.style.display = 'block';
    divFormGroup.append(successFeedback);
};


const makeFeedsHandler = (state, elements, i18n) => {
    const feeds = state.data.feeds;
    const feedList = document.querySelector('div.feeds');
    if (feedList.innerHTML) {
        feedList.innerHTML = '';
    }
    feedList.innerHTML = `
    <h3 class="pb-4">Фиды</h3>
    <ul class="ps-0" style="list-style-type: none;"></ul>`;
    const ulFeeds = feedList.querySelector('ul');
    feeds.forEach((feed) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <ul class="ps-0 pb-1" style="list-style-type: none;">
            <li>${feed.title}</li>
            <li style="color: gray; font-size: smaller;">${feed.description}</li>
        </ul>`;
        ulFeeds.append(li);
    })
}

//const valitadingInput = (elements, state) => {
  //  elements.submit.style.disabled = !state.form.valid; 
//}

export default  (elements, i18n) => {
    subscribe(state, (path) => {
        let cleanFormPath = [];
        path.forEach((arrayOfPathEls) => {
            arrayOfPathEls.forEach((el) => {
                if (Array.isArray(el)) {
                    const cleanArr = el.filter((ArrayEl => !/\d/.test(Number(ArrayEl))))
                    cleanFormPath.push(cleanArr)
                }
                
            })
        })
        cleanFormPath.forEach((cleanPath) => {
            const joinFormPath = cleanPath.join('.');
            switch (joinFormPath) {
                case 'form.response': {
                    console.log('case form.response');
                    makeResponseHandler(state, elements, i18n)
                    break;
                }
                case 'data.feeds': {
                    console.log('case data.feeds');
                    makeFeedsHandler(state, elements, i18n);
                    elements.formVal.reset();
                    elements.inputVal.focus();
                    break;
                }
                case 'data.posts': {
                    console.log('case data.posts');
                    makePostsHandler(state, elements, i18n);
                    break;
                }
                case 'form.errors': {
                    console.log('casse form.errors');
                    renderError(state, elements, i18n);
                    break;
                }
                case 'activePost': {
                    if (state.activePost !== '') {
                        createAlertWindow(state);
                    }
                }
                case 'form.valid': {
                    console.log('form.valid', state.form.valid);
                    console.log(elements.submit.outerHTML)
                    elements.submit.disabled = !elements.submit.disabled; 
                    if (state.form.valid) {
                        elements.inputVal.classList.remove('is-invalid')
                    }
                    console.log(elements.submit.outerHTML)
                }
                default: {
                    break;
                }
            }
        })
        
    })

};