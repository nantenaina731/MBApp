import React from "react";
import { View ,} from "react-native";
import { ActivityIndicator, useTheme,Text } from "react-native-paper";

interface props {
  top?: number
}

const Loading = ({ top }: props) => {
 

  return (
    <View style={{marginTop: top ?? 25, marginBottom: 10}}>
<Text style={{fontSize:10,}}> Chargement des donnees</Text>
      <ActivityIndicator size={"small"} animating={true} color={"#566FA7"} />
    </View>
  );
};

export default Loading;
