import React,{useState} from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, Linking } from 'react-native';
import { Button, Card, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import ParsedText from 'react-native-parsed-text';
import BackEndConnect from "../../utils/BackEndConnect";

export default function TermsAndConditions (props) {
  const {masterTitle,paragraph,fut} = props;
  const navigation = useNavigation();
  const [read, setRead] = useState(false);
  
  function onSubmit()
  { Alert.alert(
      "Aceptar términos  y condiciones del contrato",
      "¿Estás seguro de que quieres aceptar los términos y condiciones que se incluyen en el contrato ?",
      [{  text: "Cancelar",
          style: "cancel"
        },
        { text: "Aceptar",
          onPress: () =>
          { BackEndConnect("POST","accep").then(async (ans) =>
            { if (ans.ans.stx === "ok")
              { navigation.reset(
                { index: 0,
                  routes: [
                    {
                      name: 'endregister',
                    }
                  ],
                });
              }
              else{
                console.log("Algo salio mal");
              }
            });
          }
        }
      ],
      {cancelable:false}
    )
  }

  function open(url)
  { setRead(true);
    WebBrowser.openBrowserAsync(url);
  }

  function renderText(matchingString) {
    let pattern = /\^(.*?)\!/;
    let match = matchingString.match(pattern);
    return match[1];
  }
  // paragraph.map((ans) =>{console.log(ans.bod)})
  return (
    <ScrollView>
      <View style={styles.viewContainer}>
        <Card>
          <Card.Title style={styles.cardTitle}>{masterTitle}</Card.Title>
          <Card.Divider/>
          {/*<Card.Title> {paragraph[1].tit} </Card.Title>*/}
          {paragraph.map((ans) =>
            { return <>
                <Card.Title key={ans.idt}> {ans.tit} </Card.Title>
                <ParsedText
                  style={styles.text}
                  parse={
                    [ {type: 'url',  style: styles.url, onPress: open},
                      {pattern: /\^(.*?)\!/, style: styles.boldText, renderText: renderText},
                    ]
                  }
                  childrenProps={{allowFontScaling: false}}
                  key={ans.idb}
                >
                {ans.bod}
                </ParsedText>
              </>
            })}
          <View style={styles.futStyle}> 
            <View style={styles.futBorder}>
              <Text style={styles.boldText}>{fut[0].tit} </Text>
              <Text style={styles.boldText}>{fut[0].bod} </Text>
            </View>
            <View style={styles.futBorder}>
              <Text style={styles.boldText}>{fut[1].tit} </Text>
              <Text style={styles.boldText}>{fut[1].bod} </Text>
            </View>
          </View>
        </Card>
      {/*<Button
        title="Abrir explorador"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={open}
      />*/}
      <Button
        title="Aceptar Términos y condiciones"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        disabled={!read}
      />
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  viewContainer:{
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20,
  },
  cardTitle:
  { textAlign: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:"center"
  },
  wrapper: {
    flex: 1,
  },
  btnContainer: 
  { marginTop: 20,
    width: "95%",
    marginLeft: 10,
  },
  btn:
  { backgroundColor: "#6B35E2",
    borderRadius: 50,
  },
  url: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  boldText:
  { fontWeight: 'bold'
  },
  futStyle:
  { flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  futBorder:
  { borderTopColor: 'black',
    borderTopWidth: 3,
    flexDirection: 'column'
  }
});