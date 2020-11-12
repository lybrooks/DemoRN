/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from "react-native";
import { device, rpx, GeekWebView, useStatusBar, navigationService, GeekWebViewComponent, useFocusBlur } from "geekbase";
import { back } from "./assets";
import colors from '@/assets/colors'
import { shareByWeb } from "@/utils";
import * as utils from '@/utils'
import { withStackScreen } from "@/hooks";
import { NavigationStackProp } from "react-navigation-stack";

type WebViewPagePramasType = {
  uri: string,
  onMessage?: (msg: any) => void,
  initTitle?: string,
  title?: string,
  onBack?: () => void
  onClose?: () => void
}

function GeekWebViewPage(props: {
  navigation: NavigationStackProp<{}, WebViewPagePramasType>
}) {
  const uri = props.navigation.getParam('uri')
  const onMessage = props.navigation.getParam("onMessage");
  const webviewRef = useRef<GeekWebViewComponent>(null);
  const { isFocus } = useFocusBlur(props.navigation);
  useStatusBar(isFocus, true, "black");

  // 返回逻辑
  const onBack = () => {
    if (webviewRef.current && webviewRef.current.canGoBack()) {
      console.log('== click back ===', webviewRef.current.canGoBack())
      webviewRef.current && webviewRef.current.goBack();
    } else {
      console.log('== click back === goBack', webviewRef.current, navigationService)
      navigationService.goBack()
    }
  };

  // 关闭逻辑
  const onClose = () => {
    props.navigation.goBack();
  };

  const onTitle = (title: string) => {
    const initTitle = props.navigation.getParam("initTitle");
    props.navigation.setParams({ title: title ||  initTitle });
  };

  const handleMessage = (event: any) => {
    if (onMessage) {
      onMessage(event)
    }
  };

  // 分享逻辑
  const handleShare = (data: any) => {
    shareByWeb(data);
  };

  // 分享朋友圈
  const handleShareTimeline = (data: any) => {
    console.log("onShareTimeline");
    shareByWeb(data, true);
  };

  // 播放视频
  const playVideo = ({ url }: { url: string }) => {
    utils.playVideo(url, (result: any) => {
      setTimeout(() => {
        webviewRef.current && webviewRef.current.excuteJSMethod({
          method: 'uploadPlayInfo',
          data: result
        })
      }, 500);
    })
  }

  // h5 的log日志
  const handleLog = (args: any) => {
    if (__DEV__) {
      console.log('H5 LOG: ', args)
    }
  }

  useEffect(() => {
    const backEffect = () => {
      onBack();
      return true;
    }
    if (device.os === "android") {
      // 针对安卓的实体返回键 true 返回无效；false 正常返回
      BackHandler.addEventListener("hardwareBackPress", backEffect);
    }
    props.navigation.setParams({ onBack, onClose });
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backEffect);
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'blue'}}>
      <GeekWebView
        ref={webviewRef}
        style={styles.container}
        uri={uri}
        renderLoading={() => (
          <View
            style={{
              height:
                device.height -
                device.headerHeight -
                device.androidStatusBarHeight,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
        onTitle={onTitle}
        onShare={handleShare}
        onMessage={handleMessage}
        onPlayVideo={playVideo}
        onShareTimeline={handleShareTimeline}
        onLog={handleLog}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pageBgColor,
  },
});

withStackScreen<WebViewPagePramasType>(GeekWebViewPage, ({ navigation }) => {
  return {
    headerStyle: {
      borderBottomColor: '#DEE2EA',
      borderBottomWidth: rpx(1)
    },
    headerTitle: navigation.getParam("title") || navigation.getParam('initTitle'),
    headerLeft: () => {
      return (
        <View
          style={{
            minWidth: rpx(100),
            marginLeft: rpx(20),
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback onPress={() => {
            const onBack = navigation.getParam("onBack")
            onBack && onBack()
          }}>
            <Image
              source={back}
              style={{ width: rpx(40), height: rpx(40), marginLeft: rpx(10), padding: rpx(10) }}
            />
          </TouchableWithoutFeedback>
        </View>
      );
    },
  };
})

export default GeekWebViewPage;
