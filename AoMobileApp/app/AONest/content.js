import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';

// import styles from '../styles/page';
import colors from "../constants/colors";
import fonts from "../constants/fonts";

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View style={styles.webView}>
      <WebView
        style={styles.webView}
        source={{ uri: 'https://go.aonest.com/' }}
      />
      {/* <Link style={{...styles.title, padding: 20}} href={"https://go.aonest.com/courses"}>All Courses</Link>
      <Link style={{...styles.subtitle, padding: 20}} href={"https://go.aonest.com/lessons/644/lesson_content_view/1316"}>Understanding And Resolving My Feelings</Link>
      <Link style={{...styles.subtitle, padding: 20}} href={"https://go.aonest.com/lessons/646/lesson_content_view/1317"}>Emotional Intelligence and Resilience Challenge</Link>
      <Link style={{...styles.subtitle, padding: 20}} href={"https://go.aonest.com/lessons/643/lesson_content_view/1318"}>Tracking Emotions And The Factors That Impact My Ability To Cope</Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.headerBackgound,
    height: 100,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  title: {
    color: colors.headerText,
    fontSize: fonts.headerSize,
    padding: 10
  },
  subtitle: {
    fontSize: fonts.subHeaderSize,
    color: colors.headerText,
    padding: 10
  },
  container: {
    backgroundColor: colors.containerBackground
  },
  webView: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "#f",
    color: "#f"
  }
});
