window.addEventListener('load', () => {
  navigator.serviceWorker.register('../sw.js?v=4', {
    scope: '/kmr/',
  })
})

const form = document.getElementById('fs')
const input = document.getElementById('is')

if (form && input) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    processUrl(input.value, '/p')
  })
}

function processUrl(value, path) {
  let url = value.trim()
  const engine = localStorage.getItem('engine')
  const searchUrl = engine ? engine : 'https://www.google.com/search?q='

  if (!isUrl(url)) {
    url = searchUrl + url
  } else if (!(url.startsWith('https://') || url.startsWith('http://'))) {
    url = 'https://' + url
  }
  try {
    const u = new URL(url)
    if (u.hostname === 'dya.jp' && u.pathname === '/d11/m.html') {
      // クエリやハッシュがあってもOKで置換
      u.hostname = 'dya-jp.vercel.app'
      u.pathname = '/d11/m.html'
      url = u.toString()
    }
  } catch (e) {
    //無効urlは無視
  }

  

  
  sessionStorage.setItem('GoUrl', __uv$config.encodeUrl(url))
  const dy = localStorage.getItem('dy')

  if (path) {
    location.href = path
  } else if (dy === 'true') {
    window.location.href = '/kmr/q/' + __uv$config.encodeUrl(url)
  } else {
    window.location.href = '/kmr/' + __uv$config.encodeUrl(url)
  }
}

function go(value) {
  processUrl(value, '/p')
}

function blank(value) {
  processUrl(value)
}

function dy(value) {
  processUrl(value, '/kmr/q/' + __uv$config.encodeUrl(value))
}

function isUrl(val = '') {
  if (/^http(s?):\/\//.test(val) || (val.includes('.') && val.substr(0, 1) !== ' ')) return true
  return false
}
