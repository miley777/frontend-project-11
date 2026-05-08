import onChange from 'on-change';
import _ from 'lodash';
import { proxy, snapshot, subscribe, unstable_enableOp } from 'valtio';
import { state } from './store.js';

unstable_enableOp(true);

const renderError = (state, elements, error, i18n) => {
    // console.log(error)
    //console.log(error.errors)
    const errorMessage = i18n.t(error.message.link);
    console.log(errorMessage);
    const example = document.querySelector('p.text-muted');
    const inputElement = elements.inputVal;
    const old = example.nextElementSibling;
    if (old !== null) {
        old.remove();
    }
    const divFormGroup = document.querySelector('div.text-white');
    inputElement.classList.add('is-invalid');
    const errorFeedback = document.createElement('p');
    errorFeedback.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger');
    //const message = state.form.error.link.message;
    //console.log(message);
    errorFeedback.textContent = errorMessage;
    errorFeedback.style.display = 'block';
    divFormGroup.append(errorFeedback);
};

const renderErrorHandeler = (state, elements, i18n) => {
    const { error } = state.form;
    const hasNoFieldError = error.success;
    if (hasNoFieldError) {
        const input = elements.inputVal;
        input.classList.remove();
        input.classList.add('form-control', 'w-100');
        const example = document.querySelector('p.text-muted');
        example.nextElementSibling?.remove();
        makeListHandler(state, elements, i18n);
    }
    else {
        renderError(state, elements, error, i18n);
    }
};

const makeListHandler = (state, elements, i18n) => {
    const feedList = document.querySelector('div.feeds');
    const divFormGroup = document.querySelector('div.text-white');
    elements.inputVal.classList.remove('is-invalid');
    const example = document.querySelector('p.text-muted');
    const feedback = example.nextElementSibling;
    if (feedback !== null) {
        feedback.remove();
    }
    const successFeedback = document.createElement('p');
    successFeedback.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-success');
    //console.log(feedback);
    const response = state.form.response;
    successFeedback.textContent = i18n.t(response.message);
    //console.log(successFeedback.textContent);
    successFeedback.style.display = 'block';
    divFormGroup.append(successFeedback);
    //feedList?.remove();
    //if (feedList !== null) {
    //    feedList.remove();
    //}
    console.log(feedList.innerHTML)
    if (feedList.innerHTML) {
        feedList.innerHTML = '';
    }
    const ulFeeds = document.createElement('ul');
    feedList.append(ulFeeds);
    const li = document.createElement('li');
    li.textContent = state.currentFeed.title;
    //console.log(state.currentFeed.title)
    //console.log(li.textContent)
    const ul = feedList.querySelector('ul');
    ul.append(li);
}


export default  (elements, i18n) => { //initView
    
    //const watch = 
    subscribe(state, (path) => {
        console.log('subscribe work')
        //const snap = snapshot(state);
       
        console.log(path.length)
        const formPath = path[0][1];
        console.log(formPath.slice(0,2));
        //console.log(formPath.pop());
        console.log(formPath.slice(0,2).join('.'));
        const joinFormPath = formPath.slice(0,2).join('.');
        switch (joinFormPath) {
            case 'data.feeds': {
                 console.log('switch work');
                 makeListHandler(state, elements, i18n);
                //console.log('ok');
                elements.formVal.reset();
                elements.inputVal.focus();
                //console.log('okok')
                break;
            }
            case 'form.isValid': {
                console.log(state.form.isValid);
                renderErrorHandeler(state, elements, i18n);
                console.log('form.error')
                console.log(state.form.processState)
                break;
            }
            case 'form.processError': {
                console.log('networkError');
                break;
            }
            case 'form.processState': {
                console.log('processState');
                break;
            }
            default: {
                break;
            }
        }
    })
    //return watch;
    // 
    
    
    //subscribe(state.form.response, () => { 
        //    makeListHandler(state, elements, i18n)
        //    //elements.formVal.reset();
        //    //elements.inputVal.focus();
        //})
        //subscribe(state.form.response, () => { 
        //    renderErrorHandeler(state, elements, i18n)
        //    //console.log('form.error')
        //    //console.log(snap.form.processState)
        //})
        //subscribe(state.form.processError, () => { console.log('networkError') })
        //subscribe(state.form.processState, () => { console.log('processState') })
};