import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {useAuth} from '../contexts/auth';

export default function Routes() {
    const {signed} = useAuth();
    const loading = false;

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#36393F',
                }}>
                <ActivityIndicator size={25} color="#E52246" />
            </View>
        );
    }

    return signed ? <AppRoutes /> : <AuthRoutes />;
}
