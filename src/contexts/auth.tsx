import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProps {
    signed: boolean;
    signup: (
        email: string,
        password: string,
        username: string,
    ) => Promise<void>;
    signin: (email: string, password: string) => Promise<void>;
    loading: boolean;
    user: IUser | null;
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

interface IUserProfile {
    username: string;
    createdAt: string;
}

export default function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getUser() {
            setLoading(true);
            const user = await AsyncStorage.getItem('@devsocial');

            if (user) {
                setUser(JSON.parse(user));
                setLoading(false);
            }

            setLoading(false);
        }

        getUser();
    }, []);

    async function storeUser(data: any) {
        await AsyncStorage.setItem('@devsocial', JSON.stringify(data));
    }

    async function signup(email: string, password: string, username: string) {
        setLoading(true);
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
                        storeUser(data);
                    });
            })
            .catch(e => console.log(e));
        setLoading(false);
    }

    async function signin(email: string, password: string) {
        setLoading(true);
        await auth()
            .signInWithEmailAndPassword(email, password)
            .then(async value => {
                let uid = value.user.uid;

                const userProfile = (
                    await firestore().collection('users').doc(uid).get()
                ).data() as IUserProfile;

                const data = {
                    uid,
                    username: userProfile.username,
                    email,
                };

                setUser(data);
                storeUser(data);
            });
        setLoading(false);
    }

    return (
        <AuthContext.Provider
            value={{signed: !!user, signup, signin, loading, user}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
