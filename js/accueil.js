import { afficherCartes } from "./ecrits.js"
import { showToast } from "./utils.js"
import { majdDashboard } from "./parametres.js"

// ALIMENTATION DU DROPDOWN AVEC LES LIVRES DU LOCALSTORAGE //
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
    })

    pageX.value = "0"
}

// SÉLECTION D'UN LIVRE - PRÉ-REMPLISSAGE PAGE-X ET ACTIVATION DES CHAMPS //
export function bookSelected() {
    const title = document.getElementById("resume-title")
    const texteArea = document.getElementById("text-zone")
    const selectBook = document.getElementById("books-drop")

    selectBook.addEventListener("change", (event) => {
        const livres = JSON.parse(localStorage.getItem("livres")) || []
        const bookActual = selectBook.value
        const selectedBook = livres.find((book) => book.id === Number(bookActual))
        const pageX = document.getElementById("page-x")

        if (bookActual !== "") {
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

// VALIDATION ET SOUMISSION DU FORMULAIRE DE LECTURE //
export function submitTaskform() {
    const taskForm = document.querySelector(".task-form")
    const livre = document.getElementById("books-drop")
    const pageX = document.getElementById("page-x")
    const pageY = document.getElementById("page-y")
    const title = document.getElementById("resume-title")
    const zoneTexte = document.getElementById("text-zone")
    const valider = document.getElementById("btn-submit")
    const localisation = document.getElementById("localisation")

    // VÉRIFICATION DES CONDITIONS POUR ACTIVER LE BOUTON VALIDER //
    function btnCheck() {
        if (livre.value && pageY.value && title.value && zoneTexte.value.length >= 20) {
            valider.disabled = false
        } else {
            valider.disabled = true
        }
    }

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const livres = JSON.parse(localStorage.getItem("livres")) || []

        if (!livre.value || !pageX.value || !pageY.value || !title.value || zoneTexte.value.length < 20) return

        // MISE À JOUR DE LA PROGRESSION DU LIVRE //
        const selectedBook = livres.find((book) => book.id === Number(livre.value))
        selectedBook.progression = pageY.value
        localStorage.setItem("livres", JSON.stringify(livres))

        // CRÉATION ET SAUVEGARDE DE LA CARTE EN MÉMOIRES //
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

        // MISE À JOUR DE L'INTERFACE APRÈS SOUMISSION //
        afficherCartes()
        taskForm.reset()
        title.disabled = true
        zoneTexte.disabled = true
        valider.disabled = true

        // DÉTECTION LIVRE TERMINÉ //
        if (Number(selectedBook.progression) >= Number(selectedBook.pages)) {
            const livresTermine = JSON.parse(localStorage.getItem("livresTermine")) || []
            livresTermine.push(selectedBook)
            localStorage.setItem("livresTermine", JSON.stringify(livresTermine))
            const livresMAJ = livres.filter((book) => book.id !== selectedBook.id)
            localStorage.setItem("livres", JSON.stringify(livresMAJ))
            alimenterDropdown()
            showToast("🎉 Livre terminé ! Félicitations !")
        }

        // SAUVEGARDE DE LA DATE DE VALIDATION ET DÉSACTIVATION 24H //
        const lastValidation = new Date().toLocaleDateString('fr-FR')
        localStorage.setItem("lastValidation", lastValidation)
        verifDate()

        // FERMETURE DU VOLET APRÈS VALIDATION //
        const content = document.querySelector(".task-content")
        const toggle = document.querySelector(".task-toggle")
        content.style.maxHeight = "0px"
        toggle.classList.remove("open")

        const jetons = Number(localStorage.getItem("jetons") || 0) + 1
        localStorage.setItem("jetons", jetons)
        majdDashboard()
    })
    
        taskForm.addEventListener("input", () => btnCheck())
        livre.addEventListener("change", () => btnCheck())
    }

// VÉRIFICATION DE LA DATE - DISABLED 24H APRÈS VALIDATION //
export function verifDate() {
    const date = localStorage.getItem("lastValidation")
    const dailyTasks = document.querySelector(".daily-tasks")
    const toggle = document.querySelector(".task-toggle")

    if (date === new Date().toLocaleDateString('fr-FR')) {
        dailyTasks.classList.add("disabled")
        dailyTasks.classList.add("validated")
        toggle.classList.add("validated")
    } else {
        dailyTasks.classList.remove("disabled", "validated")
        toggle.classList.remove("validated")
    }
}

// ÉCRITURE LIBRE - PLEIN ÉCRAN ET TOOLBAR DE FORMATAGE //
export function ecritureLibre() {
    const texteLibre = document.getElementById("free-texte")
    const titleLibre = document.getElementById("writting-title")
    const localisationLibre = document.getElementById("localisation-free")
    const toolBar = document.querySelector(".toolbar")

    // ACTIVATION DU MODE PLEIN ÉCRAN AU FOCUS //
    texteLibre.addEventListener("focus", () => {
        texteLibre.classList.add("fullscreen")
        toolBar.classList.add("toolbar-active")
    })

    // DÉSACTIVATION DU MODE PLEIN ÉCRAN AU BLUR //
    texteLibre.addEventListener("blur", () => {
        texteLibre.classList.remove("fullscreen")
    })

    // PRÉVENTION DU BLUR AU CLIC SUR LA TOOLBAR //
    toolBar.addEventListener("mousedown", (event) => {
        event.preventDefault()
    })

    // GESTION DES ACTIONS DE LA TOOLBAR //
    toolBar.addEventListener("click", async (event) => {
        if (event.target.tagName !== "BUTTON") return
        const action = event.target.dataset.action

        switch (action) {
            case "bold":
                document.execCommand("bold")
                break

            case "italic":
                document.execCommand("italic")
                break

            case "underline":
                document.execCommand("underline")
                break

            // SURLIGNAGE AVEC TOGGLE ON/OFF //
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

            // MAJUSCULES AVEC TOGGLE ON/OFF //
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

            // CORRECTION IA - NÉCESSITE UN BACKEND (DÉSACTIVÉ POUR L'INSTANT) //
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

            // SOUMISSION DU FORMULAIRE D'ÉCRITURE LIBRE //
            case "submit":
                if (titleLibre.value === "") {
                    showToast("Veuillez ajouter un titre !")
                    return
                }
                if (texteLibre.innerText.length < 20) {
                    showToast("Écrivez au moins 20 caractères")
                    return
                }

                const localisation = localisationLibre.value === "" ? "Quelque part" : localisationLibre.value
                const freeCard = {
                    title: titleLibre.value,
                    texte: texteLibre.innerText,
                    date: new Date().toLocaleDateString('fr-FR'),
                    localisation: localisation,
                    type: "libre",
                    id: Date.now()
                }
                const cartes = JSON.parse(localStorage.getItem("cartes")) || []
                cartes.push(freeCard)
                localStorage.setItem("cartes", JSON.stringify(cartes))
                afficherCartes()
                titleLibre.value = ""
                texteLibre.innerHTML = ""
                localisationLibre.value = ""
                texteLibre.classList.remove("fullscreen")
                break
        }
    })
}
export function initAccordion() {
    const toggle = document.querySelector(".task-toggle")
    const content = document.querySelector(".task-content")
    toggle.addEventListener("click", (event) => {
        if (!content.style.maxHeight || content.style.maxHeight === "0px") {
            content.style.maxHeight = content.scrollHeight + "px"
            toggle.classList.add("open")
        } else {
            content.style.maxHeight = "0px"
            toggle.classList.remove("open")
        }
    })
}