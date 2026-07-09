export function afficherCartes() {
    const containerCard = document.querySelector(".card-container")
    containerCard.innerHTML = ""
    const cartes = JSON.parse(localStorage.getItem("cartes")) || []
    const livres = JSON.parse(localStorage.getItem("livres")) || []
 
    cartes.forEach((card) => {
        const memoire = document.createElement("article")
        const cardBook = livres.find((book) => {
        return book.id === Number(card.selected) 
    })
        const titreLivre = cardBook ? cardBook.titre : "Livre inconnu"
        memoire.innerHTML =`
            <div class="card-header">
                <h2>${card.title}</h2>
                <p>inspiré du livre ${titreLivre}</p>
            </div>
            <p class="card-resume">${card.resume}</p>
            <div class="card-footer">
                <span>Pages ${card.readx} → ${card.ready}</span>
                <span>${card.date} à ${card.localisation}</span>
            </div>
        `
        containerCard.appendChild(memoire)
    })

}