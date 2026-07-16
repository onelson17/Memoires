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
// REMPLISSAGE DU DROP DOWN - AFFICHAGE DE LA PROGRESSION DE LECTURE - DISABLED UNIQUEMENT SI LIVRE SELECTIONNÉ // 
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

    export function ecritureLibre() {
        const texteLibre = document.getElementById("free-texte")
        const titleLibre = document.getElementById("writting-title")
        const localisationLibre = document.getElementById("localisation-free")
        const toolBar = document.querySelector(".toolbar")

        texteLibre.addEventListener("focus", (event) => {
            texteLibre.classList.add("fullscreen")
            toolBar.classList.add("toolbar-active")
        })
        texteLibre.addEventListener("blur", (event) => {
            texteLibre.classList.remove("fullscreen")
        })
        toolBar.addEventListener("click", async (event) => {
           if (event.target.tagName === "BUTTON") {
            const action = event.target.dataset.action
            switch(action) {
                case "bold":
                    document.execCommand("bold")
                break

                case "italic":
                    document.execCommand("italic")
                break
                
                case "underline": 
                    document.execCommand("underline")
                break

                case "hiliteColor":
                    const btnHighlight = event.target
                    if (btnHighlight.dataset.active === "true") {
                        document.execCommand("hiliteColor", false, "transparent")
                        btnHighlight.dataset.active = "false"
                    } else {
                        document.execCommand("hiliteColor", false, "yellow")
                        btnHighlight.dataset.active = "true"
                    }
                break

                case "uppercase": 
                        const selection = window.getSelection()
                            if (selection.rangeCount > 0) {
                                const range = selection.getRangeAt(0)
                                const text = range.toString()
                                const newText = text === text.toUpperCase() ? text.toLowerCase() : text.toUpperCase()
                                range.deleteContents()
                                range.insertNode(document.createTextNode(newText))
                            }
                break 

                case "reset":
                    texteLibre.innerHTML = ""
                break

                case "correction":
                    const response = await fetch("https://api.anthropic.com/v1/messages", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            model: "claude-sonnet-4-6",
                            max_tokens: 1000,
                            messages: [{ role: "user", content: `Corrige ce texte sans changer le sens : ${texteLibre.innerText}` }]
                        })
                    })
                    const data = await response.json()
                    texteLibre.innerText = data.content[0].text
                break

                case "submit":

                    if (titleLibre.value === ""){
                        return
                    }
                    const localisation = localisationLibre.value === "" ? "Quelque part" : localisationLibre.value
                    const freeCard = {
                        title: titleLibre.value,
                        texte: texteLibre.innerText,
                        date: new Date().toLocaleDateString('fr-FR'),
                        localisation: localisation,
                        type:"libre",
                        id: Date.now()
                    }
                    const cartes = JSON.parse(localStorage.getItem("cartes")) || []
                    cartes.push(freeCard)
                    localStorage.setItem("cartes", JSON.stringify(cartes))
                    afficherCartes()
                    titleLibre.value =""
                    texteLibre.innerHTML =""
                    localisationLibre.value = ""
                    texteLibre.classList.remove("fullscreen")
                break
            }
           }
        })
        toolBar.addEventListener("mousedown", (event) => {
                event.preventDefault()
            })
    }