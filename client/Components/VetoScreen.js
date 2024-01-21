import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Icon, SegmentedButtons, Checkbox } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UserService from '../services/user.service';
import { bool } from 'prop-types';
// import Icon from '@mdi/react';
// import { mdiCurrencyUsd } from '@mdi/js';

const VetoScreen = ({ navigation }) => {
  
  const insets = useSafeAreaInsets();

  preVeto = new Map();
  const [dist, setDist] = React.useState('');
  

  let vetos = [{restaurant: "chipotle"}, {restaurant: "chipotle"}, {restaurant: "chipotle"}, {restaurant: "leos mom"}, {restaurant: "chris mom"} ];
  let hasVetoedArr = [{id: 0, hasVetoed: false}, {id: 1, hasVetoed: false}, {id: 2, hasVetoed: false}, {id: 3, hasVetoed: false}, {id: 4, hasVetoed: false}]
  const [vetoed, setVetoed] = React.useState(hasVetoedArr);
  

  const createMap = () => {
    preVeto.set(1, "chipotle");
    preVeto.set(2, "chipotle");
    preVeto.set(3, "chipotle");
    preVeto.set(4, "chipotle");
    preVeto.set(5, "chipotle");
    preVeto.set(6, "chipotle");
    preVeto.set(7, "chipotle");
    preVeto.set(8, "chipotle");
    preVeto.set(9, "chipotle");
    preVeto.set(10, "chipotle");
    
    vetos.append("chipotle");
    vetos.append("chipotle");
    vetos.append("chipotle");
    vetos.append("chipotle");
    vetos.append("chipotle");
    vetos.append("chipotle");
    vetos.append("chipotle");
    vetos.append("chipotle");
    vetos.append("chipotle");
    vetos.append( "chipotle");

    console.log("e")
    console.log(vetos);

    React.useEffect(() => {
      createMap();
    }, []);
  }

  const onContinuePress = async () => {
    
    navigation.navigate('Swipe');

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
        <View>
        {vetos.map( a => (
          <Checkbox.Item label={a.restaurant} status={vetoed ? 'checked' : 'unchecked'} onPress={() => {
            setVetoed(!vetoed);
          }}/>
          )
        )}
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