import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ResultScreen = ({ route }) => {
  const navigation = useNavigation();
  const { score, highScores = [], answers = [] } = route.params;

  const renderItem = ({ item, index }) => (
    <View style={styles.highScoreItem}>
      <Text style={styles.rank}>{index + 1}. </Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  const renderAnswerItem = ({ item, index }) => (
    <View style={styles.answerItem}>
      <Text style={styles.questionText}>{index + 1}. {item.question}</Text>
      <Text style={item.answer === item.correctAnswer ? styles.correctAnswer : styles.incorrectAnswer}>
        Your Answer: {item.answer}
      </Text>
      <Text style={styles.correctAnswer}>Correct Answer: {item.correctAnswer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.score}>Your Score: {score}</Text>
      <Text style={styles.subtitle}>High Scores</Text>
      {highScores.length > 0 ? (
        <FlatList
          data={highScores}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      ) : (
        <Text style={styles.noScores}>No high scores yet!</Text>
      )}
      <Text style={styles.subtitle}>Your Answers</Text>
      {answers.length > 0 ? (
        <FlatList
          data={answers}
          renderItem={renderAnswerItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
      ) : (
        <Text style={styles.noAnswers}>No answers to show!</Text>
      )}
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  score: {
    fontSize: 22,
    marginBottom: 20,
    color: '#555',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  list: {
    width: '100%',
  },
  highScoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rank: {
    fontSize: 18,
    color: '#555',
  },
  name: {
    fontSize: 18,
    color: '#555',
    flex: 1,
    textAlign: 'left',
  },
  noScores: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginVertical: 20,
  },
  answerItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  correctAnswer: {
    fontSize: 16,
    color: '#28a745',
  },
  incorrectAnswer: {
    fontSize: 16,
    color: '#ff5722',
  },
  noAnswers: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default ResultScreen;
