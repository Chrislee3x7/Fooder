import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Button, Text, TextInput, Icon, SegmentedButtons } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UserService from '../services/user.service';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { GestureDetector } from 'react-native-gesture-handler';
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


  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    })
    return (
      <View>
        <Text variant="titleLarge">YOU SHOULD KILL YOURSELF NOW</Text>
      </View>
    );
  };

  renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    })
    return (
      <View>
        <Text variant="titleLarge">YOU SHOULD KILL YOURSELF LATER</Text>
      </View>
    );
  };

  return (

    <View className=" bg-red-400 grow justify-center" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>

      <Swipeable className="grow" renderLeftActions={renderLeftActions} renderRightActions={renderRightActions}>
        <View className="flex grow">
          <Text variant="displayLarge"></Text>
        </View>
        <View className="flex grow">
          <Text variant="displayLarge"></Text>
        </View>
        <View className="flex grow">
          <Text variant="displayLarge"></Text>
        </View>
        <View className="flex grow">
          <Text variant="displayLarge"></Text>
        </View>
        <View className="flex grow bg-green-200">
          <Text variant="displayLarge"></Text>
        </View>

        <View className="flex grow">
          <Text variant="displayLarge"></Text>
        </View>
        <View className="flex grow">
          <Text variant="displayLarge"></Text>
        </View>
        <View className="flex grow">
          <Text variant="displayLarge"></Text>
        </View>
        <View className="flex grow">
          <Text variant="displayLarge"></Text>
        </View>
        <View className="flex grow">
          <Text variant="displayLarge"></Text>
        </View>

      </Swipeable>
      <View className="flex-column w-full items-center absolute">
        <View className=" flex-row justify-center px-8">
          <Text variant="titleMedium">no</Text>
          <View className="grow">

          </View>
          <Text variant="titleMedium">yes</Text>
        </View>
        <View className=" px-2 flex-row place-content-between">
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
      </View>
    </View>

  );
}

export default SwipeScreen;