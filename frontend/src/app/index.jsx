import React, { useEffect } from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, 
  Dimensions, StatusBar, Platform 
} from 'react-native';
import Animated, { 
  FadeInDown, FadeInUp, ZoomIn, 
  useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing 
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Floating Animation Helper Component
const FloatingElement = ({ children, delay = 0, distance = 15, duration = 2500, style }) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      translateY.value = withRepeat(
        withTiming(-distance, { duration, easing: Easing.inOut(Easing.ease) }),
        -1,
        true 
      );
    }, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F19" />

      {/* BACKGROUND PARTICLES (Premium Floating Icons) */}
      <FloatingElement delay={0} distance={10} duration={3000} style={styles.particle1}>
        <Feather name="code" size={24} color="rgba(255, 107, 0, 0.2)" />
      </FloatingElement>
      <FloatingElement delay={500} distance={15} duration={4000} style={styles.particle2}>
        <Feather name="briefcase" size={30} color="rgba(59, 130, 246, 0.2)" />
      </FloatingElement>
      <FloatingElement delay={200} distance={12} duration={3500} style={styles.particle3}>
        <Feather name="star" size={20} color="rgba(16, 185, 129, 0.2)" />
      </FloatingElement>
      <FloatingElement delay={800} distance={8} duration={2800} style={styles.particle4}>
        <Feather name="cpu" size={35} color="rgba(139, 92, 246, 0.2)" />
      </FloatingElement>

      <View style={styles.content}>
        
        {/* LOGO & TAGLINE SECTION */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(800).springify()} 
          style={styles.headerContainer}
        >
          <Text style={styles.logoText}>Rojgar<Text style={styles.logoTextOrange}>X</Text></Text>
          
          <View style={styles.taglineBox}>
            <Text style={styles.tagline}>AI-Powered Career Platform</Text>
            <Text style={styles.subTagline}>Find Jobs. Get Hired.</Text>
            <Text style={styles.subTagline}>Build Your Future.</Text>
          </View>
        </Animated.View>

        {/* 3D / PROFESSIONAL ICON ILLUSTRATION WITH GLOW CARD */}
        <Animated.View 
        entering={ZoomIn.delay(500).duration(1000).springify()} 
        style={styles.imageContainer}
        >
        <FloatingElement delay={0} distance={18} duration={2600}>
            <View style={styles.iconCardGlow}>
            <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3242/3242257.png' }} 
                style={styles.illustrationIcon} 
            />
            </View>
        </FloatingElement>
        </Animated.View>

        {/* ACTION BUTTONS */}
        <Animated.View 
          entering={FadeInUp.delay(800).duration(800).springify()} 
          style={styles.footerContainer}
        >
          <TouchableOpacity 
            style={styles.primaryBtn} 
            activeOpacity={0.8}
            onPress={() => router.replace('/home')} 
          >
            <Text style={styles.primaryBtnText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.guestBtn}
            activeOpacity={0.7}
            onPress={() => router.replace('/home')}
          >
            <Text style={styles.guestBtnText}>Explore as Guest</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
    position: 'relative',
  },
  // Particle Positions
  particle1: { position: 'absolute', top: '15%', left: '10%' },
  particle2: { position: 'absolute', top: '25%', right: '15%' },
  particle3: { position: 'absolute', bottom: '35%', left: '15%' },
  particle4: { position: 'absolute', bottom: '45%', right: '10%' },
  
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 50 : 80,
    paddingBottom: Platform.OS === 'ios' ? 50 : 30,
    zIndex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  logoText: {
    color: '#FFF',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: 15,
  },
  logoTextOrange: {
    color: '#FF6B00',
  },
  taglineBox: {
    alignItems: 'center',
    gap: 4,
  },
  tagline: {
    color: '#D1D5DB',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subTagline: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '400',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain',
  },
  footerContainer: {
    width: '100%',
    gap: 15,
  },
  primaryBtn: {
    backgroundColor: '#FF6B00',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  guestBtn: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  guestBtnText: {
    color: '#9CA3AF',
    fontSize: 15,
    fontWeight: '600',
  },

  iconCardGlow: {
    width: width * 0.55,
    height: width * 0.55,
    backgroundColor: '#151A28',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F2937',
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  illustrationIcon: {
    width: width * 0.32,
    height: width * 0.32,
    resizeMode: 'contain',
  },
});