/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import routerConfig from './config'
import { headerBack } from './constant';

// navigation
const renderStack = ( tabRoute: any ) => {
  let routes;
  if (tabRoute instanceof Array) {
    routes =  tabRoute.map(itm => {
      const { navigationOptions, component } = itm || {}
      return {
        [itm.name]: { screen: component, navigationOptions },
      }
    }).reduce((pre, current) => {
      return {
        ...pre,
        ...current
      }
    }, {})
  } else {
    routes = {
      [tabRoute.name]: {
        screen: tabRoute.component,
        navigationOptions: tabRoute.navigationOptions
      },
    }
  }
  return createStackNavigator({
    ...routes,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerBackAllowFontScaling: false,
        headerLeft: headerBack
      }
    }
  })
}

//tabs
const renderTabs = (tabsConfig: any[]) => {
  const tabs = tabsConfig.map(itm => {
    return itm.children && itm.children.length > 0 ? {
      [itm.name]: {
        screen: renderStack(itm.children),
        navigationOptions: itm.navigationOptions
      }
    }  : {
      [itm.name]: {
        screen: itm.component,
        navigationOptions: itm.navigationOptions
      }
    }
  }).reduce((pre, current) => {
    return {
      ...pre as any,
      ...current
    }
  }, {})
  if (Object.keys(tabs).length > 0) {
    const TabNavigator = createBottomTabNavigator({
      ...tabs as any
    },
    {
      defaultNavigationOptions: ({navigation}) => {
        return {
          tabBarVisible: navigation.state.index === 0,
        }
      }
    })
    return TabNavigator
  }
  return null
}

// switch
const renderSwitch = (routerCfg: any) => {
  const switchRoutes = Object.keys(routerCfg).map(key => {
    const screen = key === 'tabs' ? renderTabs(routerCfg[key]) : renderStack(routerCfg[key])
    if (screen) {
      return {
        [key]: {
          screen: key === 'tabs' ? renderTabs(routerCfg[key]) : renderStack(routerCfg[key])
        }
      }
    }
  }).reduce((pre, current) => {
    return {
      ...pre as any,
      ...current
    }
  }, {})
  console.log('===: ', switchRoutes)
  return createSwitchNavigator({
    ...switchRoutes as any
  })
}

export default createAppContainer(renderSwitch(routerConfig));