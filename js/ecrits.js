export function afficherCartes() {
    const containerCard = document.querySelector(".card-container")
    containerCard.innerHTML = ""
    const cartes = JSON.parse(localStorage.getItem("cartes")) || []
    cartes.forEach((card) => {
        const memoire = document.createElement("article")
        memoire.innerHTML =`
            <div class="card-header">
                <h2>${card.title}</h2>
            </div>
            <p class="card-resume">${card.resume}</p>
            <div class="card-footer">
                <span>Pages ${card.readx} → ${card.ready}</span>
                <span>${card.date}</span>
            </div>
        `
        containerCard.appendChild(memoire)
    })

}