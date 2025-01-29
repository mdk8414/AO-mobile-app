import { View, StyleSheet } from 'react-native';
import NavigationButton from '../Buttons/Navigation';

const SubPage = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
      {/* <NavigationButton icon="arrow-circle-left" href="../" /> */}
    </View>
  );
};

export default SubPage;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10
  }
});
