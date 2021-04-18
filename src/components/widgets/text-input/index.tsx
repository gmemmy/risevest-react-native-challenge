/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import styled from 'styled-components/native';
import Input from 'react-native-input-style';
import validator from 'validator';
import {FormField} from '../../../interface';
import {theme} from '../../../style/theme';
import {ms} from 'react-native-size-matters';
import cardsy from 'cardsy';
import {sizeScale} from '../../../utils';
// import {Dispatch} from 'redux';
// import {useSelector, shallowEqual, useDispatch} from 'react-redux';
// import {setValidationError} from '../../../redux/actions';

// components
import TouchableItem from '../buttons/touchable-item';

// icons
import EyeIcon from '../../icons/eye';

const Container = styled.View`
  width: 100%;
  margin-top: 20px;
`;

const FormWrapper = styled.View`
  width: 100%;
  justify-content: center;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
`;

const Background = styled.View<{borderColor?: string}>`
  flex: 1;
  opacity: 0.2;
  width: 100%;
  border-radius: 5px;
  background-color: ${theme.colors.offTeal};
  border: 1px solid ${(props: any) => props.borderColor};
`;

const CustomInput = styled(Input)`
  width: 90%;
  color: ${theme.colors.dark};
  font-family: Gelion-SemiBold;
  font-size: ${sizeScale(ms(17, 0.2), 'px')};
  line-height: 22px;
  opacity: 0.8;
  position: absolute;
  padding-horizontal: 30px;
`;

const ValidationErrorMessage = styled.Text`
  color: red;
  line-height: 20px;
  font-family: Gelion-Regular;
  font-size: ${sizeScale(ms(12, 0.2), 'px')};
`;

const renderInput = ({input: {onChange, ...input}, ...rest}) => {
  return <Input onChangeText={onChange} {...input} {...rest} />;
};

// const validate = values => {
//   const errors = {};
//   if (!values.email) {
//     errors.email = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }
//   if (!values.age) {
//     errors.age = 'Required';
//   } else if (isNaN(Number(values.age))) {
//     errors.age = 'Must be a number';
//   } else if (Number(values.age) < 18) {
//     errors.age = 'Sorry, you must be at least 18 years old';
//   }
//   return errors;
// };

const InputField = ({placeholder, type}: FormField) => {
  const [hide, setHide] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('');
  // const [errorMessage, setErrorMessage] = React.useState<string>('');
  // const [hasError, sethasError] = React.useState<boolean>(false);

  const handleOnChangeText = (text: string) => {
    switch (type) {
      case 'card-number':
        setValue(cardsy.format.number(text));
        break;
      case 'card-cvv':
        setValue(cardsy.format.cvc(text));
        break;
      case 'card-expiry-number':
        setValue(cardsy.format.expiryString(text, '/'));
        break;
      default:
        setValue(text);
        break;
    }
  };

  return (
    <Container>
      <FormWrapper>
        {type === 'email' && (
          <Input
            borderColor="#0898a0"
            email={true}
            required
            outlined
            label="Email Address"
            errorText="Please input a valid email address."
            keyboardType="default"
            placeholderTextColor={theme.colors.dark}
            onInputChange={text => {
              handleOnChangeText(text);
            }}
            value={value}
            inputStyle={{
              width: '100%',
              color: theme.colors.dark,
              fontFamily: 'Gelion-SemiBold',
              fontSize: 17,
              // backgroundColor: theme.colors.offTeal,
            }}
            height={55}
            labelStyle={{
              color: theme.colors.dark,
              fontFamily: 'Gelion-SemiBold',
            }}
            submit={(e) => console.log(e)}
          />
        )}
        {type === 'password' && (
          <Input
            borderColor="#0898a0"
            required
            secureTextEntry={hide}
            outlined
            label="Password"
            errorText="Please input a valid password."
            placeholderTextColor={theme.colors.dark}
            onInputChange={text => {
              handleOnChangeText(text);
            }}
            value={value}
            inputStyle={{
              width: '100%',
              color: theme.colors.dark,
              fontFamily: 'Gelion-SemiBold',
              fontSize: 17,
              position: 'relative',
              // backgroundColor: theme.colors.offTeal,
            }}
            height={55}
            labelStyle={{
              color: theme.colors.dark,
              fontFamily: 'Gelion-SemiBold',
            }}
          />
        )}
        {/* <Background borderColor={'#0898a0'} /> */}
        {/* <Field
          name={type}
          placeholderTextColor={theme.colors.dark}
          secureTextEntry={type === 'password' && hide}
          onChange={text => {
            handleOnChangeText(text);
          }}
          value={value}
          // onBlur={() => handleValidation(type)}
          props={{
            placeholder,
            placeholderTextColor: theme.colors.dark,
            secureTextEntry: type === 'password' && hide,
          }}
          component={renderInput}
        /> */}
        {type === 'password' && (
          <TouchableItem
            onPress={() => setHide(!hide)}
            style={{
              position: 'absolute',
              right: 25,
              zIndex: 99,
            }}>
            <EyeIcon fill={theme.colors.defaultTeal} width={23} height={23} />
          </TouchableItem>
        )}
      </FormWrapper>
    </Container>
  );
};

export default InputField;
