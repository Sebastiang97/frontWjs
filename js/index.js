/* Importancion de los Modulos */
import Api from './class/api.js'
import Storage from './class/storage.js'
import RenderCards from './class/render.js'

/*Definicion de los objetos */
const api = new Api()
const storage = new Storage()
const renderCards = new RenderCards()

/*Elementos del DOM*/
const btnQuery = document.querySelector('#btnQuery');
const query = document.querySelector('#query');
const layout = document.querySelector('.layout');

/*Evento busqueda personalizada*/
btnQuery.addEventListener('click', async(e) => {
    let q = query.value;

    const gifs = await api.getByQuery(q)

    layout.innerHTML = ''
    if(gifs){

        layout.innerHTML = renderCards.renderAll(gifs)
    
        let targets = document.querySelectorAll('.targets')
        for (let i = 0; i < targets.length; i++) {
            targets[i].addEventListener('click', (e)=>{
                renderById(e.target.id)
            })
        }
    }

})

/*Evento detalles gifs*/
const renderById = async (query)=>{
    const gif = await api.getById(query)
    layout.innerHTML = ''
    layout.innerHTML = renderCards.renderOne(gif)
}


// const renderById = async (query)=>{
//     const { id, title, url} = await api.getById(query)
//     console.log(id)
//     layout.innerHTML = ''

//     layout.innerHTML = `
//         <div class="card animate__animated animate__fadeIn targets" id="${id}" >
//             <h4>${title}</h4>
//             <p>${id}</p>
//             <img src="${url}" alt="">
//         </div>
//     `
// }


// gifs.map(({id,title, url})=>{
    //     res += `
    //         <div class="card animate__animated animate__fadeIn targets" id="${id}" >
    //             <h4>${title}</h4>
    //             <p>${id}</p>
    //             <img src="${url}" alt="">
    //         </div>
    //     `
    // })
