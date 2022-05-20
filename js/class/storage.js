class Storage {
  setData() {
    const value = this.isLogin()
    localStorage.setItem(
      'user',
      JSON.stringify({
        user: {
          logged: !value,
        },
      })
    )
  }

  getData(ref) {
    const data = localStorage.getItem(ref)
    return JSON.parse(data)
  }

  isLogin() {
    const isLogin = this.getData('user')
    if (isLogin) {
      return isLogin.user.logged
    }
    localStorage.setItem(
      'user',
      JSON.stringify({
        user: {
          logged: false,
        },
      })
    )
    return false
  }

  addToFav(img) {
    if (!this.validate(img.id)) {
      this.#pushToFav(img)
      return 'Gif added to favorites'
    }
    this.#deleteToFav(img.id)
    return 'Gif is in Favorites'
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
