//import { Modal } from 'bootstrap';

export default  (state) => {
    const currentPost = state.activePost;
    let myModal = document.querySelector('#modal');

    if (!myModal) {
        myModal = document.createElement('div');
        myModal.id = 'modal';
        myModal.classList = 'modal fade';
        myModal.setAttribute('tabindex', '-1');
        myModal.removeAttribute('aria-hidden','true')
        document.body.appendChild(myModal);
        
    }

    //myModal.classList.add('show');
    //myModal.setAttribute('aria-modal','true')
    //myModal.setAttribute('role','dialog')
    //myModal.setAttribute('style','display: block;')

    myModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-title">${currentPost.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>${currentPost.description}</p>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-primary" href="${currentPost.link}" target="_blank">Читать полностью</a>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                </div>
            </div>
        </div>`


    //const pageBody = document.querySelector('body');
    //pageBody.setAttribute('style', 'overflow: hidden;')
    //pageBody.classList.add('modal-open')

    //myModal.addEventListener('show.bs.modal', () => {
      //  myModal.focus();
    //})

    
    //const closeButtons = document.querySelectorAll("[data-bs-dismiss='modal']")
    //console.log(myModal.innerHTML)

    //closeButtons.forEach((button) => {
      //  button.addEventListener('click', () => {
        //    console.log('closeButton2')
          //  state.activePost = '';
          //  state.selectedItem = '';
           // myModal.setAttribute('aria-hidden','true')
           // myModal.setAttribute('style','display: none;')
            //myModal.removeAttribute('role','dialog')
            //myModal.innerHTML = '';
            //pageBody.removeAttribute('style', 'overflow: hidden;')
            //pageBody.classList.remove('modal-open')
        //   // myModal.removeAttribute('id')
        //})
    //})
    
     const modalInstance = new bootstrap.Modal(myModal, {
        backdrop: 'static',
        keyboard: true
    })

   modalInstance.show();

    myModal.addEventListener('hidden.bs.modal', () => {
        state.activePost = '';
        state.selectedItem = '';
    })

    myModal.addEventListener('shown.bs.modal', () => {
        myModal.focus();
    })

    
    
    
    
    
    
    
    //const modal = document.createElement('div')
    //modal.classList.add('modal')
    //modal.setAttribute('id', currentPost.id);
    //modal.setAttribute('aria-labelledby', "exampleModalLabel");
    //modal.setAttribute('aria-hidden', true);
    //modal.setAttribute('tabindex', '-1')
    //const modalDialog = document.createElement('div')
    //modalDialog.classList.add('modal-dialog')
    //const modalContent = document.createElement('div')
    //modalContent.classList.add('modal-contant')
    //const modalHeader = document.createElement('div')
    //modalHeader.classList.add('modal-header')    
    //const headerText = document.createElement('h5')
    //headerText.classList.add('modal-title')
    //headerText.textContent = currentPost.title;
    //headerText.setAttribute('id', currentPost )
    //const headerCloseButton = document.createElement('button')
    //headerCloseButton.setAttribute('type', 'button')
    //headerCloseButton.classList.add('btn-close')
    //headerCloseButton.setAttribute('data-bs-dismiss', 'modal')
    //headerCloseButton.setAttribute('aria-label', 'Close')
    //const modalBody = document.createElement('div')
    //const modalBodyP = document.createElement('p')
    //modalBodyP.textContent = currentPost.title;
    //const modalFooter = document.createElement('div')
    //modalFooter.classList.add('modal-footer')
    //const readButton = document.createElement('button');
    //readButton.setAttribute('type', 'button')
    //readButton.setAttribute('href', 'curAlertPost.link')
    //readButton.classList.add('btn', 'btn-primary')
    //readButton.setAttribute('id', currentPost.id)
    //readButton.textContent = 'Read';
    //const closeButton = document.createElement('button');
    //closeButton.setAttribute('type', 'button')
    //closeButton.classList.add('btn', 'btn-secondary')
    //closeButton.setAttribute('data-bs-dismiss', 'modal')
    //closeButton.textContent = 'Close';
    //modalHeader.append(headerText, headerCloseButton)
    //modalBody.append(modalBodyP)
    //modalFooter.append(readButton, closeButton)
    //modalContent.append(modalHeader, modalBody, modalFooter)
    //modalDialog.append(modalContent)
    //modal.append(modalDialog)

    //const liPost = document.getElementById.append(modal)

    

    //const myModal = document.getElementById('modal');
    
    //myModal.addEventListener('show.bs.modal', (e) => {
       // let button = e.relatedTarget
        //console.log(e.ralatedTarget)
        // Extract info from data-bs-* attributes
        //let recipient = button.getAttribute('data-bs-whatever')
        // If necessary, you could initiate an AJAX request here
        // and then do the updating in a callback.
        //
        // Update the modal's content.
        //var modalTitle = exampleModal.querySelector('.modal-title')
        //var modalBodyInput = exampleModal.querySelector('.modal-body input')

        //modalTitle.textContent = 'New message to ' + recipient
        //modalBodyInput.value = recipient
   // })
    
    //myModal.append(modal)

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


//const currentPost = state.activePost;
   // let myModal = document.querySelector('#modal');

   // if (!myModal) {
    //    myModal = document.createElement('div');
    //    myModal.id = 'modal';
    //    myModal.classList = 'modal fade';
    //    myModal.setAttribute('tabindex', '-1');
    //    myModal.removeAttribute('aria-hidden','true')
    //    doocument.body.appendChild(myModal);
        
   // }

    //myModal.classList.add('show');
    //myModal.setAttribute('aria-modal','true')
    //myModal.setAttribute('role','dialog')
    //myModal.setAttribute('style','display: block;')

  //  myModal.innerHTML = `
   //     <div class="modal-dialog">
   //         <div class="modal-content">
    //            <div class="modal-header">
     //               <h5 class="modal-title" id="modal-title">${currentPost.title}</h5>
    //                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //            </div>
    //            <div class="modal-body">
    //                <p>${currentPost.description}</p>
    //            </div>
    //            <div class="modal-footer">
    //                <a class="btn btn-primary" href="${currentPost.link}" target="_blank">Читать полностью</a>
    ///                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
    //            </div>
    //        </div>
    //    </div>`


    //const pageBody = document.querySelector('body');
    //pageBody.setAttribute('style', 'overflow: hidden;')
    //pageBody.classList.add('modal-open')
    //const modalInstance = new bootstrap.Modal(myModal, {
    //    backdrop: 'static',
    //    keyboard: true
    //})

   // modalInstance.show();

    //myModal.addEventListener('hidden.bs.modal', () => {
      //  state.activePost = '';
       // state.selectedItem = '';
    //})

    //myModal.addEventListener('shown.bs.modal', () => {
        //myModal.focus();
    //})

    