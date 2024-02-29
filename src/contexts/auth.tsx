import React, {ReactNode, createContext, useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface AuthProps {
    signed: boolean;
    signup: (
        email: string,
        password: string,
        username: string,
    ) => Promise<void>;
}

export const AuthContext = createContext({} as AuthProps);

interface AuthProviderProps {
    children: ReactNode;
}

interface IUser {
    uid: string;
    email: string | null;
    username: string;
}

export default function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<IUser | null>(null);

    async function signup(email: string, password: string, username: string) {
        await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async value => {
                let uid = value.user.uid;

                await firestore()
                    .collection('users')
                    .doc(uid)
                    .set({
                        username,
                        createdAt: new Date(),
                    })
                    .then(() => {
                        let data = {
                            uid,
                            username,
                            email: value.user.email,
                        };

                        setUser(data);
                    });
            })
            .catch(e => console.log(e));
    }

    return (
        <AuthContext.Provider value={{signed: !!user, signup}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
