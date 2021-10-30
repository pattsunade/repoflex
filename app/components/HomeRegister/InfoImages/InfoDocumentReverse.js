import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text,Image } from "react-native";
import { Divider,Icon } from "react-native-elements";

import Modal from "../../Modal";


export default function InfoDocumentReverse (props) {

    const {isVisibleInfoDocumentReverse,setIsVisibleInfoDocumentReverse} = props;

    return (
    
        <Modal isVisible={isVisibleInfoDocumentReverse} setIsVisible={setIsVisibleInfoDocumentReverse} >
        
        <View>
            
            <Icon 
                
                size={30}
                type="material-community"
                name="close"
                color= "black"
                containerStyle={styles.btnContainer}
                onPress={()=> setIsVisibleInfoDocumentReverse(false)}

            /> 
            <Image 
                source={require("../../../../assets/img/reversoci.png")}
                resizeMode="contain"
                style={styles.logo}
            />

            <View style={styles.viewContainerInfo} >
                <Text style={styles.texttitle}>La fotografía de la cédula de identidad debe ser completa y legible.</Text>
            </View>
            
            <View style={styles.viewContainerInfo}>
                <View style={styles.wrapperInfo}>
                    <View style={styles.containerInfo}>

                        <View >
                        <Icon
                            type="material-community"
                            name="close-box-outline"
                            iconStyle={styles.iconLeft1}
                            size={35}
                        />
                        </View>
                        <View >
                            <Text>No Cortada</Text>
                        </View>
                    
                    </View>
                </View> 
            </View>

            <View style={styles.viewContainerInfo}>
                <View style={styles.wrapperInfo}>
                    <View style={styles.containerInfo}>

                        <View >
                        <Icon
                            type="material-community"
                            name="close-box-outline"
                            iconStyle={styles.iconLeft1}
                            size={35}
                        />
                        </View>
                        <View >
                            <Text>No Borrosa</Text>
                        </View>
                    
                    </View>
                </View> 
            </View>

            <View style={styles.viewContainerInfo}>
                <View style={styles.wrapperInfo}>
                    <View style={styles.containerInfo}>

                        <View >
                        <Icon
                            type="material-community"
                            name="check-box-outline"
                            iconStyle={styles.iconLeft2}
                            size={35}
                        />
                        </View>
                        <View >
                            <Text>Rut correspondiente a los datos ingresados previamente</Text>
                        </View>
                    
                    </View>
                </View> 
            </View>
            
        </View>
        </Modal>
    )
}



const styles = StyleSheet.create({

    viewContainerInfo:{
        marginRight: 40,
        marginLeft: 40,
        marginBottom:50,
    },
    logo:{
        width: "100%",
        height: 150,
        marginTop: 40,
    },
    texttitle: {
        marginTop:50,
        marginBottom:10,
        marginHorizontal:20,
        fontSize: 17,
        textAlign:"justify"
    },
    textRegister:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",  
    },
    containerInfo: {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'center', //replace with flex-end or center
        alignItems:"center",
        marginRight:100,
    },
    wrapperInfo: {
        flex: 1,
    },
    iconLeft1: {
        color: "#CF0404",
        marginRight: 15,
        marginLeft:65,
    },
    iconLeft2: {
        color: "#27C600",
        marginRight: 15,
        marginLeft:65,
    },
    btnContainer: {
        position:"absolute", // para posisionarlo en cualquier lado
        top: 10,
        right: 10,
        //sombreado
        
        
    }
});