import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import StarRating from "react-native-star-rating"; // Import your preferred Star Rating component

//@ts-ignore
const PercentageBar = ({ percentage }) => {
  return (
    <View style={styles.PercentageBarContainer}>
      <View style={[styles.progressBar, { width: `${percentage}%` }]} />
    </View>
  );
};

type ReviewProps = {
  voteAndComment: {
    vote: number;
    comment: string;
    time: Date;
    user: {
      username: string;
      displayName: string;
      avtUrl: string;
    };
  }[];
};

const CustomStarRating = ({ vote }: { vote: number }) => {
  return (
    <StarRating
      disabled={true}
      maxStars={5}
      rating={vote}
      starSize={16}
      fullStarColor={"gold"}
      halfStarEnabled={true}
      starStyle={{ margin: 2 }}
    />
  );
};

const RatingStatistics = ({
  voteAndComment,
}: {
  voteAndComment: ReviewProps["voteAndComment"];
}) => {
  const calculateStatistics = () => {
    const statistics: { [key: number]: number } = {};
    let totalVotes = 0;
    let totalScore = 0;

    // Initialize statistics
    for (let i = 1; i <= 5; i++) {
      statistics[i] = 0;
    }

    // Count votes for each star rating and calculate total votes and score
    voteAndComment.forEach((item) => {
      const vote = item.vote;
      if (vote >= 1 && vote <= 5) {
        statistics[vote] += 1;
        totalVotes += 1;
        totalScore += vote;
      }
    });

    const averageRating = totalVotes > 0 ? totalScore / totalVotes : 0;

    return { statistics, totalVotes, averageRating };
  };

  const { statistics, totalVotes, averageRating } = calculateStatistics();

  const [expandedComments, setExpandedComments] = React.useState<number[]>([]);

  const toggleCommentExpansion = (index: number) => {
    setExpandedComments((prevExpandedComments) => {
      const newExpandedComments = [...prevExpandedComments];
      const commentIndex = newExpandedComments.indexOf(index);

      if (commentIndex === -1) {
        newExpandedComments.push(index);
      } else {
        newExpandedComments.splice(commentIndex, 1);
      }

      return newExpandedComments;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.statisticsContainer}>
        <View style={{ marginTop: 20, marginRight: 20 }}>
          <View style={styles.totalVotesContainer}>
            <Text style={styles.totalVotesText}>
              {Math.round(averageRating * 10) / 10} ({totalVotes})
            </Text>
          </View>
          <View style={styles.averageContainer}>
            <CustomStarRating vote={averageRating} />
          </View>
        </View>
        <View>
          {Object.keys(statistics).map((rating) => (
            <View>
              <View key={rating} style={styles.starRatingContainer}>
                <View style={styles.percentageContainer}>
                  <View style={styles.starCount}>
                    <Text>{statistics[parseInt(rating, 10)]}</Text>
                  </View>
                  <PercentageBar
                    percentage={
                      (statistics[parseInt(rating, 10)] / totalVotes) * 100
                    }
                  />
                </View>
              </View>
              <View></View>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.divider}></View>
      <View>
        <ScrollView style={styles.scrollView}>
          {voteAndComment.map((value, index) => {
            if (true) {
              // Add code to get timeDisplay if current time - value.time < 60 second ago; else if time - value.time < 60  > 60s x display min ago, ... similar to time month year day
              const currentTime = new Date();
              const commentTime = new Date(value.time);
              const timeDiffInSeconds = Math.floor(
                (currentTime.getTime() - commentTime.getTime()) / 1000
              );
              const isCommentExpanded: boolean =
                expandedComments.includes(index);
              // Function to display time in a human-readable format
              const timeDisplay = () => {
                if (timeDiffInSeconds < 60) {
                  return `${timeDiffInSeconds} seconds ago`;
                } else if (timeDiffInSeconds < 3600) {
                  const minutes = Math.floor(timeDiffInSeconds / 60);
                  return `${minutes} ${
                    minutes === 1 ? "minute" : "minutes"
                  } ago`;
                } else if (timeDiffInSeconds < 86400) {
                  const hours = Math.floor(timeDiffInSeconds / 3600);
                  return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
                } else {
                  const days = Math.floor(timeDiffInSeconds / 86400);
                  return `${days} ${days === 1 ? "day" : "days"} ago`;
                }
              };

              return (
                <View style={styles.commentWapper}>
                  <View key={index} style={styles.commentContainer}>
                    <View style={styles.avtContainer}>
                      <Image
                        source={{ uri: value.user.avtUrl }}
                        style={styles.avatar}
                      />
                    </View>
                    <View style={styles.voteContainer}>
                      <Text style={styles.displayNameText}>
                        {value.user.displayName}
                      </Text>
                      <View style={styles.voteAndTimeContainer}>
                        <View style={{ marginRight: 10 }}>
                          <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={value.vote}
                            starSize={12}
                            fullStarColor={"gold"}
                            halfStarEnabled={true}
                            starStyle={{ margin: 2 }}
                          />
                        </View>
                        <Text>{timeDisplay()}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.commentText}>
                    <Text numberOfLines={isCommentExpanded ? undefined : 2}>
                      {value.comment}
                    </Text>
                    {value.comment.length > 40 && (
                      <Text
                        style={styles.showMoreButton}
                        onPress={() => toggleCommentExpansion(index)}
                      >
                        {isCommentExpanded ? "Show Less" : "Show More"}
                      </Text>
                    )}
                  </View>
                </View>
              );
            } else {
            }
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    width: "100%",
    //backgroundColor: "red",
  },
  progressBar: {
    height: "100%",
    margin: 0,
    backgroundColor: "#4caf50", // Change color as needed
  },
  statisticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: 20,
  },
  averageContainer: {
    alignItems: "center",
  },
  totalVotesContainer: {
    alignItems: "center",
  },
  totalVotesText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
  },
  starRatingContainer: {
    alignItems: "flex-start",
  },
  starCount: {
    fontSize: 14,
    minWidth: 20,
    marginRight: 5,
  },
  percentageContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
  },
  PercentageBarContainer: {
    flexDirection: "row",
    alignContent: "flex-start",
    height: 10,
    width: "75%",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 3,
    marginRight: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc", // Border color
    marginVertical: 5, // Adjust the vertical margin as needed
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make it half of the width/height to create a circle
    marginRight: 10,
  },
  commentContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 5,
  },
  avtContainer: {},
  voteContainer: {
    display: "flex",
    alignContent: "center",
    alignItems: "flex-start",
  },
  voteAndTimeContainer: {
    display: "flex",
    flexDirection: "row",
  },
  displayNameText: {
    fontSize: 20,
    marginTop: 3,
  },
  scrollView: {
    height: "auto",
    //backgroundColor: "yellow",
    maxHeight: 350,
  },
  commentWapper: {
    flexGrow: 1,
    width: "100%",
    margin: 0,
    borderBottomColor: "#ced4da",
    borderBottomWidth: 1,
    marginBottom: 7,
  },
  showMoreButton: {
    color: "blue",
    marginTop: 5,
  },
  commentText: {
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 10,
    backgroundColor: "#ced4da",
    borderRadius: 5,
    padding: 5
  },
});

const Review: React.FC<ReviewProps> = ({ voteAndComment }) => {
  return (
    <View>
      <RatingStatistics voteAndComment={voteAndComment} />
    </View>
  );
};

export default Review;
