import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Icon, SegmentedButtons } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UserService from '../services/user.service';
import * as Location from 'expo-location';
// import Icon from '@mdi/react';
// import { mdiCurrencyUsd } from '@mdi/js';

const DistancePriceScreen = ({ navigation }) => {

  const insets = useSafeAreaInsets();
  const [dist, setDist] = React.useState('');
  const [price, setPrice] = React.useState([]);

  const [location, setLocation] = useState(null);
  // let location;
  // let loooc;
  const [errorMessage, setErrorMsg] = useState(null);

  const [continueEnabled, setContinueEnabled] = useState(false);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // let location;
      Location.getCurrentPositionAsync({})
      .then((loc) => {
        setLocation(loc);
        // location = loc
        // loooc = loc;
        // console.log(loooc);
        setContinueEnabled(true);
        console.log(location);
      });
    })();
  }, []);
  
  const onContinuePress = async () => {
    if (!dist) {
      return;
    }
    if (price === []) {
      return;
    }
    await UserService.saveAnswer('dist', JSON.stringify(dist));
    await UserService.saveAnswer('price', JSON.stringify(price));
    const var1 = await UserService.getAnswer('dist');
    const var2 = await UserService.getAnswer('price');
    console.log(var1, var2)

    let distanceMeters;
    if (dist === 'walk') {
      distanceMeters = 850;
    } else if (dist === 'bike') {
      distanceMeters = 1800;
    } else if (dist === 'drive') { 
      distanceMeters = 13000;
    } else {
      console.error("no distance chosen")
    }

    const res = await UserService.getRestaurants(location, distanceMeters, price);

    navigation.navigate('Veto', {restaurants: res.data});
    
  }

  return (
    <View className="grow" style={{ paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: "#FBF9F0" }}>
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
        <Text className="mb-4 mx-4 text-center" variant="headlineLarge">Distance</Text>
        <View className="justify-center">
          <Text>{location?.coords.longitude}</Text>
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
                value: 1,
                buttonColor: 'red'
              },
              {
                value: 2,
                label: '$$',
              },
              {
                value: 3,
                label: '$$$',
              },
              {
                value: 4,
                label: '$$$$',
              }
            ]}
          />
        </View>
      </View>
      <View className="px-8 py-4">
          <TouchableOpacity
            className="mx-2 my-4 pl-8 pr-8"
            onPress={() => onContinuePress()}>
            <View className="shadow-md mx-2 my-4 p-4 rounded-2xl" style={{backgroundColor: '#f1dd76'}}>
              <Text className="text-center" variant="titleMedium">Continue</Text>
            </View>
          </TouchableOpacity >
      </View>
    </View>
  )
}

export default DistancePriceScreen;