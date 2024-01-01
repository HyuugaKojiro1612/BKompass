import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { List ,Divider} from 'react-native-paper';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { useNavigation } from "@react-navigation/native";

export const Profile = () => {
  const user = {
    avatar: "data:image/png;base64,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",
    name: "Github"
  };
  const navigation = useNavigation<any>();
  
  return (
    <View style={styles.container}>
      <Text style = {styles.title}>TRANG CÁ NHÂN</Text>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>1234</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>5678</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>9101</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
      <Divider />
      <TouchableOpacity onPress={() => navigation.navigate('ProfileDetail')} style={styles.touchableOpacity} >
        <MaterialCommunityIcons  name ="account" size = {30}/>
        <Text style = {styles.div}>Thay đổi thông tin</Text>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.touchableOpacity} >
        <MaterialCommunityIcons  name ="check-decagram" size = {30}/>
        <Text style = {styles.div}>Kích hoạt tài khoản doanh nghiệp</Text>
      </TouchableOpacity>  
      <TouchableOpacity style = {{ justifyContent: 'center', marginTop: 30}} >
        <Text style ={{color: 'red', fontSize: 16}}>Đăng xuất</Text>
      </TouchableOpacity> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  title:{
    marginTop: 60,
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: 'white',
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color:'#009060'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '60%',
    justifyContent: 'space-between',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#999',
  },
  touchableOpacity:{
    paddingLeft: 25,
    marginTop: 30,
    flexDirection: 'row',
    marginLeft: 0,
    justifyContent: 'flex-start',
    alignItems:'center',
    width: '100%',
    textAlign: 'center',
    height: 50,
  },
  div :{
    paddingLeft: 20,
    fontSize:16
  },
});
