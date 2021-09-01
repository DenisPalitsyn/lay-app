import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from '../screens/loading/loading';
import EditProfile from '../screens/edit_profile';
import Main from '../screens/main';
import Landing from '../screens/auth/landing';
import Login from '../screens/auth/login';
import SignUp from '../screens/auth/sign_up';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

export const Navigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Loading"
      component={Loading}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Auth"
      component={Auth}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Main"
      component={Main}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const Auth = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Landing"
      component={Landing}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
  </AuthStack.Navigator>
);
