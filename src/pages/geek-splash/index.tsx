import React, {useEffect} from 'react'
import {
  useAppConfig,
  useStatusBar,
  useFocusBlur,
  navigationOptions,
  navigationService,
} from 'geekbase';
import Config from '@/config'

SplashPage.navigationOptions = {
  ...navigationOptions,
  header: null,
};
function SplashPage(props: any) {
  const {isFocus} = useFocusBlur(props.navigation);
  useStatusBar(isFocus, true, 'white');
  // app 系统初始化
  const [appConfigFinish] = useAppConfig(Config.AppConfig, Config.appConfigUrl);

  useEffect(() => {
    if (!appConfigFinish) {
      return;
    }
    navigationService.navigate('home');
  }, [appConfigFinish]);

  return <></>;
}

export default SplashPage;
