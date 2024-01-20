import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import CreateRoomScreen from './CreateRoomScreen';


const Fooder = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateRoom" component={CreateRoomScreen} />
      <Stack.Screen name="JoinRoom" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default Fooder;