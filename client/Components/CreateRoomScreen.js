import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Text, TextInput } from 'react-native-paper';

const CreateRoomScreen = ({ navigation }) => {

  const insets = useSafeAreaInsets();

  return (
    <View className="bg-blue-400 justify-center grow" style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <View className="">
        <Text className="mt-6 mb-4 mx-4 text-center" variant="headlineLarge">New Room</Text>
        <View className="mb-4 ml-4 mr-4">
          <TextInput
            autoCapitalize="none"
            blurOnSubmit
            inputMode="text"
            mode='outlined'
            label='Username'
          />
        </View>
        <Button className="my-4 mx-2" mode='contained' 
          onPress={() => navigation.navigate('Home')}>Start Room</Button>
      </View>
    </View>
  )
}

export default CreateRoomScreen;