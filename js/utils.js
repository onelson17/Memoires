export function showToast(message) {
    const toast = document.createElement("div")
    toast.classList.add("toast")
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
}