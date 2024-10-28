import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Link } from 'expo-router';
import React from 'react';

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.main}>
          <Text style={styles.title}>Emotional Intelligence</Text>
          <Text style={styles.subtitle}>
            Emotional intelligence refers to the ability to recognize, understand, and manage one's own emotions. 
            You can use this skill to foster better communication, empathy, and relationships, helping 
            to improve your life and the lives of those around you.
          </Text>
          <Link style={styles.link} href="/EmotionWheel">
            <Text style={styles.linkText}>Get started →</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#66847b',
    borderRadius: 5,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});