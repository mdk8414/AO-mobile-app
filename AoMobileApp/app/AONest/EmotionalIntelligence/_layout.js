import { Stack } from 'expo-router/stack';

import styles from 'styles/page';
import HeaderLogo from 'components/Logo';

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Emotional Intelligence',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="[date]/[timeOfDay]/outer"
        options={{
          title: 'Emotional Intelligence',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="[date]/[timeOfDay]/[secondary]/index"
        options={({ route }) => ({
          title: `${route.params.secondary} - Level 1`,
          headerShown: false
        })}
      />
      <Stack.Screen
        name="[date]/[timeOfDay]/[secondary]/[tertiary]/index"
        options={({ route }) => ({
          title: `${route.params.tertiary} - Level 2`,
          headerShown: false
        })}
      />
      <Stack.Screen
        name="[date]/[timeOfDay]/[secondary]/[tertiary]/[selection]"
        options={({ route }) => ({
          title: `${route.params.selection} - Level 3`,
          headerShown: false
        })}
      />
    </Stack>
    
  );
};
