import { Text, Dimensions, StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { Button } from 'react-native-elements';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import colors from "constants/colors";
import emotions from "constants/emotions";

const { width } = Dimensions.get('window');

export default function Page() {

    const router = useRouter();

    const isFocused = useIsFocused();

    const { date, timeOfDay } = useLocalSearchParams();

    console.log(date)

    const today = date ? new Date(parseInt(date)) : new Date();

    console.log(today)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selected_date, setSelectedDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    const [scores, setScores] = useState([0, 0, 0])
    const [currentEmotions, setCurrentEmotions] = useState([null, null, null])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const findTertiaryEmotion = (selection) => {
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

    const dateString = selected_date.toLocaleDateString("en-US", {weekday: "long", day: "numeric", month: "long", year: "numeric"});

    const epoch = selected_date.getTime();

    const updateScores = async (time) => {
      try {
        const morning = await AsyncStorage.getItem(`mitigating-factors/${time}/Morning/score`);
        const afternoon = await AsyncStorage.getItem(`mitigating-factors/${time}/Afternoon/score`);
        const evening = await AsyncStorage.getItem(`mitigating-factors/${time}/Evening/score`);
        setScores([parseInt(morning) || 0, parseInt(afternoon) || 0, parseInt(evening) || 0])
      } catch (err) {
        console.log("Error retrieving data: ", err);
        return 0;
      }
    }

    const getCurrentEmotions = async (time) => {
      try {
        let morningEmotion = null, afternoonEmotion = null, eveningEmotion = null;
        
        const morningText = await AsyncStorage.getItem(`emotion/${time}/Morning`);
        if (morningText) morningEmotion = String.fromCodePoint(findTertiaryEmotion(morningText)?.emoji);
       
        const afternoonText = await AsyncStorage.getItem(`emotion/${time}/Afternoon`);
        if (afternoonText) afternoonEmotion = String.fromCodePoint(findTertiaryEmotion(afternoonText)?.emoji);
       
        const eveningText = await AsyncStorage.getItem(`emotion/${time}/Evening`);
        if (eveningText) eveningEmotion = String.fromCodePoint(findTertiaryEmotion(eveningText)?.emoji);
       
        setCurrentEmotions([morningEmotion || "", afternoonEmotion || "", eveningEmotion || ""])
      } catch (err) {
        console.log("Error retrieving data: ", err);
        return 0;
      }
    }

    const handleConfirm = (date) => {
      setSelectedDate(date)
      updateScores(date.getTime());
      getCurrentEmotions(date.getTime());
      hideDatePicker();
    };

    useEffect(() => {
      updateScores(selected_date.getTime());
      getCurrentEmotions(selected_date.getTime());
    }, [isFocused]);

    return (
      <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.main}>
              <View>
                  <Button 
                      onPress={showDatePicker} 
                      title={dateString}
                      titleStyle={{
                          color: colors.primaryButton,
                          fontSize: 24, 
                          fontWeight: 'bold',  
                      }}
                      buttonStyle={{
                          backgroundColor: colors.secondaryButton,
                          borderRadius: 4,
                          borderWidth: 5,
                          borderColor: colors.primaryButton,
                          paddingHorizontal: 20,
                          paddingVertical: 20,
                          width: '100%',
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
                  onPress={ () => { router.push(`AONest/TrackEmotions/${epoch}/Morning/track-emotions-form`); } } 
                  title={`Morning ${currentEmotions[0]}`}
                  titleStyle={styles.linkText}
                  buttonStyle={(scores[0] > 0) ? styles.linkAlt : styles.link}
              />
              <Button 
                  onPress={ () => { router.push(`AONest/TrackEmotions/${epoch}/Afternoon/track-emotions-form`); } } 
                  title={`Afternoon ${currentEmotions[1]}`}
                  titleStyle={styles.linkText}
                  buttonStyle={(scores[1] > 0) ? styles.linkAlt : styles.link}
              />
              <Button 
                  onPress={ () => { router.push(`AONest/TrackEmotions/${epoch}/Evening/track-emotions-form`); } } 
                  title={`Evening ${currentEmotions[2]}`}
                  titleStyle={styles.linkText}
                  buttonStyle={(scores[2] > 0) ? styles.linkAlt : styles.link}
              />
              <Text style={{ color: colors.title2, fontSize: 24, fontWeight: 'bold', marginTop: 50 }}>Total Score: { scores[0] + scores[1] + scores[2] }</Text>
              
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
    paddingHorizontal: 10,
    paddingVertical: 20,
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
    paddingVertical: 30,
    width: 300,
    borderColor: colors.primaryButton,
    borderRadius: 10,
    backgroundColor: colors.secondaryButton,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  linkAlt: {
    marginTop: 40,
    paddingVertical: 30,
    width: 300,
    borderColor: colors.secondaryButton,
    borderRadius: 10,
    backgroundColor: "#ddd",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  linkText: {
    color: colors.title2,
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 64,
  },
});

    // const [totalScore, setTotalScore] = useState(0);

    // const getScore = async (tod) => {
    //   try {
    //     const score = await AsyncStorage.getItem(`mitigating-factors/${epoch}/${tod}/score`);
    //     if (score) {
    //       console.log('Score loaded successfully:', score);
    //       return parseInt(score, 10);
    //     } else {
    //       console.warn(`Unable to find score located at mitigating-factors/${epoch}/${tod}/score.`);
    //       return 0;
    //     }
    //   } catch (error) {
    //     console.error('Error getting score:', error)
    //     return 0;
    //   }
    // }

    // const calculateTotalScore = async () => {
    //   const morningScore = await getScore("Morning");
    //   const afternoonScore = await getScore("Afternoon");
    //   const eveningScore = await getScore("Evening");

    //   return morningScore + afternoonScore + eveningScore;
    // };

    // useEffect( () => { 
    //   const updateScore = async () => {
    //     const total = await calculateTotalScore();
    //     setTotalScore(total);
    //   };
    
    //   updateScore();
    // }, [epoch])