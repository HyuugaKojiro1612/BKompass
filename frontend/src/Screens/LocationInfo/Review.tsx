import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import StarRating from "react-native-star-rating"; // Import your preferred Star Rating component
import Icon from "react-native-vector-icons/AntDesign";
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
  user: {
    username: string;
    displayName: string;
    avtUrl: string;
  };
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
  user,
}: {
  voteAndComment: ReviewProps["voteAndComment"];
  user: ReviewProps["user"];
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

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [userRating, setUserRating] = React.useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    if (!isModalVisible) toggleModal();
  };

  const addImageHandler = () => {};

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
      <View style={styles.submitVoteContainer}>
        <View>
          <Text style={styles.votesText}>Rate & review</Text>
        </View>
        <View style={styles.votes}>
          <Image source={{ uri: user.avtUrl }} style={styles.avatar} />
          <StarRating
            disabled={false}
            maxStars={5}
            rating={userRating}
            starSize={30}
            fullStarColor={"gold"}
            starStyle={{ margin: 8 }}
            selectedStar={handleRating}
          />
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
      <Modal visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeaderContainer}>
            <TouchableOpacity
              style={styles.modalHeaderClosed}
              onPress={() => toggleModal()}
            >
              <Icon name="close" size={24} />
            </TouchableOpacity>
            <Text style={styles.modalHeaderText}>Rate & Review</Text>
            <View style={{ height: 40, width: 40 }}></View>
          </View>
          <View style={{justifyContent: "space-around", alignItems: "center", marginVertical: 20}}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={userRating}
              selectedStar={(rating) => handleRating(rating)}
              starSize={30}
              fullStarColor={"gold"}
              starStyle={{ margin: 8 }}
            />
          </View>
          <View style={styles.commentContainer}>
            <View style={styles.avtContainer}>
              <Image source={{ uri: user.avtUrl }} style={styles.avatar} />
            </View>
            <View style={styles.voteContainer}>
              <Text style={styles.displayNameText}>{user.displayName}</Text>
              <View style={styles.voteAndTimeContainer}>
                <Text>@{user.username}</Text>
              </View>
            </View>
          </View>
          <View>
            <TextInput style={styles.textInput} 
                      placeholder="Share details of your own experience at this place"
                      autoFocus={true}
                      multiline= {true}
                      scrollEnabled={true}
                      numberOfLines={2}
            ></TextInput>
          </View>
          {/* Add TextInput for comment */}
          <View style={{justifyContent: "center", alignItems:"center"}}>
            <TouchableOpacity style={styles.addImageContainer}
              onPress={addImageHandler}>
              <Icon name='camera' style={styles.addImageButton} size={24} color={"#009060"} />
              <Text style={styles.addImageButtonText}>Add Image</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => {
              // Handle the post action here
              // You may want to send the rating, comment, and photos to your server
              toggleModal();
            }}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
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
    marginHorizontal: 30,
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
    width: "100%",
    margin: 0,
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
    maxHeight: 210,
    marginHorizontal: 30,
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
    padding: 5,
  },
  submitVoteContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignContent: "center",
    alignItems: "flex-start",
    marginLeft: 30,
  },
  votesText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  votes: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalHeaderContainer: {
    marginTop: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  modalHeaderClosed: {
    height: 40,
    width: 40,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    marginTop: 10,
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addImageContainer: {
    marginTop: 30,
    marginBottom: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    width: "auto",
    maxWidth: 150,
    backgroundColor: "#CCD1CE",
    borderRadius: 25,
    padding: 5
  },
  buttonContainer: {
    marginTop: 20,
    marginRight: 30,
    alignItems: "flex-end"
  },
  addImageButton: {
    marginLeft: 15,
    marginRight: 10,
  },
  addImageButtonText: {
    marginRight: 15,
    fontSize: 16,
    fontWeight: "500",
    color: "#009060"
  },
  textInput: {
    minHeight: 100,
    borderWidth: 2,
    borderColor: "#e0e1dd",
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    fontSize: 16,
    padding: 10,
    textAlignVertical: "top",  // This is important for Android to start the text from the top
  },
});

const Review: React.FC<ReviewProps> = ({ voteAndComment, user }) => {
  return (
    <View>
      <RatingStatistics voteAndComment={voteAndComment} user={user} />
    </View>
  );
};

export default Review;
