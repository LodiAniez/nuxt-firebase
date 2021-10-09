import { getUserFromCookie } from '~/helpers'
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore'

import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'

export default {
  async nuxtServerInit({ dispatch }, ctx) {
    if (process.server) {
      const user = getUserFromCookie(ctx.req)

      if (user)
        dispatch('onAuthStateChanged', { uid: user.user_id, email: user.email })
    }
  },

  async onAuthStateChanged(state, user) {
    if (!user) {
      state.commit('SET_USER', null)

      return
    }

    state.commit('SET_USER', user)
  },

  async addToGallery(state, payload) {
    const db = getFirestore()
    const storage = getStorage()

    const { name, description, image, baseImage } = payload
    let documentId = null

    try {
      // Saving data to firestore
      const docRef = await addDoc(
        collection(db, 'user-gallery', state.getters.getUser.uid, 'gallery'),
        {
          name,
          description,
          image: null,
          storagePath: null,
        }
      )

      documentId = docRef.id
      const ext = image.name.slice(image.name.lastIndexOf('.'))

      // Using the document ID as a filename of the image when saved to firebase storage so we can reference it in firestore
      const blobType = await fetch(baseImage)
      const receivedBlob = await blobType.blob()

      // Saving the file to firebase storage and retrieving its download url
      await uploadBytes(
        ref(storage, `gallery/${documentId}${ext}`),
        receivedBlob
      )

      const imageUrl = await getDownloadURL(
        ref(storage, `gallery/${documentId}${ext}`)
      )

      // Updating the document by using the ID as the reference, then updating the image from this document's field
      await updateDoc(
        doc(
          db,
          'user-gallery',
          state.getters.getUser.uid,
          'gallery',
          documentId
        ),
        {
          image: imageUrl,
          storagePath: `gallery/${documentId}${ext}`,
        }
      )

      state.commit('ADD_TO_GALLERY', {
        id: documentId,
        name,
        description,
        image: imageUrl,
        storagePath: `gallery/${documentId}${ext}`,
      })
    } catch (err) {
      // If something is wrong, probably the image is not uploaded to firebase storage, remove the document from firestore
      if (!documentId) {
        await deleteDoc(
          doc(
            db,
            'user-gallery',
            state.getters.getUser.uid,
            'gallery',
            documentId
          )
        )
      }

      state.commit('CATCH_ERROR', err)
    }
  },

  async removeItemFromGallery(state, { id, storagePath }) {
    const db = getFirestore()
    const storage = getStorage()

    try {
      await deleteObject(ref(storage, storagePath))
      await deleteDoc(
        doc(db, 'user-gallery', state.getters.getUser.uid, 'gallery', id)
      )

      state.commit('REMOVE_IMAGE', { id })
    } catch (err) {
      state.commit('CATCH_ERROR', err)
    }
  },

  async addTask(state, payload) {
    const { taskName } = payload
    const db = getFirestore()

    try {
      const docRef = await addDoc(
        collection(db, 'tasks', state.getters.getUser.uid, 'todos'),
        {
          taskName,
          finished: false,
        }
      )

      state.commit('ADD_TASK', { id: docRef.id, ...payload })
    } catch (err) {
      state.commit('CATCH_ERROR', err)
    }
  },

  async toggleTask(state, payload) {
    const { isFinished, id } = payload
    const finished = !isFinished

    const db = getFirestore()

    try {
      await updateDoc(
        doc(db, 'tasks', state.getters.getUser.uid, 'todos', id),
        {
          finished,
        }
      )

      state.commit('TOGGLE_TASK', { id, finished })
    } catch (err) {
      state.commit('CATCH_ERROR', err)
    }
  },

  async removeTask(state, payload) {
    const { id } = payload
    const db = getFirestore()

    try {
      await deleteDoc(doc(db, 'tasks', state.getters.getUser.uid, 'todos', id))

      state.commit('REMOVE_TASK', payload)
    } catch (err) {
      state.commit('CATCH_ERROR', err)
    }
  },

  async fetchGallery(state) {
    const db = getFirestore()

    try {
      const galleryDocs = await getDocs(
        collection(db, 'user-gallery', state.getters.getUser.uid, 'gallery')
      )
      const gallery = galleryDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      state.commit('RETRIEVE_GALLERY', gallery)
    } catch (err) {
      state.commit('CATCH_ERROR', err)
    }
  },

  async fetchTasks(state) {
    const db = getFirestore()

    try {
      const documents = await getDocs(
        collection(db, 'tasks', state.getters.getUser.uid, 'todos')
      )

      const tasks = documents.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      state.commit('RETRIEVE_TASKS', tasks)
    } catch (err) {
      state.commit('CATCH_ERROR', err)
    }
  },

  setUser(state, payload) {
    state.commit('SET_USER', payload)
  },

  clearState(state) {
    console.log('Clearing state')
    state.commit('CLEAR_STATE')
  },
}
