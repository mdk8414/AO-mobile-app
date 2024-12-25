import { StyleSheet, Text, Platform, Dimensions, View } from "react-native";
import { useLocalSearchParams  } from 'expo-router'
import { WebView } from 'react-native-webview';

import emotions from "constants/emotions";
import Emotions from "components/Emotions";
import PageWrapper from 'components/Wrappers/SubPage';

import styles from 'styles/page';

const { width } = Dimensions.get('window');

export default function EmotionalIntelligenceLevel3() {
  const { tertiary } = useLocalSearchParams();
  const full_emotion = tertiary ? emotions.find(el => el.secondary.find(innerEl => innerEl.text === tertiary) ) : {};
  const emotion = full_emotion.secondary.find(el => el.text === tertiary)

  const { secondary } = useLocalSearchParams();
  const prev_emotion = secondary ? emotions.find(el => el.text === secondary) : {};

  const VideoComponent = Platform.select({
    web: () => (
      <div style={custom_styles.iframeContainer}>
        <iframe
          src={emotion?.video}
          style={custom_styles.iframe}
          allowFullScreen
        />
      </div>
    ),
    default: () => (
      <WebView
        style={custom_styles.webView}
        source={{ uri: emotion?.video }}
      />
    ),
  });

  return (
    <PageWrapper>
      <Text style={styles.title}>Select a more specific emotion</Text>
      <View style={custom_styles.container}> 
        <View style={custom_styles.content}>
        <Emotions emotions={emotion?.tertiary || []} baseHref={`/EmotionalIntelligence/${prev_emotion.text}/${emotion.text}/`} />
        </View>
        <VideoComponent />
      </View>
    </PageWrapper>
  );

};

const custom_styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  content: {
    flex: 0.5,
    width: Platform.OS === 'web' ? '50%' : '100%',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  iframeContainer: {
    flex: 0.5,
    width: '50%',
    aspectRatio: 16 / 9,
    overflow: 'hidden',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 0,
  },
  webView: {
    flex: 0,
    width: width,
    height: width * (9 / 16),
    // marginTop: 20,
  },
});