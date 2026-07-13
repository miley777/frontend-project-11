import { proxy, snapshot } from 'valtio';
import createAlertWindow from './create-alert-windows.js'

export const makePostsHandler = (state, elements) => {
    const posts = state.data.posts;
    const snapPosts = snapshot(state.data.posts);
    //console.log(snapPosts); 
     const myModal = document.querySelector('#modal');
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
        //let nameElement;
        const liPost = document.createElement('li');
        const cardPostDiv = document.createElement('div');
        cardPostDiv.classList.add('card', 'border-0');
        const cardBodyPostDiv = document.createElement('div');
        cardBodyPostDiv.classList.add('card-body', 'd-flex', 'justify-content-between', 'align-items-center');
        const aPost = document.createElement('a');
        aPost.classList.add('link-primary', 'stretched-link')
        aPost.textContent = post.title;
        aPost.setAttribute("data-bs-toggle", 'modal');
        aPost.setAttribute("data-bs-target", post.id);
        const buttonPost = document.createElement("a");
        buttonPost.setAttribute("href", '#');
        buttonPost.setAttribute("data-bs-toggle", 'modal');
        buttonPost.setAttribute("data-bs-target", post.id);
        buttonPost.classList.add('btn', 'btn-outline-primary', 'mr-4')
        
        //console.log('ffffffffffffffffffffffffffffffffff')
        if (post.id === state.activePost.id) {
            //aPost.textContent = post.title;
            //aPost.setAttribute("href", '#');
            //console.log('aPost===========')
            aPost.classList.remove('link-primary')
            aPost.classList.add('link-secondary', 'link-underline-opacity-25')
            //createAlertWindow(state);post.link
        } else {
            console.log('elseeeeeeeeeee')
            aPost.addEventListener('click', () => {
                state.activePost = post;
                state.selectedItem = { id: post.id, type: 'link'}
                makePostsHandler(state, elements);
                //myModal.focus();
            })
        }
        buttonPost.addEventListener('click', () => {
            state.activePost = post;
            console.log('buttonPost.addEventListener')
            state.selectedItem = { id: post.id, type: 'button'}
             //myModal.focus();
        })
        buttonPost.textContent = 'Посмотреть';
        cardPostDiv.append(cardBodyPostDiv);
        cardBodyPostDiv.append(aPost, buttonPost);
        liPost.append(cardPostDiv);
        ulListPosts.append(liPost);
    });
    
    //console.log(posts)
}
