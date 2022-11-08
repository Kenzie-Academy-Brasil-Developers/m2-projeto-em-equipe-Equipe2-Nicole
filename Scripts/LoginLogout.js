import { toast } from "./toast.js"

export const verifyLogin = () => {
    const user = localStorage.getItem('TokenLogin') || ""
    if (user == "" || user == null || user == 'undefined') {
        window.location.replace("../login/index.html");
    }
};

export const logout = () => {
    const btnLogout = document.getElementById('btnLogout')
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('TokenLogin')
        toast("Você está saindo", "Aguardamos sua visita")
        setTimeout(() => {
            window.location.replace("../login/index.html");
        }, 2300);
    })
}

const body = document.querySelector('body')
export function lockScroll() {
    window.scroll(0, 0)
    body.style.overflow = 'hidden'
}

export function unlockScroll() {
    body.style.overflow = 'auto'
}
