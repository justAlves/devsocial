import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../../contexts/auth';
import ToastManager, {Toast} from 'toastify-react-native';

interface LoginProps {
    login: boolean;
    setLogin: (e: boolean) => void;
}

export default function LoginPage({login, setLogin}: LoginProps) {
    const [passVisibilty, setPassVisibilty] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signin, loading} = useAuth();

    async function handleLogin() {
        if (email.trim() === '' && password.trim() === '') {
            Toast.error('Preencha todos os campos para continuar.', 'top');
            return;
        }

        await signin(email, password);
    }

    return (
        <View style={styles.container}>
            <ToastManager />
            <Text style={styles.title}>Bem vindo de volta!</Text>
            <TextInput
                style={styles.input}
                placeholder="Insira seu email"
                placeholderTextColor="#C2CCE1"
                onChangeText={t => setEmail(t)}
                value={email}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Insira sua senha"
                    placeholderTextColor="#C2CCE1"
                    secureTextEntry={passVisibilty}
                    onChangeText={t => setPassword(t)}
                    value={password}
                />
                <TouchableOpacity
                    onPress={() => setPassVisibilty(!passVisibilty)}>
                    {passVisibilty ? (
                        <Icon name="eye-off" size={32} color="#C2CCE1" />
                    ) : (
                        <Icon name="eye" size={32} color="#C2CCE1" />
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <Text style={{fontSize: 18, color: '#C2CCE1'}}>
                        Esqueceu a Senha?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {loading ? (
                        <ActivityIndicator size={20} color={'#000'} />
                    ) : (
                        <Text style={{fontSize: 20, fontWeight: '700'}}>
                            Entrar
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 'auto',
                }}>
                <TouchableOpacity onPress={() => setLogin(!login)}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: '#C2CCE1',
                        }}>
                        Não tem uma conta? Registre agora
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 32,
    },
    title: {
        marginTop: 64,
        marginBottom: 32,
        color: '#fff',
        fontSize: 42,
        fontWeight: '700',
    },
    input: {
        width: '100%',
        padding: 16,
        fontSize: 20,
        backgroundColor: '#41444A',
        borderRadius: 16,
        color: '#fff',
        marginBottom: 16,
    },
    buttonContainer: {
        alignItems: 'flex-end',
        gap: 20,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 16,
    },
    passwordInput: {
        width: '80%',
        fontSize: 20,
        color: '#fff',
        paddingVertical: 16,
    },
    passwordContainer: {
        width: '100%',
        backgroundColor: '#41444A',
        borderRadius: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
});
