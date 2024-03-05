import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearStorage = async (cb?: () => void) => {
  try {
    await AsyncStorage.clear();
    cb?.();
    console.log("Storage cleared.");
  } catch (error) {
    console.log("Failed to clear storage ", error);
  }
};
