import 'react-native-gesture-handler';
import React from 'react';
import {Alert, SafeAreaView, StatusBar} from 'react-native';
import {Dimensions, Text, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedRef,
} from 'react-native-reanimated';
import 'setimmediate';

import ToggleColor from './ToggleColor';

const width = Dimensions.get('window').width;

const App = () => {
  const END_POSITION = 200;
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (onLeft.value) {
        position.value = e.translationX;
      } else {
        position.value = END_POSITION + e.translationX;
      }
    })
    .onEnd(e => {
      if (position.value > END_POSITION / 2) {
        position.value = withTiming(END_POSITION, {duration: 100});
        onLeft.value = false;
      } else {
        position.value = withTiming(0, {duration: 100});
        onLeft.value = true;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}],
  }));

  // const t = useAnimatedRef();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView>
        <StatusBar />
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              {height: 100, width: 100, backgroundColor: 'red'},
              animatedStyle,
            ]}
          />
        </GestureDetector>
        <>
          <ToggleColor />
          {/* <View style={{flex: 1}}>
            <Carousel
              loop
              width={width}
              height={width / 2}
              autoPlay={true}
              data={[...new Array(6).keys()]}
              scrollAnimationDuration={1000}
              onSnapToItem={index => console.log('current index:', index)}
              renderItem={({index}) => (
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    justifyContent: 'center',
                  }}>
                  <Text style={{textAlign: 'center', fontSize: 30}}>
                    {index}
                  </Text>
                </View>
              )}
            />
          </View> */}
        </>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
