import BarCodeScanScreen from "./QRScanner";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LocationInfo } from "../LocationInfo/LocationInfo";

const Stack = createStackNavigator();

export const QRScannerContainer = () => {
  return (
      <Stack.Navigator initialRouteName="BarCodeScan">
        <Stack.Screen name="BarCodeScan" component={BarCodeScanScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LocationInfo" component={LocationInfo} />
      </Stack.Navigator>
  );
};
