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
    const livres = JSON.parse(localStorage.getItem("livres")) || []
    const selectBook = document.getElementById("books-drop")
    selectBook.addEventListener("change", (event) => {
        const bookActual = selectBook.value
        const selectedBook = livres.find((book) => {
            return book.id === Number(bookActual)
        })
        const pageX = document.getElementById("page-x")
        if (bookActual !== "" ) {
        pageX.value = selectedBook.progression
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
    function btnCheck() {
        const valider = document.getElementById("btn-submit")
        if (livre.value && pageY.value && title.value && zoneTexte.value.length >= 20) {
            valider.disabled = false
        } else {
            valider.disabled = true
        }}

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault()
    if (!livre.value || !pageX.value || !pageY.value || !title.value || !zoneTexte.value.length >= 20) {
        return
    } 
    })
    taskForm.addEventListener("input", (event) => {
        btnCheck()
         })
    livre.addEventListener("change", (event) => {
        btnCheck()
    })
   
}