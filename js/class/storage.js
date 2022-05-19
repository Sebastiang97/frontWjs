class Storage {
  setData(data) {
    localStorage.setItem(
      'other',
      JSON.stringify([
        {
          carrito: 'inicializado',
        },
        {
          otherCarrito: 'inicializado',
        },
      ])
    )
  }

  getData(ref) {
    const data = localStorage.getItem(ref)
    return JSON.parse(data)
  }

  addToFav(img) {
    if (!this.validate(img.id)) {
      this.#pushToFav(img)
      return 'gif add to favorites success'
    }
    this.#deleteToFav(img.id)
    return 'gif is to Favorites'
  }

  #pushToFav(img) {
    const favs = this.getData('favs')
    if (favs) {
      favs.push(img)
      localStorage.setItem('favs', JSON.stringify(favs))
      return ''
    }
    localStorage.setItem('favs', JSON.stringify([img]))
  }

  #deleteToFav(id) {
    const favs = this.getData('favs')
    const newFavs = favs.filter((fav) => fav.id != id)
    localStorage.setItem('favs', JSON.stringify(newFavs))
  }

  validate(id) {
    const favs = this.getData('favs')
    if (favs) {
      return favs.some((fav) => fav.id === id)
    }
    return false
  }
}

export default Storage
