import onChange from 'on-change';
import _ from 'lodash';
import { proxy, snapshot, subscribe, unstable_enableOp } from 'valtio';
import { state } from './store.js';
import bootstrap from 'bootstrap';

unstable_enableOp(true);

const renderError = (state, elements,  i18n) => {
    const errors = state.form.errors;
    //i18n.t(error.message.link)S    error,
    console.log(errors);
    const snap = snapshot(errors);
    console.log(snap);
    
    const mapMessages = [];
    //const errorMessage = i18n.t(error.message);
    //snap.forEach((el) => {
        if(Array.isArray(snap.message)) {
            snap.message.forEach((mess) => {
                mapMessages.push(mess);
            })
        } else {
            mapMessages.push(snap.message);
        }
        
        //});
     console.log(mapMessages);
    mapMessages.forEach((message) => {
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
        console.log(message);
        const errMessage = i18n.t(message);
        errorFeedback.textContent = errMessage;
        errorFeedback.style.display = 'block';
    divFormGroup.append(errorFeedback);
    })
    
};

//const renderErrorHandeler = (state, elements, i18n) => {
 //   const { response } = state.form;
 //   const hasNoFieldError = response.success;
   // console.log(hasNoFieldError)
 //   if (hasNoFieldError) {
 //       const input = elements.inputVal;
  //      input.classList.remove();
  //      input.classList.add('form-control', 'w-100');
 //       const example = document.querySelector('p.text-muted');
 //       example.nextElementSibling?.remove();
 //       makeResponseHandler(state, elements, i18n);
 //   }
 //   else {
 //       renderError(state, elements, response, i18n);
  //  }
//};

const makeResponseHandler = (state, elements, i18n) => {
    //const input = elements.inputVal;
     //   input.classList.remove();
    //    input.classList.add('form-control', 'w-100');
     //   const example = document.querySelector('p.text-muted');
     //   example.nextElementSibling?.remove();
    
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
    const feeds = state.data.feeds;
    const snapFeedss = snapshot(state.data.feeds);
    const feedList = document.querySelector('div.feeds');
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
    feeds.forEach((feed) => {
        const li = document.createElement('li');
        const liContainer = document.createElement('div');
        const pTitle = document.createElement('p');
        pTitle.textContent = feed.title;
        const pDescription = document.createElement('p');
        pDescription.textContent = feed.description;
        pDescription.setAttribute("style", "color: gray; font-size: smaller");
        const ul = feedList.querySelector('ul');
        liContainer.append(pTitle)
        liContainer.append(pDescription)
        li.append(liContainer);
        ulFeeds.append(li);
    })
}


const makePostsHandler = (state, elements) => {
    const posts = state.data.posts;
    const snapPosts = snapshot(state.data.posts);
    console.log(snapPosts); 
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
        cardBodyPostDiv.append(aPost, buttonPost);
        //cardBodyPostDiv.append();
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
        console.log(joinFormPath)
        const snapPosts = snapshot(state.data.posts);
            console.log(snapPosts);
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
                //console.log('okok')
                break;
            }
            case 'data.posts': {
                console.log('case data.posts');
                makePostsHandler(state, elements);
                break;
            }
            //case 'form.networkError':
            case 'form.errors': {
                console.log('casse form.errors');
                renderError(state, elements, i18n);
                //state.form.errors = [];
                break;
            }
            default: {
                break;
            }
        }
    })

};