import React, {useCallback, useState} from "react";
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Linking } from "react-native";

export default function Profile() {
    const handlePress = useCallback(async ({url}) => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
        }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bg_body.png')} resizeMode='cover' style={styles.container}>
        <View style={styles.row}>
            <Image source={require('../assets/profile.jpg')} resizeMode='cover' style={styles.image}/>
            <View style= {styles.rowcontent}>
                <ImageBackground source={require('../assets/bg_headprofile.png')} resizeMode='cover' style={styles.rowcontent}>
                    <View style={styles.textHeader}>
                        <Text style={styles.textBold}>Firdaus Putra Maulidyanu</Text>
                        <Text style={styles.normalText}>Information Technology Student</Text>
                        <Text style={styles.normalText}>at Jember University</Text>
                        <Text></Text>
                        <Text style={styles.normalText}>Kabupaten Jember, East Java</Text>
                        <Text></Text>
                        <Text style={styles.normalText}>Interest :</Text>
                        <Text style={styles.textBold}>Mobile Developer / Design Grafis</Text>
                    </View>
                </ImageBackground>
            </View>
        </View>
        <View style={styles.profilecontent}>    
            <View style= {styles.rowbody}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => handlePress({ url: 'https://github.com/Yanufirdaus' })}>
                    <View style={styles.imageicon}>
                        <Image
                        source={require('../assets/Github3.png')}
                        style={styles.imageicon}
                        resizeMode='contain'
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => handlePress({ url: 'https://www.linkedin.com/in/firdaus-putra-maulidyanu-b7642a220/' })}>
                    <View style={styles.imageicon}>
                        <Image
                        source={require('../assets/Linkedin.png')}
                        style={styles.imageicon}
                        resizeMode='contain'
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => handlePress({ url: 'https://www.instagram.com/firdaus_pm03?igsh=MXh1a2Y3NHAzazExeg==/' })}>
                    <View style={styles.imageicon}>
                        <Image
                        source={require('../assets/Instagram.png')}
                        style={styles.imageicon}
                        resizeMode='contain'
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.zone}>
                <Text style= {styles.textzone}>Mobile Programing Language</Text>
            </View>
            <View style={styles.imagecover}>
                <Image
                    source={require('../assets/mobile2.png')}
                    resizeMode='contain'
                    style={styles.imagecover}
                    />
            </View>
            <View style={styles.zone}>
                <Text style= {styles.textzone}>Web Programing Language</Text>
            </View>
            <View style={styles.imagecover}>
                <Image
                    source={require('../assets/Web.png')}
                    resizeMode='contain'
                    style={styles.imagecover}
                    />
            </View>
            <View style={styles.zone}>
                <Text style= {styles.textzone}>Design & Databases</Text>
            </View>
            <View style={styles.imagecover}>
                <Image
                    source={require('../assets/DesignDatabase.png')}
                    resizeMode='contain'
                    style={styles.imagecover2}
                    />
            </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
        width: 125,
        height: 200
    },
    row: {
        flexDirection: 'row',
    },
    rowcontent: {
        flex: 1,
        justifyContent: 'center'
    },
    textHeader: {
        paddingLeft: 10
    },
    profilecontent: {
        width: '100%',
        flex:1,
    },
    rowbody: {
        paddingVertical: 10,
        paddingHorizontal: 55,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    imageicon: {
        width: 50,
        height: 50
    },
    zone: {
        backgroundColor: 'white',
        height: 40,
        justifyContent: 'center'
    },
    textzone: {
        textAlign: 'center',
        fontFamily: 'poppins-regular',
        fontWeight: '900'
    },
    imagecover: {
        width: '100%',
        height: 80
    },
    imagecover2: {
        width: '100%',
        height: 130
    },
    textBold:{
        fontFamily: 'poppins-bold',
        fontSize: 13
    },
    normalText:{
        fontFamily: 'poppins-regular',
        fontSize: 13
    }
  }
);