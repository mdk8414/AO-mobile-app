import { StyleSheet, Text, View, TouchableOpacity, Linking  } from "react-native";
import { useRouter } from 'expo-router'
import { Button } from 'react-native-elements';

import colors from 'constants/colors'

export default function Page() {
  
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Welcome to AO Nest!</Text>
        <Text style={styles.subtitle}>Begin your mental health journey here.</Text>

        <Button 
            onPress={ () => { router.push('AONest/TrackEmotions/'); } } 
            title="Track Emotions"
            titleStyle={styles.linkText}
            buttonStyle={styles.link}
        />
        <Button 
            onPress={ () => { router.push('AONest/EmotionalIntelligence/'); } } 
            title="Emotional Intelligence"
            titleStyle={styles.linkText}
            buttonStyle={styles.link}
        />
        <Button 
            onPress={ () => { router.push('AONest/content') } } 
            title="Content"
            titleStyle={styles.linkText}
            buttonStyle={styles.link}
        />
        <Button 
            onPress={ () => { router.push('AONest/settings') } } 
            title="Settings"
            titleStyle={styles.linkText}
            buttonStyle={styles.link}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "top",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "top",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: colors.title,
  },
  subtitle: {
    fontSize: 36,
    color: colors.title,
  },
  link: {
    marginTop: 25,
    alignItems: "left",
    justifyContent: "left",
    padding: 10,
    backgroundColor: colors.primaryButton,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.secondaryButton
  },
  linkText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20
  }
});
