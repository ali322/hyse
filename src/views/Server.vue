<template>
  <div class="h-full flex">
    <ServerList :servers="servers" :index="selected" @select="selectOne" @add="addOne" @remove="removeOne" />
    <ServerForm :server="servers[selected]" :index="selected" @run='runOne' @update="changeOne"
      v-if="servers.length > 0" />
    <Confirm ref="confirmRef" />
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { watch, ref } from 'vue'
import { resourceDir } from '@tauri-apps/api/path'
import Confirm from '@/components/Confirm.vue'
import { mergeSettings } from '@/util/config'
import { event, tauri } from '@tauri-apps/api'
import useServerStore from '@/store/server'
import useSettingStore from '@/store/setting'
import clashSettings from '@/util/clash'
import ServerList from '@/modules/ServerList.vue'
import ServerForm from '@/modules/ServerForm.vue'

const confirmRef = ref<InstanceType<typeof Confirm>>()
const serverStore = useServerStore()
const { servers, selected, running } = storeToRefs(serverStore)
const settingStore = useSettingStore()
const { socksPort, relayPort, httpPort,isSysProxyEnabled } = storeToRefs(settingStore)

watch(() => servers.value.length, (curr: number, prev: number) => {
  if (prev === 0 && curr > 0) {
    selectOne(curr - 1)
  }
})
const selectOne = (i: number) => {
  if (running.value === true) return
  selected.value = i
}
const addOne = () => {
  serverStore.createServer({
    tag: 'foo', address: 'example.com', port: 443
  })
  selected.value = servers.value.length - 1
}
const changeOne = (server: Record<string, any>) => {
  serverStore.saveServer({ server, index: selected.value })
}
const removeOne = () => {
  const c = confirmRef.value as any
  c.show('Are u sure?', (isOk: boolean) => {
    if (isOk) {
      serverStore.deleteServer(selected.value)
      selected.value = servers.value.length - 1
    }
  })
}
event.listen('sidecar-running', (evt: { payload: string }) => {
  console.log('evt', evt)
  serverStore.writeOutput(evt.payload)
})
const startOne = async () => {
  const server = servers.value[selected.value]
  let resDir = await resourceDir()
  const config = mergeSettings(server,{ httpPort: httpPort.value, socksPort: socksPort.value}, resDir)
  tauri.invoke('run_sidecar', { config: JSON.stringify(config, null, 2) })
  const next = clashSettings(socksPort.value, relayPort.value)
  tauri.invoke('run_clash', {config: next})
  running.value = true
}
const stopOne = () => {
  event.emit('stop-sidecar')
  serverStore.purgeOutput()
  running.value = false
  isSysProxyEnabled.value = false
  tauri.invoke('toggle_sysproxy', {isEnabled: false, port: socksPort.value})

}
let timer: any
const runOne = () => {
  if (running.value) {
    stopOne()
    if (timer) {
      clearInterval(timer)
    }
  } else {
    startOne()
  }
}
</script>