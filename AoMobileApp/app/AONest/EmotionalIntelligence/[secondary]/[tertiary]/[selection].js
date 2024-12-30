import { Dimensions, Text, StyleSheet, Platform, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { Button } from 'react-native-elements';

import emotions from "constants/emotions";
import styles from 'styles/page';
import PageWrapper from 'components/Wrappers/SubPage';

const { width } = Dimensions.get('window');


export default function EmotionalIntelligenceSelection() {
  const { selection } = useLocalSearchParams();
  
  const findTertiaryEmotion = () => {
    for (let primaryEmotion of emotions) {
      for (let secondaryEmotion of primaryEmotion.secondary) {
        const tertiaryEmotion = secondaryEmotion.tertiary.find(tertiary => tertiary.text === selection);
        if (tertiaryEmotion) {
          return tertiaryEmotion;
        }
      }
    }
    return null; // Return null if not found
  };

  const emotion = findTertiaryEmotion()

  const router = useRouter();

  return(
    <PageWrapper> 
      <View style={{ flex: 0.75, alignItems: 'center' }}>
        <Text style={styles.title}>You are feeling {selection.toUpperCase()}.</Text>
        <Button 
            onPress={ () => { router.push('AONest/content') } } 
            title="View content"
            titleStyle={styles.linkText}
            buttonStyle={styles.link}
        />
        <Button 
            onPress={ () => { router.dismiss(4); router.push('AONest/EmotionalIntelligence') } } 
            title="Start over"
            titleStyle={styles.title}
            buttonStyle={{ backgroundColor: "#f"}}
        />
        {Platform.OS === 'web' ? (
          <div style={{ ...styles.iframeContainer, paddingTop: 20 }}>
            <iframe
              src={emotion?.video}
              style={{
                  width: width / 2,
                  height: width * 0.5625 / 2,
                  border: "0px",
              }}
              allowFullScreen
            />
          </div>
        ) : (
            <WebView
              style={{
                top: '10%',
                flex: 0.8,
                width: width,
                height: width * 9/16,
                border: "0px",
              }}
              source={{ uri: emotion?.video }}
            />
            )}
          </View>
      
    </PageWrapper>
  );
}
