import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Navigation from "./src/navigation";
import { navRef } from "./src/navigate";
import { linking } from "./src/navigate";
import { ClickOutsideProvider } from "react-native-click-outside";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistore } from "./src/utils/redux/store";
// import config from "./src/utils/config";
// import { clearStorage } from "./src/utils/helpers/storage";
// import { ENVIRONMENT } from "@env";

const App = () => {
  const queryClient = new QueryClient();
  // console.log({ ...config, ENVIRONMENT });
  // clearStorage();
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer ref={navRef} linking={linking}>
          <ClickOutsideProvider>
            <Provider store={store}>
              <PersistGate persistor={persistore}>
                <Navigation />
              </PersistGate>
            </Provider>
          </ClickOutsideProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;
