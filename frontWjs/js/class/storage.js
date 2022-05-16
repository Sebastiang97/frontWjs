class Storage {
    setData(data){
        localStorage.setItem('carrito', JSON.stringify(
            [
                {
                    carrito: 'inicializado'
                }
            ]
        ))
    }

    getData(){
        const carrito = localStorage.getItem('carrito')
        return JSON.parse(carrito)
    }
}

export default Storage