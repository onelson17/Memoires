import { majdDashboard } from "./parametres.js"


export function afficherCartes() {
    const containerCard = document.querySelector(".card-container")
    containerCard.innerHTML = ""
    const cartes = JSON.parse(localStorage.getItem("cartes")) || []
    const livres = JSON.parse(localStorage.getItem("livres")) || []
 
    cartes.forEach((card) => {
        const memoire = document.createElement("article")
 
        if (card.type === "libre") {
            // TEMPLATE CARTE ÉCRITURE LIBRE //
            memoire.innerHTML = `
                <div class="card-header">
                    <h2>${card.title}</h2>
                </div>
                <p class="card-resume">${card.texte}</p>
                <div class="card-footer">
                    <span>${card.date}</span>
                    <span>${card.localisation}</span>
                    <button data-action="menu" data-id="${card.id}">⋯</button>
                    <div class="card-settings">   
                        <button data-action="supprimer" data-id="${card.id}">Supprimer</button>
                        <button data-action="partager" data-id="${card.id}">Partager</button>
                    </div>
                </div>
            `
        } else {
            // TEMPLATE CARTE LECTURE //
            const cardBook = livres.find((book) => book.id === Number(card.selected))
            const titreLivre = cardBook ? cardBook.titre : "Livre inconnu"
 
            memoire.innerHTML = `
                <div class="card-header">
                    <h2>${card.title}</h2>
                    <p>Inspiré de : ${titreLivre}</p>
                </div>
                <p class="card-resume">${card.resume}</p>
                <div class="card-footer">
                    <span>Pages ${card.readx} → ${card.ready}</span>
                    <span>${card.date} à ${card.localisation}</span>
                    <button data-action="menu" data-id="${card.id}">⋯</button>
                    <div class="card-settings">   
                        <button data-action="supprimer" data-id="${card.id}">Supprimer</button>
                        <button data-action="partager" data-id="${card.id}">Partager</button>
                    </div>
                </div>
            `
        }
        
        containerCard.appendChild(memoire)
    })
   
}


export function initCartes() {
    
    
    const containerCard = document.querySelector(".card-container")
    let cardToDelete = null
    const modalConfirm = document.getElementById("modal-confirm")
    containerCard.addEventListener("click", (event) => {
            
            const option = event.target.dataset.action
            switch (option) {
                case "partager" :
                    const cartes = JSON.parse(localStorage.getItem("cartes")) || []
                    const cardToShare = cartes.find((card) => card.id === Number(event.target.dataset.id))
                    navigator.share({
                        title: cardToShare.title,
                        text: cardToShare.resume || cardToShare.texte
                    })
                break

                case "supprimer" :
                    cardToDelete = event.target.dataset.id
                    modalConfirm.showModal()

                   
                break

                case "menu" :
                    event.target.nextElementSibling.classList.toggle("visible")
                
                break
            }
        })
    
        document.getElementById("delete-confirm").addEventListener("click", (event) => {
            const cartes = JSON.parse(localStorage.getItem("cartes")) || []
            const cartesMAJ = cartes.filter((card) => card.id !== Number(cardToDelete))
                localStorage.setItem("cartes", JSON.stringify(cartesMAJ))
                cardToDelete = null
                afficherCartes()
                majdDashboard()
                modalConfirm.close()
        })

        document.getElementById("delete-cancel").addEventListener("click", (event) => {
            modalConfirm.close()
        })
}