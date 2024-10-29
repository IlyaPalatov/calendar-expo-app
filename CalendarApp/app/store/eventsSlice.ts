import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Event {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

// Create async thunk for fetching events
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get<Event[]>('https://jsonplaceholder.typicode.com/todos');
  return response.data;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    // You can remove these if not using them yet
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      });
  },
});

// Export actions
export const { addEvent, removeEvent, setEvents } = eventsSlice.actions;

// Export reducer
export default eventsSlice.reducer;
