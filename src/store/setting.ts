import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export default defineStore(
  'setting',
  () => {
    const socksPort = ref(1083)
    const httpPort = ref(1084)
    const restoreSetting = () => {
      socksPort.value = 1083
      httpPort.value = 1084
    }
    return { socksPort , httpPort, restoreSetting }
  },
  { persist: true }
)
