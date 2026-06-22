const renderPosts = (state, elements) => {
    state.date.posts.forEach((post) => {
        let nameElement;
        const liPost = document.createElement('li');
        const cardPostDiv = document.createElement('div');
        cardPostDiv.classList.add('card', 'border-0');
        const cardBodyPostDiv = document.createElement('div');
        cardBodyPostDiv.classList.add('card-body', 'd-flex', 'justify-content-between', 'align-items-center');
        const aPost = document.createElement('a');
        const buttonPost = document.createElement("a");
        buttonPost.setAttribute("href", post.link);
        buttonPost.classList.add('btn', 'btn-outline-primary', 'mr-4')
        if (post.id === state.activePostId) {
            aPost.textContent = post.title;
            aPost.setAttribute("href", post.link);
            
            aPost.classList.add('btn', 'btn-outline-secondary', 'mr-4')
            
            createAlertWindow(state);
        } else {
            nameElement.addEventListener('click', (e) => {
                e.preventDefault();
                state.activePostId = post.id;
                renderPosts(state, elements);
            })
        }
        buttonPost.textContent = 'Посмотреть';
        cardPostDiv.append(cardBodyPostDiv);
        cardBodyPostDiv.append(aPost);
        cardBodyPostDiv.append(buttonPost);
        liPost.append(cardPostDiv);
        ulListPosts.append(liPost);
    })
}

export const createAlertWindow = (state) => {
    const currentPost = state.activePostId;
    const curAlertPost = state.data.posts.filter((post) => post[`currentPost`]);
    console.log(curAlertPost)

    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.setAttribute('tabindex', '-1')
    const modalDialog = document.createElement('div')
    modalDialog.classList.add('modal-dialog')
    const modalContent = document.createElement('div')
    modalContent.classList.add('modal-contant')
    const modalHeader = document.createElement('div')
    modalHeader.classList.add('modal-header')    
    const headerText = document.createElement('h5')
    headerText.classList.add('modal-title')
    headerText.textContent = curAlertPost.title;
    headerText.setAttribute('id', currentPost )
    const headerCloseButton = document.createElement('button')
    headerCloseButton.setAttribute('type', 'button')
    headerCloseButton.classList.add('btn-close')
    headerCloseButton.setAttribute('data-bs-dismiss', 'modal')
    headerCloseButton.setAttribute('aria-label', 'Close')
    const modalBody = document.createElement('div')
    const modalBodyP = document.createElement('p')
    modalBodyP.textContent = curAlertPost.title;
    const modalFooter = document.createElement('div')
    modalFooter.classList.add('modal-footer')
    const readButton = document.createElement('button');
    readButton.setAttribute('type', 'button')
    readButton.setAttribute('href', 'curAlertPost.link')
    readButton.classList.add('btn', 'btn-primary')
    readButton.setAttribute('id', currentPost)
    readButton.textContent = 'Read';
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button')
    closeButton.classList.add('btn', 'btn-secondary')
    closeButton.setAttribute('data-bs-dismiss', 'modal')
    closeButton.textContent = 'Close';
    modalHeader.append(headerText, headerCloseButton)
    modalBody.append(modalBodyP)
    modalFooter.append(readButton, closeButton)
    modalContent.append(modalHeader, modalBody, modalFooter)
    modalDialog.append(modalContent)
    modal.append(modalDialog)


    //const cardAlert = document.createElement('div')
    //cardAlert.classList.add('card', 'text-left', 'w-25', 'mx-auto')
    //const cardAlertHeader = document.createElement('div')
    //cardAlertHeader.classList.add('card-header')
    //const headerCloseButton = document.createElement('button')
    //headerCloseButton.setAttribute('type', 'button')
    //headerCloseButton.classList.add('btn-close')
    //headerCloseButton.setAttribute('aria-label', 'close')
    //cardAlert.textContent = curAlertPost.title;
    //const cardAlertBody = document.createElement('div')
    //const cardAlertBodyP = document.createElement('p')
    //cardAlertBodyP.classList.add('card-text')
    //const cardAlertFooter = document.createElement('div')
    //cardAlertFooter.classList.add('card-footer','text-body-secondary')
    //const footerButtonContainer = document.createElement('div')
    //footerButtonContainer.classList.add('d-flex', 'justify-content-end', 'gap-1')
    //const readButton = document.createElement('a');
    //readButton.setAttribute('href', 'curAlertPost.link')
    //readButton.classList.add('btn', 'btn-primary')
    //const closeButton = document.createElement('a');
    //closeButton.setAttribute('href', '#')
    //closeButton.classList.add('btn', 'btn-secondary')
    //cardAlertHeader.append(headerCloseButton)
    //cardAlert.append(cardAlertHeader)
    //cardAlertBody.append(cardAlertBodyP)
    //cardAlert.append(cardAlertBody)
    //footerButtonContainer.append(readButton, closeButton)
    ////footerButtonContainer.appond()
    //cardAlertFooter.append(footerButtonContainer)
    //cardAlert.append(cardAlertFooter)
}