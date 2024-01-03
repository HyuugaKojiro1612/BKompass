import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Profile} from '@/Screens/Profile';
import { View } from "react-native";
import { LocationInfo } from '@/Screens/LocationInfo'
import { QRScannerContainer } from "@/Screens/QR Scanner";
const Tab = createBottomTabNavigator();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName="home"
    screenOptions={{
      tabBarActiveTintColor:"#009060",
      tabBarLabelPosition: "below-icon",
      headerShown: false,
    }}
    >
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon:({color,size}) =>(<MaterialCommunityIcons name="home" color={color} size={size} />),
        }}
      />
      <Tab.Screen
        name="Lịch sử"
        component={HomeContainer}
        options={{
          tabBarLabel: "Lịch sử",
          tabBarIcon:({color,size}) =>(<MaterialCommunityIcons name="history" color={color} size={size} />),

        }}
      />
      <Tab.Screen
        name="Scan QR"
        component={QRScannerContainer}
        options={{
          tabBarIcon: ({color, size }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: '#009060',
                  height: 60,
                  width: 60,
                  top:-20,
                  borderRadius:30,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
              >
                <MaterialCommunityIcons name="qrcode" size={size} color={'white'} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Thêm địa điểm"
        component={HomeContainer}
        options={{
          tabBarLabel: "Thêm địa điểm",
          tabBarIcon:({color,size}) =>(<MaterialCommunityIcons name="map-marker-plus-outline" color={color} size={size} />),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Hồ sơ",
          tabBarIcon:({color,size}) =>(<MaterialCommunityIcons name="account-outline" color={color} size={size} />),
        }}
      />
    </Tab.Navigator>
  );
};