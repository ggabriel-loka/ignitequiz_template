import { useEffect, } from 'react';
import {  Text, Pressable, PressableProps } from 'react-native';
import  Animated, {useSharedValue, useAnimatedStyle, withTiming, interpolateColor} from 'react-native-reanimated'

const PressableAnimated = Animated.createAnimatedComponent(Pressable)

import { THEME } from '../../styles/theme';
import { styles } from './styles';

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
}

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
}

export function Level({ title, type = 'EASY', isChecked = false, ...rest }: Props) {
  /** Valor reativo para animação
   * 
   */
  const scale = useSharedValue(1) 
  const checked = useSharedValue(1)


  useEffect(()=>{
    checked.value = withTiming(isChecked ? 1 : 0)
  },[isChecked])

  function onPressIn(){
    scale.value =  withTiming(1.1)
  }

  function onPressOut(){
    scale.value = withTiming(1)
  }
  
  const COLOR = TYPE_COLORS[type];

  /**
   * Interpolate color to make transition of colors.
   */

    /**
   * Definir regras de estilização que queremos animar
   */
    const animatedContainerStyle = useAnimatedStyle(()=> {
      return {
        transform: [{scale: scale.value}],
        backgroundColor: interpolateColor(checked.value,[0, 1], ['transparent', COLOR])
      }
    })

    const animatedTextStyle = useAnimatedStyle(()=> {
      return {
        color: interpolateColor(checked.value,[0, 1], [COLOR, THEME.COLORS.GREY_100])
      }
    })


  return (
    <PressableAnimated style={
      [
        styles.container,
        { borderColor: COLOR},
        animatedContainerStyle,
      ] 
    }
    onPressIn={onPressIn} onPressOut={onPressOut} {...rest}>

     
        <Animated.Text style={
          [
            styles.title,
            animatedTextStyle,
          ]}>
          {title}
        </Animated.Text>
 
    </PressableAnimated>
  );
}