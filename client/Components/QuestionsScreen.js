import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Icon , SegmentedButtons} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const QuestionsScreen = ({ navigation }) => {

  const insets = useSafeAreaInsets();
  const [value, setValue] = React.useState('');

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
        <Text className="mb-4 mx-4 text-center" variant="headlineLarge">Distance</Text>
        <View className="justify-center">
          <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              icon: 'walk',
              value: 'walk',
              label: 'Walking',
            },
            {
              icon: 'bike',
              value: 'train',
              label: 'Transit',
            },
            { icon: 'car', value: 'drive', label: 'Driving' },
          ]}
        />
        </View>
      </View>

    </View>
  )
}

export default QuestionsScreen;