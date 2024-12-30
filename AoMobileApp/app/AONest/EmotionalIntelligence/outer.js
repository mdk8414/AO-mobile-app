import { Text, Button, Platform } from "react-native";

import emotions from 'constants/emotions';
import Emotions from 'components/Emotions';
import PageWrapper from 'components/Wrappers/SubPage';

import styles from 'styles/page';

export default function EmotionalIntelligenceOuter() {
  return(
    <PageWrapper>
      <Text style={styles.title}>Select an emotion</Text>
      <Emotions emotions={emotions} baseHref="AONest/EmotionalIntelligence/" />
    </PageWrapper>
  );
};
