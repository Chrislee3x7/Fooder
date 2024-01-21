import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Icon, SegmentedButtons, Checkbox } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UserService from '../services/user.service';
import { bool } from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
// import Icon from '@mdi/react';
// import { mdiCurrencyUsd } from '@mdi/js';

const VetoScreen = ({ route, navigation }) => {

  const insets = useSafeAreaInsets();

  const restaurants = route.params.restaurants;

  const [toggleState, setToggleState] = useState(
    restaurants.reduce((acc, restaurant) => {
      acc[restaurant.id] = true;
      return acc;
    }, {})
  );

  const handleToggle = (id) => {
    setToggleState(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  const onContinuePress = async () => {
    const selectedRestaurants = restaurants.filter(restaurant => toggleState[restaurant.id]);
    navigation.navigate('Swipe', {restaurants});
  }

  function handleToggleVetoed(id, nextSeen) {
    const rest = myNextList.find(
      a => a.id === artworkId
    );
    setMyList(myNextList);
  }

  return (
    <View className="grow" style={{ paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: "#fbf9f0" }}>
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
      <View className="px-8 grow">
        <Text className="mb-4 mx-4 text-center" variant="headlineLarge">Veto 3</Text>
        <ScrollView
        // style={{marginBottom: 40}}>
        >
          <View className="gap-y-3">
            {restaurants.map(restaurant => (
              <TouchableOpacity className="shadow-lg rounded-2xl p-4"
                style={{ backgroundColor: toggleState[restaurant.id] ? '#69b0d6' : '#eac0c0' }}
                onPress={() => handleToggle(restaurant.id)}
                key={restaurant.id}>
                <Text variant="headlineSmall" >{restaurant.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View className="px-8 py-4">
        <TouchableOpacity
          className="mx-2 my-4 pl-8 pr-8"
          onPress={() => onContinuePress()}>
          <View className="shadow-md mx-2 my-4 p-4 rounded-2xl" style={{ backgroundColor: '#f1dd76' }}>
            <Text className="text-center" variant="titleMedium">Continue</Text>
          </View>
        </TouchableOpacity >
      </View>
    </View>
  )
}

export default VetoScreen;