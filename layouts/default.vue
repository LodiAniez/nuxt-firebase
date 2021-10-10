<template>
  <div class="h-screen w-full bg-gray-800 dark:bg-gray-800 fixed">
    <div>
      <nav class="bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-5 w-8 text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline">
                  <nuxt-link
                    to="/"
                    class="
                      ml-4
                      px-3
                      py-2
                      rounded-md
                      text-sm
                      font-medium
                      text-gray-300
                      hover:text-white hover:bg-gray-700
                    "
                    >Todo</nuxt-link
                  >
                  <nuxt-link
                    to="/finished-tasks"
                    class="
                      ml-4
                      px-3
                      py-2
                      rounded-md
                      text-sm
                      font-medium
                      text-gray-300
                      hover:text-white hover:bg-gray-700
                    "
                    >Done Tasks</nuxt-link
                  >
                  <nuxt-link
                    to="/gallery"
                    class="
                      ml-4
                      px-3
                      py-2
                      rounded-md
                      text-sm
                      font-medium
                      text-gray-300
                      hover:text-white hover:bg-gray-700
                    "
                    >Gallery</nuxt-link
                  >
                  <nuxt-link
                    to="/add-image"
                    class="
                      mt-1
                      block
                      px-3
                      py-2
                      rounded-md
                      text-base
                      font-medium
                      text-gray-300
                      hover:text-white hover:bg-gray-700
                    "
                    >Add Image</nuxt-link
                  >
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <!-- Profile dropdown -->
                <div class="ml-3 relative">
                  <div>
                    <button
                      @click="toggle"
                      class="
                        max-w-xs
                        flex
                        items-center
                        text-sm
                        rounded-full
                        text-white
                        focus:outline-none focus:shadow-solid
                      "
                      id="user-menu"
                      aria-label="User menu"
                      aria-haspopup="true"
                    >
                      <img
                        class="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt
                      />
                      <div class="pl-2">{{ userEmail }}</div>
                    </button>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <div
                      v-show="isOpen"
                      class="
                        origin-top-right
                        absolute
                        right-0
                        mt-2
                        w-48
                        rounded-md
                        shadow-lg
                      "
                    >
                      <div
                        class="py-1 rounded-md bg-white shadow-xs"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <a
                          href="#"
                          @click.prevent="signOut"
                          class="
                            block
                            px-4
                            py-2
                            text-sm text-gray-700
                            hover:bg-gray-100
                          "
                          role="menuitem"
                          >Sign out</a
                        >
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <button
                @click="toggle"
                class="
                  inline-flex
                  items-center
                  justify-center
                  p-2
                  rounded-md
                  text-gray-400
                  hover:text-white hover:bg-gray-700
                  focus:outline-none focus:bg-gray-700 focus:text-white
                "
              >
                <svg
                  :class="[isOpen ? 'hidden' : 'block', 'h-6 w-6']"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <svg
                  :class="[isOpen ? 'block' : 'hidden', 'h-6 w-6']"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div :class="[isOpen ? '' : 'hidden', 'md:hidden']">
          <div class="px-2 pt-2 pb-3 sm:px-3">
            <nuxt-link
              to="/"
              class="
                ml-4
                px-3
                py-2
                rounded-md
                text-sm
                font-medium
                text-gray-300
                hover:text-white hover:bg-gray-700
              "
              >Todo</nuxt-link
            >
            <nuxt-link
              to="/finished-tasks"
              class="
                ml-4
                px-3
                py-2
                rounded-md
                text-sm
                font-medium
                text-gray-300
                hover:text-white hover:bg-gray-700
              "
              >Done Tasks</nuxt-link
            >
            <nuxt-link
              to="/gallery"
              class="
                ml-4
                px-3
                py-2
                rounded-md
                text-sm
                font-medium
                text-gray-300
                hover:text-white hover:bg-gray-700
              "
              >Gallery</nuxt-link
            >
            <nuxt-link
              to="/add-image"
              class="
                mt-1
                block
                px-3
                py-2
                rounded-md
                text-base
                font-medium
                text-gray-300
                hover:text-white hover:bg-gray-700
              "
              >Add Image</nuxt-link
            >
          </div>
          <div class="pt-4 pb-3 border-t border-gray-700">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt
                />
              </div>
              <div class="ml-3">
                <div
                  class="mt-1 text-sm font-medium leading-none text-gray-400"
                >
                  {{ userEmail }}
                </div>
              </div>
            </div>
            <div class="mt-3 px-2">
              <a
                href="#"
                @click.prevent="signOut"
                class="
                  mt-1
                  block
                  px-3
                  py-2
                  rounded-md
                  text-base
                  font-medium
                  text-gray-400
                  hover:text-white hover:bg-gray-700
                  focus:outline-none focus:text-white focus:bg-gray-700
                "
                >Sign out</a
              >
            </div>
          </div>
        </div>
      </nav>

      <header class="bg-gray-800 shadow dark:bg-gray-800">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1
            class="text-3xl font-bold leading-tight text-white dark:text-white"
          >
            {{ routePath }}
          </h1>
        </div>
      </header>
      <main class="dark:bg-gray-800">
        <div class="min-w-full mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <div class="h-auto overflow-auto p-3" style="max-height: 45rem">
              <Nuxt />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import Cookies from "js-cookie"

export default {
  computed: {
    routePath() {
      return this.$route.name === "index"
        ? "Add Todo"
        : this.$route.name === "finished-tasks"
        ? "Done Tasks"
        : this.$route.name === "gallery"
        ? "Gallery"
        : "Add Image"
    },
  },
  head() {
    return {
      title: "Nuxt+Firebase Integration",
    }
  },
  data() {
    return {
      isOpen: false,
      userEmail: null,
    }
  },
  mounted() {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        Cookies.remove("access_token")
        $nuxt.$router.push("/auth/signin")
      } else {
        this.userEmail = user.email
      }
    })
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    async signOut() {
      const auth = getAuth()

      try {
        await signOut(auth)
        Cookies.remove("access_token")
        this.$store.dispatch("clearState")
        $nuxt.$router.push("/auth/signin")
      } catch (err) {
        alert(err.message)
      }
    },
  },
}
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 16px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: #edf2f7;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 100vh;
  border: 3px solid #edf2f7;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

a.nuxt-link-active {
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
}
</style>
