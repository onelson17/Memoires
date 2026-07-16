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
                </div>
            `
        }
 
        containerCard.appendChild(memoire)
    })
}