import { StyleSheet, Text, Dimensions, View, Image } from "react-native";
import { Link, useRouter } from 'expo-router'
import fonts from 'constants/fonts';
import { Button } from 'react-native-elements'

import colors from 'constants/colors'

const { width, height } = Dimensions.get('window');

const Emotion = ({ emotion, baseHref }) => {
  const router = useRouter();

    // Get the image for this emotion
  // For primary emotions, use the direct mapping
  // For secondary/tertiary emotions, use the parent emotion's image
  let imageElement, containerStyles;
  
  if (emotion?.icon) {
    // This is a primary emotion
    imageElement = <><Image source={emotion.icon} style={styles.customIcon}/><Text style={styles.text}>{emotion?.text}</Text></>
    containerStyles = styles.imageContainer
  } else {
    imageElement = <><Text style={styles.emoji}>{String.fromCodePoint(emotion?.emoji)}</Text><Text style={styles.text}>{emotion?.text}</Text></>
    containerStyles = styles.defaultContainer
  }
  
  return (
    <Button 
        onPress={ () => { router.push(`${baseHref}${emotion?.text}`) } } 
        title={ imageElement }
        titleStyle={styles.text}
        buttonStyle={containerStyles}
    />
  )
}

export default Emotion;

const styles = StyleSheet.create({
  defaultContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: '#f',
      paddingHorizontal: width/10,
      marginHorizontal: width/25,
      marginTop: height/25,
      color: "#0",
      backgroundColor: colors.secondaryButton
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#f',
    gap: 6,
    marginHorizontal: width/40,
    marginTop: height/40,
    paddingTop: height/40,
    color: "#0",
    backgroundColor: colors.secondaryButton,
    width: width/2.35,
    flex: 1
  },
  text: {
    fontSize: fonts.textSize,
  },
  customIcon: {
    width: 100,
    height: 100,
  },
  emoji: {
    fontSize: fonts.emoji,
  }
});
