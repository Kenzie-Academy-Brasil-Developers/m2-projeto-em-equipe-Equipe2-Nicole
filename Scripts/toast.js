export const toast = (title, message) => {
    const body = document.querySelector("body")

    const containerToast = document.createElement("div")
    containerToast.classList.add("div-toast")


    const toastHead = document.createElement("div")
    toastHead.classList.add("div-toast-head")

    const iconToast = document.createElement("i")
    iconToast.classList = ("fa-solid fa-check-double")
    iconToast.style = "color: white"

    const toastTitle = document.createElement("h2")
    toastTitle.classList.add("toast-title")
    toastTitle.innerText = title

    const toastText = document.createElement("p")
    toastText.classList.add("toast-text")
    toastText.innerHTML = message
    if (title == "Erro!") {
        iconToast.classList = ("fa-solid fa-circle-exclamation")
        containerToast.classList.add("div-toastRed")
        iconToast.style = "color: white; font-size: 28px;"
        toastTitle.style = "color: white"
        toastText.style = "color: white"
        
    }

    toastHead.append(iconToast, toastTitle)
    containerToast.append(toastHead, toastText)

    body.appendChild(containerToast)
}
