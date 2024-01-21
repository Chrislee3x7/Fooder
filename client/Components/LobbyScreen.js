import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Text, TextInput } from 'react-native-paper';
import UserService from '../services/user.service';
import io from 'socket.io-client'

const LobbyScreen = ({ route, navigation }) => {

  const insets = useSafeAreaInsets();

  const isRoomCreator = route.params.isRoomCreator;
  const roomCode = route.params.roomCode;
  const username = route.params.username;
  const [currentUsers, setCurrentUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  
  const SOCKET_SERVER_URL = "https://fooder-rl87.onrender.com/";

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

  useEffect(() => {
    fetchRoomUsers();

    const socketIo = io(SOCKET_SERVER_URL);

    setSocket(socketIo)

    socketIo.emit('joinRoom', roomCode)

    socketIo.on('userJoined', (message) => {
      fetchRoomUsers();
      console.log("a user joined and shizzled");
    })

    // users = [{username: "b"}, {username: "a"}, {username: "t"}, {username: "i"}]

  }, [])

  return (
    <View className="justify-center bg-white grow" style={{paddingTop: insets.top}}>
      <View className="h-2/3 bg-white">
        <Text className="text-center" variant="titleSmall">Room Code:</Text>
        <Text className="mb-4 mx-4 text-center" variant="headlineLarge">{roomCode}</Text>
        <ScrollView>
          <View className="mx-8 gap-y-3">
            {/* List of users */}
            {currentUsers.map((user) => (
              <View className="shadow-lg bg-blue-100 rounded-2xl p-4"
                key={user.username}>
                <Text variant="headlineSmall">{user.username}</Text>
              </View>
            )
            )}
          </View>
        </ScrollView>
      </View>

      <View className="flex grow rounded-t-xl justify-between items-center py-6 bg-red-300" style={{paddingBottom: insets.bottom}}>
        <View className="shadow-lg bg-white p-2 rounded-2xl">
          <Text className="text-center" variant="headlineMedium">{username}</Text>
        </View>

        <View className="justify-center flex-row space-x-12 ">

          <TouchableOpacity className="pb-4" onPress={() => onExitRoomPressed()}>
            <View className="shadow-md rounded-full h-28 w-28 bg-red-400 items-center justify-center">
              <Text className="text-center" variant="titleLarge">{isRoomCreator ? "Close \nRoom" : "Leave \nRoom"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="pb-4" onPress={() => navigation.navigate('DistancePrice')}>
            <View className="shadow-md rounded-full h-28 w-28 bg-white items-center justify-center" >
              <Text className="text-center" variant="headlineLarge" >GO!</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Button className="" mode='contained' 
          onPress={() => navigation.navigate('Home')}>Start!</Button> */}
      </View>
    </View>
  )
}

export default LobbyScreen;