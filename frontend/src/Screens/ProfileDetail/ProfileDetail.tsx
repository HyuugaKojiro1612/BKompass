import { ScrollView, TouchableOpacity, View, useWindowDimensions, StyleSheet } from "react-native";
import { Avatar, TextInput, Button, Text, Provider as PaperProvider } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { DatePickerInput } from "react-native-paper-dates";
import { registerTranslation, en } from "react-native-paper-dates";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
    
registerTranslation("en", en);
    
export const ProfileDetail = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation<any>();

  const [usernameLabel, setUsernameLabel] = useState<string | undefined>(
    "BKompass User"
  );
  const [username, setUsername] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");
  const [inputDate, setInputDate] = useState<Date>();
  const [studentID, setStudentID] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const windowWidth = 0.85 * useWindowDimensions().width;

  const genderList = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Others",
      value: "others",
    },
  ];

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View>
        <TouchableOpacity
            style={{ marginBottom: 10, marginLeft: 10 }}
        >
            {/* <MaterialCommunityIcons name="close-circle" size={22} color="#05603A" /> */}
        </TouchableOpacity>
        </View>
          <ScrollView>
            <View style={[styles.scrollView, { width: windowWidth }]}>
            <TouchableOpacity
                style={styles.touchableOpacity}
                // onPress={() => {
                // handleLogout();
                // }}
            >
                <Text style={styles.textLogOut}>
                Log out
                </Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <Avatar.Image
                style={styles.avatar}
                size={200}
                source={require("../../../assets/Avatar.png")}
                />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.textUsername}>
                  {usernameLabel}
              </Text>
            </View>
            <View /*style={styles.textInputContainer}*/>
                <TextInput
                style={styles.textInput}
                mode="outlined"
                label="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                left={<TextInput.Icon icon="phone-outline" />}
                outlineColor="#767680"
                activeOutlineColor="#05603A"
                outlineStyle={{
                    borderRadius: 12,
                    borderWidth: 1,
                }}
                />
                <TextInput
                style={styles.textInput}
                mode="outlined"
                label="Username"
                value={username}
                onChangeText={setUsername}
                left={<TextInput.Icon icon="account-outline" />}
                outlineColor="#767680"
                activeOutlineColor="#05603A"
                outlineStyle={{
                    borderRadius: 12,
                    borderWidth: 1,
                }}
                />
                <View style={styles.textInput}>
                <DropDown
                    label="Gender"
                    mode="outlined"
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    value={gender}
                    setValue={setGender}
                    list={genderList}
                    inputProps={{
                    left: <TextInput.Icon icon={"gender-male-female"} />,
                    outlineColor: "#767680",
                    activeOutlineColor: "#05603A",
                    outlineStyle: {
                        borderRadius: 12,
                        borderWidth: 1,
                    },
                    }}
                    dropDownStyle={{
                    backgroundColor: "#ECFDF3",
                    borderRadius: 12,
                    }}
                    dropDownItemStyle={{
                    backgroundColor: "#ECFDF3",
                    }}
                    dropDownItemSelectedStyle={{
                    backgroundColor: "#05603A",
                    }}
                    activeColor="#FFFFFF"
                />
                </View>
                <DatePickerInput
                style={styles.textInput}
                locale="en"
                label="Birthday"
                mode="outlined"
                value={inputDate}
                onChange={(d) => setInputDate(d)}
                inputMode="start"
                left={<TextInput.Icon icon="cake-variant-outline" />}
                outlineColor="#767680"
                activeOutlineColor="#05603A"
                outlineStyle={{
                    borderRadius: 12,
                    borderWidth: 1,
                }}
                />
                <TextInput
                style={styles.textInput}
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={setEmail}
                left={<TextInput.Icon icon="email-outline" />}
                outlineColor="#767680"
                activeOutlineColor="#05603A"
                outlineStyle={{
                    borderRadius: 12,
                    borderWidth: 1,
                }}
                // editable={false}
                />
                
            </View>
            <View style={styles.deleteAccContainer}>
                <TouchableOpacity /*onPress={handleDelete}*/>
                <Text style={styles.textDeleteAcc}>
                    Delete Account
                </Text>
                </TouchableOpacity>
            </View>
            {/* <View>
                <CustomButton text="Update" onPress={handleUpdate} />
            </View> */}
            </View>
          </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 2,
  },
  touchableOpacity: {
    flexDirection: 'row-reverse',
    marginBottom: 5,
    marginHorizontal: 3,
  },
  textLogOut: {
    color: '#05603A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  avatar: {
    marginHorizontal: 'auto',
    marginTop: 2,
    marginBottom: 2,
  },
  textUsername: {
    color: '#05603A',
    fontWeight: 'bold',
    fontSize: 32,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textInput: {
    marginVertical: 1,
    flexBasis: '100%',
  },
  deleteAccContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDeleteAcc: {
    color: '#BA1A1A',
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 12,
    fontSize: 16,
  },
});