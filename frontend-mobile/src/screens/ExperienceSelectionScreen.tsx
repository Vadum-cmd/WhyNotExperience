import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {boatService, Boat, Experience} from '../services/boatService';

const ExperienceSelectionScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {boatId} = route.params as {boatId: string};
  const [boat, setBoat] = useState<Boat | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBoat();
  }, [boatId]);

  const loadBoat = async () => {
    try {
      const data = await boatService.getBoatById(boatId);
      setBoat(data);
    } catch (error) {
      console.error('Failed to load boat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (selectedExperience && boatId) {
      navigation.navigate('Booking' as never, {boatId, experienceId: selectedExperience.id} as never);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (!boat || !boat.experiences || boat.experiences.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No experiences available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose experience</Text>
        {boat.experiences.map((experience) => (
          <TouchableOpacity
            key={experience.id}
            style={[styles.card, selectedExperience?.id === experience.id && styles.cardSelected]}
            onPress={() => setSelectedExperience(experience)}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{experience.name}</Text>
              <Text style={styles.duration}>Duration: {experience.duration} hour{experience.duration !== 1 ? 's' : ''}</Text>
              {experience.description.map((item, index) => (
                <Text key={index} style={styles.descriptionItem}>• {item}</Text>
              ))}
              <Text style={styles.price}>€{experience.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {selectedExperience && (
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue with {selectedExperience.name}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  card: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardSelected: {
    borderColor: '#000000',
    backgroundColor: '#f9f9f9',
  },
  cardContent: {
    gap: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  duration: {
    fontSize: 14,
    color: '#666666',
  },
  descriptionItem: {
    fontSize: 14,
    color: '#333333',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ExperienceSelectionScreen;

