import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";


import Contact from '../TestScreens/ContactTestScreen'
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Drawer.Screen name="_home" component={TabNavigator} />
            <Drawer.Screen name="Contact" component={Contact} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;