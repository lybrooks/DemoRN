import {NavigationStackProp} from 'react-navigation-stack';
import {StackNavigationOptions} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {navigationOptions} from '@/router/constant';
import { createTypedHooks } from 'easy-peasy';
import StoreModels from '@/models'

type ConfigType<P = {}, > = (config: {navigation: NavigationStackProp<{}, P>}) => StackNavigationOptions

export const withStackScreen = <P = {}>(
  Wrapp: React.ReactNode,
  config: StackNavigationOptions | ConfigType<P>,
) => {
  (Wrapp as any).navigationOptions = typeof config === 'function' ? (args: any) => {
    return {
      ...navigationOptions,
      ...(config(args) || {})
    }
  } : {
    ...navigationOptions,
    ...config,
  };
  return Wrapp;
};

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } = createTypedHooks<typeof StoreModels>()

