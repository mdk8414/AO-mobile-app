import { StyleSheet, Text, View, TouchableOpacity, Linking  } from "react-native";
import { useRouter } from 'expo-router'
import { Button } from 'react-native-elements';

import colors from 'constants/colors'

export default function Page() {
  
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>Welcome to AO Nest!</Text>
      </View>
      <View style={styles.subhead}>
        <Text style={styles.subtitle}>Begin your mental health journey here.</Text>
      </View>
      <View style={styles.main}>  
        <Button 
            onPress={ () => { router.push('AONest/TrackEmotions/'); } } 
            title="Track Emotions"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
        />
        <Button 
            onPress={ () => { router.push('AONest/EmotionalIntelligence/'); } } 
            title="Emotional Intelligence"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
        />
      </View>
      <View style={styles.main}>  
        <Button 
            onPress={ () => { router.push('AONest/content') } } 
            title="Content"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
        />
        <Button 
            onPress={ () => { router.push('AONest/settings') } } 
            title="Settings"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  head: {
    // backgroundColor: colors.secondaryButton,
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: colors.primaryButton,
    maxWidth: 500,
    // paddingBottom: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  subhead: {
    alignItems: 'center',
    maxWidth: 500,
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: colors.primaryButton,
  },
  main: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 160,
    // justifyContent: "top",
  },
  title: {
    fontSize: 54,
    fontWeight: "bold",
    color: colors.primaryButton,
    // textAlign: "center",
    // marginLeft: 10,
  },
  subtitle: {
    fontSize: 36,
    color: colors.title2,
    textAlign: "left",
  },
  button: {
    width: 160,
    height: 140,
    marginTop: 20,
    marginRight: 20,
    backgroundColor: colors.secondaryButton,
    borderRadius: 30,
    // borderWidth: 0.5,
    borderColor: colors.primaryButton,
  },
  buttonText: {
    color: colors.title2,
    fontSize: 24,
    fontWeight: 'bold',
  }
});
