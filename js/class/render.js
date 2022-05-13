class RenderCards{

    renderAll(gifs){
        let res = "";
        gifs.map(({id,title, url})=>{
        res += `
                <div class="card animate__animated animate__fadeIn targets" id="${id}" >
                    <h4>${title}</h4>
                    <p>${id}</p>
                    <img src="${url}" alt="">
                </div>
            `
        })
        return res;
    }

    renderOne ({ id, title, url}){
        let res = ''
        res = `
            <div class="card animate__animated animate__fadeIn targets" id="${id}" >
                <h4>${title}</h4>
                <p>${id}</p>
                <img src="${url}" alt="">
            </div>
        `
        return res
    }

}

export default RenderCards

