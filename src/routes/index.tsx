import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {useAuth} from '../contexts/auth';

export default function Routes() {
    const {signed, loading} = useAuth();

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#000',
                }}>
                <ActivityIndicator size={25} color="#fff" />
            </View>
        );
    }

    return signed ? <AppRoutes /> : <AuthRoutes />;
}
