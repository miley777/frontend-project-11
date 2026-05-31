import onChange from 'on-change';
import _ from 'lodash';
import { proxy, snapshot, subscribe, unstable_enableOp } from 'valtio';
import { state } from './store.js';
import bootstrap from 'bootstrap';

unstable_enableOp(true);

const renderError = (state, elements, error, i18n) => {
    const errorMessage = i18n.t(error.message.link);
    //i18n.t(error.message.link)S
    console.log(error.message);
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
    errorFeedback.textContent = errorMessage;
    errorFeedback.style.display = 'block';
    divFormGroup.append(errorFeedback);
};

const renderErrorHandeler = (state, elements, i18n) => {
    const { response } = state.form;
    const hasNoFieldError = response.success;
    console.log(hasNoFieldError)
    if (hasNoFieldError) {
        const input = elements.inputVal;
        input.classList.remove();
        input.classList.add('form-control', 'w-100');
        const example = document.querySelector('p.text-muted');
        example.nextElementSibling?.remove();
        makeResponseHandler(state, elements, i18n);
    }
    else {
        renderError(state, elements, response, i18n);
    }
};

const makeResponseHandler = (state, elements, i18n) => {
    const divFormGroup = document.querySelector('div.text-white');
    elements.inputVal.classList.remove('is-invalid');
    const example = document.querySelector('p.text-muted');
    const feedback = example.nextElementSibling;
    if (feedback !== null) {
        feedback.remove();
    }
    const successFeedback = document.createElement('p');
    successFeedback.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-success');
    const response = state.form.response;
    //console.log(response)
    successFeedback.textContent = i18n.t(response.message);
    successFeedback.style.display = 'block';
    divFormGroup.append(successFeedback);
};


const makeFeedsHandler = (state, elements, i18n) => {
    const feedList = document.querySelector('div.feeds');
    //console.log(feedList.innerHTML)
    if (feedList.innerHTML) {
        feedList.innerHTML = '';
    }
    const feedTitle = document.createElement('h3');
    feedTitle.textContent = 'Feeds';
    feedList.append(feedTitle);
    const ulFeeds = document.createElement('ul');
    ulFeeds.classList.add('ps-0')
    ulFeeds.setAttribute("style", "list-style-type: none;");
    feedList.append(ulFeeds);
    const liTitle = document.createElement('li');
    liTitle.textContent = state.currentFeed.title;
    const liDescription = document.createElement('li');
    liDescription.textContent = state.currentFeed.description;
    liDescription.setAttribute("style", "color: gray; font-size: smaller");
    //console.log(state.currentFeed.title)
    //console.log(li.textContent)
    const ul = feedList.querySelector('ul');
    ul.append(liTitle);
    ul.append(liDescription);
    
    
    makePostsHandler(state, elements);
}


const makePostsHandler = (state, elements) => {
    const posts = state.data.posts;
    const snapPosts = snapshot(state.data.posts);
    //console.log(snapPosts); 
    const postList = document.querySelector('div.posts');
    if (postList.innerHTML !== '') {
        postList.innerHTML = '';
    }
    const postTitle = document.createElement('h3');
    postTitle.textContent = 'Posts';
    postTitle.classList.add('ps-3')
    postList.append(postTitle);
    const ulListPosts = document.createElement('ul');
    ulListPosts.classList.add('ps-0')
    ulListPosts.setAttribute("style", "list-style-type: none;");
    postList.append(ulListPosts);
    posts.forEach((post) => {
        const liPost = document.createElement('li');
        const cardPostDiv = document.createElement('div');
        cardPostDiv.classList.add('card', 'border-0');
        const cardBodyPostDiv = document.createElement('div');
        cardBodyPostDiv.classList.add('card-body', 'd-flex', 'justify-content-between', 'align-items-center');
        const aPost = document.createElement('a');
        const buttonPost = document.createElement("a");
        buttonPost.setAttribute("href", post.link);
        buttonPost.classList.add('btn', 'btn-outline-primary', 'mr-4')

        aPost.textContent = post.title;
        aPost.setAttribute("href", post.link);
        buttonPost.textContent = 'Посмотреть';
        cardPostDiv.append(cardBodyPostDiv);
        cardBodyPostDiv.append(aPost);
        cardBodyPostDiv.append(buttonPost);
        liPost.append(cardPostDiv);
        ulListPosts.append(liPost);
    });
    
    //console.log(posts)
}


export default  (elements, i18n) => { //initView
    
    //const watch = 
    subscribe(state, (path) => {
        //console.log('subscribe work')
        const formPath = path[0][1];
        const joinFormPath = formPath.slice(0,2).join('.');
        switch (joinFormPath) {
            case 'data.feeds': {
                console.log('case data.feeds');
                makeFeedsHandler(state, elements, i18n);
                elements.formVal.reset();
                elements.inputVal.focus();
                //console.log('okok')
                break;
            }
            case 'form.response': {
                console.log('case form.response');
                console.log(state.form.response.success);
                console.log(state.form.response);
                renderErrorHandeler(state, elements, i18n);
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