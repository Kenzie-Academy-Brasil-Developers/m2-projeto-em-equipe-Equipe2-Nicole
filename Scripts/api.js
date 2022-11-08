const baseUrl = "https://m2-api-adot-pet.herokuapp.com/"
import { toast } from "./toast.js"

export async function login(body) {
  try {
    const request = await fetch(baseUrl + "session/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const response = await request.json().then((response) => {
      if (request.ok) {
        toast("Login", "Login realizado com sucesso")
        localStorage.setItem("TokenLogin", response.token)
        setTimeout(() => {
          window.location.assign("../home/index.html")
        }, 2500)
      } else {
        toast("Erro!", "Email ou senha incorreto")
      }
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function getAllPets() {
  const user = localStorage.getItem("TokenLogin")
  try {
    const request = await fetch(baseUrl + "pets", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + user,
      },
    })
    const response = await request.json().then((response) => {
      return response
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function deletePet(id) {
  const user = localStorage.getItem("TokenLogin")
  try {
    const request = await fetch(baseUrl + "pets/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + user,
      },
    })
    const response = await request.json().then((response) => {
      return response
    })
    if (request.ok) {
      toast(
        "Pet removido com sucesso!",
        "Todas as informações foram deletadas do banco de dados"
      )
    } else {
      toast("Erro!", "Você não é guardião desse PET")
    }
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function adotePet(body) {
  const user = localStorage.getItem("TokenLogin")
  try {
    const request = await fetch(baseUrl + "adoptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user,
      },
      body: JSON.stringify(body),
    })
    const response = await request.json().then((response) => {
      return response
    })
    toast("Pet adotado!", "Parabéns o Pet foi adotado!")
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function register(body, btn) {
  try {
    const request = await fetch(`${baseUrl}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    if (request.ok) {
      toast(
        "Conta criada com sucesso!",
        "Redirecionando para a página de login"
      )
      setTimeout(() => {
        btn.innerText = "Cadastrar"
        window.location.assign("/pages/login/index.html")
      }, 2700)
    }
    const response = await request.json()
    console.log(response)
    if (response.message == "Email already in use") {
      toast("Erro!", "E-mail já cadastrado.")
      setTimeout(() => {
        btn.innerText = "Cadastrar"
      }, 4000)
    }
    if (
      response.message == "please inform a valid image link" ||
      response.message == "'avatar_url' is required"
    ) {
      console.log("toast avatar")
      toast("Erro!", "Favor informar uma imagem válida.")
      setTimeout(() => {
        btn.innerText = "Cadastrar"
      }, 4000)
    }
  } catch (err) {
    return err
  }
}

export async function getMyAdoptions() {
  const user = localStorage.getItem("TokenLogin")
  try {
    const request = await fetch(baseUrl + "adoptions/myAdoptions", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + user,
      },
    })
    const response = await request.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function getMyProfile() {
  const user = localStorage.getItem("TokenLogin")
  try {
    const request = await fetch(baseUrl + "users/profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + user,
      },
    })
    const response = await request.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function editMyProfile(body) {
  const user = localStorage.getItem("TokenLogin")
  try {
    const request = await fetch(baseUrl + "users/profile", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + user,
      },
      body: JSON.stringify(body),
    })
    const response = await request.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function deleteMyProfile() {
  const user = localStorage.getItem("TokenLogin")
  try {
    const request = await fetch(baseUrl + "users/profile", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + user,
      },
    })
    if (request.ok) {
      toast(
        "Conta deletada com sucesso!",
        "Redirecionando para a página de login"
      )
      setTimeout(() => {
        window.location.assign("/pages/login/index.html")
      }, 2700)
    }
  } catch (err) {
    console.log(err)
  }
}

export async function editMyPets(body, id) {
  const user = localStorage.getItem("TokenLogin")
  try {
    const request = await fetch(baseUrl + "pets/" + id, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + user,
      },
      body: JSON.stringify(body),
    })
    const response = await request.json()
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function deleteMyAdoption(id) {
  const user = localStorage.getItem("TokenLogin")
  try {
    const request = await fetch(baseUrl + "adoptions/delete/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + user,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

export async function getAllMyPets() {
  const user = localStorage.getItem("TokenLogin")
  try {
    const request = await fetch(baseUrl + "pets/my_pets", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + user,
      },
    })
    const response = await request.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function createPet(body) {
  const user = localStorage.getItem("TokenLogin")
  try {
    const request = await fetch(`${baseUrl}pets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user,
      },
      body: JSON.stringify(body),
    })
    if (request.ok) {
      toast("Pet criado com sucesso!", "Atualizando a lista.")
    }
    const response = await request.json()
    console.log(response)

    if (
      response.message == "please inform a valid image link" ||
      response.message == "'avatar_url' is required"
    ) {
      console.log("toast avatar")
      toast("Erro!", "Favor informar uma imagem válida.")
    }
  } catch (err) {
    return err
  }
}

export async function deleteMyPet(id) {
  const user = localStorage.getItem("TokenLogin")
  try {
    const request = await fetch(baseUrl + "pets/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + user,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
