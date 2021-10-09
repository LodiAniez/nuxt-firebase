const functions = require('firebase-functions')
const admin = require('firebase-admin')
const path = require('path')
const fs = require('fs-extra')
const os = require('os')
const sharp = require('sharp')

const { Storage } = require('@google-cloud/storage')
const gcs = new Storage()

admin.initializeApp()

exports.onFileUpload = functions.storage.object().onFinalize(async (object) => {
  if (object.name.startsWith('gallery/resized-')) return false

  const bucket = gcs.bucket(object.bucket)
  const filePath = object.name
  const fileName = filePath.split('/').pop()

  const workingDir = path.join(os.tmpdir(), 'thumbs')

  const timestamp = Math.floor(Date.now() / 1000)
  const tmpFilePath = path.join(workingDir, 'source_' + timestamp + '.png')

  try {
    await fs.ensureDir(workingDir)

    await bucket.file(filePath).download({
      destination: tmpFilePath,
      validation: false,
    })

    const size = 64
    const thumbPath = path.join(workingDir, fileName)

    await sharp(tmpFilePath).resize(size, null).toFile(thumbPath)
    await bucket.upload(thumbPath, {
      destination: `gallery/resized-${fileName}`,
    })

    return fs.remove(workingDir)
  } catch (err) {
    return err.message
  }
})

exports.userOnCreate = functions.auth.user().onCreate((user) => {
  console.log(`A welcome email is sent to ${user.email}!`)
  return Promise.resolve()
})
