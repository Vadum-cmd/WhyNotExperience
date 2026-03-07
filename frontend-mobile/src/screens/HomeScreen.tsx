import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [dateMode, setDateMode] = useState<'days' | 'months' | 'flexible'>('days');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>BOAT</Text>
        <Text style={styles.subtitle}>BOOK YOUR RIDE!</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>When?</Text>

          <View style={styles.dateOptions}>
            <TouchableOpacity
              style={styles.dateCard}
              onPress={() => navigation.navigate('BoatList' as never, {date: 'today'} as never)}>
              <Text style={styles.dateCardTitle}>Today</Text>
              <Text style={styles.dateCardDate}>
                {today.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateCard}
              onPress={() => navigation.navigate('BoatList' as never, {date: 'tomorrow'} as never)}>
              <Text style={styles.dateCardTitle}>Tomorrow</Text>
              <Text style={styles.dateCardDate}>
                {tomorrow.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateCard}
              onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateCardTitle}>Choose dates</Text>
              <Text style={styles.dateCardArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.segmentControl}>
            <TouchableOpacity
              style={[styles.segmentOption, dateMode === 'days' && styles.segmentOptionActive]}
              onPress={() => setDateMode('days')}>
              <Text style={[styles.segmentText, dateMode === 'days' && styles.segmentTextActive]}>Days</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.segmentOption, dateMode === 'months' && styles.segmentOptionActive]}
              onPress={() => setDateMode('months')}>
              <Text style={[styles.segmentText, dateMode === 'months' && styles.segmentTextActive]}>Months</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.segmentOption, dateMode === 'flexible' && styles.segmentOptionActive]}
              onPress={() => setDateMode('flexible')}>
              <Text style={[styles.segmentText, dateMode === 'flexible' && styles.segmentTextActive]}>Flexible</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setSelectedDates([])}>
              <Text style={styles.secondaryButtonText}>Clear all</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('BoatList' as never)}>
              <Text style={styles.primaryButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <DatePicker
        modal
        open={showDatePicker}
        date={new Date()}
        onConfirm={(date) => {
          setSelectedDates([date]);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
    color: '#000000',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    color: '#000000',
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000000',
  },
  dateOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  dateCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  dateCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  dateCardDate: {
    fontSize: 14,
    color: '#666666',
  },
  dateCardArrow: {
    fontSize: 24,
    color: '#000000',
    alignSelf: 'flex-end',
  },
  segmentControl: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  segmentOption: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  segmentOptionActive: {
    backgroundColor: '#ffffff',
  },
  segmentText: {
    fontWeight: '500',
    color: '#000000',
  },
  segmentTextActive: {
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 20,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;

