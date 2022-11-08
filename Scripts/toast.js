export const toast = (title, message) => {
    const body = document.querySelector("body")

    const containerToast = document.createElement("div")
    containerToast.classList.add("div-toast")


    const toastHead = document.createElement("div")
    toastHead.classList.add("div-toast-head")

    const iconToast = document.createElement("i")
    iconToast.classList = ("fa-solid fa-check")
    iconToast.style = "color: green"

    const toastTitle = document.createElement("h2")
    toastTitle.classList.add("toast-title")
    toastTitle.innerText = title

    const toastText = document.createElement("p")
    toastText.classList.add("toast-text")
    toastText.innerHTML = message

    if (title == "Erro!") {
        iconToast.classList = ("fa-solid fa-x")
        iconToast.style = "color: red"
        toastTitle.style = "color: red"
        toastText.style = "color: red"
    }

    toastHead.append(iconToast, toastTitle)
    containerToast.append(toastHead, toastText)

    body.appendChild(containerToast)
}
