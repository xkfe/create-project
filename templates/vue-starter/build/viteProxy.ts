import type { ProxyOptions } from 'vite'
import { bold, cyan, green, underline } from 'kleur/colors'

type ProxyItem = [string, string]

type ProxyList = ProxyItem[]

type ProxyTargetList = Record<string, ProxyOptions>

/**
 * 创建代理，用于解析 .env.development 代理配置
 * @param list
 */
export function createProxy(list: ProxyList = [], isProxyConsole: boolean): ProxyTargetList {
  const ret: ProxyTargetList = {}
  for (const [prefix, target] of list) {
    const httpsRE = /^https:\/\//
    const isHttps = httpsRE.test(target)

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
      bypass: (req, res, options) => {
        const proxyURL = options.target + (options.rewrite ? options.rewrite(req.url || '') : '')
        isProxyConsole && console.log(`${cyan(bold('[ProxyURL]'))} ${green(underline(proxyURL))}`)
        res.setHeader('A-proxyurl', proxyURL)
      },

    }
  }
  return ret
}
