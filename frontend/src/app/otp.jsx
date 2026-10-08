import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  KeyboardAvoidingView, 
  Platform, 
  Animated,
  Alert,
  StatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Expo Router hooks

const OtpScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // Get email from previous screen if passed, otherwise use default string for UI
  const { email } = useLocalSearchParams(); 

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  
  // Success Animation States
  const [isSuccess, setIsSuccess] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Auto-focus logic for OTP inputs
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if text is entered
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Move to previous input on Backspace if current box is empty
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('').trim();

    // OTP incomplete
    if (enteredOtp.length !== 6) {
      Alert.alert(
        'Invalid OTP',
        'Please enter the 6-digit OTP'
      );
      return;
    }

    // Backend part hata diya gaya hai. 
    // Temporary logic for UI success animation
    setIsSuccess(true);

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 15,
        friction: 4,
        useNativeDriver: true,
      }),

      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to Home after successful verification
    setTimeout(() => {
        router.replace('/home');
    }, 2000);
  };

  return (
    <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop' }} 
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['transparent', 'rgba(5, 11, 20, 0.6)', '#050B14', '#050B14']}
          locations={[0, 0.4, 0.7, 1]}
          style={styles.gradientOverlay}
        >
          {/* TOP BACK BUTTON (Fixed position, keyboard se nahi hilega) */}
          {!isSuccess && (
            <View style={[styles.fixedHeader, { top: insets.top > 0 ? insets.top + 10 : 50 }]}>
              <TouchableOpacity 
                style={styles.backBtn}
                onPress={() => router.back()}
              >
                <Feather name="arrow-left" size={22} color="#FFF" />
              </TouchableOpacity>
            </View>
          )}

          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.contentContainer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}
          >
            
            <View style={styles.topSpace} />

            {isSuccess ? (
              <Animated.View style={[styles.successContainer, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
                <View style={styles.successIconWrapper}>
                  <Feather name="check" size={40} color="#FFFFFF" />
                </View>
                <Text style={styles.successTitle}>Verified Successfully!</Text>
                <Text style={styles.successSubtitle}>Taking you to your dashboard...</Text>
              </Animated.View>
            ) : (
              <View style={styles.formContainer}>
                
                {/* Title Section */}
                <View style={styles.titleWrapper}>
                  <Text style={styles.welcomeText}>Verify OTP</Text>
                  <Text style={styles.subtitleText}>Enter the 6-digit code sent to your email</Text>
                </View>

                {/* 6-Digit OTP Input Row */}
                <View style={styles.otpRow}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => { inputRefs.current[index] = ref; }}
                      style={styles.otpBox}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={digit}
                      onChangeText={(text) => handleOtpChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      textAlign="center"
                    />
                  ))}
                </View>

                {/* Resend Code */}
                <TouchableOpacity activeOpacity={0.7} style={styles.resendContainer}>
                  <Text style={styles.resendText}>Resend code</Text>
                </TouchableOpacity>

                {/* Verify Button */}
                <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify} activeOpacity={0.8}>
                  <Text style={styles.verifyBtnText}>Verify</Text>
                </TouchableOpacity>

              </View>
            )}

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
    marginBottom: 35,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  otpBox: {
    width: 45,
    height: 55,
    backgroundColor: '#E2E8F0', 
    borderRadius: 12,
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resendText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '500',
  },
  verifyBtn: {
    backgroundColor: '#FF6B00', 
    height: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  verifyBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  
  // Success Animation Styles
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  successIconWrapper: {
    width: 80,
    height: 80,
    backgroundColor: '#10B981',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
});

export default OtpScreen;