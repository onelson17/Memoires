import { alimenterDropdown } from "./accueil.js"
import { showToast } from "./utils.js"


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
export function majdDashboard() {

    const cartes = JSON.parse(localStorage.getItem("cartes")) || []
    const livresTermine = JSON.parse(localStorage.getItem("livresTermine")) || []
    let trophee = 0
    const pagesLues = cartes.reduce((total, card) => {
        if (card.type !== "libre") {
            return total + Number(card.ready)
        }
        return total 
    }, 0)

    const totalLivreTermine = livresTermine.length
    const totalPenseeEcrites = cartes.filter(card => card.type === "libre").length

    document.querySelector('[data-stat="pages"]').textContent = pagesLues
    document.querySelector('[data-stat="livres"]').textContent = totalLivreTermine
    document.querySelector('[data-stat="pensee"]').textContent = totalPenseeEcrites
    const jetons = Number(localStorage.getItem("jetons") || 0)
    document.querySelector('[data-stat="jetons"]').textContent = jetons

    if (jetons === 365) {
        
       showToast(`Félicitations ! Vous êtes arrivé au terme de l'aventure.`)
        
    }
    if (jetons === 270) {
        showToast('Érudit débloqué ! Neuf mois, vous êtes une inspiration.')
    }
    if (jetons === 180){
        showToast("Aventurier des mots débloqué ! Six mois, vous êtes exemplaire.")
    }
    if (jetons === 90){
        showToast("Passionné débloqué ! Trois mois de lecture, c'est remarquable.")
    }
    if (jetons === 30){
        showToast("Lecteur Assidu débloqué ! Un mois entier, chapeau !")
    }
    if (jetons === 21){
        showToast("Lecteur Novice débloqué ! 21 jours, l'habitude est ancrée.")
    }
    if (jetons === 14){
        showToast("Étudiant débloqué ! Vous construisez une belle habitude.")
    }
    if (jetons === 7){
        showToast("Curieux débloqué ! La curiosité est le début de tout.")
    }

    if (jetons >= 365) trophee = 8
    else if (jetons >= 270) trophee = 7
    else if (jetons >= 180) trophee = 6
    else if (jetons >= 90) trophee = 5
    else if (jetons >= 30) trophee = 4
    else if (jetons >= 21) trophee = 3
    else if (jetons >= 14) trophee = 2
    else if (jetons >= 7) trophee = 1
    document.querySelector('[data-stat="trophee"]').textContent = trophee
}