import { ScrollView } from 'native-base';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from'react-native';
import Icon from "react-native-vector-icons/Feather";

type PhotosProps = {
  images: { id: string; source: any }[];
};

const Photos: React.FC<PhotosProps> = ({ images }) => {
  const addImageHandler = () => {}
  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addImageContainer}
          onPress={addImageHandler}
        >
          <Icon name='camera' style={styles.addImageButton} size={24} color={"#009060"} />
          <Text style={styles.addImageButtonText}>Add Image</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.length % 2 === 1 ?
        <View style={styles.imageContainer}>
            <View key={images[images.length-1].id} style={styles.imageWrapper}>
                <View>
                <Image
                  source={images[images.length-1].source}
                  style={styles.odd}
                />
                </View>
            </View>
        </View>: null}
        <View style={styles.imageContainer}>
          {images.slice(0, Math.round(images.length/2)*2).map((image, index) => (
            <View key={image.id} style={styles.imageWrapper}>
              {
                index % 2 === 1 ?
                <View>
                <Image
                  source={image.source}
                  style={styles.image}
                />
                <Image
                  source={images[index-1].source}
                  style={styles.image}
                />
              </View> : null
              }
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginLeft: 0,
    justifyContent: 'space-between',
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    margin: 5,
  },
  image: {
    height: 180,
    width: 180,
    resizeMode: 'cover',
    borderRadius: 20,
    marginVertical: 5
  },
  odd: {
    height: 370,
    width: 300,
    resizeMode: 'cover',
    borderRadius: 20,
    marginVertical: 5
  },
  addImageContainer: {
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
  }
});

export default Photos;
