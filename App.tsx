import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AvailableShifts from './src/Screens/AvailableShifts';
import MyShifts from './src/Screens/MyShifts';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import useFetchAndFormatData from './src/hooks/useFetchAndFormatData';
import {filterEventsByLocation} from './src/utils/filteredLocation';
import {StyleSheet} from 'react-native';

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

function HomeTopTabs() {
  const {data} = useFetchAndFormatData();

  const helsinkiShifts = data && filterEventsByLocation(data, 'helsinki');
  const tampereShifts = data && filterEventsByLocation(data, 'tampere');
  const turkuShifts = data && filterEventsByLocation(data, 'turku');

  const helsinkiShiftsCount = helsinkiShifts
    ? Object.values(helsinkiShifts).flat().length
    : 0;
  const tampereShiftsCount = tampereShifts
    ? Object.values(tampereShifts).flat().length
    : 0;
  const turkuShiftsCount = turkuShifts
    ? Object.values(turkuShifts).flat().length
    : 0;
  return (
    <TopTab.Navigator
      screenOptions={{
        animationEnabled: true,
        tabBarLabelStyle: styles.tabBarStyle,
        tabBarActiveTintColor: '#004FB4',
        tabBarInactiveTintColor: '#CBD2E1',
        tabBarIndicatorStyle: {display: 'none'},
        tabBarStyle: {
          elevation: 0,
        },
      }}>
      <TopTab.Screen
        name={`Helsinki (${helsinkiShiftsCount})`}
        component={AvailableShifts}
        initialParams={{name: 'helsinki'}}
      />
      <TopTab.Screen
        name={`Tampere (${tampereShiftsCount})`}
        component={AvailableShifts}
        initialParams={{name: 'tampere'}}
      />
      <TopTab.Screen
        name={`Turku (${turkuShiftsCount})`}
        component={AvailableShifts}
        initialParams={{name: 'turku'}}
      />
    </TopTab.Navigator>
  );
}

function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarIconStyle: {display: 'none'},
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#004FB4',
        tabBarInactiveTintColor: '#CBD2E1',
        tabBarLabelStyle: styles.bottomBarLabelStyle,
      }}>
      <BottomTab.Screen
        name="My Shifts"
        component={MyShifts}
        options={{
          tabBarLabel: 'My Shifts',
        }}
      />
      <BottomTab.Screen
        name="Available Shifts"
        component={HomeTopTabs}
        options={{
          tabBarLabel: 'Available Shifts',
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  bottomBarLabelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
});
