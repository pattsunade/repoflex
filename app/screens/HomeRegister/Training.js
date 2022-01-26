import React, { useRef,useState,useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Button, Divider, Card } from "react-native-elements";
import { setStatusBarHidden } from 'expo-status-bar'
import { useNavigation } from "@react-navigation/native";
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import BackEndConnect from "../../utils/BackEndConnect";
import Loading from "../../components/Loading";

const { width, height } = Dimensions.get('window');

export default function Training ({ navigation, route }) {
  const [testUri, setTestUri] = useState("");
  const [course,setCourse] = useState("");
  const [value,setValue] = useState(true);
  const [loading, setLoading] = useState(false);
  const [inFullScreen, setInFullScreen] = useState(false);
  const refVideo = useRef(null);
  const refScrollView = useRef(null);

  useEffect(() =>
  { setLoading(true)
    async function getData()
      { const uri = await BackEndConnect("POST","cours").then((ans)=>
        { console.log(ans.ans.lnk);
          setCourse(ans.ans.lnk);
        })
        .catch((ans) => {
          console.log(ans);
        });
        setLoading(false);
      }
      getData();
  },[])

  const onSubmit = () =>
  { Alert.alert(
      "Prueba de entrenamiento",
      "Empezar prueba para medir los conocimientos y continuar con el registro",
      [ { text: "Ver denuevo",
          style: "cancel"
        },
        { text: "Continuar",
          onPress: () => navigation.navigate("training2")
        }
      ],
      {cancelable:false}
    )
  }
  return (
  <>
    { loading ? (<Loading isVisible={loading} text="Cargando..."/>):
      (<ScrollView scrollEnabled={!inFullScreen}
        ref={refScrollView}
        onContentSizeChange={() => {
          if (inFullScreen) {
            refScrollView.current.scrollToEnd({ animated: true })
            navigation.setOptions({headerShown: value})
          }
        }}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        >
        {!inFullScreen ? (
        <>
          <Card>
            <Card.Title style={styles.cardTitleText}>Video</Card.Title>
            <Card.Divider/>
            <Text style={styles.cardText}>
              Video introductorio, se te realizará un test terminado el video.
            </Text>
            <View style={styles.player}>
              <VideoPlayer
                videoProps={{
                  shouldPlay: false,
                  resizeMode: Video.RESIZE_MODE_CONTAIN,
                  source: {
                    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  },
                  ref: refVideo,
                }}
                fullscreen={{
                  inFullscreen: inFullScreen,
                  enterFullscreen: async () => {
                    setStatusBarHidden(true, 'fade');
                    setValue(false)
                    setInFullScreen(!inFullScreen);
                    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
                    refVideo.current.setStatusAsync({
                      shouldPlay: true,
                    });
                  },
                }}
                style={{
                  videoBackgroundColor: 'black',
                  height:160,
                  width:320
                }}
              />
            </View>
            <Button
              title="Empezar Prueba"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btn}
              onPress={onSubmit}
            />
          </Card>
          <View style={styles.viewZolbit}>
            <Text>Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>
          </View>
        </>
          ) :(
          <VideoPlayer
            videoProps={{
              shouldPlay: false,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              source: {
                uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              },
              ref: refVideo,
            }}
            fullscreen={{
              inFullscreen: inFullScreen,
              exitFullscreen: async () => {
                setStatusBarHidden(false, 'fade')
                setValue(true)
                setInFullsreen(!inFullScreen)
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
              },
            }}
            style={{
              videoBackgroundColor: 'black',
              height: Dimensions.get('window').width,
              width: Dimensions.get('window').height
            }}
          />
          )}
      </ScrollView>
      )
    }
  </>
  )
}

const styles = StyleSheet.create(
{ contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  container: {
    flex: 1,
  },
  cardTitleText: {
    fontSize: 22,
    fontWeight: "400",
    marginVertical:5,
    textAlign:"left"
  },
  cardText: {
    marginBottom:10,
    textAlign: "justify",
    fontSize: 15,
  },
  player: {
    alignItems:"center",
    marginTop:10,
    marginBottom:10
  },
  viewZolbit:{
    justifyContent: "center",
    alignItems: "center",
    marginTop:10
  },
  textZolbit: {
    fontWeight: "bold",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
    marginLeft: 10
  },
  btn: {
    backgroundColor: "#6B35E2",
    borderRadius: 50
  }
});