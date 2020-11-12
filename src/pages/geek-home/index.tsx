import React, { useCallback, useEffect, useState } from 'react'
import { View, ImageBackground, StyleSheet, Text, Alert } from "react-native";
import { TouchableHighlight } from 'react-native-gesture-handler';
import { withStackScreen } from '@/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgImg } from './assets';
import { fileUtil, rpx, useFocusBlur, useStatusBar } from 'geekbase';
import navigate from '@/navigate';

const Home = (props: any) => {
  const file = 'http://1257124244.vod2.myqcloud.com/c9be83a2vodcq1257124244/d9bd8ff25285890808419280862/1Ky6n7tAgF0A.mp4'
  const { isFocus } = useFocusBlur(props.navigation)
  useStatusBar(isFocus, true, 'white')
  const [progress, setProgress] = useState('')
  const [filePath, setFilePath] = useState('')
  useEffect(() => {
  }, [])

  const handleClickItem = useCallback((type: string) => {
    switch (type) {
      case '1':
        navigate.navigateGeekWebViewPage({ uri: 'https://www.taobao.com', initTitle: 'tabobao' })
        break;
      case '2':
        fileUtil.openFile(file)
        break;
      case '3':
        fileUtil.fileExist(file).then(res => {
          if (res) {
            Alert.alert('文件存在')
            setProgress('100')
          } else {
            fileUtil.downloadFile({ url: file }, (fprogress) => {
              setProgress((fprogress.current / fprogress.total * 100).toFixed(2))
            }).then(fs => {
              console.log('===: ', fs)
            });
          }
        })
        break
      case '4':
        const path = fileUtil.dstFilePath(file)
        setFilePath(path)
        break
      case '5':
        fileUtil.unlinkFile(file).then(() => {
          Alert.alert('删除成功')
        })
        break
      case '6':
        fileUtil.fileExist(file).then(res => {
          Alert.alert(res ? '文件存在' : '文件不存在')
        })
        break
      default:
        break;
    }
  }, [])

  return (
    <ImageBackground source={bgImg} style={styles.bgStyle}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ textAlign: 'center', width: '100%' }}>文件下载进度：{progress}%</Text>
        <Text style={{ textAlign: 'center', width: '100%' }}>文件路径：{filePath}</Text>
        <View style={{ marginTop: rpx(500) }}>
          <View style={styles.functionalArea}>
            <TouchableHighlight onPress={() => {
              handleClickItem('1')
            }} style={styles.funItem}>
              <View style={styles.funContainer}>
                <Text style={styles.fucText}>作业批阅</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
              handleClickItem('2')
            }} style={styles.funItem}>
              <View style={styles.funContainer}>
                <Text style={styles.fucText}>预览文件</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.functionalArea}>
            <TouchableHighlight onPress={() => {
              handleClickItem('3')
            }} style={styles.funItem}>
              <View style={styles.funContainer}>
                <Text style={styles.fucText}>下载文件： http://1257124244.vod2.myqcloud.com/c9be83a2vodcq1257124244/d9bd8ff25285890808419280862/1Ky6n7tAgF0A.mp4</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {
              handleClickItem('4')
            }} style={styles.funItem}>
              <View style={styles.funContainer}>
                <Text style={styles.fucText}>查看文件路径</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.functionalArea}>
            <TouchableHighlight onPress={() => {
              handleClickItem('5')
            }} style={styles.funItem}>
              <View style={styles.funContainer}>
                <Text style={styles.fucText}>删除文件</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {
              handleClickItem('6')
            }} style={styles.funItem}>
              <View style={styles.funContainer}>
                <Text style={styles.fucText}>查看文件是否存在</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bgStyle: {
    flex: 1
  },
  functionalArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: rpx(10)
  },
  funItem: {
    width: rpx(300),
    height: rpx(200),
    borderRadius: rpx(10),
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  funContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1
  },
  fucText: {
    color: 'white', fontSize: rpx(20), fontWeight: 'bold'
  }
})

export default withStackScreen(Home, {
  header: () => null,
})