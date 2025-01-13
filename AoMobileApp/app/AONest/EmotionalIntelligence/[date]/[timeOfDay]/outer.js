import { Text, Button, Platform } from "react-native";
import { useLocalSearchParams } from 'expo-router';

import emotions from 'constants/emotions';
import Emotions from 'components/Emotions';
import PageWrapper from 'components/Wrappers/SubPage';

import styles from 'styles/page';

export default function EmotionalIntelligenceOuter() {
  const { date, timeOfDay } = useLocalSearchParams();

  return(
    <PageWrapper>
      <Text style={styles.title}>Select an emotion</Text>
      <Emotions emotions={emotions} baseHref={`AONest/EmotionalIntelligence/${date}/${timeOfDay}/`} />
    </PageWrapper>
  );
};
