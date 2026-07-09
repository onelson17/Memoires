import { alimenterDropdown } from "./accueil.js"
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
        id: Date.now(),
        titre: bookTitle,
        auteur: authorName,
        pages: readPages,
        progression: 0
    }
    livres.push(livre)
    localStorage.setItem("livres", JSON.stringify(livres))
    formAddBooks.reset()
    modale.close()
    afficherLivres()
    alimenterDropdown()
    })
    
}

export function afficherLivres() {
    const listeLivres = document.querySelector(".book-list")
    listeLivres.innerHTML = ""
    const livres = JSON.parse(localStorage.getItem("livres")) || []
    livres.forEach((book) => {
        const bookItem = document.createElement("article")
        bookItem.innerHTML =
            `<h3>${book.titre}</h3>
            <p>${book.auteur}</p>
            <p>${book.pages}</p>
            <button data-id="${book.id}">Supprimer</button>`

    listeLivres.appendChild(bookItem)
    })
    listeLivres.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") { 
        const deleted = event.target.dataset.id 
        const livresMAJ = livres.filter((book) => {
            return book.id !== Number(deleted)
        })
        localStorage.setItem("livres", JSON.stringify(livresMAJ))
        afficherLivres()
        alimenterDropdown()
    }})
    
}