import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  interpolateColor,
  withSpring,
} from 'react-native-reanimated';
import {View, Button} from 'react-native';
import React, {useState} from 'react';

export default function AnimatedStyleUpdateExample() {
  const [active, setActive] = useState(true);

  return (
    <View>
      <Button title="toggle" onPress={() => setActive(!active)} />
      <EmojiButton active={active} onPress={console.log} />
    </View>
  );
}

export const EmojiButton = ({active, onPress}: any) => {
  // const theme = useTheme();

  const color = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    if (active) {
      color.value = withTiming(2, {duration: 249, easing: Easing.linear});
      scale.value = withSpring(1.2, {stiffness: 400, damping: 10});
    } else {
      color.value = 0;
      scale.value = 1;
    }
  }, [active]);

  const animationStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        color.value,
        [0, 1, 2],
        ['#ff0000', '#00ff00', '#0000ff'],
      ),
      transform: [
        {
          scaleY: scale.value,
        },
      ],
    };
  }, []);

  return (
    <View>
      <Animated.View
        style={[
          {
            marginTop: 10,
            height: 80,
            borderBottomColor: '#ffffff',
            borderBottomWidth: 1,
          },
          animationStyles,
        ]}
      />
    </View>
  );
};
