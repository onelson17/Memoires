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

export function bookSelected() {
    const livres = JSON.parse(localStorage.getItem("livres")) || []
    const selectBook = document.getElementById("books-drop")
    selectBook.addEventListener("change", (event) => {
        const bookActual = selectBook.value
        const selectedBook = livres.find((book) => {
            return book.id === Number(bookActual)
        })
        const pageX = document.getElementById("page-x")
        pageX.value = selectedBook.progression
        if (bookActual !== "" ) {
        const title = document.getElementById("resume-title")
        const texteArea = document.getElementById("text-zone")
        title.disabled = false
        texteArea.disabled = false
    }
    })
    
}