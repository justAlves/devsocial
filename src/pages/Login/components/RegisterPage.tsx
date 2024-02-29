import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';

interface RegisterProps {
    login: boolean;
    setLogin: (e: boolean) => void;
}

export default function RegisterPage({login, setLogin}: RegisterProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Olá! Registre-se para começar</Text>
            <TextInput
                style={styles.input}
                placeholder="Insira seu usuario"
                placeholderTextColor="#C2CCE1"
            />
            <TextInput
                style={styles.input}
                placeholder="Insira seu email"
                placeholderTextColor="#C2CCE1"
            />
            <TextInput
                style={styles.input}
                placeholder="Insira sua senha"
                placeholderTextColor="#C2CCE1"
            />
            <TextInput
                style={styles.input}
                placeholder="Repita sua senha"
                placeholderTextColor="#C2CCE1"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={{fontSize: 20, fontWeight: '700'}}>
                        Registrar
                    </Text>
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
});
