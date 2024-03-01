import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    function handleNewPost() {
        navigation.navigate('NewPost' as never);
    }

    return (
        <View style={styles.container}>
            <Text style={{color: '#fff'}}>Home</Text>
            <TouchableOpacity
                style={styles.buttonPost}
                activeOpacity={0.8}
                onPress={handleNewPost}>
                <Icon name="edit-2" color="#000" size={25} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    buttonPost: {
        position: 'absolute',
        bottom: '5%',
        right: '6%',
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
    },
});
