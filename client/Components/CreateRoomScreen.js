import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Text, TextInput } from 'react-native-paper';

const CreateRoomScreen = ({ navigation }) => {

  const insets = useSafeAreaInsets();

  return (
    <View className="px-8 bg-blue-400 justify-center grow" style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <View className="grow"/>
      <Text className="text-center" variant="titleSmall">Room Code:</Text>
      <Text className="mb-4 text-center" variant="headlineLarge">RDQJJ</Text>
      <View className="mb-4">
        <TextInput
          autoCapitalize="none"
          blurOnSubmit
          inputMode="text"
          mode='outlined'
          label='Username'
        />
      </View>
      <View className="grow"/>
      <View className="flex justify-center">
        <Button className="" mode='contained' 
          onPress={() => navigation.navigate('Lobby')}>Start Room</Button>
      </View>
    </View>
  )
}

export default CreateRoomScreen;