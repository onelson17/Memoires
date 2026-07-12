import { afficherCartes } from "./ecrits.js"


export function alimenterDropdown() {
const livres = JSON.parse(localStorage.getItem("livres")) || []
const selectBook = document.getElementById("books-drop")
const pageX = document.getElementById("page-x")
selectBook.innerHTML = ""
const dropdItem = document.createElement("option")
dropdItem.textContent = "Choisissez votre lecture du jour"
dropdItem.value = ""
selectBook.appendChild(dropdItem)
livres.forEach((book) => {
    const dropOption = document.createElement("option")
    dropOption.classList.add("dropdown-option")
    dropOption.value = book.id
    dropOption.innerHTML = `${book.titre}`
    selectBook.appendChild(dropOption)
});
pageX.value = "0"
}
// REMPLISSAGE DU DROP DOWN - AFFIACHE DE LA PROGRESSION DE LECTURE - DISABLED UNIQUEMENT SI LIVRE SELECTIONNÉ // 
export function bookSelected() {
    const title = document.getElementById("resume-title")
    const texteArea = document.getElementById("text-zone")
    const selectBook = document.getElementById("books-drop")
    selectBook.addEventListener("change", (event) => {
        const livres = JSON.parse(localStorage.getItem("livres")) || []
        const bookActual = selectBook.value
        const selectedBook = livres.find((book) => {
            return book.id === Number(bookActual)
        })
        const pageX = document.getElementById("page-x")
        if (bookActual !== "" ) {
        pageX.value = selectedBook.progression
        document.getElementById("page-y").min = selectedBook.progression
        title.disabled = false
        texteArea.disabled = false

        } else {

        title.disabled = true
        texteArea.disabled = true

        }
    })
}

// VALIDATION DU FORMULAIRE & CONDITIONS //

export function submitTaskform() {

    const taskForm = document.querySelector(".task-form")
    const livre = document.getElementById("books-drop")
    const pageX = document.getElementById("page-x")
    const pageY = document.getElementById("page-y")
    const title = document.getElementById("resume-title")
    const zoneTexte = document.getElementById("text-zone")
    const valider = document.getElementById("btn-submit")
    const localisation = document.getElementById("localisation")
    
    function btnCheck() {
        if (livre.value && pageY.value && title.value && zoneTexte.value.length >= 20) {
            valider.disabled = false
        } else {
            valider.disabled = true
        }}

    taskForm.addEventListener("submit", (event) => {
        const livres = JSON.parse(localStorage.getItem("livres")) || []
        event.preventDefault()
        if (!livre.value || !pageX.value || !pageY.value || !title.value || zoneTexte.value.length < 20) {
        return
    } 
        const selectedBook = livres.find((book) => {
        return book.id === Number(livre.value)
    })
        selectedBook.progression = pageY.value
        localStorage.setItem("livres", JSON.stringify(livres))

        const carte = {
            title: title.value,
            resume: zoneTexte.value,
            selected: livre.value,
            readx: pageX.value,
            ready: pageY.value,
            id: Date.now(),
            date: new Date().toLocaleString('fr-FR'),
            localisation: localisation.value
 
        }
        const cartes = JSON.parse(localStorage.getItem("cartes")) || []
        cartes.push(carte)
        localStorage.setItem("cartes", JSON.stringify(cartes))
        afficherCartes()
        taskForm.reset()
        title.disabled = true 
        zoneTexte.disabled = true
        valider.disabled = true

        if(Number(selectedBook.progression) >= Number(selectedBook.pages)) {
            const livresTermine = JSON.parse(localStorage.getItem("livresTermine")) || []
            livresTermine.push(selectedBook)
            localStorage.setItem("livresTermine", JSON.stringify(livresTermine))
            const livresMAJ = livres.filter((book) => book.id !== selectedBook.id)
            localStorage.setItem("livres", JSON.stringify(livresMAJ))
            alimenterDropdown()
            const toast = document.createElement("div")
            toast.classList.add("toast")
            toast.textContent = "Livre terminé!"
            document.body.appendChild(toast)
            setTimeout(() => {
                toast.remove()
            }, 3000)
            
        }

        const lastValidation = new Date().toLocaleDateString('fr-FR')
        localStorage.setItem("lastValidation", lastValidation)
        verifDate()
    })

    taskForm.addEventListener("input", (event) => {
        btnCheck()
         })
    livre.addEventListener("change", (event) => {
        btnCheck()
    })
}

export function verifDate() {
    const date = localStorage.getItem("lastValidation")
    if (date === new Date().toLocaleDateString('fr-FR')) {
        document.querySelector(".daily-tasks").classList.add("disabled")
    }
}