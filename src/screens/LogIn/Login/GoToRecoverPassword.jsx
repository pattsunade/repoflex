
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, StyleSheet } from 'react-native';

function GoToRecoverPassword() {
    const navigation = useNavigation();
    return(
		<Text style={styles.textRegister}>
			¿Olvidaste tu contraseña?{" "}
			<Text style={styles.btnRegister} onPress={() => navigation.navigate("recoverpassword")}>
				Recupérala
			</Text>
		</Text>
	);
}

export default React.memo(GoToRecoverPassword)

const styles = StyleSheet.create({
    textRegister:{
        marginTop: 5,
        textAlign: 'center'
    },
    btnRegister:{
        color: "#6B35E2",
        fontWeight: "bold",
    },
})
