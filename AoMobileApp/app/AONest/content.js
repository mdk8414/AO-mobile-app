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
        source={{ uri: 'https://go.aonest.com/' }}
      />
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
