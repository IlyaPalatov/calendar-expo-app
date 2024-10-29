import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'; 
import HomeScreen from '../HomeScreen';

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}
