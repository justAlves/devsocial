import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import firestore from '@react-native-firebase/firestore';
import IPost from '../../types/Post';
import Post from '../../components/Post';

export default function Home() {
    const navigation = useNavigation();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(false);

    const [loadingRefresh, setLoadingRefresh] = useState(false);
    const [lastItem, setLastItem] = useState<any>();
    const [emptyList, setEmptyList] = useState(false);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            function fetchPosts() {
                setLoading(true);
                firestore()
                    .collection('posts')
                    .orderBy('createdAt', 'desc')
                    .limit(5)
                    .get()
                    .then(snapshot => {
                        if (isActive) {
                            setPosts([]);
                            const postList: IPost[] = [];

                            snapshot.docs.map(p => {
                                postList.push({
                                    ...(p.data() as IPost),
                                    id: p.id,
                                });
                            });

                            setEmptyList(!!snapshot.empty);
                            setPosts(postList);
                            setLastItem(
                                snapshot.docs[snapshot.docs.length - 1],
                            );
                            setLoading(false);
                        }
                    });
            }

            fetchPosts();

            return () => {
                isActive = false;
            };
        }, []),
    );

    async function handleRefresh() {
        setLoadingRefresh(true);

        firestore()
            .collection('posts')
            .orderBy('createdAt', 'desc')
            .limit(5)
            .get()
            .then(snapshot => {
                setPosts([]);
                const postList: IPost[] = [];

                snapshot.docs.map(p => {
                    postList.push({
                        ...(p.data() as IPost),
                        id: p.id,
                    });
                });

                setEmptyList(false);
                setPosts(postList);
                setLastItem(snapshot.docs[snapshot.docs.length - 1]);
                setLoading(false);
                setLoadingRefresh(false);
            });
    }

    function handleNewPost() {
        navigation.navigate('NewPost' as never);
    }

    async function getListPost() {
        if (emptyList) {
            setLoading(false);
            return null;
        }

        if (loading) {
            return;
        }

        firestore()
            .collection('posts')
            .orderBy('createdAt', 'desc')
            .limit(5)
            .startAfter(lastItem)
            .get()
            .then(snapshot => {
                const postList: IPost[] = [];

                snapshot.docs.map(p => {
                    postList.push({
                        ...(p.data() as IPost),
                        id: p.id,
                    });
                });

                setEmptyList(!!snapshot.empty);
                setLastItem(snapshot.docs[snapshot.docs.length - 1]);
                setPosts(old => [...old, ...postList]);
                setLoading(false);
            });
    }

    return (
        <View style={styles.container}>
            <Header />
            {loading ? (
                <ActivityIndicator
                    style={{marginTop: 16}}
                    color="#fff"
                    size={25}
                />
            ) : (
                <FlatList
                    data={posts}
                    renderItem={({item}) => <Post data={item} />}
                    style={styles.list}
                    refreshing={loadingRefresh}
                    onRefresh={handleRefresh}
                    onEndReached={getListPost}
                    onEndReachedThreshold={0.3}
                />
            )}
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
    list: {
        flex: 1,
        backgroundColor: '#000',
    },
});
