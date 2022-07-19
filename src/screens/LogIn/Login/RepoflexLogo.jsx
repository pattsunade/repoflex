import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Logo from 'assets/img/repoLogo.png'
function RepoflexLogo () {
    return (
        <Image 
            source={Logo}
            resizeMode='contain'
            style={styles.logo}
        />
    );
}


export default RepoflexLogo;


const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 70
    }
})
