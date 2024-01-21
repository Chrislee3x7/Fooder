import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserService from '../services/user.service';

const CreateRoomScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');

  const insets = useSafeAreaInsets();

  const onStartRoomPressed = async () => {
    // first create a user
    if (!username) {
      return;
    }
    await UserService.createUser(username);
    // create a room and join current user
    await UserService.createRoom();

    // navigation.navigate('Lobby')
  }

  return (
    <View className=" bg-blue-400 grow" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View className="flex h">
        <TouchableOpacity className="flex-row ml-4 items-center" onPress={() => navigation.goBack()}>
          <Icon
            source="chevron-left"
            color="black"
            size={35}
          />
          <Text>Go Back</Text>

        </TouchableOpacity>

      </View>
      <View className="px-8 justify-center grow">
        <View className="mb-4 ml-4 mr-4">
          <TextInput
            autoCapitalize="none"
            blurOnSubmit
            value={username}
            onChangeText={(text) => {setUsername(text)}}
            inputMode="text"
            mode='outlined'
            label='Username'
          />
        </View>
        <View className="justify-center">
          <Button className="my-4 mx-2" mode='contained'
            onPress={() => onStartRoomPressed()}>Start Room</Button>
        </View>
      </View>

    </View>
  )
}

export default CreateRoomScreen;