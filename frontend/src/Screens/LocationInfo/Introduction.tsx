// Introduction.jsx
import { ScrollView } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import HTML from 'react-native-render-html';

type IntroductionProps = {
  intro: string;
};

const Introduction: React.FC<IntroductionProps> = ({ intro }) => {
  return (
    <ScrollView>
    <Text style={{margin:20}}>
      {/* Assuming you want to render HTML content */}
      <HTML source={{ html: intro }} />
    </Text>
    </ScrollView>
  );
};

export default Introduction;
