import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Icon, SegmentedButtons } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UserService from '../services/user.service';
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
    <View className=" bg-red-400 grow" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
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
        <Text className="mb-4 mx-4 text-center" variant="headlineLarge">MANGCHAMPION</Text>
        <View className="justify-center">
          <SegmentedButtons

            value={dist}
            onValueChange={setDist}
            buttons={[
              {
                icon: 'walk',
                
                value: 'walk',
                label: 'Walking',
              },
              {
                icon: 'bike',
                value: 'bike',
                label: 'Transit',
              },
              { icon: 'car', value: 'drive', label: 'Driving' },
            ]}
          />
        </View>
      </View>

      <View className="px-8 grow">
        <Text className="mb-4 mx-4 text-center" variant="headlineLarge">Price</Text>
        <View className="justify-center">
          <SegmentedButtons
            
            multiSelect
            value={price}
            onValueChange={setPrice}
            buttons={[
              {
                label: '$',
                style: {buttonColor: '#ffffff'},
                value: 'small',
                buttonColor: 'red'
              },
              {
                value: 'medium',
                label: '$$',
              },
              {
                value: 'large',
                label: '$$$',
              },
              {
                value: 'xlarge',
                label: '$$$$',
              }
            ]}
          />
        </View>
      </View>
      <View className="px-8 py-4">
        <Button
          className="mx-2 my-4 pl-8 pr-8"
          mode='contained'
          buttonColor='red'
          onPress={() => onContinuePress()}
        >Continue
        </Button>
      </View>
    </View>
  )
}

export default SwipeScreen;