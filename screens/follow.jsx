import React, { useEffect, useState } from 'react';
import {ActivityIndicator, ImageBackground, Text, View, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Follow({ route, navigation }){
    const [isLoading, setLoading] = useState(true);
    const { type, userName } = route.params;
    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);

    const getFollow = async () => {
        try {
          const response = await fetch('https://api.github.com/users/' + userName + '/'+type+'?page='+page, {
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
    useEffect(() => {
        getFollow();
    }, []);

    const handleLoadMore = () => {
        if (!loadingMore && hasMoreData) {
          getFollow();
        }
      };

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
            {isLoading ? (
                <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    
                    <ActivityIndicator color={'#000'}/>
                </View>
                ) : (
                    <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width: '100%', height: 80, alignItems: 'center', justifyContent: 'center'}}>
                            <ImageBackground resizeMode='cover' source={require('../assets/bg_headprofile.png')} style={{width: '100%', height: 80, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontFamily: 'poppins-bold', fontSize: 15}}>{type.toUpperCase()}</Text>
                            </ImageBackground>
                        </View>
                        <FlatList
                            data={repos}
                            keyExtractor={(item, index) => item.id + index.toString()}
                            renderItem={({item}) => (
                                <TouchableOpacity style={styles.itemlist} onPress={() => navigation.navigate('DetailFollow', { userName: item.login })}>
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
                            )} 
                            showsVerticalScrollIndicator={false}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={hasMoreData ? <ActivityIndicator color={'#000'} size={35}/> : null}
                        />
                    </View>
            )}
            
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    
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
})