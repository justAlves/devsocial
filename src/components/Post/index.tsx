import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import IPost from '../../types/Post';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatDistance} from 'date-fns';
import {ptBR} from 'date-fns/locale';

export default function Post({data}: {data: IPost}) {
    const [postLikes, setPostLikes] = useState(data.likes);

    function formatTime() {
        const date = new Date(data.createdAt.seconds * 1000);

        return formatDistance(new Date(), date, {
            locale: ptBR,
        });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} style={styles.header}>
                {data.avatarUrl ? (
                    <Image
                        style={styles.avatar}
                        source={{uri: data.avatarUrl}}
                    />
                ) : (
                    <Image
                        style={styles.avatar}
                        source={require('../../assets/avatar.png')}
                    />
                )}
                <Text style={styles.owner}>{data.owner}</Text>
            </TouchableOpacity>
            <Text style={styles.content}>{data.content}</Text>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.likeButton} activeOpacity={0.8}>
                    <Icon
                        name={postLikes === 0 ? 'heart-outline' : 'heart'}
                        color="#E52246"
                        size={25}
                    />
                    <Text style={styles.likeCount}>
                        {postLikes === 0 ? '' : postLikes}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.timeCount}>{formatTime()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 16,
        marginVertical: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#c2cce181',
    },
    owner: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 22,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    content: {
        color: '#fff',
        fontSize: 18,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    likeButton: {
        flexDirection: 'row',
        gap: 4,
    },
    likeCount: {
        color: '#E52246',
        fontSize: 18,
        fontWeight: '700',
    },
    timeCount: {
        color: '#fff',
    },
});
