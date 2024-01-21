import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Button, Text, TextInput, Icon, SegmentedButtons } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UserService from '../services/user.service';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { GestureDetector } from 'react-native-gesture-handler';
// import Icon from '@mdi/react';
// import { mdiCurrencyUsd } from '@mdi/js';

const SwipeScreen = ({ route, navigation }) => {

  const insets = useSafeAreaInsets();
  const [dist, setDist] = React.useState('');
  const [price, setPrice] = React.useState([]);

  const restaurants = route.params.restaurants;

  const [questions, setQuestions] = useState([]);
  const [userPrompt, setUserPrompt] = useState('');
  const [assistantPrompt, setAssistantPrompt] = useState('');

  const [currQuestionNum, setCurrQuestionNum] = useState(0);
  
  const swipeableRef = useRef('');

  const [answers, setAnswers] = useState([]);

  const onContinuePress = async () => {
    await UserService.saveAnswer('dist', JSON.stringify(dist));
    await UserService.saveAnswer('price', JSON.stringify(price));
    const var1 = await UserService.getAnswer('dist');
    const var2 = await UserService.getAnswer('price');
    console.log(var1, var2)
    navigation.navigate('Veto');
  }

  useEffect(() => {
    (async () => {
      let businessIds = [];
      for (let r of restaurants) {
        businessIds.push(r.id);
      }
      console.log("about to get questions");
      const res = await UserService.getGptQuestions(businessIds);
      // console.log(res);
      const data = res.data;
      setUserPrompt(data.originalPrompt.user);
      setAssistantPrompt(data.originalPrompt.assistant);
      // console.log(data.response);
      setQuestions(data.response);
      console.log(`length of questions ${data.response.length}`);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (currQuestionNum >= questions.length) {
        console.log(answers);
        const res = await UserService.getGptResult(answers, userPrompt, assistantPrompt)
        console.log(res);
      }
    })();
  }, [currQuestionNum])

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
      outputRange: [-30, 0, 0, 1],
    })
    return (
      <View>
        <Text variant="titleLarge">YOU SHOULD KILL YOURSELF LATER</Text>
      </View>
    );
  };

  const onSwipe = async (direction) => {
    if (direction === 'right') {
      console.log("Yes")
      setAnswers([...answers,'Yes']);
    } else {
      console.log("No")
      setAnswers([...answers,'No']);
    }
    setCurrQuestionNum(currQuestionNum + 1);
    swipeableRef.current.reset();
    // if (currQuestionNum + 1 >= questions.length) {
    //   console.log(answers);
    //   const res = await UserService.getGptResult(answers, userPrompt, assistantPrompt)
    //   console.log(res);
    //   return;
    // }
  }

  return (

    <View className=" bg-red-400 grow justify-center" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Swipeable className="grow bg-green-300" 
        onSwipeableOpen={() => { onSwipe('right') }}
        renderLeftActions={renderLeftActions} 
        renderRightActions={renderRightActions}
        onSwipeableWillOpen={(direction) => {onSwipe(direction)}}
        ref={swipeableRef}>
        <View className="flex h-full w-full start-0 bg-blue-300">
        </View>
      </Swipeable>
      <View className="absolute top-20 p-4 items-center justify-center">
        <Text style={{textAlign: "center"}} variant="headlineSmall">{questions[currQuestionNum]}</Text>
      </View>
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