import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAuth} from '../contexts/AuthContext';
import {boatService, Boat, Experience} from '../services/boatService';
import {bookingService, CreateBookingRequest} from '../services/bookingService';

const todayISO = () => new Date().toISOString().slice(0, 10);

const BookingScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {boatId, experienceId} = route.params as {boatId: string; experienceId: string};
  const {isAuthenticated} = useAuth();
  const [boat, setBoat] = useState<Boat | null>(null);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [startTime, setStartTime] = useState('11:00');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Login' as never);
      return;
    }
    if (boatId) {
      loadBoat();
    }
  }, [boatId, isAuthenticated]);

  useEffect(() => {
    if (boat && experienceId) {
      const exp = boat.experiences?.find(e => e.id === experienceId);
      if (exp) {
        setExperience(exp);
      }
    }
  }, [boat, experienceId]);

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

  const handleSubmit = async () => {
    if (!boat || !experience || !selectedDate) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const bookingData: CreateBookingRequest = {
        boatId: boat.id,
        experienceId: experience.id,
        date: selectedDate,
        startTime,
        guests,
      };

      await bookingService.createBooking(bookingData);
      Alert.alert('Success', 'Booking created successfully!', [
        {text: 'OK', onPress: () => navigation.navigate('Profile' as never)},
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !boat || !experience) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const totalPrice = experience.price * guests;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.summaryTitle}>{boat.name}</Text>
        <Text style={styles.summaryText}>{experience.name}</Text>
        <Text style={styles.summaryText}>Duration: {experience.duration} hours</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            value={selectedDate}
            onChangeText={setSelectedDate}
            placeholder={todayISO()}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Start Time (HH:MM)</Text>
          <TextInput
            style={styles.input}
            value={startTime}
            onChangeText={setStartTime}
            placeholder="11:00"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Number of Guests</Text>
          <View style={styles.guestSelector}>
            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => setGuests(Math.max(1, guests - 1))}>
              <Text style={styles.guestButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.guestCount}>{guests}</Text>
            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => setGuests(Math.min(boat.capacity, guests + 1))}>
              <Text style={styles.guestButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.total}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>€{totalPrice}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, (!selectedDate || submitting) && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!selectedDate || submitting}>
          <Text style={styles.buttonText}>{submitting ? 'Processing...' : 'Confirm Booking'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  guestSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  guestButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  guestCount: {
    fontSize: 24,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'center',
  },
  total: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BookingScreen;

