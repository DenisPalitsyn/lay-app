import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { theme } from './src/constants/theme';
import { LocalisationContext } from './src/localisation/context';
import { localisation } from './src/localisation/localisation';
import { Navigation } from './src/navigation';
import rootReducer from './src/store/reducers/rootReducer';
import { initialState } from './src/constants/initialState';

const App = () => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

  const actualLocal = localisation.en;

  return (
    <StoreProvider store={store}>
      <SafeAreaProvider>
        <LocalisationContext.Provider value={actualLocal}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </PaperProvider>
        </LocalisationContext.Provider>
      </SafeAreaProvider>
    </StoreProvider>
  );
};

export default App;
