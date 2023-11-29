import { useEffect, } from 'react';
import {  Text, Pressable, PressableProps } from 'react-native';
import  Animated, {useSharedValue, useAnimatedStyle, withTiming, interpolateColor, useDerivedValue, interpolate, Easing} from 'react-native-reanimated'

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

  const rotationAnimation = useSharedValue(0)

  const rotation = useDerivedValue(()=>{

    return interpolate(rotationAnimation.value, [0,100], [0,45])
    
  })

  const rotationAnimationStyle = useAnimatedStyle(()=>{
    return {
      transform:[{rotate: rotation.value + 'deg'}, {scale: scale.value}],
    }
  },)


  const startRotationAnimation = () => {
    rotationAnimation.value= withTiming(100, {
      duration:1000,
      easing: Easing.ease
    })
  }

  const startRotateBackAnimation = () => {
    rotationAnimation.value= withTiming(0, {
      duration:1000,
      easing: Easing.ease
    })
  }
  /////

  useEffect(()=>{
    checked.value = withTiming(isChecked ? 1 : 0)
  },[isChecked])

  function onPressIn(){
    scale.value =  withTiming(1.1, {
      duration: 50
    })
    startRotationAnimation()
  }

  function onPressOut(){
    scale.value = withTiming(1, {
      duration:50
    })
    
    startRotateBackAnimation()
  }
  
  const COLOR = TYPE_COLORS[type];

    const animatedContainerStyle = useAnimatedStyle(()=> {
      return {

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
        rotationAnimationStyle,
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