import { ref } from 'vue'

export const currentAudio = ref(null)
export const currentTime = ref(0)
export const totalTime = ref(0)

export function playMusic(music) {
  if (!music.mFile) {
    alert('音乐URL为空，无法播放')
    return
  }

  if (currentAudio.value) {
    currentAudio.value.pause()
  }

  currentAudio.value = new Audio(`http://127.0.0.1:5173/audio/${music.mFile}`)
  currentAudio.value.addEventListener('loadedmetadata', () => {
    totalTime.value = currentAudio.value.duration
  })
  currentAudio.value.addEventListener('timeupdate', () => {
    currentTime.value = currentAudio.value.currentTime
  })
  currentAudio.value.play()
}
