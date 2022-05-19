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
const notification = document.querySelector('.notifications')

/*Evento Search*/
const queryInput = async (e) => {
  e.preventDefault()
  let q = query.value
  const gifs = await api.getByQuery(q)

  layout.innerHTML = ''
  if (gifs) {
    layout.innerHTML = renderCards.renderCards(gifs)

    let targets = document.querySelectorAll('.targets')
    let favs = document.querySelectorAll('.fav')
    for (let i = 0; i < targets.length; i++) {
      targets[i].addEventListener('click', (e) => {
        renderById(e.target.id)
      })
      favs[i].addEventListener('click', (e) => {
        e.stopPropagation()
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
  }
}

/*Funcion para llamar añadir favoritos (addToFav)*/
const addParameters = (fav, target) => {
  addToFav(fav, target)
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

/*Añadir a favoritos*/
const addToFav = async ({ img, title, id }, fav) => {
  const today = new Date()
  const date =
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
  const msg = storage.addToFav({ img, title, id, date })

  notification.innerHTML = ''
  notification.innerHTML = renderCards.notifications(msg)
  fav.innerHTML = renderCards.validateEmoji(id)
}

/*Evento busqueda personalizada*/
formQuery.addEventListener('submit', queryInput)
btnQuery.addEventListener('submit', queryInput)

/*Evento para desplegar menu*/
MenuActive.addEventListener('click', () => {
  const links = document.querySelector('.links')
  links.classList.toggle('collapse')
})

/*Evento login y sign up */
for (let i = 0; i < btnsLogin.length; i++) {
  btnsLogin[i].addEventListener('click', (e) => {
    layout.innerHTML = ''
    layout.innerHTML = auth.viewLogin()
  })
}
/*

https://www.google.com/search?q=validacion+de+formik+con+yup&sxsrf=ALiCzsZuvMszR06FspRuBkWc71gTKG5UDA%3A1652739947511&ei=a8-CYqjpHsOxkvQP8dKxyAg&ved=0ahUKEwjoyuiLiOX3AhXDmIQIHXFpDIkQ4dUDCA4&uact=5&oq=validacion+de+formik+con+yup&gs_lcp=Cgdnd3Mtd2l6EAM6BwgAEEcQsANKBAhBGABKBAhGGABQpQlY6Tlguz1oAnABeACAAa8BiAGHCZIBAzAuOJgBAKABAcgBCMABAQ&sclient=gws-wiz

https://codepen.io/Qanser/pen/pwzgyW

https://www.google.com/search?q=css+animation+heart&oq=css+animation+heart+&aqs=chrome..69i57j0i10i19j0i19i22i30l4j0i15i19i22i30.12422j0j7&sourceid=chrome&ie=UTF-8


https://uiverse.io/detail/mobinkakei/strong-lizard-79
*/
