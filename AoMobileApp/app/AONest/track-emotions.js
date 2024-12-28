import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Button } from 'react-native-elements';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function Page() {

    const router = useRouter();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selected_date, setSelectedDate] = useState(new Date());

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date)
        hideDatePicker();
    };

    const epoch = selected_date.getTime();

    const dateString = selected_date.toLocaleDateString("en-US", {weekday: "long", day: "numeric", month: "long", year: "numeric"})

    const [totalScore, setTotalScore] = useState(0);

    const getScore = async (tod) => {
      try {
        const score = await AsyncStorage.getItem(`mitigating-factors/${epoch}/${tod}/score`);
        if (score) {
          console.log('Score loaded successfully:', score);
          return parseInt(score, 10);
        } else {
          console.warn(`Unable to find score located at mitigating-factors/${epoch}/${tod}/score.`);
          return 0;
        }
      } catch (error) {
        console.error('Error getting score:', error)
        return 0;
      }
    }

    const calculateTotalScore = async () => {
      const morningScore = await getScore("Morning");
      const afternoonScore = await getScore("Afternoon");
      const eveningScore = await getScore("Evening");

      return morningScore + afternoonScore + eveningScore;
    };

    useEffect( () => { 
      const updateScore = async () => {
        const total = await calculateTotalScore();
        setTotalScore(total);
      };
    
      updateScore();
    }, [epoch])

    return (
      <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.main}>
              {/* <Text style={styles.title}>Track Emotions</Text> */}
              <View>
                  <Button 
                      onPress={showDatePicker} 
                      title={dateString}
                      titleStyle={{
                          color: "black",
                          fontSize: 24,   
                      }}
                      buttonStyle={{
                          backgroundColor: "#cccccc",
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: '#f',
                          borderRadius: 5,
                          paddingHorizontal: 20
                      }}
                  />
                  <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      date={selected_date}
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker} 
                      maximumDate={new Date()}  
                  />
              </View>
              
              <Button 
                  onPress={ () => { router.push(`TrackEmotions/${epoch}/Morning/track-emotions-form`) } } 
                  title="Morning"
                  titleStyle={styles.linkText}
                  buttonStyle={styles.link}
              />
              <Button 
                  onPress={ () => { router.push(`TrackEmotions/${epoch}/Afternoon/track-emotions-form`) } } 
                  title="Afternoon"
                  titleStyle={styles.linkText}
                  buttonStyle={styles.link}
              />
              <Button 
                  onPress={ () => { router.push(`TrackEmotions/${epoch}/Evening/track-emotions-form`) } } 
                  title="Evening"
                  titleStyle={styles.linkText}
                  buttonStyle={styles.link}
              />

              <Text>Total Score = { totalScore }</Text>
              
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
    justifyContent: 'top',
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
    textAlign: 'top',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  link: {
    marginTop: 40,
    paddingVertical: 15,
    width: 300,
    borderWidth: 1,
    borderColor: '#f',
    borderRadius: 10,
    backgroundColor: '#66847b',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  linkText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 64,
  },
});