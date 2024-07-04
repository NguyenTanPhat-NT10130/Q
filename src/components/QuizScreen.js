// src/components/QuizScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import questions from '../data/questions.json';

const getRandomQuestions = (questions, num) => {
  let shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const QuizScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [name, setName] = useState('');
  const [timeLeft, setTimeLeft] = useState(5);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showSavePrompt, setShowSavePrompt] = useState(false); // Trạng thái để hiện hộp thoại lưu

  useEffect(() => {
    const questionsToUse = getRandomQuestions(questions, 10);
    setQuizQuestions(questionsToUse);
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isQuizFinished) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isQuizFinished) {
      handleAnswer(null);
    }
  }, [timeLeft, isQuizFinished]);

  const handleAnswer = (answer) => {
    const correctAnswer = quizQuestions[currentQuestionIndex]?.answer;
    const userAnswer = answer || selectedAnswer;

    setAnswers([
      ...answers,
      {
        question: quizQuestions[currentQuestionIndex]?.question,
        answer: userAnswer,
        correctAnswer: correctAnswer,
      }
    ]);

    if (userAnswer === correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex === 9) {
      setIsQuizFinished(true);
      setShowSavePrompt(true); // Hiện hộp thoại lưu
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(5);
      setSelectedAnswer('');
    }
  };

  const handleSaveScore = async () => {
    if (name.trim() !== '') {
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;

      const highScores = await AsyncStorage.getItem('highScores');
      const scores = highScores ? JSON.parse(highScores) : [];
      scores.push({ name, score, duration });
      scores.sort((a, b) => {
        if (b.score === a.score) {
          return a.duration - b.duration;
        }
        return b.score - a.score;
      });
      if (scores.length > 5) scores.pop();
      await AsyncStorage.setItem('highScores', JSON.stringify(scores));
      navigation.navigate('Result', { score, highScores: scores, answers });
    } else {
      Alert.alert("Please enter your name.");
    }
  };

  const handleDiscardScore = () => {
    navigation.navigate('Result', { score, highScores: [], answers });
  };

  if (quizQuestions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (isQuizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>Your Score: {score}</Text>
        {showSavePrompt ? (
          <View>
            <TextInput
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <Button title="Save Score" onPress={handleSaveScore} />
            <Button title="Discard Score" onPress={handleDiscardScore} />
          </View>
        ) : (
          <Text>Quiz Completed! Check your results.</Text>
        )}
      </View>
    );
  }

  const question = quizQuestions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      {question.options.map((option, index) => (
        <View key={index} style={styles.buttonContainer}>
          <Button
            title={option}
            onPress={() => handleAnswer(option)}
            disabled={selectedAnswer !== ''}
          />
        </View>
      ))}
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  timer: {
    marginTop: 20,
    fontSize: 16,
    color: '#ff5722',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
  },
  input: {
    height: 40,
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
});

export default QuizScreen;
