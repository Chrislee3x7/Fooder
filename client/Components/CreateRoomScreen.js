import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Button, Text, TextInput, Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserService from '../services/user.service';

const CreateRoomScreen = ({ navigation }) => {
  
  const insets = useSafeAreaInsets();

  const [username, setUsername] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const onStartRoomPressed = async () => {
    // first create a user
    if (!username) {
      return;
    }
    setButtonEnabled(false);
    await UserService.createUser(username);
    // create a room and join current user
    const roomCode = await UserService.createRoom();
    if (!roomCode) {
      return;
    }
    console.log("About to navigate to lobby", roomCode);

    navigation.navigate('Lobby', {username: username,roomCode: roomCode, isRoomCreator: true});
    setButtonEnabled(true);
  }

  return (
    <View className=" grow" style={{ paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: "#FBF9F0" }}>
      <View className="flex h">
        <TouchableOpacity className="flex-row ml-4 items-center" onPress={() => navigation.goBack()}>
          <Icon
            source="chevron-left"
            color="black"
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
      <View className="px-8 justify-center grow">
        <View className="shadow-md mb-4 mx-2 pb-4 pt-3 px-4 rounded-2xl"
          style={{backgroundColor: "#69B0D6"}}>
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
        <TouchableOpacity disabled={!buttonEnabled} onPress={() => onStartRoomPressed()}>
          <View className="shadow-md mx-2 my-4 p-4 rounded-2xl" style={{backgroundColor: '#F1DD76'}}>
            <Text className="text-center" variant="titleMedium">Start Room</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default CreateRoomScreen;