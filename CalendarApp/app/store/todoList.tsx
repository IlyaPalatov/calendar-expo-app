import React from 'react';
import { useAppSelector } from './store';
import  ThemedText  from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
interface TodoListProps {
  filter: 'all' | 'completed' | 'inProcess';
}
  
  const TodoList: React.FC<TodoListProps> = ({ filter }) => {
  const todos = useAppSelector((state) => state.events.todos);
  const loading = useAppSelector((state) => state.events.loading);
  const error = useAppSelector((state) => state.events.error);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'inProcess') return !todo.completed;
    return true; // 'all'
  });

  if (loading) {
    return <ThemedText type="subtitle" style={styles.txtLoadingToDo}>Loading todos...</ThemedText>;
  }

  if (error) {
    return <ThemedText type="subtitle">{error}</ThemedText>;
  }

  return (
    <>
      {filteredTodos.map((todo) => (
        <ThemedText style={styles.todoList} key={todo.id} type="default">
          {todo.todo}
        </ThemedText>
      ))}
    </>
  );
};
const styles = StyleSheet.create({
    todoList:{
        textAlign:'center',
  },
  txtLoadingToDo:{
    textAlign:'center',
  },
})

export default TodoList;
