const defaultSettings =  {
  "server": "",
  "protocol": "wechat-video",
  "obfs": "",
  "up_mbps": 10,
  "down_mbps": 500,
  "acl": "",
  "mmdb": "",
  "socks5": {
    "listen": ""
  },
  "http": {
    "listen": ""
  }
}

export const mergeSettings = (
  server: Record<string, any>,
  settings: Record<string, any>,
  resDir: string
) => {
  let next = Object.assign({}, defaultSettings, {
    server: `${server.address}:${server.port}`,
    obfs: server.password,
    acl: `${resDir}etc/client.acl`,
    mmdb: `${resDir}etc/GeoLite2-Country.mmdb`,
    socks5: {
      listen: `127.0.0.1:${settings.socksPort}`
    },
    http: {
      listen: `127.0.0.1:${settings.httpPort}`
    }
  })
  return next
}