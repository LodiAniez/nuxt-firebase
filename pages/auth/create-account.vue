<template>
  <div class="w-80">
    <div class="text-white text-center mb-3 font-bold">
      <small>Create your account to continue</small>
    </div>
    <form @submit.prevent="createAccount">
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
      <div class="relative w-full mb-3">
        <label
          class="block uppercase text-white text-xs font-bold mb-2"
          for="grid-password"
          >Confirm password</label
        >
        <input
          type="password"
          v-model="confirmPassword"
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
          Create Account
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  getAuth,
  getIdToken,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import Cookies from 'js-cookie'

const auth = getAuth()

export default {
  layout: 'auth-layout',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
    }
  },

  methods: {
    async createAccount() {
      if (this.password !== this.confirmPassword)
        return alert('Password do not match.')

      try {
        await createUserWithEmailAndPassword(auth, this.username, this.password)
        const idToken = await getIdToken(auth.currentUser)
        Cookies.set('access_token', idToken)

        alert('Your account has been created, click ok to continue.')
        this.$router.push('/')
      } catch (err) {
        alert(err.message)
      }
    },
  },
}
</script>

<style></style>
