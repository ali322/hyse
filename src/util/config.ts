import YAML from 'yaml'

export default (server: Record<string, any>, settings: Record<string, any>) => {
  const config = YAML.stringify({
    server: `${server.address}:${server.port}`,
    auth: server.password,
    obfs: {
      type: "salamander",
      salamander: {
        password: "fuckme"
      }
    },
    tls: {
      sni: server.sni,
      insecure: false
    },
    quic: {
      initStreamReceiveWindow: 8388608,
      maxStreamReceiveWindow: 8388608,
      initConnReceiveWindow: 20971520,
      maxConnReceiveWindow: 20971520,
      maxIdleTimeout: '30s',
      keepAlivePeriod: '10s',
      disablePathMTUDiscovery: false,
    },
    bandwidth: {
      up: '50 mbps',
      down: '300 mbps'
    },
    fastOpen: server.fastOpen || false,
    lazy: true,
    socks5: {
      listen: `127.0.0.1:${settings.socksPort}`,
      disableUDP: server.disableUDP || false
    }
  })
  return config
}