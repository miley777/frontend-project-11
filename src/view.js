import onChange from 'on-change';
import _ from 'lodash';

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
    console.log(feedback);
    const { error } = state.form;
    successFeedback.textContent = i18n.t(error.message);
    console.log(successFeedback.textContent);
    successFeedback.style.display = 'block';
    divFormGroup.append(successFeedback);
    if (!feedList.querySelector('ul')) {
        const ulFeeds = document.createElement('ul');
        feedList.append(ulFeeds);
    }
    const li = document.createElement('li');
    li.textContent = state.form.field.link;
    const ul = feedList.querySelector('ul');
    ul.append(li);
}


export default  (state, elements, i18n) => { //initView
    
    const watch = onChange(state, (path) => {
        switch (path) {
            case 'form.response': {
                makeListHandler(state, elements, i18n);
                console.log('ok');
                elements.formVal.reset();
                elements.inputVal.focus();
                break;
            }
            case 'form.error': {
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
                console.log('stateError');
                break;
            }
            default: {
                break;
            }
        }
    })
    return watch;
};