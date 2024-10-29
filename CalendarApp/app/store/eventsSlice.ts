import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
interface EventsState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}
const initialState: EventsState = {
  todos: [],
  loading: false,
  error: null,
};
export const fetchTodos = createAsyncThunk<Todo[], number>(
  'events/fetchTodos',
  async (page: number) => {
    const response = await axios.get(`https://dummyjson.com/todos?limit=10&skip=${(page - 1) * 10}`);
    return response.data.todos;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      });
  },
});
export default eventsSlice.reducer;