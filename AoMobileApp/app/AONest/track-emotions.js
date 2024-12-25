import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Button } from 'react-native-elements';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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


    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.main}>
                <Text style={styles.title}>Track Emotions</Text>
                <View>
                    <Button 
                        // color="#FFFFFF" 
                        onPress={showDatePicker} 
                        title={selected_date.toLocaleDateString("en-US", {weekday: "long", day: "numeric", month: "long", year: "numeric"})}
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
                        
                    />
                </View>
               
                <Button 
                    onPress={ () => { router.push('TrackEmotions/track-emotions-form') } } 
                    title="Morning"
                    titleStyle={styles.linkText}
                    buttonStyle={styles.link}
                />
                <Button 
                    onPress={ () => { router.push('TrackEmotions/track-emotions-form') } } 
                    title="Afternoon"
                    titleStyle={styles.linkText}
                    buttonStyle={styles.link}
                />
                <Button 
                    onPress={ () => { router.push('TrackEmotions/track-emotions-form') } } 
                    title="Evening"
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
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: 150,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 64,
  },
});