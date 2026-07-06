export function alimenterDropdown() {
const livres = JSON.parse(localStorage.getItem("livres")) || []
const selectBook = document.getElementById("books-drop")
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

}