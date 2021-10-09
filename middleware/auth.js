import { getUserFromCookie } from '~/helpers'
import { getAuth } from 'firebase/auth'
import Cookies from 'js-cookie'

export default function ({ route, req, redirect }) {
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
    const auth = getAuth()

    if (
      route.path === '/auth/signin' ||
      route.path === '/auth/create-account'
    ) {
      if (auth.currentUser) return redirect('/')
      return
    } else {
      if (!auth.currentUser) {
        Cookies.remove('access_token')
        return redirect('/auth/signin')
      }
      return
    }
  }
}
