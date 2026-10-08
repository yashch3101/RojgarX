import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  StatusBar
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // Expo Router added

const LoginScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      Alert.alert(
        'Email Required',
        'Please enter email'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email'
      );
      return;
    }
    console.log('Valid email entered, moving to home (Temporary flow for UI)');
    router.push({ pathname: '/otp', params: { email: normalizedEmail } });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop' }} 
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['transparent', 'rgba(5, 11, 20, 0.6)', '#050B14', '#050B14']}
          locations={[0, 0.4, 0.7, 1]}
          style={styles.gradientOverlay}
        >
          {/* TOP BACK BUTTON (Fixed position, keyboard se nahi hilega) */}
          <View style={[styles.fixedHeader, { top: insets.top > 0 ? insets.top + 10 : 50 }]}>
            <TouchableOpacity 
              style={styles.backBtn}
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.contentContainer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}
          >
            
            {/* Top Area (Empty space to let background show) */}
            <View style={styles.topSpace} />

            {/* Bottom Form Area */}
            <View style={styles.formContainer}>
              
              {/* Title Section */}
              <View style={styles.titleWrapper}>
                <Text style={styles.welcomeText}>
                  Welcome to <Text style={styles.highlightText}>RojgarX</Text>
                </Text>
                <Text style={styles.subtitleText}>Sign up or login to your account</Text>
              </View>

              {/* Email Input Field */}
              <View style={styles.inputContainer}>
                <View style={styles.iconWrapper}>
                  <Feather name="mail" size={20} color="#94A3B8" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email Address"
                  placeholderTextColor="#64748B"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Continue Button */}
              <TouchableOpacity style={styles.continueBtn} onPress={handleContinue} activeOpacity={0.8}>
                <Text style={styles.continueBtnText}>Continue</Text>
              </TouchableOpacity>

              {/* Terms and Conditions */}
              <Text style={styles.termsText}>
                By continuing you agree to our <Text style={styles.termsLink}>T&C Privacy policy</Text>
              </Text>

            </View>

          </KeyboardAvoidingView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#050B14',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    flex: 1,
    width: '100%',
  },
  // Fixed Back Button Style
  fixedHeader: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  topSpace: {
    flex: 1, 
  },
  formContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  highlightText: {
    color: '#FF6B00',
  },
  subtitleText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E1629',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 16,
    height: 55,
    marginBottom: 20,
    overflow: 'hidden',
  },
  iconWrapper: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  input: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 15,
    paddingHorizontal: 15,
    height: '100%',
  },
  continueBtn: {
    backgroundColor: '#FF6B00',
    height: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  termsText: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 12,
  },
  termsLink: {
    color: '#94A3B8',
    fontWeight: '600',
    textDecorationLine: 'underline',
  }
});

export default LoginScreen;