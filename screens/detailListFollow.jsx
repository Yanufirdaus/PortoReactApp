import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function DetaiListFollow({ route, navigation }){
    const [isLoading, setLoading] = useState(true);
    const { userName } = route.params;
    const [data, setData] = useState([]);
    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);

    const getRepos = async () => {
        try {
          const response = await fetch('https://api.github.com/users/' + userName + '/repos'+'?page='+page, {
            headers: {
              'Authorization': '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'
            }
          });
      
          if (!response.ok) {
            return null;
          }
      
          const repositories = await response.json();

            if (repositories && repositories.length > 0) {
                console.log(repositories);
                setRepos((prevData) => [...prevData, ...repositories]);
                setPage((prevPage) => prevPage + 1);
                setHasMoreData(repositories.length >= 30); // Adjust the condition based on your API response
            } else {
                console.log('No repositories found');
                setHasMoreData(false);
            }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    const getUsersDetail = async () => {
        try {
          const response = await fetch('https://api.github.com/users/' + userName, {
            headers: {
              'Authorization': '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'
            }
          });
      
          if (!response.ok) {
            return null;
          }
      
          const userData = await response.json();
      
          if (userData) {
            console.log(userData);
            setData(userData);
          } else {
            console.log('No user found');
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        getUsersDetail();
        getRepos();
    }, []);

    const handleLoadMore = () => {
        if (!loadingMore && hasMoreData) {
          getRepos();
        }
      };

    const IconButton = ({ iconName, onPress}) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.iconContainer}>
                <Ionicons name={iconName} size={20} color="#000" />
            </View>
        </TouchableOpacity>
      );

    const handlePress = useCallback(async ({url}) => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, []);

    return (
        <View style={{flex: 1}}>
            <ImageBackground style={{flex: 1}} source={require('../assets/bg_body.png')}>
                {isLoading ? (
                    <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 10}}>
                        
                        <ActivityIndicator color={'#000'} size={30}/>
                    </View>
                ) : (
                    <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 10}}>
                        <View style={styles.header}>
                            <ImageBackground style={styles.header} source={require('../assets/bg_headprofile.png')}>
                                <View>
                                    <Image
                                        source={{uri : data.avatar_url}}
                                        style={styles.imageicon}
                                        resizeMode='contain'
                                    />
                                </View>
                                <Text style={{fontFamily: 'poppins-regular', paddingBottom: 4, fontSize: 16}}>{data.login}</Text>
                                <Text style={{fontFamily: 'poppins-bold'}}>{data.name.toUpperCase()}</Text>
                                <View style={styles.rownobg}>
                                    <Text style={{fontFamily: 'poppins-bold'}}>Public Repository : </Text>
                                    <Text style={{fontFamily: 'poppins-bold'}}>{data.public_repos}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.row}>
                            
                            <View style={{width: '50%'}}>
                                <Text style={{textAlign: 'center', fontFamily: 'poppins-regular'}}>Following</Text>
                                <Text style={{textAlign: 'center', fontFamily: 'poppins-regular'}}>{data.following}</Text>
                            </View>
                        
                            <View style={{width: '50%'}}>
                                <Text style={{textAlign: 'center', fontFamily: 'poppins-regular'}}>Followers</Text>
                                <Text style={{textAlign: 'center', fontFamily: 'poppins-regular'}}>{data.followers}</Text>
                            </View>
                        </View>

                        {isLoading ? (
                            <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                
                                <ActivityIndicator color={'#000'}/>
                            </View>
                            ) : (
                                <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{paddingTop: 10, fontFamily: 'poppins-regular', fontWeight: '700'}}>RESPOSITORIES</Text>
                                    <FlatList
                                        data={repos}
                                        keyExtractor={(item, index) => item.id + index.toString()}
                                        renderItem={({item}) => (
                                            <View style={styles.itemlist}>
                                                <Text style={{fontFamily: 'poppins-bold'}}>{item.name}</Text>
                                                <Text></Text>
                                                <View style={{width: '30%'}}>
                                                    <IconButton iconName={'open-outline'} onPress={() => handlePress({ url: item.html_url })}/>
                                                </View>
                                            </View>
                                        )} 
                                        showsVerticalScrollIndicator={false}
                                        onEndReached={handleLoadMore}
                                        onEndReachedThreshold={0.1}
                                        ListFooterComponent={hasMoreData ? <ActivityIndicator color={'#000'} size={35}/> : null}
                                    />
                                </View>
                            )}
                        
                    </View>
                )}
            </ImageBackground>
        </View>        
    )
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 300,
        backgroundColor: 'black', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    imageicon: {
        width: 100,
        height: 100,
        marginVertical: 10,
        borderRadius: 500,
        borderColor: 'black',
        marginBottom: 20,
        borderWidth: 1
    },
    row: {
        flexDirection: 'row',
        height: 60,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rownobg: {
        flexDirection: 'row',
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemlist: {
        width: 300,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        backgroundColor: 'white'
    }
})