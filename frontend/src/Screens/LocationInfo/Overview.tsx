import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import SvgUri from "react-native-svg-uri";
import StarRating from "react-native-star-rating";
import { Link } from "native-base";

type OverviewProps = {
  basicInfo: any;
};

const Overview: React.FC<OverviewProps> = ({ basicInfo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoList}>
        <View style={styles.iconic}>
          <SvgUri
            width="30"
            height="30"
            source={require("./img/map-marker-alt.svg")}
          />
        </View>
        <Text style={{ height: 30, paddingTop: 6 }}>{basicInfo.location}</Text>
      </View>
      <View style={styles.infoList}>
        <View style={styles.iconic}>
          <SvgUri width="30" height="30" source={require("./img/times.svg")} />
        </View>
        <Text style={{ height: 30, paddingTop: 6 }}>{basicInfo.times}</Text>
      </View>
      <View style={styles.infoList}>
        <View style={styles.iconic}>
          <Icon name="star" size={30} color="black" />
        </View>
        <Text style={{ height: 30, paddingTop: 6, marginRight: 20 }}>
          {`${Math.round((
            basicInfo.voteAndComment.reduce(
              (sum: any, vc: any) => sum + vc.vote,
              0
            ) / basicInfo.voteAndComment.length
          )*10)/10} (${basicInfo.voteAndComment.length})`}
        </Text>
        <View style={styles.iconic}>
          <StarRating
            disabled={true}
            maxStars={5}
            
            rating={
              basicInfo.voteAndComment.reduce(
                (sum: any, vc: any) => sum + vc.vote,
                0
              ) / basicInfo.voteAndComment.length
            }
            starSize={25}
            fullStarColor={"gold"}
            emptyStarColor={"black"}
            halfStarEnabled={true}
            starStyle={{ marginRight: 5 }}
          />
        </View>
        {
          //Replace this by five start caculate form info.voteAndComment.vote
        }
      </View>
      <View style={styles.infoList}>
        <View style={styles.iconic}>
          <Icon name="globe" size={30} />
        </View>
        <Link>{basicInfo.website}</Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  infoList: {
    display: "flex",
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    color: "#5F5F5F",
    font: 14,
    marginBottom: 10,
  },
  iconic: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
});

export default Overview;
