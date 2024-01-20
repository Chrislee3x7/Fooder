import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

const HomeScreen = () => {

  return (
    <View className="mt-5 h-screen">
        <View className="flex h-1/2">

        </View>
        <View className="flex grow pl-8 pr-8">
          <Button className="mx-2 my-4" mode='contained' 
            onPress={() => onLoginPress()}>Create Room</Button>

          <Button className="mx-2 my-4 pl-8 pr-8" mode='contained-tonal' 
            onPress={() => onLoginPress()}>Join Room</Button>
        </View> 
    </View>
  )
}

export default HomeScreen;