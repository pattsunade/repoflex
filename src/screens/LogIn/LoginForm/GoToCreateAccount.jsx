import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, StyleSheet } from 'react-native';

function GoToCreateAccount() { 
    const navigation = useNavigation();
    return(
		<Text style={styles.textRegister}>
			¿Aún no tienes una cuenta?{" "}
			<Text style={styles.btnRegister} onPress={() => navigation.navigate("register")}>
				Regístrate
			</Text>
		</Text>
	);
}


export default React.memo(GoToCreateAccount)

const styles = StyleSheet.create({
    textRegister:{
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    btnRegister:{
        color: "#6B35E2",
        fontWeight: "bold",
    },
})
