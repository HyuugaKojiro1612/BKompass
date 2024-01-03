import React from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Onboarding, { DoneButtonProps } from 'react-native-onboarding-swiper';
import { Button, Image } from "native-base";
import { RootScreens } from "..";

export const Welcome = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const navigation = useNavigation();
  const handleDone = () =>{
    (navigation.navigate as any)('Main');
    navigation.reset({
      index: 0,
      routes: [{ name : 'Main' }],
    });
  }
  return (
    <Onboarding
    onDone={handleDone}
    onSkip={handleDone}
    bottomBarHighlight= {false}
    pages={[
        {
          backgroundColor: '#F3FFEF',
          image: <Image source={require('../../../assets/onboarding1.png')} alt ="" />,
          title: 'Scan with ease',
          subtitle: '',
          titleStyles: styles.titles
        },
        {
          backgroundColor: '#F3FFEF',
          image: <Image source={require('../../../assets/onboarding2.png')} alt="" />,
          title: 'Explore with excitement',
          titleStyles: styles.titles,
          subtitle: '',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titles: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
