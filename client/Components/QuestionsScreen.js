import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Icon, SegmentedButtons } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UserService from '../services/user.service';
// import Icon from '@mdi/react';
// import { mdiCurrencyUsd } from '@mdi/js';

const QuestionsScreen = ({ navigation }) => {

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
    <View className="grow justify-center items-center" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Text>HEEEEEEE LEEOEOEOEOREOROEREO</Text>
    </View>
  )
}

export default QuestionsScreen;