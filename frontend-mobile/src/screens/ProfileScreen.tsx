import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../contexts/AuthContext';
import {bookingService, Booking} from '../services/bookingService';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const {user, logout} = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    try {
      const data = await bookingService.getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Please login</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.role}>Role: {user.role}</Text>
        </View>

        {user.role === 'host' && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Host Dashboard</Text>
          </TouchableOpacity>
        )}

        <View style={styles.bookingsSection}>
          <Text style={styles.sectionTitle}>My Bookings</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#000000" />
          ) : bookings.length === 0 ? (
            <Text style={styles.noBookings}>No bookings yet</Text>
          ) : (
            bookings.map((booking) => (
              <View key={booking.id} style={styles.bookingCard}>
                <Text style={styles.bookingTitle}>{booking.boatName}</Text>
                <Text>{booking.experienceName}</Text>
                <Text>Date: {new Date(booking.date).toLocaleDateString()}</Text>
                <Text>Time: {booking.startTime} - {booking.endTime}</Text>
                <Text>Guests: {booking.guests}</Text>
                <Text>Total: €{booking.totalPrice}</Text>
                <Text style={[styles.status, styles[`status${booking.status}`]]}>
                  {booking.status}
                </Text>
              </View>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
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
  profileInfo: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  email: {
    color: '#666666',
    marginBottom: 4,
  },
  role: {
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  bookingsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  noBookings: {
    textAlign: 'center',
    color: '#666666',
    padding: 40,
  },
  bookingCard: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  status: {
    display: 'inline-block',
    padding: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 8,
  },
  statuspending: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  statusconfirmed: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statuscompleted: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460',
  },
  statuscancelled: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  logoutButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#000000',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});

export default ProfileScreen;

