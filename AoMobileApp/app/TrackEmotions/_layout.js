import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="track-emotions-form" options={{ title: 'Track Emotions', headerShown: true }} />
    </Stack>
  );
}

