import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Icon, SegmentedButtons, Checkbox } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UserService from '../services/user.service';
import { bool } from 'prop-types';
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
    onSubmit(selectedRestaurants); // Assuming onSubmit is a prop to handle the submission
    // navigation.navigate('Swipe');
  }

  function handleToggleVetoed(id, nextSeen) {
    const rest = myNextList.find(
      a => a.id === artworkId
    );
    setMyList(myNextList);
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
      
      <View className="px-8 grow">
        <Text className="mb-4 mx-4 text-center" variant="headlineLarge">Veto 3</Text>
        <View className="gap-y-3">
        {restaurants.map(restaurant => (
          <TouchableOpacity className="shadow-lg rounded-2xl p-4"
            style={{backgroundColor: toggleState[restaurant.id] ? 'blue' : 'yellow'}}
            onPress={() => handleToggle(restaurant.id)}
            key={restaurant.id}>
            <Text variant="headlineSmall">{restaurant.name}</Text>
          </TouchableOpacity>
        ))}
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

export default VetoScreen;