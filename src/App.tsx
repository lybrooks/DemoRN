import React, { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native'
import AppContainer from './router'
import models from '../src/models'
import { GeekAppModals, store, navigationService } from 'geekbase'
import { StoreProvider, createStore } from 'easy-peasy'

console.log('models: ', AppContainer)
store.store = createStore({
  ...models
})

export default function App() {
  useEffect(() => {
    console.log('--app进入')
    AppState.addEventListener('change', handleAppStateChange)
    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  const handleAppStateChange = (appState: AppStateStatus) => {
    console.log('当前app状态', appState)
    if (appState === 'background') {
    }
  }

  return (
    <StoreProvider store={store.store}>
      <AppContainer ref={navigatorRef => {
         navigationService.setTopLevelNavigator(navigatorRef)
      }} />
      <GeekAppModals />
    </StoreProvider>
  );
}
