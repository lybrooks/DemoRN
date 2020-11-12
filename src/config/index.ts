const Config = {
    // appConfigUrl: 'https://profile-1257124244.cos.ap-chengdu.myqcloud.com/app_resource/geek_math_app_config.json',
    appConfigUrl:'jj',//填写配置文件路径
    AppConfig: {
        weChatCode: '',
        universalLink: '',
        timeout: 15000,
        // 生产
        baseUrl:  __DEV__ ? 'http://192.168.32.37:3000' : 'https://geek.jkwljy.com',
        stopServer: {
            stop: false,
            description: '暂时停服'
        },
        appVersion: { // 最新的系统版本【不是热更新版本!!!，而是上架应用商店的APP最新版本】
            ios: {
                versionNumber: "0.0.1",
                versionDescription: "测试ios",
                isMandatory: false,
                appStoreUrl: "111" // ios下载路径
            },
            android: {
                versionNumber: "1.0",
                versionDescription: "测试android",
                isMandatory: false,
                apkUrl: "111" // Android下载路径
            }
        },
        codePush: {
            open: true,
            isRelease: false,
            ios: {
                releaseKey: "IPIj65rPV5R4EIYYioZGNtazsufY4ksvOXqog",
                stagingKey: "c5XU3KTuISEnHAtAA0IRx3e4ejV14ksvOXqog"
            },
            android: {
                releaseKey: "UWQrx8vNd4uWeE4EgGH42HTTXNRM4ksvOXqog",
                stagingKey: "T22PvpZAdiwpmzNw27qxIVqLPEHS4ksvOXqog"
            }
        },
    }
}

export default Config