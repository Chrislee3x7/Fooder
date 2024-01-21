import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Button, Text, TextInput, Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UserService from '../services/user.service';


const JoinRoomScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');
  
  const onJoinRoomPress = async () => {
    console.log(roomCode);
    await UserService.joinRoom(roomCode);
    navigation.navigate('Lobby', {roomCode: roomCode, isRoomCreator: false});
  }

  return (
    <View className="grow bg-blue-400" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View className="flex h-1/2">
        <TouchableOpacity className="flex-row ml-4 items-center" onPress={() => navigation.goBack()}>
          <Icon
            source="chevron-left"
            color= "black"
            size={35}
          />
          <Text>Go Back</Text>
        </TouchableOpacity>
        
        <View className="flex h-1/2 justify-center items-center">
          <Image
            resizeMode='contain'
            style={{width: 300, height: 100}}
            source={require('../assets/AppLogo.png')}
          />
        </View>

      </View>
      <View className="flex grow pl-8 pr-8">
        <View className="mb-4 mx-2 bg-white pb-2 pt-3 px-2 rounded-2xl">
          <View className="mb-2 mx-2">
            <TextInput
              autoCapitalize="none"
              blurOnSubmit
              value={roomCode}
              onChangeText={text => {setRoomCode(text)}}
              inputMode="text"
              mode='outlined'
              label='Room Code'
            />
          </View>

          <View className="mb-2 mx-2 ">
            <TextInput
              autoCapitalize="none"
              blurOnSubmit
              inputMode="text"
              mode='outlined'
              label='Username'
              value={username}
              onChangeText={text => {setUsername(text)}}
            />
          </View>
        </View>

        <Button
          className="mx-2 my-4 pl-8 pr-8"
          style={{backgroundColor: '#EFEFA7', padding: 8, justifyContent: 'center'}} 
          labelStyle={{color: '#000000', fontSize: 16}}
          // labelStyle={{}}
          onPress={() => onJoinRoomPress()}
        >Join Room
        </Button>
      </View>
    </View>
  )
}

export default JoinRoomScreen;