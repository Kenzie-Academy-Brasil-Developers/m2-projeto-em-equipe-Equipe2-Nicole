import { register } from "../../Scripts/api.js";

const btnReg = document.querySelector(".btnBrand")

const eventRegister = () => {
    const form = document.querySelector("#register")
    const elements = [...form.elements]

    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const body = {}
        elements.forEach((elem) => {
            if (elem.tagName == "INPUT" && elem.value != "") {
                body[elem.name] = elem.value
            }
        })
        await register(body, btnReg)
    })
}
eventRegister()

function buttonSpinner() {

    btnReg.addEventListener("click", () => {
        btnReg.innerText = ""
        const spinner = document.createElement("i")
        spinner.classList = "imgLoading fa-solid fa-spinner"
        spinner.style = "color: black"
        btnReg.append(spinner)
    })
}
buttonSpinner()

