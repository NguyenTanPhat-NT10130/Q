import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HighScoresScreen = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const scores = await AsyncStorage.getItem('highScores');
        if (scores) {
          setHighScores(JSON.parse(scores));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHighScores();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>High Scores</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        <FlatList
          data={highScores}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Text style={styles.rank}>{index + 1}</Text>
              <Text style={styles.name}>{item.name || 'Anonymous'}</Text>
              <Text style={styles.score}>{item.score}</Text>
              <Text style={styles.duration}>Completion Time: {item.duration.toFixed(2)}s</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
  },
  name: {
    fontSize: 18,
    color: '#333',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  duration: {
    fontSize: 16,
    color: '#ff5722',
    marginTop: 5,
  },
});

export default HighScoresScreen;
