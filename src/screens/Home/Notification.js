import React, { useRef } from "react";
import { StyleSheet, View} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ListNotification from "../../components/Home/ListNotification";

export default function Notification({route,navigation}) {
  const toastRef = useRef();
  const { notifications } = route.params;
  return(
    <KeyboardAwareScrollView>
      <View style={styles.viewForm}>
        <ListNotification toastRef={toastRef} notifications={notifications} />
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20  
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40
  }
}); 