/* Importancion de los Modulos */
import Api from './class/api.js'
import Storage from './class/storage.js'
import RenderCards from './class/render.js'
import Auth from './class/auth.js'

/*Definicion de los objetos */
const api = new Api()
const storage = new Storage()
const renderCards = new RenderCards()
const auth = new Auth()

/*Elementos del DOM*/
const btnQuery = document.querySelector('#btnQuery')
const query = document.querySelector('#query')
const formQuery = document.querySelector('#formQuery')
const layout = document.querySelector('.layout')
const MenuActive = document.querySelector('.MenuActive')
const btnsLogin = document.querySelectorAll('#btn-login')
const btnsSignUp = document.querySelectorAll('#btn-signUp')
const btnsTrendings = document.querySelectorAll('#btn-trendings')
const btnRandom = document.querySelectorAll('#btn-random')
const btnsFavs = document.querySelectorAll('#btn-favs')
const logo = document.querySelectorAll('.logo')
const notification = document.querySelector('.notifications')

/*
  Eventos NavBar
*/

/*Evento para desplegar menu*/
MenuActive.addEventListener('click', () => {
  const links = document.querySelector('.links')
  links.classList.toggle('collapse')
})

/*Evento para favorites, trendings y random 2 por cada uno Desktop y mobile*/
for (let i = 0; i < btnsFavs.length; i++) {
  btnsFavs[i].addEventListener('click', (e) => {
    layout.innerHTML = ''
    layout.innerHTML = renderCards.renderFav()
    addEventsToCreates()
  })
  btnsTrendings[i].addEventListener('click', async (e) => {
    const trendings = await api.getTrendings()
    layout.innerHTML = ''
    layout.innerHTML = renderCards.renderCards(trendings)
    addEventsToCreates()
  })
  btnRandom[i].addEventListener('click', async (e) => {
    const random = await api.getRandom()
    layout.innerHTML = ''
    layout.innerHTML += renderCards.renderCards(random)
    addEventsToCreates()
  })
  logo[i].addEventListener('click', async (e) => {
    layout.innerHTML = ''
    layout.innerHTML = renderCards.renderFav()
    addEventsToCreates()
  })
}

/*Evento login y sign up */
for (let i = 0; i < btnsLogin.length; i++) {
  btnsLogin[i].addEventListener('click', (e) => {
    layout.innerHTML = ''
    layout.innerHTML = auth.viewLogin()
    const login = document.querySelector('.login')
    login.addEventListener('click', (e) => {
      e.preventDefault()
      notification.classList.toggle('collapse')
      auth.login()
      notifications('Welcome User')
      initialize()
    })
  })

  btnsSignUp[i].addEventListener('click', (e) => {
    layout.innerHTML = ''
    layout.innerHTML = auth.viewSignUp()
    const signUp = document.querySelector('.signUp')
    signUp.addEventListener('click', (e) => {
      e.preventDefault()
      notification.classList.toggle('collapse')
      notifications('Registered user')
      initialize()
    })
  })
}

/*
  Eventos NavBar cierre
*/

/*Evento buscar gifs*/
const queryInput = async (e) => {
  e.preventDefault()
  let q = query.value
  const gifs = await api.getByQuery(q)

  layout.innerHTML = ''
  if (gifs) {
    layout.innerHTML = renderCards.renderCards(gifs)
    addEventsToCreates()
  }
}
/*Evento busqueda personalizada*/
formQuery.addEventListener('submit', queryInput)
btnQuery.addEventListener('submit', queryInput)

const addEventsToCreates = () => {
  let targets = document.querySelectorAll('.targets')
  let favs = document.querySelectorAll('.fav')
  for (let i = 0; i < targets.length; i++) {
    targets[i].addEventListener('click', (e) => {
      renderById(e.target.id)
    })
    favs[i].addEventListener('click', (e) => {
      e.stopPropagation()
      if (storage.isLogin()) {
        addToFav(
          {
            img: e.target.dataset.img,
            title: e.target.dataset.title,
            id: e.target.dataset.id,
          },
          e.target
        )
      } else {
        notifications('Should login')
        layout.innerHTML = ''
        layout.innerHTML = auth.viewLogin()
      }
    })
  }
}

/*Evento detalles gif*/
const renderById = async (query) => {
  const gif = await api.getById(query)
  layout.innerHTML = ''
  //layout.innerHTML = renderCards.renderOne(gif)
  layout.innerHTML = renderCards.renderCards([gif])
  let fav = document.querySelector('.fav')
  fav.addEventListener('click', (e) => {
    addParameters(
      {
        img: e.target.dataset.img,
        title: e.target.dataset.title,
        id: e.target.dataset.id,
      },
      e.target
    )
  })
}

/*Evento para añadir a favoritos*/
const addToFav = async ({ img, title, id }, fav) => {
  notification.classList.toggle('collapse')
  const today = new Date()
  const date =
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
  const msg = storage.addToFav({ img, title, id, date })
  notifications(msg)
  fav.innerHTML = renderCards.validateEmoji(id)
}

/*Evento Para personalizar el mensaje de las notificaciones*/
const notifications = (msg) => {
  notification.innerHTML = ''
  notification.innerHTML = renderCards.notifications(msg)
  setTimeout(() => {
    notification.classList.toggle('collapse')
  }, 3000)
}

/*Inicializando layout con favorites*/
const initialize = async () => {
  if (storage.isLogin()) {
    layout.innerHTML = ''
    layout.innerHTML = renderCards.renderFav()
    addEventsToCreates()
  } else {
    const trendings = await api.getTrendings()
    layout.innerHTML = ''
    layout.innerHTML = renderCards.renderCards(trendings)
    addEventsToCreates()
  }
}

initialize()
