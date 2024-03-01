import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useAuth} from '../../contexts/auth';
import {useNavigation} from '@react-navigation/native';

export default function NewPost() {
    const [post, setPost] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useAuth();
    const navigation = useNavigation();

    async function handlePost() {
        if (post === '') {
            return;
        }

        setLoading(true);
        let avatarUrl = null;
        try {
            let response = await storage()
                .ref('users')
                .child(user?.uid as string)
                .getDownloadURL();
            avatarUrl = response;
        } catch (error) {
            avatarUrl = null;
        }

        await firestore()
            .collection('posts')
            .add({
                createdAt: new Date(),
                content: post,
                owner: user?.username,
                userId: user?.uid,
                likes: 0,
                avatarUrl,
            })
            .then(() => {
                setPost('');
                setLoading(false);
                navigation.goBack();
            });
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                cursorColor="#fff"
                placeholder="O que está acontecendo?"
                placeholderTextColor="#c2cce16e"
                autoCorrect={false}
                multiline
                maxLength={150}
                value={post}
                onChangeText={t => setPost(t)}
            />
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={handlePost}>
                {loading ? (
                    <ActivityIndicator size={18} color="#000" />
                ) : (
                    <Text style={{fontWeight: '900', fontSize: 18}}>
                        Publicar
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'flex-end',
        padding: 16,
    },
    input: {
        width: '100%',
        height: '10%',
        borderBottomWidth: 2,
        borderColor: '#c2cce181',
        color: '#fff',
        fontSize: 18,
        marginBottom: 25,
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        width: 120,
        borderRadius: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
