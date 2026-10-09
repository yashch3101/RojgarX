import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Easing, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AIInterviewScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(40)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // 1. Smooth Entry Animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideUpAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();

    // 2. Robot Floating Animation (Up and Down)
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -12, 
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0, 
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ])
    ).start();

    // 3. Glowing Background Animation Behind the Card
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.4,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  const handleStartInterview = () => {
    // Backend hata kar abhi ke liye temporary UI transition rakha hai
    // Jab interview session screen banaoge, yahan uska route daal dena (e.g., router.push('/interview-session'))
    router.replace('/home'); 
  };

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#050B14" />
      
      <Animated.View 
        style={[
          styles.contentWrapper, 
          { 
            opacity: fadeAnim, 
            transform: [{ translateY: slideUpAnim }],
            paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 30 
          }
        ]}
      >
        
        {/* TOP SECTION: Header */}
        <View style={styles.header}>
          <Text style={styles.mainTitle}>AI Interview</Text>
          <Text style={styles.subtitle}>
            Final step! Let's evaluate{'\n'}your skills and personality
          </Text>
        </View>

        {/* MIDDLE SECTION: Cards with Glowing Background */}
        <View style={styles.middleSection}>
          
          {/* Ambient Glowing Layer behind the card */}
          <Animated.View style={[styles.glowBackground, { opacity: glowAnim }]} />

          {/* Gradient Card with Robot */}
          <LinearGradient
            colors={['#1E3A8A', '#0F172A']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientCard}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Interview Type</Text>
              
              <View style={styles.listContainer}>
                <View style={styles.listItem}>
                  <Ionicons name="disc" size={18} color="#FF6B00" />
                  <Text style={styles.listText}>Technical Skills</Text>
                </View>
                <View style={styles.listItem}>
                  <Ionicons name="disc" size={18} color="#FF6B00" />
                  <Text style={styles.listText}>Communication</Text>
                </View>
                <View style={styles.listItem}>
                  <Ionicons name="disc" size={18} color="#FF6B00" />
                  <Text style={styles.listText}>Problem Solving</Text>
                </View>
                <View style={styles.listItem}>
                  <Ionicons name="disc" size={18} color="#FF6B00" />
                  <Text style={styles.listText}>Behavioral</Text>
                </View>
              </View>
            </View>

            {/* Floating Robot Image */}
            <Animated.View style={[styles.robotContainer, { transform: [{ translateY: floatAnim }] }]}>
              <Image 
                source={{ uri: 'https://img.icons8.com/3d-fluency/256/robot.png' }} 
                style={styles.robotImage} 
                resizeMode="contain"
              />
            </Animated.View>
          </LinearGradient>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Duration: 20-30 Minutes</Text>
            <Text style={styles.infoSubtitle}>
              Make sure you are in a quiet place{'\n'}with good internet connection
            </Text>
          </View>

        </View>

        {/* BOTTOM SECTION: Start Button */}
        <TouchableOpacity 
          style={styles.startBtn} 
          activeOpacity={0.8}
          onPress={handleStartInterview}
        >
          <Text style={styles.startBtnText}>Start Interview</Text>
        </TouchableOpacity>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#050B14',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: 15,
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },

  middleSection: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
    position: 'relative',
  },

  // Glowing Background Effect
  glowBackground: {
    position: 'absolute',
    top: '20%',
    left: '5%',
    right: '5%',
    height: 220,
    backgroundColor: 'rgba(255, 107, 0, 0.18)',
    borderRadius: 30,
    filter: 'blur(30px)', // Web/Expo support
    zIndex: 0,
  },

  // Gradient Card
  gradientCard: {
    borderRadius: 24,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'visible',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 107, 0, 0.3)',
    marginBottom: 25,
    minHeight: 220,
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
    zIndex: 1,
  },
  cardContent: {
    flex: 1,
    zIndex: 2,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  listContainer: {
    gap: 14,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listText: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '600',
  },
  
  // Robot Image
  robotContainer: {
    position: 'absolute',
    right: -10,
    bottom: -15,
    width: 140,
    height: 140,
    zIndex: 3,
  },
  robotImage: {
    width: '100%',
    height: '100%',
  },

  // Info Card
  infoCard: {
    backgroundColor: '#0E1629',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
    zIndex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },

  // Start Button
  startBtn: {
    backgroundColor: '#FF6B00',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});