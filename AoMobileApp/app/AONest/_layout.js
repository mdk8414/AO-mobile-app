import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { getFocusedRouteNameFromRoute, useNavigationState } from '@react-navigation/native'
import NavigationButton from 'components/Buttons/Navigation';

import colors from 'constants/colors'
import styles from 'styles/page';

import HeaderLogo from 'components/Logo';


export default function TabLayout() {

  const currentRoute = useNavigationState((state) => {
    if (!state || !state.routes[state.index]) return "index";
    const route = state.routes[state.index];
    return getFocusedRouteNameFromRoute(route) || "index";
  });

  const isHomePage = currentRoute === "index";


  return (
    
    <Tabs
      sceneContainerStyle={styles.container}
      screenOptions={{
        tabBarActiveTintColor: colors.selectedButton,
        tabBarActiveBackgroundColor: colors.secondaryButton,
        headerStyle: styles.header,
        headerTitleStyle: styles.title,
        headerRight: () => <HeaderLogo />,
        headerLeft: () => !isHomePage && <NavigationButton icon="arrow-circle-left"/>
        }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="TrackEmotions"
        options={{
          title: 'Track Emotions',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="pencil-square-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="EmotionalIntelligence"
        options={{
          title: 'Emotional Intelligence',
          tabBarIcon: ({ color }) => (
          <FontAwesome size={28} name="heartbeat" color={color} />
        ),
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
