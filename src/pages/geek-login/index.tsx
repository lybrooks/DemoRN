import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { navigationService } from 'geekbase'

export default () => {

  return (
    <View>
      <Text> this is login page </Text>
      <TouchableOpacity onPress={() => {
        navigationService.navigate('home')
      }}>
        <Text>home</Text>
      </TouchableOpacity>
    </View>
  )
}