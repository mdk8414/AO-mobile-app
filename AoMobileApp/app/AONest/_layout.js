import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import colors from 'constants/colors'
import styles from 'styles/page';

import HeaderLogo from 'components/Logo';


export default function TabLayout() {
  const navigation = useNavigation();
  return (
    <Tabs
      sceneContainerStyle={styles.container}
      screenOptions={{
        tabBarActiveTintColor: colors.selectedButton,
        headerStyle: styles.header,
        headerTitleStyle: styles.title,
        headerRight: () => <HeaderLogo />,
        }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="track-emotions"
        options={{
          title: 'Track Emotions',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="pencil-square-o" color={color} />,
          // href: null
        }}
      />
      <Tabs.Screen
        name="emotional-intelligence"
        options={{
          title: 'Emotional Intelligence',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heartbeat" color={color} />,
        }}
      />
      <Tabs.Screen
        name="content"
        options={{
          title: 'Content',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
};
