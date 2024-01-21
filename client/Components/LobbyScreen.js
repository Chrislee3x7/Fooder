import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Text, TextInput } from 'react-native-paper';
import UserService from '../services/user.service';

const LobbyScreen = ({ route, navigation }) => {

  const insets = useSafeAreaInsets();

  const isRoomCreator = route.params.isRoomCreator;
  const [currentUsers, setCurrentUsers] = useState([]);
  // let users = [{username: "immevol"}, {username: "kinglionleo8"}, {username: "nova2011"}, {username: "PeppyCloud3x7"}];

  const roomCode = route.params.roomCode;

  const fetchRoomUsers = async () => {
    console.log("!!!! ROOM CODE", roomCode)
    const res = await UserService.getRoom(roomCode);
    const users = res.data.users;
    setCurrentUsers(users);
  }

  useEffect(() => {
    fetchRoomUsers();
    // users = [{username: "b"}, {username: "a"}, {username: "t"}, {username: "i"}]

  }, [])

  return (
    <View className="justify-center bg-white grow" style={{paddingTop: insets.top}}>
      <View className="h-2/3 bg-white">
        <Text className="text-center" variant="titleSmall">Room Code:</Text>
        <Text className="mb-4 mx-4 text-center" variant="headlineLarge">{roomCode}</Text>
        <ScrollView>
          <View className="mx-8 gap-y-3">
            {currentUsers.map((user) => (
              <View className="bg-blue-100 rounded-2xl p-4"
                key={user.username}>
                <Text variant="headlineSmall">{user.username}</Text>
              </View>
            )
            )}
          </View>
        </ScrollView>
      </View>
      {/* List of users */}
      {/* <View>
        {currentUsers.map((user) => {
          <View className="border border-black">
            <Text>{user.username}</Text>
          </View>
        }
        )}
      </View> */}

      <View className="flex grow rounded-t-xl justify-between items-center py-6 bg-red-300" style={{paddingBottom: insets.bottom}}>
        <View className="bg-white p-2 rounded-2xl">
          <Text className="text-center" variant="headlineMedium">PeppyCloud3x7</Text>
        </View>

        <View className="justify-center flex-row space-x-8 ">

          <TouchableOpacity className="pb-4" onPress={() => navigation.goBack()}>
            <View className="rounded-full h-28 w-28 bg-red-400 items-center justify-center">
              <Text variant="headlineSmall">{isRoomCreator ? "Close Room" : "Leave Room"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="pb-4" onPress={() => navigation.navigate('Questions')}>
            <View className="rounded-full h-28 w-28 bg-white items-center justify-center" >
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