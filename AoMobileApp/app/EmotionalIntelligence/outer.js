import { StyleSheet, Text, View } from 'react-native';

export default function EmotionalIntelligenceOuter() {
    return(
        <View style={styles.main}> 
        {/* TODO we should seperate these to style sheet and probably seperate file for each screen as well
          <Text style={styles.title}>Emotional Intelligence</Text>
          <Text style={styles.subtitle}>Select a more specific emotion</Text>
          <Link href="/EmotionalIntelligence/selection">Emotion 1</Link> 
          <Link href="/EmotionalIntelligence/selection">Emotion 2</Link> 
          <Link href="/EmotionalIntelligence/selection">Emotion 3</Link> 
          <Link href="/EmotionalIntelligence/selection">Emotion 4</Link> 
          <Link href="/EmotionalIntelligence/selection">Emotion 5</Link> 
          <Link href="/EmotionalIntelligence/selection">Emotion 6</Link>  */}
        </View>
      );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});