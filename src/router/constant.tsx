import React from 'react'
import { Image, Text, View } from "react-native"
import { device, rpx } from "geekbase"
import backBlackImg from "@/assets/header/back.png"
import backWhiteImg from "@/assets/header/backwhite.png"
import { TouchableOpacity } from 'react-native-gesture-handler'


function headerBack({ canGoBack, onPress }: any, isBlack = true) {
    return (
        canGoBack ? <TouchableOpacity onPress={onPress}>
             <View style={{
                width: rpx(80), height: device.headerHeight - rpx(20),
                marginLeft: rpx(0), alignItems: 'center', justifyContent: 'center'
            }}>
                <Image source={isBlack ? backBlackImg : backWhiteImg} style={{ width: rpx(36), height: rpx(36) }} />
            </View>
        </TouchableOpacity> : null
    )
}

function headerBackImage(isBlack = true) {
    return (
        <View style={{
            width: rpx(80), height: device.headerHeight - rpx(20),
            marginLeft: rpx(0), alignItems: 'center', justifyContent: 'center'
        }}>
            <Image source={isBlack ? backBlackImg : backWhiteImg} style={{ width: rpx(36), height: rpx(36) }} />
        </View>
    )
}

const commonNavigationOptions = {
    headerBackTitle: null, // 必须在源屏幕 (而不是目标屏幕) 中定义
    headerRight: <Text />,
    headerTitleContainerStyle: {
        flex: 1, // 可以不写
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitleAllowFontScaling: false, // 避免字体受系统字体缩放影响
}

const commonHeaderStyle = {
    borderBottomWidth: 0,
    shadowOpacity: 0,
    elevation: 0
}

const commonHeaderTitleStyle = {
    // fontSize: rpx(37),
    fontWeight: '500',
    alignSelf: 'center',
    textAlign: 'center'
}

const navigationOptions = {
    ...commonNavigationOptions,
    headerStyle: {
        ...commonHeaderStyle,
        backgroundColor: '#fff'
    },
    headerBackImage: headerBackImage(),
    headerTitleStyle: {
        ...commonHeaderTitleStyle,
        color: '#484C4F'
    }
}

export {
    navigationOptions,
    headerBack,
    headerBackImage
}
