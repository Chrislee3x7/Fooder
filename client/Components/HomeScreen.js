import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [userId, setUserId] = useState('');
  const [roomCode, setRoomCode] = useState('');

  return (
    <View className="grow" style={{paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: '#EFEFA7'}}>
        <View className="flex h-1/2 justify-center items-center">
          <Image
            resizeMode='contain'
            style={{width: 300, height: 100}}
            source={require('../assets/AppLogo.png')}
          />
        </View>
        <View className="flex grow pl-8 pr-8">
          <Button className="mx-2 my-4" mode='contained' 
            style={{backgroundColor: '#AED2F7', padding: 8, justifyContent: 'center'}} 
            labelStyle={{color: '#000000', fontSize: 16}}
            onPress={() => navigation.navigate("CreateRoom")}>Create Room</Button>

          <Button className="mx-2 my-4 pl-8 pr-8" mode='contained-tonal' 
            style={{backgroundColor: '#AED2F7', padding: 8, justifyContent: 'center'}} 
            labelStyle={{color: '#000000', fontSize: 16}}
            onPress={() => navigation.navigate("JoinRoom")}>Join Room</Button>
        </View> 
    </View>
  )
}

export default HomeScreen;