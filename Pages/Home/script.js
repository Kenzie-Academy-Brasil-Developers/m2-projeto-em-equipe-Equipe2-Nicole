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
            if (bttn.id[0] == 'v') {
                viewPetModal(bttn.id.slice(5))
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
            <span class='imgCardBox'><img class='imgCards' src="${pet.avatar_url}" id="img-${pet.id}" alt=""></span>
                <div class="pet">
                    <h2 class="petName">${pet.name}</h2>
                    <h2 class="petSpecies">${pet.species}</h2>
                    <span id='card-${pet.id}' class='cardBtns'>
                    <a class="btnView" id="view-${pet.id}"><i class="fa-solid fa-eye"></i></a>
                    </span>
                </div>                    
            
        </li>
        `)
        let cardPetbtn = document.getElementById(`card-${pet.id}`)
        if (pet.available_for_adoption) {
            cardPetbtn.insertAdjacentHTML('afterbegin', `
                <a class="btnAdote btnSmallSuccess" id="adote-${pet.id}">Me adote<b class='exclamation'>!</b></a>
            `)
        } else {
            cardPetbtn.insertAdjacentHTML('afterbegin', `
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

const viewPetModal = async (id) => {
    let selectedPet = allPetsList.find(pet => (pet.id == id))
       
    main.insertAdjacentHTML('afterend', `
        <article class='modalContainer' id="viewPetModal">
            <div class='modalBox'>
                <span class='modalHeader'>
                    <i id="closeViewPet" class="modalClose fa-regular fa-circle-xmark"></i>
                </span>
                <div class='petInfoModal'>
                    <aside class='imgBox'>
                        <img src="${selectedPet.avatar_url}" id="imgModal-${selectedPet.id}" alt="">  
                    </aside>
                    <aside class='petInfo' id="petInfo-${selectedPet.id}">
                        <h2>Nome: ${selectedPet.name}</h2>
                        <h5>Especie: ${selectedPet.species}</h5>
                        <h5>Raça: ${selectedPet.bread}</h5>
                        <p>Responsavel: ${selectedPet.guardian.name}</p>
                        <p>Contato: ${selectedPet.guardian.email}</p>
                    </aside>                
                </div>
            </div>
        </article>
    `)    
    let viewPetModal = document.getElementById('viewPetModal')
    let imgModalElement = document.getElementById(`imgModal-${selectedPet.id}`)
    if (selectedPet.available_for_adoption) {
        imgModalElement.insertAdjacentHTML('afterend', `
            <span class='btnBoxModal'><a class="btnSmallSuccess adoteInModal" id="adoteInModal-${selectedPet.id}">Me adote<b class='exclamation'>!</b></a></span>
        `)
    } else {
        imgModalElement.insertAdjacentHTML('afterend', `
            <span class='btnBoxModal'><a class="btnSmallAlert adotedInModal" disabled>Pet adotado!</a></span>
        `)
    }
    lockScroll()

    let closeViewPet = document.getElementById('closeViewPet')

    closeViewPet.addEventListener('click', () => {
        viewPetModal.remove()
        unlockScroll()
    })

    let adoteModalBtn = document.getElementById(`adoteInModal-${selectedPet.id}`)

    if (selectedPet.available_for_adoption) {
        adoteModalBtn.addEventListener('click', async () => {
            console.log('teste');
            let body = { "pet_id": selectedPet.id }
            await adotePet(body)
            allPetsList = await getAllPets()
            avaliablePets = allPetsList.filter(pet => (pet.available_for_adoption))
            viewPetModal.remove()
            unlockScroll()
            avaliableFilter.classList.remove('selected')
            allFilter.classList.remove('selected')
            allFilter.classList.add('selected')
            renderAllPets(allPetsList)
        })
    } 
}

const adotePetModal = async (id) => {
    const petName = allPetsList.find(pet => (pet.id == id)).name
    const petImg = allPetsList.find(pet => (pet.id == id)).avatar_url
    main.insertAdjacentHTML('afterend', `
        <article class='modalContainer' id="adotePetModal">
            <div class='modalBox adoteModalBox'>
                <span class='modalHeader'>
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