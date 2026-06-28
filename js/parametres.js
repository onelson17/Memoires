export function ajoutLivres() {
    const livres = JSON.parse(localStorage.getItem("livres")) || []
    const modale = document.getElementById("modal-livre")
    const addBooks = document.getElementById("add-book")
    const annuler = document.getElementById("cancel")
    const formAddBooks = document.getElementById("modal-form")

    // OUVRIR / FERMER LA MODALE // 
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
    // RÉCUPÉRATION DES DONNÉES DES CHAMPS //
    formAddBooks.addEventListener("submit", (event) => {
        event.preventDefault()

        const bookTitle = document.getElementById("titre").value
        const authorName = document.getElementById("auteur").value
        const readPages = document.getElementById("pages").value

        const livre = {
        titre: bookTitle,
        auteur: authorName,
        pages: readPages
    }
    livres.push(livre)
    localStorage.setItem("livres", JSON.stringify(livres))
    formAddBooks.reset()
    modale.close()
    })
}
