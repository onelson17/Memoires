const nav = document.querySelectorAll("nav li")
const sections = document.querySelectorAll("section")


export default function router() {
    const ongletSauvegarde = localStorage.getItem("ongletActif")
    if (ongletSauvegarde) {
        const target = document.getElementById(ongletSauvegarde)
        nav.forEach((navItem) => {
            navItem.classList.remove("active")
        })
        sections.forEach((section) => {
            section.classList.remove("active")
        })
        document.querySelector(`[data-id="${ongletSauvegarde}"]`).classList.add("active")
        target.classList.add("active")
    } else {
        const target = document.getElementById("accueil")
        document.querySelector(`[data-id="accueil"]`).classList.add("active")
        target.classList.add("active")
    }

    nav.forEach((li) => {
        li.addEventListener("click", (event) => {
            event.preventDefault()
        nav.forEach((navItem) => {
            navItem.classList.remove("active")
        })
        const target = document.getElementById(li.dataset.id)
        sections.forEach((section) => {
            section.classList.remove("active")
        })
        localStorage.setItem("ongletActif", li.dataset.id)
        li.classList.add("active")
        target.classList.add("active")
    })
})
} 