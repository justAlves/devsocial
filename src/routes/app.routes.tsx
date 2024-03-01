import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import NewPost from '../pages/NewPost';
import UserPost from '../pages/UserPost';
import Icon from 'react-native-vector-icons/Ionicons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="NewPost"
                component={NewPost}
                options={{
                    title: 'Novo Post',
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                }}
            />
            <Stack.Screen
                name="UserPost"
                component={UserPost}
                options={{
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                }}
            />
        </Stack.Navigator>
    );
}

export default function AppRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: false,
                tabBarStyle: {backgroundColor: '#000'},
                tabBarActiveTintColor: '#fff',
                tabBarShowLabel: false,
            }}>
            <Tab.Screen
                name="HomeTab"
                component={StackRoutes}
                options={{
                    tabBarIcon: ({color, size}) => {
                        return <Icon name="home" color={color} size={size} />;
                    },
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({color, size}) => {
                        return <Icon name="search" color={color} size={size} />;
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({color, size}) => {
                        return (
                            <Icon
                                name="person-sharp"
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}
