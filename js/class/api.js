class Api {
  //https://api.giphy.com/v1/gifs/search?api_key=XI4VhJ3bHRJPx0Qi6KKexinBJsdSKnSi&q=&limit=10&offset=0&rating=g&lang=en

  url = `https://api.giphy.com/v1/gifs/`
  apiKey = '?api_key=XI4VhJ3bHRJPx0Qi6KKexinBJsdSKnSi'
  limit = `&limit=20&rating=g`
  async getDataTrendings() {
    //https://api.giphy.com/v1/gifs/trending?api_key=XI4VhJ3bHRJPx0Qi6KKexinBJsdSKnSi&limit=10&rating=g
    const query = `${this.url}/trending${this.apiKey}&${this.limit}`
    const res = await fetch(query)
    const data = await res.json()

    return data
  }

  async getById(idGif) {
    const query = `https://api.giphy.com/v1/gifs/${idGif}?api_key=XI4VhJ3bHRJPx0Qi6KKexinBJsdSKnSi`

    const res = await fetch(query)
    const { data } = await res.json()
    const { id, title, type, images } = data
    const img = {
      id,
      title,
      type,
      url: images?.downsized_medium.url,
    }

    return img
  }

  async getByQuery(q) {
    //https://api.giphy.com/v1/gifs/search?api_key=XI4VhJ3bHRJPx0Qi6KKexinBJsdSKnSi&q=gintama&limit=10&offset=0&rating=g&lang=en
    const mod = `search`
    const query = `${this.url}${mod}${this.apiKey}&q=${q}${this.limit}`
    const res = await fetch(query)
    const { data } = await res.json()
    const imgs = data.map((img) => {
      return {
        id: img.id,
        title: img.title,
        url: img.images?.downsized_medium.url,
      }
    })
    return imgs
  }

  #geturl(url, mod, key) {
    return `${this.url}${mod}${this.apiKey}`
  }
}

export default Api
