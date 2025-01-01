import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from 'constants/colors';

const FormOption = ({ question, options, selectedOption, onSelect }) => {

  return (
    <View style={styles.questionContainer}>
    <Text style={styles.questionText}>{question}</Text>
      <View style={styles.optionsContainer}>
      {Object.entries(options).map(([key, value]) => (
        <TouchableOpacity
          key={value}
          style={styles.radioButtonContainer}
          onPress={() => onSelect([key, value])}
        >
          <View
            style={[
              styles.radioButton,
              selectedOption === value && styles.radioButtonSelected,
            ]}
          />
          <Text style={styles.radioText}>{value}</Text>
        </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const TrackEmotionsForm = () => {
  
  const router = useRouter();

  const questions = [
    {
      id: 1,
      question: "Energy / Sleep Level",
      options: {
        1: "I feel fully rested. (1)", 
        2: "I feel a bit tired and may need a break or rest. (2)", 
        3: "I feel fatigued and exhausted. (3)"
      },
    },
    {
      id: 2,
      question: "Hunger Level",
      options: {
       1: "I feel comfortably full. (1)", 
       2: "I may be a bit hungry or too full. (2)", 
       3: "I am very hungry or too full. (3)"
      },
    },
    {
      id: 3,
      question: "Hydration Level",
      options: {
       1: "I feel hydrated. (1)", 
       2: "I am a bit thirsty. (2)", 
       3: "I am dehydrated and parched. (3)"
      },
    },
    {
      id: 4,
      question: "Isolation Level",
      options: {
       1: "I feel no sense of loneliness. (1)", 
       2: "I feel somewhat lonely. (2)", 
       3: "I feel completely alone. (3)"
      },
    },
    {
      id: 5,
      question: "Emotional Level",
      options: {
       1: "Fully regulated with no intrusive thoughts or triggers. (1)", 
       2: "A few intrusive thoughts and at risk for triggers. (2)", 
       3: "Overtaken with intrusive thoughts and triggers. (3)"
      },
    },
  ]

  const [answers, setAnswers] = useState({
    1: [0, null],
    2: [0, null],
    3: [0, null],
    4: [0, null],
    5: [0, null],
  });

  const handleSelect = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const { date, timeOfDay } = useLocalSearchParams();

  const saveForm = () => {
    try {
      AsyncStorage.setItem(`mitigating-factors/${date}/${timeOfDay}`, JSON.stringify(answers));
      AsyncStorage.setItem(`mitigating-factors/${date}/${timeOfDay}/score`, calculateScore().toString());
      console.log('Form saved successfully.');
      console.log(`Score saved to mitigating-factors/${date}/${timeOfDay}/score`)
    } catch (error) {
      console.error('Error saving form:', error);
    }
  }

  const loadForm = async () => {
    try {
      const savedAnswers = await AsyncStorage.getItem(`mitigating-factors/${date}/${timeOfDay}`);
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
        console.log(`Loading saved answers from ${timeOfDay} of ${dateString}`);
      } 
    } catch (error) {
      console.error('Error loading form:', error)
    }
  }

  useEffect(() => {
    loadForm();
  }, []);

  const calculateScore = () => {
    let totalScore = 0;
  
    Object.values(answers).forEach((value) => {
      if (value && Array.isArray(value) && value[0] !== null) {
        totalScore += Number(value[0]);
      }
    });
  
    return totalScore;
  };

  const dateString = new Date(Number(date)).toLocaleDateString("en-US", {weekday: "long", day: "numeric", month: "long", year: "numeric"});

  return (
      
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleText}>{timeOfDay} of {dateString}</Text>

      { 
        questions.map( (question) => (
          <FormOption
            key={question.id}
            question={question.question}
            options={question.options}
            selectedOption={answers[question.id][1]}
            onSelect={(option) => handleSelect(question.id, option)}
          />
        )) 
      }

      <Text>Total Score: {calculateScore()}</Text>

      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => { saveForm(); router.back(); }}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={ () => { router.back() } }>
          <Text style={styles.submitButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TrackEmotionsForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: "#0",
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
    color: colors.primaryButton,
  },
  optionsContainer: {
    marginTop: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    // borderColor: "#007BFF",
    borderColor: colors.primaryButton,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    backgroundColor: colors.secondaryButton,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
    flexShrink: 1
  },
  submitButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: colors.primaryButton,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  titleText: {
    marginRight: 10,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.title2,
  },
});