import React from 'react'
import { StackNavigationOptions } from 'react-navigation-stack/lib/typescript/src/vendor/types'
import { NavigationCommonTabOptions } from 'react-navigation-tabs/lib/typescript/src/types'

import Home from '@/pages/geek-home'
import Login from '@/pages/geek-login'
import SplashPage from '@/pages/geek-splash'
import WebView from '@/pages/geek-webview'


type StackPageProps = {
  name: string
  component: React.ReactNode,
  navigationOptions?: StackNavigationOptions
}

type TabsPageProps = {
  component?: React.ReactNode,
  name: string,
  navigationOptions?: NavigationCommonTabOptions,
  children: StackPageProps[]
}

export type SwitchProps = {
  tabs?: TabsPageProps[]    // tabs
  auth: StackPageProps[] | StackPageProps,     // 权限页面
  [key: string]: TabsPageProps[] | StackPageProps[] | StackPageProps | undefined
}

const appConfig: SwitchProps = {
  splash: { component: SplashPage, name: 'SplashPage' },
  auth: { component: Login, name: 'login' },
  home: [
    { component: Home, name: 'home' },
    { component: WebView, name: 'webview' }
  ] 
}

export default appConfig