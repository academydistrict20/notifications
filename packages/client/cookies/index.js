
let today = new Date()
const expirationOneYear = today.getFullYear() + 10
today.setFullYear(expirationOneYear)

export function setCookie(label, value, expiration = today) {
  document.cookie = `${label}= ${JSON.stringify(
    value
  )}; expires=${JSON.stringify(expiration.toUTCString())}; samesite=strict;`
}

export function getCookie(label) {
  const findCookie = document.cookie
    ? document.cookie.split(';').find(c => c.includes(label))
    : null
  const asd20Cookie = findCookie ? findCookie.trim() : null
  let response = findCookie ? asd20Cookie.replace(`${label}=`, '') : null
  let results = findCookie && response ? JSON.parse(response) : null
  return results
}