import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="grow bg-blue-400" style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
        <View className="flex h-1/2">

        </View>
        <View className="flex grow pl-8 pr-8">
          <Button className="mx-2 my-4" mode='contained' 
            onPress={() => navigation.navigate("CreateRoom")}>Create Room</Button>

          <Button className="mx-2 my-4 pl-8 pr-8" mode='contained-tonal' 
            onPress={() => navigation.navigate("JoinRoom")}>Join Room</Button>
        </View> 
    </View>
  )
}

export default HomeScreen;