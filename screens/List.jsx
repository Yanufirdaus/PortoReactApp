import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, ActivityIndicator, FlatList, Text, View, TextInput, Image, TouchableOpacity, Linking, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function List({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [emptyQuery, setEmptyQuery] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [queryFinal, setQueryFinal] = useState('');

  const getUsers = async () => {
    try {
      const modifiedQuery = emptyQuery ? 'a' : queryFinal;
      const response = await fetch('https://api.github.com/search/users?q='+modifiedQuery, {
        headers: {
          'Authorization': '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'
        }
      });
  
      if (!response.ok) {
        return null;
      }
  
      const json = await response.json();
      if (json.total_count > 0) {
        const user = json.items;
        console.log(user);
        setData(user);
      } else {
        console.log('No user found');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = (inputText) => {
    setEmptyQuery(false)
    setQuery(inputText);
    if (query == ''){
        setEmptyQuery(true)
    }
  };

  const handleEndEditing = () => {
    if(query != ''){
        setQueryFinal(query)
    } else {
        setQueryFinal('a')
    }
  };
  
  useEffect(() => {
    getUsers();
  }, [queryFinal, emptyQuery]);

  const handlePress = useCallback(async ({url}) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
        await Linking.openURL(url);
    } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }
    }, []);

  const IconButton = ({ iconName, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.iconContainer}>
            <Ionicons name={iconName} size={20} color="#fff" />
        </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
        <ImageBackground style={{flex: 1}} source={require('../assets/bg_body.png')}>
            <View style={styles.searchcontainer}>
                <ImageBackground style={styles.searchcontainer} source={require('../assets/bg_headprofile.png')} resizeMode='cover' >
                    <Text style={styles.textBold}>SEARCH GITHUB USER</Text>
                    <Text></Text>
                    <TextInput
                    placeholder="Cari"
                    onChangeText={
                        handleQuery
                    }
                    onEndEditing={handleEndEditing}
                    value={query}
                    style={styles.inputText}
                    />
                </ImageBackground>
            </View>
            {isLoading ? (
                <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 10}}>
                        
                    <ActivityIndicator color={'#000'} size={30}/>
                </View>
            ) : (
                <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 10}}>
                    <FlatList
                        data={data}
                        keyExtractor={({id}) => id}
                        renderItem={({item}) => (
                            <View >
                                <TouchableOpacity style={styles.itemlist} onPress={() => navigation.navigate('Detail', { userName: item.login })}>
                                    <View>
                                        <Image
                                        source={{uri : item.avatar_url}}
                                        style={styles.imageicon}
                                        resizeMode='contain'
                                        />
                                    </View>
                                    <View style={styles.listitemcontent}>
                                        <Text style={styles.textNormal}>
                                            {item.login}
                                        </Text>

                                        <Text></Text>

                                        <View style={{width: '30%'}}>
                                            <IconButton iconName={'open-outline'} onPress={() => handlePress({ url: item.html_url })}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                
                            </View>
                        )} showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputText: {
      width: '60%',
      height: 40, 
      borderColor: 'gray',
      borderWidth: 1, 
      marginBottom: 50, 
      paddingLeft: 10,
      borderRadius: 15,
    },
    row: {
      flexDirection: 'row',
    },
    title: {
      fontSize: 30,
      fontFamily: 'poppins-bold'
    },
    subtitle: {
      fontSize: 25,
      fontFamily: 'poppins-regular',
      fontWeight: '800',
      marginVertical: 50
    },
    btnlogin: {
      marginTop: 50,
      marginBottom: 35,
      width: 85,
      borderRadius: 15,
      overflow: 'hidden'
    },
    textquestion: {
      fontFamily: 'poppins-regular'
    },
    textlogin: {
      fontFamily: 'poppins-regular',
      fontWeight: '700'
    },
    inputText: {
      width: '80%',
      height: 40, 
      borderColor: 'gray',
      borderWidth: 1, 
      borderRadius: 15,
      paddingHorizontal: 20
    },
    searchcontainer: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemlist: {
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        borderRadius: 15
    },
    imageicon: {
        width: 80,
        height: 80,
        marginVertical: 10,
        borderRadius: 500,
        borderColor: 'black',
        borderWidth: 1
    },
    listitemcontent: {
        width: '60%',
        justifyContent: 'center',
        paddingLeft: 10
    },
    iconContainer:{
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 35,
        borderRadius: 10
    },
    textBold:{
        fontFamily: 'poppins-bold'
    },
    textNormal:{
        fontFamily: 'poppins-regular'
    },
  }
);
