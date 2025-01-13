import { StyleSheet } from "react-native";

import colors from "constants/colors";
import fonts from "constants/fonts";

export default StyleSheet.create({
  header: {
    backgroundColor: colors.headerBackgound,
    height: 100,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  title: {
    color: colors.primaryButton,
    fontSize: fonts.headerSize,
    padding: 2,
  },
  subtitle: {
    fontSize: fonts.subHeaderSize,
    color: colors.primaryText,
    padding: 10
  },
  container: {
    backgroundColor: colors.containerBackground
  },
  link: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: colors.primaryButton,
    borderRadius: 10,
    borderColor: '#f'
  },
  linkText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10
  }
});
