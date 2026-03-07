import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {boatService, Boat} from '../services/boatService';
import BoatCard from '../components/BoatCard';

const BoatListScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [boats, setBoats] = useState<Boat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBoats();
  }, []);

  const loadBoats = async () => {
    try {
      const data = await boatService.getBoats();
      setBoats(data);
    } catch (error) {
      console.error('Failed to load boats:', error);
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

  return (
    <View style={styles.container}>
      <FlatList
        data={boats}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <BoatCard
            boat={item}
            onPress={() => navigation.navigate('BoatDetail' as never, {boatId: item.id} as never)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  list: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BoatListScreen;

