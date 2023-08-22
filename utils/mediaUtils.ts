export const validateAspectRatio = (file: File, ratio: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const [requiredWidth, requiredHeight] = ratio.split(':').map(Number)
    const type = file.type.split('/')[0]

    if (type === 'image') {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        const isValid = (img.width / img.height).toFixed(2) === (requiredWidth / requiredHeight).toFixed(2)
        resolve(isValid)
      }
    } else if (type === 'video') {
      const video = document.createElement('video')
      video.src = URL.createObjectURL(file)
      video.onloadedmetadata = () => {
        const isValid =
          (video.videoWidth / video.videoHeight).toFixed(2) === (requiredWidth / requiredHeight).toFixed(2)
        resolve(isValid)
      }
    }
  })
}

export const createThumbnail = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    video.onerror = () => {
      reject(new Error('Cannot play video format'))
    }

    video.src = URL.createObjectURL(file)
    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      video.currentTime = 0
    }

    video.onseeked = () => {
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Thumbnail generation failed'))
            return
          }
          const thumbnailUrl = URL.createObjectURL(blob)
          resolve(thumbnailUrl)
        },
        'image/jpeg',
        0.5
      )
    }
  })
}
