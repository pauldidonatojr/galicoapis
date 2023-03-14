const result = document.querySelector('.result')

const fetchNews = async () => {
  try {
    const { data } = await axios.get('/api/newsdata')

    const articles = data.map(article => {
      const { title, description, publishedAt, content } = article
      return `<div class="article">
        <h2>${title}</h2>
        <p>${description}</p>
        <p><strong>Published:</strong> ${publishedAt}</p>
        <p><strong>Content:</strong> ${content}</p>
      </div>`
    }).join('')

    result.innerHTML = articles
  } catch (error) {
    result.innerHTML = '<h4>There was an error</h4>'
  }
}

fetchNews()
