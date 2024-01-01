import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Animated,
  Pressable,
  useWindowDimensions
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { List, Divider } from "react-native-paper";
import { color } from "native-base/lib/typescript/theme/styled-system";
import Icon from "react-native-vector-icons/Octicons";
import * as React from "react";
import Swiper from "react-native-swiper";
import { NavigationContainer } from "@react-navigation/native";
import { TabView, SceneMap } from "react-native-tab-view";
import Overview from "./Overview";
import Review from "./Review";
import Photos from "./Photos";
import Introduction from "./Introduction";
import { NativeBaseProvider, Box, Center } from "native-base";
import { useColorModeValue } from "native-base";
import ImageSize from 'react-native-image-size'
import Constants from 'expo-constants';

const modelName = Constants.deviceName;

export const LocationInfo = () => {
  const basicInfo = {
    displayName: "Đại học bách khoa cơ sở 2",
    location: "Đông Hòa, Dĩ An, Bình Dương",
    images: [
      { id: "1", source: require("./img/image1.jpg") },
      { id: "2", source: require("./img/image2.jpg") },
      { id: "3", source: require("./img/image3.jpg") },
      { id: "4", source: require("./img/image1.jpg") },
      { id: "5", source: require("./img/image2.jpg") },
      { id: "6", source: require("./img/image3.jpg") },
      { id: "7", source: require("./img/image1.jpg") },
    ],
    times:"7:00-20:30",
    voteAndComment: [
      {
        vote: 5,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        time: new Date(2024, 0, 1, 2, 3, 4, 567),
        user: {
          username: "nhannguyen1003",
          displayName: "Nhan Nguyen",
          avtUrl: "https://lh3.googleusercontent.com/a/ACg8ocIjS4yddVpw1xqILBWSD3KYq8KzuZqUdn5jpZeMui6jiQ=s96-c"
        }
      },
      {
        vote: 4,
        comment: "Comment 2",
        time: new Date(2024, 0, 1, 1, 3, 4, 567),
        user: {
          username: "nhannguyen1003",
          displayName: "abccccc",
          avtUrl: "https://lh3.googleusercontent.com/a/ACg8ocIjS4yddVpw1xqILBWSD3KYq8KzuZqUdn5jpZeMui6jiQ=s96-c"
        }
      },
      {
        vote: 4,
        comment: "Comment 3",
        time: new Date(2024, 0, 1, 1, 11, 4, 567),
        user: {
          username: "nhannguyen1003",
          displayName: "Nhan Nguyen 41232334",
          avtUrl: "https://lh3.googleusercontent.com/a/ACg8ocIjS4yddVpw1xqILBWSD3KYq8KzuZqUdn5jpZeMui6jiQ=s96-c"
        }
      },
      {
        vote: 4,
        comment: "Comment 4",
        time: new Date(2024, 0, 1, 2, 10, 4, 567),
         user: {
          username: "nhannguyen1003",
          displayName: "Nhan Nguyen 4",
          avtUrl: "https://lh3.googleusercontent.com/a/ACg8ocIjS4yddVpw1xqILBWSD3KYq8KzuZqUdn5jpZeMui6jiQ=s96-c"
        }
      },
      {
        vote: 2,
        comment: "Comment 5",
        time: new Date(2024, 0, 1, 2, 9, 4, 567),
        user: {
          username: "nhannguyen1003",
          displayName: "Nhan Nguyen 3",
          avtUrl: "https://lh3.googleusercontent.com/a/ACg8ocIjS4yddVpw1xqILBWSD3KYq8KzuZqUdn5jpZeMui6jiQ=s96-c"
        }
      },
      {
        vote: 3,
        comment: "Comment 6",
        time: new Date(2024, 0, 1, 1, 5, 10, 567),
        user: {
          username: "nhannguyen1003",
          displayName: "Nhan Nguyen 2",
          avtUrl: "https://lh3.googleusercontent.com/a/ACg8ocIjS4yddVpw1xqILBWSD3KYq8KzuZqUdn5jpZeMui6jiQ=s96-c"
        }
      },
      {
        vote: 5,
        comment: "Comment 7",
        time: new Date(2024, 0, 1, 1, 6, 7, 3),
        user: {
          username: "nhannguyen1003",
          displayName: "Nhan Nguyen 1",
          avtUrl: "https://lh3.googleusercontent.com/a/ACg8ocIjS4yddVpw1xqILBWSD3KYq8KzuZqUdn5jpZeMui6jiQ=s96-c"
        }
      },
    ],
    website: "https://hcmut.edu.vn"
    ,
    intro: "<b>Nhân rất đẹp a </b> <br><br> TOÀ NHÀ H6 ĐẠI HỌC BÁCH KHOA CS2<br>- Tòa nhà H6 được thiết kế khéo léo. Việc thiết kế kiến trúc đặt giếng trời ở khoảng giữa tòa nhà chính là giúp kích hoạt luồng khí,  chiếu sáng toàn bộ dãy hành lang.<br>H6 được trang bị 2 phòng máy tính Apple hiện đại bậc nhất làng đại học quốc gia, hơn nữa hệ thống Wifi free-S cực mạnh nhằm đáp ứng nhu cầu của sinh viên.<br>- Trước H6 là nhiều cây xanh mang lại cảm giác tươi mát. Vật liệu sử dụng nhiều kính kết hợp với màu xanh Bách Khoa mang lại cảm giác trẻ trung, năng động.<br>- H6 tập trung nhiều sinh viên khoa Khoa học và kỹ thuật máy tính."
  };

  const [isFavorite, setIsFavorite] = React.useState(false);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const images = basicInfo.images

  const windowDimensions = useWindowDimensions();

  const initialLayout = {
    width: windowDimensions.width,
  };
  const renderScene = SceneMap({
    overview: () => <Overview basicInfo={basicInfo}/>,
    review: () => <Review voteAndComment={basicInfo.voteAndComment}/>,
    photos: () => <Photos images={basicInfo.images}/>,
    intro: () => <Introduction intro={basicInfo.intro} />, // Assuming intro is a string
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "overview",
      title: "Overview",
    },
    {
      key: "review",
      title: "Review",
    },
    {
      key: "photos",
      title: "Photos",
    },
    {
      key: "intro",
      title: "Introduction",
    },
  ]);
  let temp = 32

  const w = Math.floor(initialLayout.width / temp);

  const renderTabBar = (props: any) => {
    //@ts-ignore
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: any, i: any) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) => {
              return inputIndex === i ? 1 : 0.5;
            }),
          });
          const color =
            index === i
              ? useColorModeValue("#000", "#e5e5e5")
              : useColorModeValue("#1f2937", "#a1a1aa");
          const borderColor =
            index === i
              ? "cyan.500"
              : useColorModeValue("coolGray.200", "gray.400");

          if(i === 3){
            var tabW = w*12;
          }
          else if(i==0){
            var tabW = w*7;
          }
          else{
            var tabW = w*6;
          }

          
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              minWidth={tabW}
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin địa điểm</Text>
      <View style={styles.body}>
        <View style={styles.BasicInfoContainer}>
          <View>
            <Text style={styles.BasicName}>{basicInfo.displayName}</Text>
            <Text style={styles.BasicLocation}>{basicInfo.location}</Text>
          </View>
          <TouchableOpacity onPress={toggleFavorite}>
            {isFavorite ? (
              <Icon name="bookmark" size={30} color="gold" />
            ) : (
              <Icon name="bookmark" size={30} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.wrapper}>
          {images.slice(0, 5).map((image, index) => (
            <View
              style={{
                borderRadius: 10,
                overflow: 'hidden', // Clip the contents to the rounded border
                marginRight: 10,
              }}
              key={image.id}
            >
              <Image
                source={image.source}
                style={{
                  height: 210,
                  width: 210,
                  aspectRatio: 1,
                  resizeMode: 'cover',
                  marginRight: 10,
                  borderRadius: 20,
                }}
                key={image.id}
              />
            </View>
          ))}
        </ScrollView>
        </View>
        <View
          style={{ flex: 1, marginTop: StatusBar.currentHeight, marginLeft: 30, marginRight: 30 }}
        >
          <TabView
            navigationState={{
              index,
              routes,
            }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    marginTop: 70,
    alignContent: "flex-end",
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
  },
  BasicInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  BasicName: {
    height: 22,
    fontSize: 18,
    fontWeight: "bold",
    color: "#192342",
  },
  BasicLocation: {
    height: 18,
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    color: "#677191",
  },
  touchableOpacity: {
    paddingLeft: 25,
    marginTop: 30,
    flexDirection: "row",
    marginLeft: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    height: 50,
  },
  div: {
    paddingLeft: 20,
    fontSize: 16,
  },
  wrapper: {
    maxHeight: 210,
    marginTop: 20,
    marginLeft: 30,
    paddingRight: 5, // Adjust the spacing between images
  },
});
