import React, {useState} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';

const FormOption = ({ question, options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View style={styles.questionContainer}>
    <Text style={styles.questionText}>{question}</Text>
      <View style={styles.optionsContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.radioButtonContainer}
          onPress={() => handleOptionSelect(option)}
        >
          <View
            style={[
              styles.radioButton,
              selectedOption === option && styles.radioButtonSelected,
            ]}
          />
          <Text style={styles.radioText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
    </View>
  );
};

const TrackEmotionsForm = () => {
  const [answers, setAnswers] = useState({
    question1: null,
    question2: null,
    question3: null,
  });

  const handleSelect = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormOption
        question="Energy / Sleep Level: "
        options={["I feel fully rested. (1)", "I feel a bit tired and may need a break or rest. (2)", "I feel fatigued and exhausted. (3)"]}
        onSelect={(option) => handleSelect("question1", option)}
      />
      <FormOption
        question="Hunger Level: "
        options={["I feel comfortably full. (1)", "I may be a bit hungry or too full. (2)", "I am very hungry or too full. (3)"]}
        onSelect={(option) => handleSelect("question2", option)}
      />
      <FormOption
        question="Hydration Level: "
        options={["I feel hydrated. (1)", "I am a bit thirsty. (2)", "I am dehydrated and parched. (3)"]}
        onSelect={(option) => handleSelect("question3", option)}
      />
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => console.log("Answers:", answers)}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.submitButtonContainer}>
        <Link style={styles.submitButton} href="../">
          <Text style={styles.submitButtonText}>Back</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default TrackEmotionsForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  optionsContainer: {
    marginTop: 10,
    // width: 500,
    // flexDirection: "row",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    // paddingHorizontal: 20,
    // flexWrap: "wrap"
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    backgroundColor: "#007BFF",
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
    flexShrink: 1
  },
  submitButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});