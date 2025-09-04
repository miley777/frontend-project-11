import _ from 'lodash';

const renderError = (state, elements) => {
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
    const message = state.form.error.url.message;
    console.log(message);
    errorFeedback.textContent = message;
    errorFeedback.style.display = 'block';
    divFormGroup.append(errorFeedback);
};

const renderErrorHandeler = (state, elements) => {
    const hasFieldError = _.isEmpty(state.form.error);
    if (hasFieldError) {
        const input = elements.inputVal;
        input.classList.remove('is-invalid');
        const example = document.querySelector('p.text-muted');
        example.nextElementSibling?.remove();
    }
    else {
        renderError(state, elements);
    }
};

const makeListHandler = (state, elements) => {
    const feedList = document.querySelector('div.feeds');
    const divFormGroup = document.querySelector('div.text-white');
    elements.inputVal.classList.remove('is-invalid');
    const example = document.querySelector('p.text-muted');
    const feedback = example.nextElementSibling;
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    feedback.textContent = 'RSS loaded successfully';
    feedback.style.display = 'block';
    divFormGroup.append(feedback);
    if (!feedList.querySelector('ul')) {
        const ulFeeds = document.createElement('ul');
        feedList.append(ulFeeds);
    }
    const li = document.createElement('li');
    li.textContent = state.form.field.url;
    const ul = feedList.querySelector('ul');
    ul.append(li);
}


export default  (state, elements, path) => { //initView
    switch (path) {
        case 'form.response': {
            makeListHandler(state, elements);
            console.log('ok');
            elements.formVal.reset();
            elements.inputVal.focus();
            break;
        }
        case 'form.error': {
            renderErrorHandeler(state, elements);
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
};