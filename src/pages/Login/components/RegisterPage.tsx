import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useState} from 'react';
import {useAuth} from '../../../contexts/auth';
import ToastManager, {Toast} from 'toastify-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RegisterProps {
    login: boolean;
    setLogin: (e: boolean) => void;
}

export default function RegisterPage({login, setLogin}: RegisterProps) {
    const {signup, loading} = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passVisibilty, setPassVisibilty] = useState(true);

    async function handleSignup() {
        if (
            username.trim() === '' &&
            email.trim() === '' &&
            password.trim() === ''
        ) {
            Toast.error('Preencha todos os campos para continuar.', 'top');
            return;
        }

        if (cPassword !== password) {
            Toast.error('As senhas não coincidem.', 'top');
            return;
        }

        await signup(email, password, username);
    }

    return (
        <View style={styles.container}>
            <ToastManager width={400} height={80} />
            <Text style={styles.title}>Olá! Registre-se para começar</Text>
            <TextInput
                style={styles.input}
                placeholder="Insira seu usuario"
                placeholderTextColor="#C2CCE1"
                onChangeText={t => setUsername(t)}
            />
            <TextInput
                style={styles.input}
                placeholder="Insira seu email"
                placeholderTextColor="#C2CCE1"
                onChangeText={t => setEmail(t)}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Insira sua senha"
                    placeholderTextColor="#C2CCE1"
                    onChangeText={t => setPassword(t)}
                    secureTextEntry={passVisibilty}
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
            <TextInput
                style={styles.input}
                placeholder="Repita sua senha"
                placeholderTextColor="#C2CCE1"
                onChangeText={t => setCPassword(t)}
                secureTextEntry={passVisibilty}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    {loading ? (
                        <ActivityIndicator size={20} color={'#000'} />
                    ) : (
                        <Text style={{fontSize: 20, fontWeight: '700'}}>
                            Registrar
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
                        Já tem uma conta? Entre agora
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
