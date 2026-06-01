
import { theme } from "@/constants/Theme";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
export default function RootLayout() {
  return (
      <PaperProvider theme={theme}>
        <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="parole" options={{ headerShown: false }} />
        <Stack.Screen name="favorite" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
  );
}