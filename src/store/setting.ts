import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export default defineStore(
  'setting',
  () => {
    const isSysProxyEnabled = ref(false)
    const socksPort = ref(1083)
    const httpPort = ref(1084)
    const restoreSetting = () => {
      socksPort.value = 1083
      httpPort.value = 1084
      isSysProxyEnabled.value = false
    }
    return { socksPort , httpPort, isSysProxyEnabled, restoreSetting }
  },
  { persist: true }
)
