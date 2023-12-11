import { TouchableOpacity, TouchableOpacityProps, Text, View } from 'react-native';

const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity)

import { styles } from './styles';
import { THEME } from '../../styles/theme';

import { LevelBars } from '../LevelBars';
import { QUIZZES } from '../../data/quizzes';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Canvas, Fill, RoundedRect, Shadow } from '@shopify/react-native-skia';
import { useState } from 'react';

type Props = TouchableOpacityProps & {
  data: typeof QUIZZES[0];
  index:number;
}

export function QuizCard({ data,index, level, ...rest }: Props) {
  const Icon = data.svg;

  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

  return (
    <TouchableOpacityAnimated
      entering={FadeInUp.delay(index * 100)}
      style={styles.container}
      {...rest}
      onLayout={onLayout}
    >
      {
        data.level === 1 &&       <Canvas style={{ width: size.width, height: size.height,position: 'absolute' }}>
        <Fill color={THEME.COLORS.GREY_700} />
        <RoundedRect x={5} y={5} width={size.width} height={size.height} color={THEME.COLORS.GREY_700} >
          <Shadow dx={12} dy={12} blur={12} color={THEME.COLORS.BRAND_MID} inner />
          <Shadow dx={-12} dy={-12} blur={12} color={THEME.COLORS.BRAND_MID} inner />
        </RoundedRect>
      </Canvas>
      }

  
 
      <View style={styles.header}>
        
        <View style={styles.iconContainer}>
          {Icon && <Icon size={24} color={THEME.COLORS.GREY_100} />}
        </View>

        <LevelBars level={data.level} />
      </View>

      <Text style={styles.title}>
        {data.title}
      </Text>
    </TouchableOpacityAnimated>
  );
}