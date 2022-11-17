
const openBtnEl = document.querySelector(".footer__button")
const closeBtnEl=document.querySelector(".footer-modal-close-btn")
const modalOurTeamEl=document.querySelector(".backdrop-team")
const backdrop=document.querySelector(".backdrop-team")
openBtnEl.addEventListener("click", openModal)
function openModal() {
    modalOurTeamEl.classList.remove("hidden") 
    closeBtnEl.addEventListener("click",closeModal)
    document.body.addEventListener("keydown",closeModalEsc)
    backdrop.addEventListener("click",event=>{
        if(event.target===backdrop)
        {
            return closeModal()   
        }
    })
}
function closeModal(){
    modalOurTeamEl.classList.add("hidden")
    closeBtnEl.removeEventListener("click",closeModal)
    document.body.removeEventListener("keydown",closeModalEsc)
}
function closeModalEsc (e){
    if(e.key==="Escape")
    {
        return closeModal()
    }
}