import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

import colors from 'constants/colors'

export default function Page() {
  const router = useRouter();

  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.main}>
          <Text style={styles.title}>Emotional Intelligence</Text>
          <View style={{flex: 1, width: width/1.25}}>
            <Text style={styles.subtitle}>
              Emotional intelligence refers to the ability to recognize, understand, and manage one's own emotions. 
              You can use this skill to foster better communication, empathy, and relationships, helping 
              to improve your life and the lives of those around you.
            </Text>
          </View>
          <Button 
              onPress={ () => { router.push(`AONest/EmotionalIntelligence/${today.getTime()}/Morning/outer`) } } 
              title="Get started →"
              titleStyle={styles.linkText}
              buttonStyle={styles.link}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.title,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    color: colors.title2
  },
  link: {
    padding: 16,
    backgroundColor: colors.primaryButton,
    borderRadius: 10,
    // borderWidth: 1,
    borderColor: '#f'
  },
  linkText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',
  },
});