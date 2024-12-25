import { StyleSheet, Text, View, TouchableOpacity, Linking  } from "react-native";
import {Link} from 'expo-router'


export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Welcome to AO Nest!</Text>
        <Text style={styles.subtitle}>Begin your mental health journey here.</Text>
        
          
        <TouchableOpacity>
          <Link style={styles.link} href="AONest/track-emotions">
            <Text style={styles.linkText}>Track Emotions</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link style={styles.link} href="AONest/emotional-intelligence">
            <Text style={styles.linkText}>Emotional Intelligence</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
        <Link style={styles.link} href="AONest/content"> 
          <Text style={styles.linkText}>Content</Text>
        </Link>
        </TouchableOpacity>
        <TouchableOpacity>
        <Link style={styles.link} href="AONest/settings">
            <Text style={styles.linkText}>Settings</Text>
        </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "top",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "top",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#66847b',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f'
  },
  linkText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  }
});
