import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, TouchableOpacity, } from "react-native";
import { Link, useRouter } from 'expo-router'
import fonts from 'constants/fonts';
import colors from 'constants/colors';

const Navigation = ({ text, icon, href }) => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.container} onPress={() => href ? router.push(href) : router.back()}>
      <FontAwesome size={36} name={icon} color={colors.primaryButton} />
    </TouchableOpacity>
  )
}

export default Navigation;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 10,
  },
  text: {
    fontSize: fonts.textSize
  }
});
