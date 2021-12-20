import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ListItem, Button,Icon } from "react-native-elements";
import { map } from "lodash";
import { useNavigation } from "@react-navigation/native";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props) {
  const { userInfo, toastRef, setRealoadUserInfo } = props;
  const navigation = useNavigation();
  
  function generateOptions()
  { return [
      {
        title: "Cuenta",
        iconType: "material-community",
        iconNameLeft: "account-circle",
        iconColorLeft: "#6B35E2",
        iconNameRight: "account-circle",
        iconColorRight: "#6B35E2",
        onPress: () => navigation.navigate("account",{screen:"personaldata"}),
      },
      {
        title: "Ranking",
        iconType: "material-community",
        iconNameLeft: "people",
        iconColorLeft: "#6B35E2",
        iconNameRight: "people",
        iconColorRight: "#6B35E2",
        // onPress: () => selectedComponent("password"),
      },
      {
        title: "Configuraciones",
        iconType: "material-community",
        iconNameLeft: "subject",
        iconColorLeft: "#6B35E2",
        iconNameRight: "subject",
        iconColorRight: "#6B35E2",
        // onPress: () => selectedComponent("password"),
      },
    ];
  }

  function generateOptionsdos()
  { return [
      {
        title: "Cambiar contraseña",
        iconType: "material-community",
        iconNameLeft: "lock",
        iconColorLeft: "#6B35E2",
        iconNameRight: "lock",
        iconColorRight: "#6B35E2",
        onPress: () => navigation.navigate("account",{screen:"changepassword"})
      },
      {
        title: "Preguntas frecuentes",
        iconType: "material-community",
        iconNameLeft: "live-help",
        iconColorLeft: "#6B35E2",
        iconNameRight: "chevron-right",
        iconColorRight: "#6B35E2",
      },
      {
        title: "Invitar a un amigo",
        iconType: "material-community",
        iconNameLeft: "group-add",
        iconColorLeft: "#6B35E2",
        iconNameRight: "chevron-right",
        iconColorRight: "#6B35E2",
      },
      {
        title: "Referidos",
        iconType: "material-community",
        iconNameLeft: "supervised-user-circle",
        iconColorLeft: "#6B35E2",
        iconNameRight: "chevron-right",
        iconColorRight: "#6B35E2",
      },
      {
        title: "Acerca de la App",
        iconType: "material-community",
        iconNameLeft: "info",
        iconColorLeft: "#6B35E2",
        iconNameRight: "chevron-right",
        iconColorRight: "#6B35E2",
      },
      {
        title: "Evalúanos",
        iconType: "material-community",
        iconNameLeft: "star-border",
        iconColorLeft: "#6B35E2",
        iconNameRight: "chevron-right",
        iconColorRight: "#6B35E2",
      },
      
    ];
  }

  // const selectedComponent = (key) => {
  //   switch (key) {
  //     case "displayName":
  //       setRenderComponent(
  //         <ChangeDisplayNameForm
  //           displayName={userInfo.displayName}
  //           setShowModal={setShowModal}
  //           toastRef={toastRef}
  //           setRealoadUserInfo={setRealoadUserInfo}
  //         />
  //       );
  //       setShowModal(true);
  //       break;
  //     case "email":
  //       setRenderComponent(
  //         <ChangeEmailForm
  //           email={userInfo.email}
  //           setShowModal={setShowModal}
  //           toastRef={toastRef}
  //           setRealoadUserInfo={setRealoadUserInfo}
  //         />
  //       );
  //       setShowModal(true);
  //       break;
  //     case "password":
  //       setRenderComponent(
  //         <ChangePasswordForm setShowModal={setShowModal} toastRef={toastRef} />
  //       );
  //       setShowModal(true);
  //       break;
  //     default:
  //       setRenderComponent(null);
  //       setShowModal(false);
  //       break;
  //   }
  // };

  const menuOptions = generateOptions();
  const menuOptions2 = generateOptionsdos();
  
  return (
    <ScrollView>
      <View>
        <Text style={styles.titleSecction}>{"  "}GENERAL</Text>
      </View>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
          Chevron
        >
        <Icon name={menu.iconNameLeft} color="#6B35E2"/>
        <ListItem.Content>
        <ListItem.Title containerStyle={styles.menuItem}>{menu.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron color="#6B35E2" />
        </ListItem>
      ))}

      <View>
        <Text style={styles.titleSecction}>{"  "}OTROS</Text>
      </View>

      {map(menuOptions2, (menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
          Chevron
        >
          
        <Icon name={menu.iconNameLeft} color="#6B35E2"/>
        <ListItem.Content>
        <ListItem.Title containerStyle={styles.menuItem}>{menu.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron color="#6B35E2" />
        </ListItem>
      ))}
    </ScrollView>
  );
}

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
  }
});
