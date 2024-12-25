import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="AONest" options={{ headerShown: false }} />
      <Stack.Screen name="EmotionalIntelligence" options={{ headerShown: false }} />
      <Stack.Screen name="TrackEmotions" options={{ headerShown: false }} />
    </Stack>
  );
}

