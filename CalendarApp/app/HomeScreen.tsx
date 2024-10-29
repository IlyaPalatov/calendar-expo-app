import React, { useEffect, useState, Suspense } from 'react';
import { Image, StyleSheet, View, Button } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useAppDispatch } from './store/store';
import { fetchTodos } from './store/eventsSlice';

const HelloWave = React.lazy(() => import('@/components/HelloWave'));
const ParallaxScrollView = React.lazy(() => import('@/components/ParallaxScrollView'));
const ThemedText = React.lazy(() => import('@/components/ThemedText'));
const ThemedView = React.lazy(() => import('@/components/ThemedView'));
const TodoList = React.lazy(() => import('@/app/store/todoList'));

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<'all' | 'completed' | 'inProcess'>('all');
  useEffect(() => {
    dispatch(fetchTodos(currentPage));
  }, [currentPage, dispatch]);

  const onMonthChange = (month: DateData) => {
    const newPage = month.month;
    setCurrentPage(newPage);
  };

  return (
    <Suspense fallback={<View><ThemedText type="subtitle" style={styles.loadingTxt}>Loading...</ThemedText></View>}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.calendarContainer}>
          <Calendar
            onMonthChange={onMonthChange}
            monthFormat={'yyyy / MM'}
          />
        </ThemedView>
        <ThemedText type="title" style={styles.titleTask}>Your Tasks</ThemedText>
        <View style={styles.filterContainer}>
          <Button title="All" onPress={() => setFilter('all')} />
          <Button title="Completed" onPress={() => setFilter('completed')} />
          <Button title="In Process" onPress={() => setFilter('inProcess')} />
        </View>
        <TodoList filter={filter} /> 
      </ParallaxScrollView>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  calendarContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  titleTask:{
    textAlign:'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    gap: 5,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  loadingTxt: {
    textAlign:'center',
  },
});

export default HomeScreen;
