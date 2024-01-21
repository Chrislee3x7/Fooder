import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import CreateRoomScreen from './CreateRoomScreen';
import JoinRoomScreen from './JoinRoomScreen'
import LobbyScreen from './LobbyScreen';
import DistancePriceScreen from  './DistancePriceScreen';
import VetoScreen from './VetoScreen';
import SwipeScreen from './SwipeScreen';
import QuestionsScreen from './QuestionsScreen';


const Fooder = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateRoom" component={CreateRoomScreen} />
      <Stack.Screen name="JoinRoom" component={JoinRoomScreen} />
      <Stack.Screen name="Lobby" component={LobbyScreen} />
      <Stack.Screen name="Questions" component={QuestionsScreen} />
      <Stack.Screen name="DistancePrice" component={DistancePriceScreen} />
      <Stack.Screen name="Veto" component={VetoScreen} />
      <Stack.Screen name="Swipe" component={SwipeScreen}/>
    </Stack.Navigator>
  )
}

export default Fooder;