import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UserService from '../services/user.service';


const JoinRoomScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [roomCode, setRoomCode] = useState('');

  const onJoinRoomPress = async () => {
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

      </View>
      <View className="flex grow pl-8 pr-8">
        <View className="mb-4 ml-4 mr-4">
          <TextInput
            autoCapitalize="none"
            blurOnSubmit
            value={roomCode}
            inputMode="text"
            mode='outlined'
            label='Room Code'
          />
        </View>

        <View className="mb-4 ml-4 mr-4">
          <TextInput
            autoCapitalize="none"
            blurOnSubmit
            inputMode="text"
            mode='outlined'
            label='Username'
          />
        </View>

        <Button
          className="mx-2 my-4 pl-8 pr-8"
          mode='contained-tonal'
          // labelStyle={{}}
          onPress={() => onJoinRoomPress()}
        >Join Room
        </Button>
      </View>
    </View>
  )
}

export default JoinRoomScreen;