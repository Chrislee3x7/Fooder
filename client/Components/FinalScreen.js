import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Button, Text, TextInput, Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UserService from '../services/user.service';


const FinalScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');

  const onJoinRoomPress = async () => {
    await UserService.createUser(username);
    await UserService.joinRoom(roomCode);
    navigation.navigate('Lobby', { username: username, roomCode: roomCode, isRoomCreator: false });
  }

  return (
    
    <View className="grow" style={{ paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: "#fbf9f0"}}>
      <View className="flex h-1/2">
        <View className="flex h-1/2 justify-center items-center">
          <Image
            resizeMode='contain'
            style={{ width: 300, height: 100 }}
            source={require('../assets/AppLogo.png')}
          />
        </View>
        <View className="flex justify-center items-center">
          <Text variant="headlineLarge" className="">We Reccomend</Text>
        </View>
      </View>
      <View className="grow">

      </View>
      <View className="flex mb-16">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}>
          <View className="shadow-md mx-2 my-4 p-4 rounded-2xl" style={{ backgroundColor: '#f1dd76' }}>
            <Text className="text-center" variant="titleMedium">Go Again</Text>
          </View>
        </TouchableOpacity >
      </View>
    </View>
  )
}

export default FinalScreen;