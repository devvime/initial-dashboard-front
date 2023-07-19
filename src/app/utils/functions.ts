export const parser = (token) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
  return JSON.parse(jsonPayload)
}

export const welcome = () => {
  let response = ''
  const hours = new Date().getHours()
  if (hours >= 6 && hours <= 12) {
    response = 'Good morning'
  } else if (hours > 12 && hours < 18) {
    response = 'Good afternoon'
  } else if (hours >= 18 || hours < 6) {
    response = 'Goodnight'
  }
  return response
}