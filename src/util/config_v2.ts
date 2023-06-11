import YAML from 'yaml'

export default (server: Record<string, any>, settings: Record<string, any>) => {
  const config = YAML.stringify({
    server: `${server.address}:${server.port}`,
    auth: server.password,
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
      up: '100 mbps',
      down: '100 mbps'
    },
    fastOpen: true,
    socks5: {
      listen: `127.0.0.1:${settings.socksPort}`
    }
  })
  return config
}