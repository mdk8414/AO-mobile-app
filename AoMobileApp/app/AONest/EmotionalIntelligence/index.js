import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

export default function Page() {
  const router = useRouter();

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
              onPress={ () => { router.push(`AONest/EmotionalIntelligence/outer`) } } 
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
    borderRadius: 10,
    // borderWidth: 1,
    borderColor: '#f'
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});