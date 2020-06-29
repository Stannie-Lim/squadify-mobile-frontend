import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// navigator
import { Routes } from './src/routes/routeStack';

interface ProvidersProps { }

console.disableYellowBox = true

const App: React.FC<ProvidersProps> = ({ }) => {
  return (
    <Routes />
  );
}

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
