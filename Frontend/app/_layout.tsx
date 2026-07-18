import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { SurveyProvider } from '@/context/SurveyContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SurveyProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer
          screenOptions={{
            headerShown: true,
            drawerActiveTintColor: '#007AFF',
            drawerInactiveTintColor: '#555',
            drawerStyle: {
              backgroundColor: '#fff',
              width: 250,
            },
          }}
        >
          {/* Main Tab Screen - represents Dashboard in Drawer */}
          <Drawer.Screen
            name="(tabs)"
            options={{
              title: 'Smart Field Survey',
              drawerLabel: 'Dashboard',
            }}
          />
          {/* Survey Screen in Drawer */}
          <Drawer.Screen
            name="survey"
            options={{
              title: 'Create Survey',
              drawerLabel: 'Survey',
            }}
          />
          {/* Camera Screen in Drawer */}
          <Drawer.Screen
            name="camera"
            options={{
              title: 'Camera Module',
              drawerLabel: 'Camera',
            }}
          />
          {/* Location Screen in Drawer */}
          <Drawer.Screen
            name="location"
            options={{
              title: 'Location Module',
              drawerLabel: 'Location',
            }}
          />
          {/* Contacts Screen in Drawer */}
          <Drawer.Screen
            name="contacts"
            options={{
              title: 'Contacts Module',
              drawerLabel: 'Contacts',
            }}
          />
          {/* Clipboard Screen in Drawer */}
          <Drawer.Screen
            name="clipboard"
            options={{
              title: 'Clipboard Module',
              drawerLabel: 'Clipboard',
            }}
          />
          {/* Settings Screen in Drawer */}
          <Drawer.Screen
            name="settings"
            options={{
              title: 'Settings',
              drawerLabel: 'Settings',
            }}
          />
          {/* Hide modal and other screens from the drawer items list */}
          <Drawer.Screen
            name="modal"
            options={{
              drawerItemStyle: { display: 'none' },
            }}
          />
          <Drawer.Screen
            name="history"
            options={{
              drawerItemStyle: { display: 'none' },
            }}
          />
          <Drawer.Screen
            name="profile"
            options={{
              drawerItemStyle: { display: 'none' },
            }}
          />
        </Drawer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SurveyProvider>
  );
}
