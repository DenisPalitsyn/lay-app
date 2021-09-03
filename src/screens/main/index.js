import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Profile from './profile';
import Settings from './profile/settings';
import AddPromo from './profile/add_promo';
import Search from './search';
import Chats from './chats';
import Promotions from './promotions';
import { RootNavigationContext, UserContext } from '../../utils/context';

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = ({ route }) => {
  const currentUserUid = auth().currentUser.uid;
  const profileUid = route.params ? route.params.userId : currentUserUid;
  const isUser = profileUid === currentUserUid;

  return (
    <UserContext.Provider value={{ profileUid, isUser }}>
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="UserInfo"
          component={Profile}
          options={{ headerShown: false }}
        />
        <ProfileStack.Screen name="Settings" component={Settings} />
        <ProfileStack.Screen
          name="AddPromo"
          component={AddPromo}
          options={{ headerTitle: 'Add a promo' }}
        />
      </ProfileStack.Navigator>
    </UserContext.Provider>
  );
};

const Tab = createBottomTabNavigator();

export default function Main({ navigation: rootNavigation }) {
  const theme = useTheme();
  const userId = auth().currentUser.uid;

  return (
    <RootNavigationContext.Provider value={{ rootNavigation }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Profile') {
              iconName = focused
                && (!route.params || route.params.userId === userId) ? 'person' : 'person-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Chats') {
              iconName = focused ? 'chatbox' : 'chatbox-outline';
            } else if (route.name === 'Promotions') {
              iconName = focused ? 'heart' : 'heart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.backdrop,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          listeners={({ navigation }) => ({
            tabPress: () => {
              // e.preventDefault();
              navigation.navigate('Profile', { userId });
            },
          })}
        />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Promotions" component={Promotions} />
      </Tab.Navigator>
    </RootNavigationContext.Provider>
  );
}
