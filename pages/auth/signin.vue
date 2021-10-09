<template>
  <div>
    <div class="text-white text-center mb-3 font-bold">
      <small>Please sign in to continue</small>
    </div>
    <form @submit.prevent="Login">
      <div class="relative w-full mb-3">
        <label
          class="block uppercase text-white text-xs font-bold mb-2"
          for="grid-password"
          >Email</label
        >
        <input
          type="email"
          v-model="username"
          required
          class="
            px-3
            py-3
            placeholder-gray-400
            text-gray-700
            bg-white
            rounded
            text-sm
            shadow
            focus:outline-none focus:shadow-outline
            w-full
          "
          placeholder="Email"
          style="transition: all 0.15s ease 0s"
        />
      </div>
      <div class="relative w-full mb-3">
        <label
          class="block uppercase text-white text-xs font-bold mb-2"
          for="grid-password"
          >Password</label
        >
        <input
          type="password"
          v-model="password"
          required
          class="
            px-3
            py-3
            placeholder-gray-400
            text-gray-700
            bg-white
            rounded
            text-sm
            shadow
            focus:outline-none focus:shadow-outline
            w-full
          "
          placeholder="Password"
          style="transition: all 0.15s ease 0s"
        />
      </div>
      <div class="text-center mt-6">
        <button
          class="
            bg-blue-500
            hover:bg-blue-600
            text-white
            active:bg-gray-700
            text-sm
            font-bold
            uppercase
            px-6
            py-3
            rounded
            shadow
            hover:shadow-lg
            outline-none
            focus:outline-none
            mr-1
            mb-1
            w-full
          "
          type="submit"
          style="transition: all 0.15s ease 0s"
        >
          Sign In
        </button>
      </div>
      <div>
        <nuxt-link
          to="/auth/create-account"
          class="text-xs hover:underline text-gray-400"
          >Don't have an account yet? Click here to create!</nuxt-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, getIdToken } from 'firebase/auth'
import Cookies from 'js-cookie'

export default {
  layout: 'auth-layout',
  data() {
    return {
      username: null,
      password: null,
    }
  },

  methods: {
    async Login() {
      const auth = getAuth()

      try {
        await signInWithEmailAndPassword(auth, this.username, this.password)
        const idToken = await getIdToken(auth.currentUser)
        Cookies.set('access_token', idToken)

        const { uid, email } = auth.currentUser
        this.$store.dispatch('setUser', { uid, email })

        $nuxt.$router.push('/')
      } catch (err) {
        alert(err.message)
      }
    },
  },
}
</script>
