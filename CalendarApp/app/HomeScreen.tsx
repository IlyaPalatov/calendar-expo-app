import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Button } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useAppDispatch, useAppSelector } from './store/store';
import { fetchTodos } from './store/eventsSlice';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RootState } from './store/store';

interface Event {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.events.todos);
  const loading = useAppSelector((state: RootState) => state.events.loading);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<'all' | 'completed' | 'inProcess'>('all');

  const fetchEventList = () => {
    dispatch(fetchTodos(currentPage));
  };

  useEffect(() => {
    fetchEventList();
  }, [currentPage]);

  const onMonthChange = (month: DateData) => {
    const newPage = month.month;
    setCurrentPage(newPage);
  };
    const filteredTodos = todos.filter((todo: Event) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'inProcess') return !todo.completed;
    return true; // 'all'
  });

  return (
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
          onDayPress={(day: DateData) => {
            console.log('selected day', day);
          }}
        />
      </ThemedView>
      <ThemedText type='title' style={styles.titleTask}>Your Tasks</ThemedText>
      <View style={styles.filterContainer}>
        <Button  title="All" onPress={() => setFilter('all')} />
        <Button  title="Completed" onPress={() => setFilter('completed')} />
        <Button  title="In Process" onPress={() => setFilter('inProcess')} />
      </View>
      {loading && <ThemedText type="subtitle">Loading events...</ThemedText>}
      {!loading && filteredTodos.map((todo: Event) => (
        <ThemedText key={todo.id} style={styles.todoList} type="default">{todo.todo}</ThemedText>
      ))}
    </ParallaxScrollView>
  );
};

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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    gap:5,
  },
  todoList: {
    textAlign: "center",
  },
  titleTask: {
    textAlign:'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

export default HomeScreen;