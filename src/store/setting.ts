import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export default defineStore(
  'setting',
  () => {
    const isSysProxyEnabled = ref(false)
    const socksPort = ref(1083)
    const httpPort = ref(1084)
    const relayPort = ref(1085)
    const restoreSetting = () => {
      socksPort.value = 1083
      httpPort.value = 1084
      relayPort.value = 1085
      isSysProxyEnabled.value = false
    }
    return { socksPort , httpPort, relayPort, isSysProxyEnabled, restoreSetting }
  },
  { persist: true }
)
