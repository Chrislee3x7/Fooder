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
    if (!username) {
      return;
    }
    if (!roomCode) {
      return;
    }
    await UserService.createUser(username);
    const res = await UserService.joinRoom(roomCode);
    if (res.status == 200) {
      navigation.navigate('Lobby', {username: username, roomCode: roomCode, isRoomCreator: false});
    } else {
      return;
    }
  }

  return (
    <View className="grow" style={{ paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: "#FBF9F0" }}>
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
        <View className="shadow-md mb-4 mx-2 pb-2 pt-3 px-2 rounded-2xl"
          style={{backgroundColor: "#EAC0C0"}}>
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
              onChangeText={(text) => {setUsername(text)}}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => onJoinRoomPress()}>
          <View className="shadow-md mx-2 my-4 p-4 rounded-2xl" style={{backgroundColor: '#F1DD76'}}>
            <Text className="text-center" variant="titleMedium">Join Room</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default JoinRoomScreen;