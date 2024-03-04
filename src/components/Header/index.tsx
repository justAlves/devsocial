import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{'<devsocial />'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        borderBottomWidth: 0.5,
        borderBottomColor: '#c2cce181',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
        fontStyle: 'italic',
    },
});
