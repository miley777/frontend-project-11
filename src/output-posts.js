import { proxy, snapshot } from 'valtio';
//import createAlertWindow from './create-alert-windows.js'


export const makePostsHandler = (state, elements, i18n) => {
    const posts = state.data.posts;
    //const snapPosts = snapshot(state.data.posts);
    //const myModal = document.querySelector('#modal');
    const postList = document.querySelector('div.posts');
    if (postList.innerHTML !== '') {
        postList.innerHTML = '';
    }
    
    postList.innerHTML = `<h3 class="ps-5 pb-3">Посты</h3>
    <ul class="ps-4.5" style="list-style-type: none;"></ul>`;

    const ulListPosts = postList.querySelector('ul');
    
    posts.forEach((post) => {
        const liPost = document.createElement('li');
        liPost.innerHTML = `
        <div class="card border-0">
            <div class="card-body d-flex justify-content-between align-items-center py-2">
                <a class="fw-bold" href="#" id=${post.id} data-bs-toggle="modal" data-bs-target=${post.id}>${post.title}</a>
                <button type="button" data-bs-toggle="modal" data-bs-target=${post.id} class="btn btn-outline-primary mr-4">Просмотр</button>
            </div>
        </div>`

        ulListPosts.append(liPost);
    });

    const aPosts = document.querySelectorAll(`a[data-bs-toggle="modal"]`)

        aPosts.forEach((aPost) => {
            aPost.addEventListener('click', () => {
                const aPostId = aPost.getAttribute("id")
                const currentPost = posts.find((post) => post.id === aPostId);
                state.activePost = currentPost;
                state.selectedItem = { id: currentPost.id, type: 'link'}
                const snapViewedPosts = snapshot(state.viewedPosts);
                const snapActivePost = snapshot(state.activePost)
                if (!snapViewedPosts.includes(snapActivePost.id)){
                    state.viewedPosts.push(state.activePost.id);
                    aPost.classList.remove('fw-bold')
                    aPost.classList.add('link-secondary', 'link-underline-opacity-25', 'fw-normal')
                }
            })
        })
        
        const buttonPosts = document.querySelectorAll(`button[data-bs-toggle="modal"]`)

        buttonPosts.forEach((buttonPost) => {
            buttonPost.addEventListener('click', () => {
                const buttonPostId = buttonPost.getAttribute("data-bs-target")
                const linkPost = document.querySelector(`a[id="${buttonPostId}"]`)
                const currentPost = posts.find((post) => post.id === buttonPostId);
                state.activePost = currentPost;
                state.selectedItem = { id: buttonPostId, type: 'button'}
                const snapViewedPosts = snapshot(state.viewedPosts);
                const snapActivePost = snapshot(state.activePost);
                if (!snapViewedPosts.includes(snapActivePost.id)){
                    state.viewedPosts.push(state.activePost.id);
                    linkPost.classList.remove('fw-bold')
                    linkPost.classList.add('link-secondary', 'link-underline-opacity-25', 'fw-normal')
                }
            })
        })

    const snapViewedPosts = snapshot(state.viewedPosts);
    if (snapViewedPosts.length > 0) {
        snapViewedPosts.forEach((post) => {
            const linkPost = document.querySelector(`a[id="${post}"]`)
            linkPost.classList.remove('fw-bold')
            linkPost.classList.add('link-secondary', 'link-underline-opacity-25', 'fw-normal')
        })
    }
}