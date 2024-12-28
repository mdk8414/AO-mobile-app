import { StyleSheet, Text, Dimensions, View } from "react-native";
import { Link, useRouter } from 'expo-router'
import fonts from '../../constants/fonts';
import { Button } from 'react-native-elements'

import colors from 'constants/colors'

const { width, height } = Dimensions.get('window');

const Emotion = ({ emotion, baseHref }) => {
  const router = useRouter();
  
  return (
    <Button 
        onPress={ () => { router.push(`${baseHref}${emotion?.text}`) } } 
        title={
          <><Text style={styles.emoji}>{String.fromCodePoint(emotion?.emoji)}</Text><Text style={styles.text}>{emotion?.text}</Text></>
        }
        titleStyle={styles.text}
        buttonStyle={styles.container}
    />
  )
}

export default Emotion;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f',
    marginHorizontal: width/10,
    marginTop: height/25,
    color: "#0",
    backgroundColor: colors.secondaryButton
    // width: '50%',
  },
  text: {
    flex: 0,
    fontSize: fonts.textSize,
  },
  emoji: {
    flex: 0,
    fontSize: fonts.emoji,  
  }
});
