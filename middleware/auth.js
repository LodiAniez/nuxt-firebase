import { getUserFromCookie } from '~/helpers'
import Cookies from 'js-cookie'

export default function ({ route, req, redirect, store }) {
  if (process.server) {
    const user = getUserFromCookie(req)

    if (
      route.path === '/auth/signin' ||
      route.path === '/auth/create-account'
    ) {
      if (user) return redirect('/')
      Cookies.remove('access_token')
      return
    } else {
      if (!user) {
        Cookies.remove('access_token')
        return redirect('/auth/signin')
      }
      return
    }
  } else {
    if (
      route.path === '/auth/signin' ||
      route.path === '/auth/create-account'
    ) {
      if (store.state.user) return redirect('/')
      return
    } else {
      if (!store.state.user) {
        Cookies.remove('access_token')
        return redirect('/auth/signin')
      }
      return
    }
  }
}
