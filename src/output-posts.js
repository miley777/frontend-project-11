import { proxy, snapshot } from 'valtio';
import createAlertWindow from './create-alert-windows.js'


export const makePostsHandler = (state, elements, i18n) => {
    const posts = state.data.posts;
    const snapPosts = snapshot(state.data.posts);
    //console.log(snapPosts); 
     const myModal = document.querySelector('#modal');
    const postList = document.querySelector('div.posts');
    if (postList.innerHTML !== '') {
        postList.innerHTML = '';
    }
    
    const postTitle = document.createElement('h3');
    postTitle.textContent = 'Посты';
    postTitle.classList.add('ps-5', 'pb-3')
    postList.append(postTitle);
    const ulListPosts = document.createElement('ul');
    ulListPosts.classList.add('ps-4.5')
    ulListPosts.setAttribute("style", "list-style-type: none;");
    postList.append(ulListPosts);
    
    posts.forEach((post) => {
        //let nameElement;
        
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
                console.log('aPost.addEventListener')
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
                console.log('buttonPost.addEventListener')
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
            console.log(post);
            const linkPost = document.querySelector(`a[id="${post}"]`)
            linkPost.classList.remove('fw-bold')
            linkPost.classList.add('link-secondary', 'link-underline-opacity-25', 'fw-normal')
        })
    }
}