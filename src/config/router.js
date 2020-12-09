/* eslint-disable react-native/no-inline-styles */
import React from 'react';
//
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

//
import {connect, Provider} from 'react-redux';
import getStore from '../redux/store';
const {store, persistor} = getStore();

import {BottomScreen, StackScreen} from '../screens';
import Splash from '../screens/Splash';

import {Easing} from 'react-native';
import {THEME_DARK} from '../styles/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

//
const TopTab = createMaterialTopTabNavigator();
const BottomTab = createMaterialBottomTabNavigator();
const Stack = createSharedElementStackNavigator();
//
const BottomNavigator = () => (
  <BottomTab.Navigator
    activeColor={THEME_DARK.WHITE}
    inactiveColor={THEME_DARK.GREY}
    shifting={false}
    barStyle={{
      backgroundColor: THEME_DARK.BLACK,
    }}>
    <BottomTab.Screen
      name="Home"
      component={BottomScreen.Home}
      options={{
        tabBarIcon: ({color}) => (
          <Entypo name="controller-play" color={color} size={20} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Feed"
      component={BottomScreen.Feed}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialIcons name="rss-feed" color={color} size={20} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Other"
      component={BottomScreen.Other}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons
            name="google-circles"
            color={color}
            size={20}
          />
        ),
      }}
    />
    <BottomTab.Screen
      name="Chat"
      component={BottomScreen.Chat}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="md-chatbubbles" color={color} size={20} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Profile"
      component={BottomScreen.Profile}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="account" color={color} size={20} />
        ),
      }}
    />
  </BottomTab.Navigator>
);
const optionsDetailMovie = () => ({
  headerShown: false,
});
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RecommendMovie"
          component={StackScreen.RecommendMovie}
        />
        <Stack.Screen
          options={optionsDetailMovie}
          name="detailMovie"
          component={StackScreen.DetailMovie}
          sharedElementsConfig={(route) => {
            return [
              {
                id: `item.${route.params.data.id}.photo`,
              },
              {
                id: `item.${route.params.data.title}.title`,
              },
            ];
          }}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BottomNavigator"
          component={BottomNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ReduxWrap = connect()(StackNavigator);

export const Router = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ReduxWrap />
    </PersistGate>
  </Provider>
);
