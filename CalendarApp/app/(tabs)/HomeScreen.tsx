import { Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../store/eventsSlice';
import { RootState } from '../store/store'; // Import your RootState type

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(fetchEvents() as any); // Type assertion if necessary
  }, [dispatch]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.calendarContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <ThemedText type="subtitle">{error}</ThemedText> // Change 'body' to 'subtitle' or another type
        ) : (
          <Calendar
            onDayPress={(day: DateData) => {
              console.log('selected day', day);
            }}
            monthFormat={'yyyy / MM / d'}
            hideArrows={false}
          />
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  calendarContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  arrow: {
    width: 20,
    height: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
