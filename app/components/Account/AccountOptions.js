import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

function CustomListItem ({ onPress, leftIcon, rightIcon, text }) {

    return (
        <ListItem containerStyle={styles.menuItem} onPress={onPress}>
            {leftIcon}
            <ListItem.Content>
                <ListItem.Title containerStyle={styles.menuItem}>
                    {text}
                </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color="#6B35E2" />
        </ListItem>
    )
}

function AccountOptions(props) {
    const {usr} = props;
    const navigation = useNavigation();

    const menuOptions1 = React.useMemo(() => ([
        {
            title: "Cuenta",
            leftIcon: <Icon type={"material-community"} name={"account-circle"} color="#6B35E2" size={24}/>,
            onPress: () => navigation.navigate("personaldata",{usr:usr}),
        }
    ]),[]);
    const menuOptions2 = React.useMemo(() => ([
        {
            title: "Cambiar contraseña",
            leftIcon: <Icon type={"material-community"} name={"lock"} color="#6B35E2" size={24}/>,
            onPress: () => navigation.navigate("changepassword",{usr:usr})
        },
        {
            title: "Preguntas frecuentes",
            leftIcon: <Icon type={"material"} name={"live-help"} color="#6B35E2" size={24}/>,
            onPress: () => navigation.navigate("frequentquestions")
        },
        {
            title: "Acerca de la App",
            leftIcon: <Icon type={"material"} name={"info"} color="#6B35E2" size={24}/>,
            onPress: () => navigation.navigate("about")
        }
    ]), []);
    
    return (

        <ScrollView>
        <View style={styles.menuBorder}>
            <Text style={styles.titleSecction}>{"  "}GENERAL</Text>
            {menuOptions1.map(option => (
                <CustomListItem key={option.title}
                    leftIcon={option.leftIcon}
                    text={option.title}
                    onPress={option.onPress}
                />
            ))}
            
            
            <Text style={styles.titleSecction}>{"  "}OTROS</Text>
            {menuOptions2.map(option => (
                <CustomListItem key={option.title}
                    leftIcon={option.leftIcon}
                    text={option.title}
                    onPress={option.onPress}
                />
            ))}
        </View>
        </ScrollView>
    );
}

export default AccountOptions;
const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
  titleSecction: {
    marginTop: 10,
    marginBottom: 10,
    fontSize:17,
    color: "#6B35E2",
  },
  menuBorder:
  { marginRight: 30,
    marginLeft: 30
  },
});
