export function ajoutLivres() {
    const livres = JSON.parse(localStorage.getItem("livres")) || []
    const modale = document.getElementById("modal-livre")
    const addBooks = document.getElementById("add-book")
    const annuler = document.getElementById("cancel")
    addBooks.addEventListener("click", (event) => {
        modale.showModal()
    })
    annuler.addEventListener("click", (event) => {
        modale.close()
    })
    modale.addEventListener("click", (event) => {
        if (event.target === modale) {
            modale.close()
        }
    })

}
