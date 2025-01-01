import { Dimensions, StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { Button } from 'react-native-elements';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import colors from "constants/colors";

const { width } = Dimensions.get('window');

export default function Page() {

    const router = useRouter();

    const isFocused = useIsFocused();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selected_date, setSelectedDate] = useState(new Date());
    const [tracked, setTracked] = useState([false, false, false])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const dateString = selected_date.toLocaleDateString("en-US", {weekday: "long", day: "numeric", month: "long", year: "numeric"});

    const epoch = selected_date.getTime();

    const isTracked = async (time, tod) => {
      try {
        const score = await AsyncStorage.getItem(`mitigating-factors/${time}/${tod}/score`);
        return (score && score > 0) ? true : false;
      } catch (err) {
        console.log("Error retrieving data: ", err);
        return false;
      }
    }

    const updateTracked = async (time) => {
      const morning = await isTracked(time, 'Morning')
      const afternoon = await isTracked(time, 'Afternoon')
      const evening = await isTracked(time, 'Evening')
      setTracked([morning, afternoon, evening])
    }

    const handleConfirm = (date) => {
      setSelectedDate(date)
      updateTracked(date.getTime());
      hideDatePicker();
    };

    useEffect(() => {
      updateTracked(selected_date.getTime());
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
                  title="Morning"
                  titleStyle={styles.linkText}
                  buttonStyle={tracked[0] ? styles.linkAlt : styles.link}
              />
              <Button 
                  onPress={ () => { router.push(`AONest/TrackEmotions/${epoch}/Afternoon/track-emotions-form`); } } 
                  title="Afternoon"
                  titleStyle={styles.linkText}
                  buttonStyle={tracked[1] ? styles.linkAlt : styles.link}
              />
              <Button 
                  onPress={ () => { router.push(`AONest/TrackEmotions/${epoch}/Evening/track-emotions-form`); } } 
                  title="Evening"
                  titleStyle={styles.linkText}
                  buttonStyle={tracked[2] ? styles.linkAlt : styles.link}
              />

              {/* <Text>Total Score = { totalScore }</Text> */}
              
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
    paddingVertical: 15,
    width: 300,
    // borderWidth: 2,
    borderColor: colors.primaryButton,
    borderRadius: 10,
    backgroundColor: colors.secondaryButton,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  linkAlt: {
    marginTop: 40,
    paddingVertical: 15,
    width: 300,
    // borderWidth: 2,
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