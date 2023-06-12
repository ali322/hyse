<template>
  <div class="py-2 flex-1">
    <div class="flex px-4 pb-2 pt-2 justify-end items-center">
      <div class="flex-1 text-left flex">
        <label class="mr-6 text-gray-500 w-20">Tag</label>
        <input type="text" spellcheck="false" :disabled="running" v-model="tag"
          class="leading-7 rounded border border-gray-300 text-sm px-2 w-20 disabled:text-gray-500" />
      </div>
      <button class="w-16 h-[30px] flex items-center" :class="running ? 'btn-danger' : 'btn-primary'" @click="run">
        <StopRound class="w-6 h-6" v-if="running"></StopRound>
        <PlayArrowRound class="w-5 h-5" v-else></PlayArrowRound>
        <span class="mx-1 leading-7">{{ running ? 'stop' : 'run' }}</span>
      </button>
    </div>
    <div class="px-4">
      <div class="flex items-center py-2 text-left">
        <label class="mr-6 text-gray-500 w-20 text-sm">Address</label>
        <input type="text" spellcheck="false" :disabled="running" v-model="address"
          class="leading-7 rounded border border-gray-300 text-sm px-2 w-56 disabled:text-gray-500" />
      </div>
    </div>
    <div class="px-4">
      <div class="flex items-center py-2 text-left">
        <label class="mr-6 text-gray-500 w-20 text-sm">Port</label>
        <input type="text" spellcheck="false" :disabled="running" v-model="port"
          class="leading-7 rounded border border-gray-300 text-sm px-2 w-20 disabled:text-gray-500" />
      </div>
    </div>
    <div class="px-4">
      <div class="flex items-center py-2 text-left">
        <label class="mr-6 text-gray-500 w-20 text-sm">Password</label>
        <input type="password" spellcheck="false" :disabled="running" v-model="password"
          class="leading-7 rounded border border-gray-300 text-sm px-2 w-64 disabled:text-gray-500" />
      </div>
    </div>
    <div class="px-4">
      <div class="flex items-center py-2 text-left">
        <label class="mr-6 text-gray-500 w-20 text-sm">SNI</label>
        <input type="text" spellcheck="false" :disabled="running" v-model="sni"
          class="leading-7 rounded border border-gray-300 text-sm px-2 w-64 disabled:text-gray-500" />
      </div>
    </div>
    <div class="px-4">
      <div class="flex items-center py-2 text-left">
        <label class="mr-6 text-gray-500 w-20 text-sm">DisableUDP</label>
        <Select id="fl" class="rounded w-56" v-model:value="disableUDP" :disabled="running">
          <Option :value="true">true</Option>
          <Option :value="false">false</Option>
        </Select>
      </div>
    </div> 
    <div class="px-4">
      <div class="flex items-center py-2 text-left">
        <label class="mr-6 text-gray-500 w-20 text-sm">FastOpen</label>
        <Select id="fl" class="rounded w-56" v-model:value="fastOpen" :disabled="running">
          <Option :value="true">true</Option>
          <Option :value="false">false</Option>
        </Select>
      </div>
    </div>
    <Toast ref="toastRef" />
  </div>
</template>
<script lang="ts" setup>
import useServerStore from '@/store/server'
import { storeToRefs } from 'pinia'
import { toRefs, ref, computed } from 'vue'
import { debounce } from 'ts-debounce'
import { PlayArrowRound, StopRound } from '@vicons/material'
import Toast from '@/components/Toast.vue'
import Select from '@/components/Select.vue'
import Option from '@/components/Option.vue'

interface Props {
  server: Record<string, any>,
  index: number
}
interface Emits {
  (e: 'run'): void,
}
const emit = defineEmits<Emits>()

const props = defineProps<Props>()
const { server, index } = toRefs(props)

const toastRef = ref<InstanceType<typeof Toast>>()
const serverStore = useServerStore()
const { running } = storeToRefs(serverStore)

const run = () => {
  emit('run')
}
const tag = computed({
  get() {
    return server.value.tag
  },
  set(val) {
    server.value.tag = val
    onServerUpdate()
  }
})
const address = computed({
  get() {
    return server.value.address
  },
  set(val) {
    server.value.address = val
    onServerUpdate()
  }
})
const port = computed({
  get() {
    return server.value.port
  },
  set(val) {
    server.value.port = val
    onServerUpdate()
  }
})
const password = computed({
  get() {
    return server.value.password
  },
  set(val) {
    server.value.password = val
    onServerUpdate()
  }
})
const sni = computed({
  get() {
    return server.value.sni
  },
  set(val) {
    server.value.sni = val
    onServerUpdate()
  }
})
const disableUDP = computed({
  get() {
    return server.value.disableUDP || false
  },
  set(val) {
    server.value.disableUDP = val
    onServerUpdate()
  }
})
const fastOpen = computed({
  get() {
    return server.value.fastOpen || false
  },
  set(val) {
    server.value.fastOpen = val
    onServerUpdate()
  }
})
const d = debounce(() => {
  serverStore.saveServer({ server: server.value, index: props.index })
}, 300, { isImmediate: false })
const onServerUpdate = () => {
  d()
}
</script>