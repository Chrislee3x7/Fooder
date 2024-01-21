import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Icon, SegmentedButtons } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UserService from '../services/user.service';
import Swipeable from 'react-native-gesture-handler/Swipeable';
// import Icon from '@mdi/react';
// import { mdiCurrencyUsd } from '@mdi/js';

const SwipeScreen = ({ navigation }) => {

  const insets = useSafeAreaInsets();
  const [dist, setDist] = React.useState('');
  const [price, setPrice] = React.useState([]);
  const onContinuePress = async () => {
    await UserService.saveAnswer('dist', JSON.stringify(dist));
    await UserService.saveAnswer('price', JSON.stringify(price));
    const var1 = await UserService.getAnswer('dist');
    const var2 = await UserService.getAnswer('price');
    console.log(var1, var2)
    navigation.navigate('Veto');

  }

  return (
    <View className=" bg-red-400 grow justify-center" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Swipeable>
        {/* <View className="bg-blue-100 rounded-2xl p-4"
          key={user.username}>
          <Text variant="headlineSmall">{user.username}</Text>
        </View> */}
        <View className="px-8 flex-row items-center">
          <Text variant="titleMedium">no</Text>
          <View className="grow">

          </View>
          <Text variant="titleMedium">yes</Text>
        </View>
        <View className="px-2 flex-row place-content-between">
          <Icon
            source="arrow-left"
            color="black"
            class="opacity-25"
            size={35}
          />
          <View className="grow">

          </View>
          <Icon
            style={{ opacity: 0.5 }}
            source="arrow-right"
            color="black"
            size={35}
          />
        </View>
      </Swipeable>
    </View>
  )
}

export default SwipeScreen;