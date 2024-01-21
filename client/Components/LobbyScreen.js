import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Text, TextInput } from 'react-native-paper';
import UserService from '../services/user.service';
import io from 'socket.io-client'
import { SocketContext } from './SocketContext';

const LobbyScreen = ({ route, navigation }) => {

  const insets = useSafeAreaInsets();

  const isRoomCreator = route.params.isRoomCreator;
  const roomCode = route.params.roomCode;
  const username = route.params.username;
  const [currentUsers, setCurrentUsers] = useState([]);
  
  const SOCKET_SERVER_URL = "https://fooder-rl87.onrender.com/";
  
  const socket = useContext(SocketContext);

  const fetchRoomUsers = async () => {
    console.log("!!!! ROOM CODE", roomCode)
    const res = await UserService.getRoom(roomCode);
    const users = res.data.users;
    setCurrentUsers(users);
  }

  const onExitRoomPressed = async () => {
    let res
    if (isRoomCreator) {
      res = await UserService.closeRoom(roomCode);
    } else {
      res = await UserService.leaveRoom(roomCode);
    }
    if (res.status == 200) {
      navigation.navigate('Home')
    }
  }

  const onGoPress = () => {
    socket.emit('startRoom', roomCode)
    // navigation.navigate('DistancePrice');
  }

  useEffect(() => {
    fetchRoomUsers();

    if (socket) {
      socket.emit('joinRoom', roomCode)
      socket.on('userJoined', (message) => {
        fetchRoomUsers();
        console.log("a user joined and shizzled");
      });
      socket.on('roomStarted', () => {
        console.log("room started!!!!!!!!!", );
        navigation.navigate('DistancePrice');
      });
    }

    return () => {
      if (socket) {
        socket.emit('joinRoom', roomCode)
        socket.off('userJoined');
        socket.off('roomStarted');
      }
    }

    // users = [{username: "b"}, {username: "a"}, {username: "t"}, {username: "i"}]
  }, [])

  return (
    <View className="justify-center grow" style={{paddingTop: insets.top, backgroundColor: "#FBF9F0"}}>
      <View className="h-2/3 "
        style={{backgroundColor: "#FBF9F0"}}>
        <Text className="text-center" variant="titleSmall">Room Code:</Text>
        <Text className="mb-4 mx-4 text-center" variant="headlineLarge">{roomCode}</Text>
        <ScrollView>
          <View className="mx-8 gap-y-3">
            {/* List of users */}
            {currentUsers.map((user) => (
              <View className="shadow-lg rounded-2xl p-4"
                style={{backgroundColor: "#eac0c0"}}
                key={user.username}>
                <Text variant="headlineSmall">{user.username}</Text>
              </View>
            )
            )}
          </View>
        </ScrollView>
      </View>

      <View className="shadow-lg flex grow rounded-t-xl justify-between py-6 bg-red-300" style={{paddingBottom: insets.bottom, backgroundColor: "#eac0c0"}}>
        {/* <View className="shadow-lg p-2 mx-12 rounded-2xl"
          style={{backgroundColor: "#eac0c0"}}>
          <Text className="text-center" variant="headlineSmall">{username}</Text>
        </View> */}

        <View className="justify-center flex-row space-x-12 ">

          <TouchableOpacity className="py-12" onPress={() => onExitRoomPressed()}>
            <View className="shadow-md rounded-full h-28 w-28 items-center justify-center"
              style={{backgroundColor: "#f1dd76"}}>
              <Text className="text-center" variant="titleLarge">{isRoomCreator ? "Close \nRoom" : "Leave \nRoom"}</Text>
            </View>
          </TouchableOpacity>
          {isRoomCreator && <TouchableOpacity className="py-12" onPress={() => onGoPress()}>
            <View className="shadow-md rounded-full h-28 w-28 items-center justify-center" 
              style={{backgroundColor: "#f1dd76"}}>
              <Text className="text-center" variant="headlineLarge">GO!</Text>
            </View>
          </TouchableOpacity>}
        </View>
      </View>
    </View>
  )
}

export default LobbyScreen;