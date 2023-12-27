import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Navigation from "./src/navigation";
import { navRef } from "./src/navigate";
import { linking } from "./src/navigate";
import { ClickOutsideProvider } from "react-native-click-outside";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer ref={navRef} linking={linking}>
          <ClickOutsideProvider>
            <Navigation />
          </ClickOutsideProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;
