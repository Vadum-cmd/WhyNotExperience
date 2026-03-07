import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Boat} from '../services/boatService';

interface BoatCardProps {
  boat: Boat;
  onPress: () => void;
}

const BoatCard: React.FC<BoatCardProps> = ({boat, onPress}) => {
  const images = boat.images || [];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {images.length > 0 && (
        <Image source={{uri: images[0]}} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{boat.name}</Text>
        <View style={styles.specs}>
          <Text style={styles.spec}>📍 {boat.location}</Text>
          <Text style={styles.spec}>👥 {boat.capacity} people</Text>
          <Text style={styles.spec}>🏠 {boat.cabins} cabin{boat.cabins !== 1 ? 's' : ''}</Text>
          <Text style={styles.spec}>📏 {boat.length} m</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>From €{boat.price}</Text>
          <Text style={styles.rating}>⭐ {boat.rating} • {boat.reviewCount} reviews</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000000',
  },
  specs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  spec: {
    fontSize: 14,
    color: '#666666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  rating: {
    fontSize: 14,
    color: '#666666',
  },
});

export default BoatCard;

