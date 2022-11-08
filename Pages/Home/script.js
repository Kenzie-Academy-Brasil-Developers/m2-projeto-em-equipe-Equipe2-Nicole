import { getAllPets, deletePet, adotePet } from '../../scripts/api.js'
import { verifyLogin, logout, lockScroll, unlockScroll } from '../../scripts/LoginLogout.js'

verifyLogin()
logout()

const petList = document.getElementById('petList')
const main = document.querySelector('main')
let allPetsList = await getAllPets()
let avaliablePets = allPetsList.filter(pet => (pet.available_for_adoption))

const trackBttns = () => {
    let btns = [...petList.getElementsByTagName('a')]

    btns.map(bttn => {
        bttn.addEventListener('click', () => {
            if (bttn.id[0] == 'd') {
                deletePetModal(bttn.id.slice(7))
            } else if (bttn.id[0] == 'a') {
                adotePetModal(bttn.id.slice(6))
            }
        })
    })
}

function renderAllPets(list) {
    petList.innerHTML = ''
    list.map(pet => {
        petList.insertAdjacentHTML('beforeend', `
        <li class="petCard">
            <span><img src="${pet.avatar_url}" id="img-${pet.id}" alt=""></span>
                <div class="pet">
                    <h2 class="petName">${pet.name}</h2>
                    <h2 class="petSpecies">${pet.species}</h2>
                    <a class="btnDelete" id="delete-${pet.id}"><i class="fa-solid fa-trash"></i></a>
                </div>                    
            
        </li>
        `)
        let lastPetbtn = document.getElementById(`delete-${pet.id}`)
        if (pet.available_for_adoption) {
            lastPetbtn.insertAdjacentHTML('beforebegin', `
                <a class="btnSmallSuccess" id="adote-${pet.id}">Me adote<b class='exclamation'>!</b></a>
            `)
        } else {
            lastPetbtn.insertAdjacentHTML('beforebegin', `
                <a class="btnSmallAlert" disabled>Adotado!</a>
            `)
        }
    })
    trackBttns()
}

renderAllPets(allPetsList)

const allFilter = document.getElementById('allBtn')
const avaliableFilter = document.getElementById('avaliableBtn')

allFilter.addEventListener('click', () => {
    avaliableFilter.classList.remove('selected')
    allFilter.classList.remove('selected')
    allFilter.classList.add('selected')
    renderAllPets(allPetsList)
})

avaliableFilter.addEventListener('click', () => {
    allFilter.classList.remove('selected')
    avaliableFilter.classList.remove('selected')
    avaliableFilter.classList.add('selected')
    renderAllPets(avaliablePets)
})

const deletePetModal = async (id) => {
    const petName = allPetsList.find(pet => (pet.id == id)).name
    main.insertAdjacentHTML('afterend', `
        <article class='modalContainer' id="deletePetModal">
            <div class='modalBox'>
                <span>
                    <i id="closeDeletePet" class="modalClose fa-regular fa-circle-xmark"></i>
                </span>
                <h2>Realmente deseja deletar o registro do Pet: ${petName}?</h2>
                <p>Essa ação não poderá ser desfeita!</p>
                <button class="btnSmallAlert" id="deletePetBtn">Confirmar</button>
            </div>
        </article>
    `)
    lockScroll()

    let deletePetModal = document.getElementById('deletePetModal')
    let closeDeletePet = document.getElementById('closeDeletePet')
    let deletePetBtn = document.getElementById('deletePetBtn')

    closeDeletePet.addEventListener('click', () => {
        deletePetModal.remove()
        unlockScroll()
    })

    deletePetBtn.addEventListener('click', async () => {
        await deletePet(id)
        allPetsList = await getAllPets()
        avaliablePets = allPetsList.filter(pet => (pet.available_for_adoption))
        deletePetModal.remove()
        unlockScroll()
        avaliableFilter.classList.remove('selected')
        allFilter.classList.remove('selected')
        allFilter.classList.add('selected')
        renderAllPets(allPetsList)
    })
}

const adotePetModal = async (id) => {
    const petName = allPetsList.find(pet => (pet.id == id)).name
    const petImg = allPetsList.find(pet => (pet.id == id)).avatar_url
    main.insertAdjacentHTML('afterend', `
        <article class='modalContainer' id="adotePetModal">
            <div class='modalBox'>
                <span>
                <i id="closeAdotePet" class="modalClose fa-regular fa-circle-xmark"></i>
                </span>
                <div>
                <h2>Realmente deseja adotar o Pet: ${petName}?</h2>  
                <aside><img class='adoteImg' id="" src="${petImg}" alt=""></aside>          
                </div>
                <button class="btnSmallSuccess" id="adotePetBtn">Confirmar</button>
            </div>
        </article>
    `)
    lockScroll()

    let adotePetModal = document.getElementById('adotePetModal')
    let closeAdotePet = document.getElementById('closeAdotePet')
    let adotePetBtn = document.getElementById('adotePetBtn')

    closeAdotePet.addEventListener('click', () => {
        adotePetModal.remove()
        unlockScroll()
    })

    adotePetBtn.addEventListener('click', async () => {
        let body = { "pet_id": id }
        await adotePet(body)
        allPetsList = await getAllPets()
        avaliablePets = allPetsList.filter(pet => (pet.available_for_adoption))
        adotePetModal.remove()
        unlockScroll()
        avaliableFilter.classList.remove('selected')
        allFilter.classList.remove('selected')
        allFilter.classList.add('selected')
        renderAllPets(allPetsList)
    })
}