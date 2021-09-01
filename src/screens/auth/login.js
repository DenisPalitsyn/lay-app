import React, { useState } from 'react';
import {
  HelperText, Button, TextInput, useTheme, Text,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import {validateEmail} from "../../utils/validation";
// import {signInWithEmailAndPassword, signInWithGoogle} from "../../store/actions/authActions";
// import {useDispatch} from "react-redux";
// import { useDispatch } from 'react-redux';
// import {
// GoogleSigninButton } from '@react-native-google-signin/google-signin/src/GoogleSigninButton';
// import { LocalisationContext } from '../../localisation/context';
// import { signInWithGoogle } from '../../store/actions/authActions';

export default function Login({ navigation }) {
  // const {
  //   wrongPassword,
  //   tooManyRequests,
  //   userNotFound,
  //   emailIsIncorrect,
  //   textFieldErrorText,
  //   signInWithGoogle: signInWithGoogleText,
  // } = useContext(LocalisationContext);
  //
  // const dispatch = useDispatch();
  const theme = useTheme();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const initialErrors = {
    email: '',
    password: '',
    common: '',
  };
  const [errors, setErrors] = useState(initialErrors);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  // const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  const inputHandler = (text, id) => {
    setValues({
      ...values,
      [id]: text,
    });
    setErrors(initialErrors);
  };

  // const errorHandler = (text, id) => {
  //   setErrors({
  //     ...initialErrors,
  //     [id]: text,
  //   });
  // };

  const logInHandler = async () => {
    navigation.navigate('Main');
    // const {email, password} = values;
    // const emailIsCorrect = validateEmail(email);
    // const passwordIsCorrect = !!password;
    //
    // if (!emailIsCorrect) {
    //     return errorHandler(emailIsIncorrect, 'email');
    // }
    //
    // if (!passwordIsCorrect) {
    //     return errorHandler(textFieldErrorText.password, 'password');
    // }
    //
    // try {
    //     await dispatch(signInWithEmailAndPassword(email, password));
    // } catch (e) {
    //     if (e.code === 'auth/wrong-password') {
    //         return errorHandler(wrongPassword, 'password');
    //     } else if (e.code === 'auth/too-many-requests') {
    //         return errorHandler(tooManyRequests, 'common');
    //     } else if (e.code === 'auth/user-not-found') {
    //         return errorHandler(userNotFound, 'common');
    //     }
    //     return errorHandler(e.message, 'common');
    // }
  };

  // const googleHandler = async () => {
  //   setIsSigninInProgress(true);
  //   try {
  //     const user = await signInWithGoogle();
  //     console.log('user', user);
  //   } catch (e) {
  //     errorHandler(e.message, 'common');
  //   }
  //   setIsSigninInProgress(false);
  // };

  const signUpLink = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.action}> */}
      {/*  <GoogleSigninButton */}
      {/*    style={{ width: '100%', height: 48 }} */}
      {/*    size={GoogleSigninButton.Size.Wide} */}
      {/*    color={GoogleSigninButton.Color.Dark} */}
      {/*    onPress={googleHandler} */}
      {/*    disabled={isSigninInProgress} */}
      {/*  /> */}
      {/* </View> */}
      <View style={styles.action}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Email"
          value={values.email}
          onChangeText={(text) => inputHandler(text, 'email')}
        />
        <HelperText type="error" visible={errors.email}>
          {errors.email}
        </HelperText>
      </View>
      <View style={styles.action}>
        <TextInput
          style={styles.input}
          mode="outlined"
          onChangeText={(text) => inputHandler(text, 'password')}
          label="Password"
          value={values.password}
          secureTextEntry={secureTextEntry}
          right={<TextInput.Icon name="eye" onPress={() => setSecureTextEntry(!secureTextEntry)} />}
        />
        <HelperText type="error" visible={errors.password}>
          {errors.password}
        </HelperText>
      </View>
      {Boolean(errors.common)
      && (
      <HelperText style={styles.action} type="error" visible={errors.common}>
        {errors.common}
      </HelperText>
      )}
      <Button
        mode="contained"
        onPress={logInHandler}
      >
        Log in
      </Button>
      <View style={styles.caption}>
        <Text>Don't have an account yet?</Text>
        <TouchableOpacity onPress={signUpLink}>
          <Text style={{ color: theme.colors.accent }}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  action: {
    marginBottom: 10,
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
  },
  caption: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
