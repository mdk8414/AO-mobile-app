import { Stack } from 'expo-router/stack';

import styles from 'styles/page';
import HeaderLogo from 'components/Logo';

export default function Layout() {
  return (
    <Stack 
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.title,
        headerRight: () => <HeaderLogo />,
        contentStyle: styles.container
      }}>
      <Stack.Screen 
        name="[date]/[timeOfDay]/track-emotions-form" 
        options={{
          title: `Track Emotions`
        }}
      />
    </Stack>
  );
}

