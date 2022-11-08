import { getAllPets } from "../../scripts/api.js"
import { verifyLogin, logout, lockScroll, unlockScroll } from '../../scripts/LoginLogout.js'

verifyLogin()
logout()

{
  /* 
  <li>
    <img
      src="https://media.cnn.com/api/v1/images/stellar/prod/220818142713-dogs-tears-emotions-wellness-stock.jpg?c=16x9&q=h_720,w_1280,c_fill"
    />
    <div>
      <p><span class="txtBlue">Nome:</span> Bidu</p>
      <p><span class="txtBlue">Espécie:</span> Cachorro</p>
      <p><span class="txtBlue">Adotável:</span> Sim</p>
      <button class="btnSmallBrand">Atualizar</button>
    </div>
  </li> 
  */
}

const createCard = (pet) => {
  let adoptable = ""
  if (pet.available_for_adoption == true) {
    adoptable = "Sim"
  } else {
    adoptable = "Não"
  }

  const card = document.createElement("li")
  const imgPet = document.createElement("img")
  imgPet.src = pet.avatar_url

  const dataPet = document.createElement("div")

  const petName = document.createElement("p")
  petName.innerHTML = `<span class="txtBlue">Nome:</span> ${pet.name}`

  const petSpecie = document.createElement("p")
  petSpecie.innerHTML = `<span class="txtBlue">Nome:</span> ${pet.species}`

  const petAdoptable = document.createElement("p")
  petAdoptable.innerHTML = `<span class="txtBlue">Adotável:</span> ${adoptable}`

  const attButton = document.createElement("button")
  attButton.classList.add("btnSmallBrand")
  attButton.innerText = "Atualizar"

  dataPet.append(petName, petSpecie, petAdoptable, attButton)
  card.append(imgPet, dataPet)

  return card
}

const renderCards = async () => {
  const pets = await getAllPets()
  const list = document.querySelector(".petList")

  pets.forEach((pet) => {
    const card = createCard(pet)
    list.append(card)
  })
}

renderCards()
