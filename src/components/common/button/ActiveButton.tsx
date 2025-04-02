import React from 'react';
import {CustomTextStyle, CustomUIProps, PressableProps} from '~/types/style';
import CenterButton from './CenterButton';
import CustomText from '../text/Text';
import {colors} from '~/constants/style';

interface Props {
  text: string;
  textStyle?: CustomTextStyle;
  buttonType: 'blue' | 'red' | 'gray';
}

/**
 *@description active button 공용 컴포넌트
 */
function ActiveButton(props: CustomUIProps<PressableProps> & Props) {
  const styles = {
    blue: {
      button: {
        borderColor: colors.positive[-20],
        backgroundColor: colors.positive[0],
      },
      text: {
        color: colors.gray[0],
      },
    },

    red: {
      button: {
        borderColor: colors.yellow[30],
        backgroundColor: colors.orange[10],
      },
      text: {
        color: colors.gray[0],
      },
    },

    gray: {
      button: {
        borderColor: colors.gray[40],
        backgroundColor: 'transparent',
      },
      text: {
        color: colors.gray[40],
      },
    },
  };
  return (
    <CenterButton
      {...props}
      borderRadius={16}
      borderWidth={3}
      borderColor={styles[props.buttonType].button.borderColor}
      backgroundColor={styles[props.buttonType].button.backgroundColor}
      h={52}>
      <CustomText
        {...props.textStyle}
        color={styles[props.buttonType].text.color}
        fontSize={14}
        fontWeight={'bold'}>
        {props.text}
      </CustomText>
    </CenterButton>
  );
}

export default ActiveButton;
