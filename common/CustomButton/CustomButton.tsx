import React from "react";
import { Pressable, StyleSheet,TouchableOpacity} from "react-native";
import { Text, useTheme } from "react-native-paper";

interface props {
  text: string;
  onPress: any;
  rounded: boolean;
  mt?: number;
  disabled?: boolean;
  width?: any;
  height?: any
}

const CustomButton = ({ mt, text,rounded,onPress, disabled, width, height }: props) => {
  const theme = useTheme();
  const { primary } = theme.colors;
  
  const styles = StyleSheet.create({
    button: {
      borderRadius: rounded ? 50 : 7,
      width: width ?? "50%",
      paddingTop: 5,
      paddingBottom: 5,
      display: "flex",
      marginTop: mt ?? 15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"#2952AE",
      height: height ?? 50,
      marginLeft: 'auto',
      marginRight: 'auto',
      position:"relative",
      top:140
    },
    connexion: {
      color: "white",
      fontWeight: "bold",
    },
  });

  return (
    <TouchableOpacity style={styles.button}>
      <Text variant="titleMedium" style={styles.connexion}onPress={disabled ? () => console.log('No press') : onPress} >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
