import Cookie from 'js-cookie'

export function getAccessToken() {
  return Cookie.get('accessToken')
}