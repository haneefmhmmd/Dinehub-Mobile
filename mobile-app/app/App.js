import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuProvider } from './MenuItem/MenuContext'; // Import the MenuProvider

// import addcategory from './CategoryScreen/addcategory.jsx';
// import editcategory from './CategoryScreen/editcategory.jsx';
// import addmenuitem from './MenuItem/addmenuitem.jsx';
// import editmenuitem from './MenuItem/editmenuitem.jsx';


import addcategory from './CategoryScreen';
import editcategory from './CategoryScreen';
import addmenuitem from './MenuItem';
import editmenuitem from './MenuItem';



const Stack = createStackNavigator();

export default function App() {
  return (
    <MenuProvider> {/* Wrap the app with MenuProvider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Add Category">
          <Stack.Screen name="Add Category" component={addcategory} />
          <Stack.Screen name="Edit Category" component={editcategory} />
          <Stack.Screen name="Add Menu Item" component={addmenuitem} />
          <Stack.Screen name="Edit Menu Item" component={editmenuitem} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

