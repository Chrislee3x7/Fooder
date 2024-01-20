import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Text, TextInput } from 'react-native-paper';

const LobbyScreen = ({ navigation }) => {

  const insets = useSafeAreaInsets();

  return (
    <View className="justify-center bg-white grow" style={{paddingTop: insets.top}}>
      <View className="h-2/3 bg-white">
        
      </View>
      <View className="flex grow rounded-t-xl justify-between items-center py-6 bg-red-300" style={{paddingBottom: insets.bottom}}>
        <View className="bg-white p-2 rounded-2xl">
          <Text className="text-center" variant="headlineMedium">PeppyCloud3x7</Text>
        </View>

        <View className="justify-center flex-row space-x-8 ">

          <TouchableOpacity className="pb-4" onPress={() => {navigation.goBack()}}>
            <View className="rounded-full h-28 w-28 bg-red-400 items-center justify-center">
              <Text variant="headlineSmall">Close Room</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="pb-4">
            <View className="rounded-full h-28 w-28 bg-white items-center justify-center">
              <Text className="text-center" variant="headlineLarge">GO!</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Button className="" mode='contained' 
          onPress={() => navigation.navigate('Home')}>Start!</Button> */}
      </View>
    </View>
  )
}

export default LobbyScreen;