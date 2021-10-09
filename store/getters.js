export default {
  getUser(state) {
    return state.user
  },

  getTaskList(state) {
    return state.taskList.filter((key) => !key.finished)
  },

  getFinishedTasks(state) {
    return state.taskList.filter((key) => key.finished)
  },

  getGallery(state) {
    return state.gallery
  },
}
