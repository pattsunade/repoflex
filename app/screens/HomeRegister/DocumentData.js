import React, { useState, useRef,useCallback } from "react";
import { StyleSheet, View, Text, } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from '@react-navigation/native';
import Loading from "../../components/Loading";
import DocumentDataForm from "../../components/HomeRegister/DocumentDataForm";
import Toast from 'react-native-toast-message';
import regi0 from "../../utils/connection/transacciones/regi0";

export default function DocumentData (props) { 
	const {navigation} = props;
	const [loading, setLoading] = useState(true);
	const [lists, setLists] = useState({})

	useFocusEffect(
		useCallback(() => { 
			regi0()
			.then(async (response) => { 
				if(response.ans.stx != 'ok'){ 
					Toast.show({ 
						type: 'error',
						props: { 
							onPress: () => {}, 
							text1: 'Error', 
							text2: "Error conexión. Porfavor intenta más tarde"
						}
					});
					navigation.goBack();
				}
				setLists(response.ans);
				setLoading(false);
			})
			.catch((ans) => { 
				console.log(ans);
				Toast.show({ 
					type: 'error',
					props:{ 
						onPress: () => {}, 
						text1: 'Error', 
						text2: "Error conexión. Porfavor intenta más tarde"
					}
				});
				navigation.goback();
			});
		}, [])
	);


  return (
    <KeyboardAwareScrollView enableOnAndroid={true}
      enableAutomaticScroll={(Platform.OS === 'ios')}
    >
      <View style={styles.viewForm}>
        { loading ? (<Loading isVisible={loading} text="Cargando..." />)
        :(<DocumentDataForm
            navigation={navigation} lists={lists}/>
          )
        }
      </View>
    </KeyboardAwareScrollView>
  )
}
const styles = StyleSheet.create({
  viewForm: {
    marginRight: 40,
    marginLeft: 40
  }
});