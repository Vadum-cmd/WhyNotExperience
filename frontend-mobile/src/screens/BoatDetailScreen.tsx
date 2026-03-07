import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {boatService, Boat} from '../services/boatService';

const BoatDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {boatId} = route.params as {boatId: string};
  const [boat, setBoat] = useState<Boat | null>(null);
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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (!boat) {
    return (
      <View style={styles.center}>
        <Text>Boat not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {(boat.images || []).length > 0 && (
        <Image source={{uri: boat.images![0]}} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{boat.name}</Text>
        <View style={styles.specs}>
          <Text>📍 {boat.location}</Text>
          <Text>👥 {boat.capacity} people</Text>
          <Text>🏠 {boat.cabins} cabin{boat.cabins !== 1 ? 's' : ''}</Text>
          <Text>📏 {boat.length} m</Text>
        </View>
        <View style={styles.priceRating}>
          <Text style={styles.price}>From €{boat.price}</Text>
          <Text style={styles.rating}>⭐ {boat.rating} • {boat.reviewCount} reviews</Text>
        </View>
        {boat.host && (
          <View style={styles.host}>
            <View style={styles.hostAvatar}>
              <Text style={styles.hostInitial}>{boat.host.name[0]}</Text>
            </View>
            <View>
              <Text>Hosted by: <Text style={styles.hostName}>{boat.host.name}</Text></Text>
              <Text style={styles.hostResponse}>Responds in less than an hour</Text>
            </View>
          </View>
        )}
        {boat.experiences && boat.experiences.length > 0 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ExperienceSelection' as never, {boatId: boat.id} as never)}>
            <Text style={styles.buttonText}>Choose experience</Text>
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
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  specs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
    fontSize: 14,
    color: '#666666',
  },
  priceRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
  },
  rating: {
    fontSize: 14,
    color: '#666666',
  },
  host: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  hostAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostInitial: {
    fontSize: 24,
    fontWeight: '600',
  },
  hostName: {
    fontWeight: '600',
  },
  hostResponse: {
    fontSize: 12,
    color: '#666666',
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BoatDetailScreen;

