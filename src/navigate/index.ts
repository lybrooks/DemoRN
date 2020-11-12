import { navigationService, getAppConfig } from 'geekbase'
import cache from '@/cache'

export default {
  /**
   * 去webview页面
   * @param {uri, useToken, initTitle, onMessage } props
   */
  navigateGeekWebViewPage(props: {
    uri: string,
    useToken?: boolean,
    initTitle?: string,
    onMessage?: Function
  }) {
    const { uri, useToken, ...others } = props
    let url = uri
    if (useToken) {
      cache.getToken().then((token: string) => {
        if (url.indexOf("?") !== -1) {
          if (url[uri.length - 1] === "&") {
            url = `${url}token=${token}`;
          } else {
            url = `${url}&token=${token}`;
          }
        } else {
          url = `${url}?token=${token}`;
        }
        navigationService.navigate('webview', {
          uri: /^https?:\/\//g.test(url) ? url : `${getAppConfig().baseUrl}${url}`,
          ...others
        })
      });
    } else {
      navigationService.navigate('webview', {
        uri: /^https?:\/\//g.test(url) ? url : `${getAppConfig().baseUrl}${url}`,
        ...others
      })
    }
  },

  navigateAbout: () => {
    navigationService.navigate('About')
  },

  navigateAuth: () => {
    navigationService.navigate('auth')
  },

}