import { Stack } from 'expo-router/stack';

import styles from 'styles/page';
import HeaderLogo from 'components/Logo';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[date]/[timeOfDay]/index" 
        options={{
          title: `Track Emotions`,
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="[date]/[timeOfDay]/track-emotions-form" 
        options={{
          title: `Track Emotions`,
          headerShown: false
        }}
      />
    </Stack>
  );
}

