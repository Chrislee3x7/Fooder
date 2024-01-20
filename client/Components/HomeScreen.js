import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

const HomeScreen = () => {

  return (
    <View className="mt-12 ml-8 mr-8">
      <Text className="mt-6 mb-4 mx-4" variant="headlineLarge">Name</Text>
      <View className="mb-4 ml-4 mr-4">
        <TextInput
          autoCapitalize="none"
          blurOnSubmit
          inputMode="email"
          mode={'outlined'}
          label='Email'
        />
      </View>
      <View className="mb-4 ml-4 mr-4">
        <TextInput
          autoCapitalize="none"
          blurOnSubmit
          mode={'outlined'}
          label='Password'
        />
      </View>
  
      <View className="my-4 flex-row">
        <Button className="mx-2 grow" mode='contained' 
          onPress={() => onLoginPress()}>Login</Button>
      </View>
      {/* <Button className="mx-4 self-end" mode='text'
        onPress={() => navigation.navigate('Register')}>I'm new here!</Button> */}
    </View>
  )
}

export default HomeScreen;