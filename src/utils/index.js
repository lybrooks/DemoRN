// import { Decimal } from "decimal.js";
import DeviceInfo from "react-native-device-info";
import { Linking, findNodeHandle, UIManager } from "react-native";
import * as WeChat from "react-native-weixin";
import { Toast } from "geekbase";
// import { saveBase64Image } from './fileUtil'
// import http from "@/http";
import { playWithSeekPos } from "react-native-player";

// classin app 的下载地址
const iosClassinAppUrl =
  "https://apps.apple.com/cn/app/classin-%E5%9C%A8%E7%BA%BF%E4%BA%92%E5%8A%A8%E6%95%99%E5%AE%A4/id1226361488";
const androidClassinAppUrl =
  "https://profile-1257124244.cos.ap-chengdu.myqcloud.com/app_resource/classin_android_install_3.0.3.2.apk";

const sleep = async duration => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
};

const linkClassinApp = url => {
  return new Promise((resolve, reject) => {
    const systemVersion = DeviceInfo.getSystemVersion();
    // eslint-disable-next-line radix
    if (systemVersion && parseInt(systemVersion) < 6) {
      reject({
        message:
          "您的手机系统版本小于安卓6.0，无法下载安装。请升级到安卓6.0以上"
      });
      return;
    }
    Linking.canOpenURL(url)
      .then(supported => {
        const iosDownloadUrl = iosClassinAppUrl;
        const androidDownloadUrl = androidClassinAppUrl;
        const downloadUrl =
          DeviceInfo.os === "android" ? androidDownloadUrl : iosDownloadUrl;
        if (!supported) {
          // 如果没有安装 就弹出下载弹窗
          console.log("classin app没有安装");
          reject({
            message: "classin app没有安",
            appUrl: downloadUrl
          });
        } else {
          // 跳转到 classin app
          resolve();
          return Linking.openURL(url);
        }
      })
      .catch(err => {
        console.error("classin app 打开报错", err);
        reject({
          message: "classin app 打开报错"
        });
      });
  });
};

const getBoundingRect = (dom, cb) => {
  const handle = findNodeHandle(dom);
  UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
    cb({
      x,
      y,
      width,
      height,
      pageX,
      pageY
    });
  });
};

const stringParams = params => {
  let query = "";
  Object.keys(params).forEach(key => {
    const value = params[key];
    console.log(value);
    query =
      query +
      "&" +
      key +
      "=" +
      (typeof value === "string" ? value : JSON.stringify(value));
  });
  return query.length > 0 ? query.slice(1) : query;
};

const share =  async (data, isTimeLine = false) => {
  try {
    Toast.showLoading();
    let isInstalled = await WeChat.isWXAppInstalled();
    if (isInstalled) {
      let successed = false;
      if (!isTimeLine) {
        successed = await WeChat.shareToSession(data);
      } else {
        successed = await WeChat.shareToTimeline(data);
      }
      Toast.hideLoading();
      if (successed) {
        Toast.msg("分享成功");
      } else {
        Toast.msg("分享失败");
      }
    } else {
      Toast.hideLoading();
      Toast.warn("没有安装微信，不能分享");
    }
  } catch (error) {
    Toast.hideLoading();
    Toast.msg((error || {}).message ? error.message : error);
  }
};

const openUrl = url => {
  if (Linking.canOpenURL(url)) {
    Linking.openURL(url);
  }
};

/**
 * @type img | text | news
 * @data img => {img: base64} , text => { description: '' } , news: { title: string, webpageUrl: url, description: string }
 * @isTimeline 是否分享到朋友圈
 */
const shareByWeb = ({ type = 'text', img, ...data } , isTimeline = false) => {
  if (type === 'text' || type === 'news') {
    const shareData = {
      type,
      ...data
    }
    share({ ...shareData }, isTimeline)
  } else {
    // saveBase64Image(img, (imgPath, error ) => {
    //   if (!error) {
    //     share({
    //       type: 'imageFile',
    //       description: '图片分享',
    //       imageUrl: "file://" + imgPath,
    //       title: '图片分享'
    //     }, isTimeline)
    //   } else {
    //     Toast.warn('图片分享失败, 请重试')
    //   }
    // })
  }
}

// 视频播放封装
const playVideo = async (url, cb) => {
  // const [res, error] = await http.queryVideoPlayTime(url || '')
  // console.log(res, error)
  // const { checkValue } = res || {}
  // const { current, total } = checkValue || {}
  // const currentTime = total > 0 ? (current + 5 > total ? 1 : current) : 1
  playWithSeekPos(url, 0, (videoRes) => {
    console.log('保存视频回调', videoRes)
    // http.saveVideoPlayTime(url, videoRes).then((res) => {
    //   console.log('保存视频播放', res)
    // })
    cb && cb(videoRes)
  })
}

export {
  sleep,
  linkClassinApp,
  getBoundingRect,
  stringParams,
  share,
  openUrl,
  shareByWeb,
  playVideo
};
