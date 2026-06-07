const nav = document.querySelectorAll("nav li")
const sections = document.querySelectorAll("section")


export default function router() {
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
        li.classList.add("active")
        target.classList.add("active")
    })
})
}