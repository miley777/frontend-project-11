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

}


    