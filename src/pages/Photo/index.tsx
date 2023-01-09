import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Alert,
  Modal,
  ImageBackground,
} from "react-native";
// yarn add expo-module-scripts expo-camera expo-media-library expo-image-picker
import {
  Camera,
  CameraPictureOptions,
  CameraType,
  FlashMode,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/RootStackParamList";

interface Props extends NativeStackScreenProps<RootStackParamList, "Photo"> {}

const Photo = ({ navigation }: Props) => {
  const [permission, setPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const camera = useRef<Camera | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      if (cameraPermission.status === "granted") {
        const microphonePermission =
          await Camera.requestMicrophonePermissionsAsync();
        if (microphonePermission.status === "granted") {
          const mediaLibraryPermission =
            await MediaLibrary.requestPermissionsAsync();
          if (mediaLibraryPermission.status === "granted") {
            const imagePickerPermission =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (imagePickerPermission.status === "granted") {
              const imagePickerPermission =
                await ImagePicker.requestCameraPermissionsAsync();
              if (imagePickerPermission.status === "granted") {
                setPermission(true);
              }
            }
          } else {
            Alert.alert(
              "Access denied",
              "Media library permissions not granted"
            );
          }
        } else {
          Alert.alert("Access denied", "Microphone permission not granted");
        }
      } else {
        Alert.alert("Access denied", "Camera permission not granted");
      }
    })();
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleFlashMode() {
    setFlashMode((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  }

  async function _takePicture() {
    if (camera.current) {
      const options: CameraPictureOptions = {
        quality: 1,
        base64: true,
      };
      const photo = await camera.current.takePictureAsync(options);
      setPreviewVisible(true);
      setCapturedImage(photo);
      MediaLibrary.saveToLibraryAsync(photo.uri);
    }
  }

  async function pickImage() {
    const options: ImagePicker.ImagePickerOptions = {
      quality: 1,
      aspect: [16, 9],
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    };
    const photo = await ImagePicker.launchImageLibraryAsync(options);
    if (!photo.canceled) {
      setPreviewVisible(true);
      setCapturedImage(photo);
    }
  }

  if (permission === true) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar translucent={true} />
        <Camera
          type={type}
          ratio="16:9"
          ref={camera}
          style={[StyleSheet.absoluteFillObject, styles.camera]}
        >
          <View style={styles.buttonContainer}>
            <View style={styles.buttonArea}>
              <Icon
                name="camera"
                size={64}
                color="white"
                onPress={_takePicture}
              />
            </View>
            <View style={styles.buttonArea}>
              <Icon
                name="flip-camera-android"
                size={32}
                color="white"
                onPress={toggleCameraType}
              />
              <Icon
                name={flashMode === FlashMode.off ? "flash-off" : "flash-auto"}
                size={32}
                color="white"
                onPress={toggleFlashMode}
              />
              <Icon
                name="photo-album"
                size={32}
                color="white"
                onPress={pickImage}
              />
            </View>
          </View>
        </Camera>
        <Modal
          visible={previewVisible}
          animationType="fade"
          style={StyleSheet.absoluteFillObject}
        >
          <Icon
            name="close"
            size={32}
            color="white"
            onPress={() => setPreviewVisible(false)}
            style={styles.close}
          />
          <ImageBackground
            source={{ uri: capturedImage && capturedImage.uri }}
            style={StyleSheet.absoluteFillObject}
          />
        </Modal>
      </SafeAreaView>
    );
  } else {
    return <SafeAreaView style={styles.container}></SafeAreaView>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  camera: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    width: "100%",
    height: 128,
    margin: 32,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "transparent",
  },
  buttonArea: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "transparent",
  },
  close: {
    position: "absolute",
    zIndex: 99,
    alignSelf: "flex-end",
    padding: 32,
  },
});

export default Photo;
