import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BuildingProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const [progress, setProgress] = useState(0);
  
  // Animations
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const steps = [
    "Reading Resume",
    "Analyzing Skills",
    "Fetching Projects",
    "Matching Experience",
    "Finalizing Profile"
  ];

  const activeStep = Math.min(Math.floor(progress / 20), 4);

  useEffect(() => {
    // 1. Initial Fade In
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // 2. Spinning Animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // 3. Pulse Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true })
      ])
    ).start();

    // 4. Progress Counter Logic (0 to 100 in ~4 seconds)
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          router.replace('/review'); // <-- Navigates to Review screen
        }, 500);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.contentWrapper, { opacity: fadeAnim }]}>
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>AI is building your profile</Text>
          <Text style={styles.subtitle}>
            Please wait while we analyze{'\n'}your documents and profiles
          </Text>
        </View>

        {/* Circular Progress Section */}
        <View style={styles.progressContainer}>
          <Animated.View style={[
            styles.progressRing, 
            { transform: [{ rotate: spin }, { scale: pulseAnim }] }
          ]}>
            <View style={styles.ringHalf1} />
            <View style={styles.ringHalf2} />
          </Animated.View>
          
          <View style={styles.percentageWrapper}>
            <Text style={styles.percentageText}>{progress}%</Text>
          </View>
        </View>

        {/* Checklist Section */}
        <View style={styles.checklistContainer}>
          {steps.map((step, index) => {
            const isCompleted = index < activeStep;
            const isActive = index === activeStep;
            
            return (
              <View key={index} style={styles.checklistItem}>
                {index !== steps.length - 1 && (
                  <View style={[
                    styles.connectingLine, 
                    { backgroundColor: isCompleted ? '#10B981' : '#1E293B' }
                  ]} />
                )}
                
                <View style={styles.iconWrapper}>
                  {isCompleted ? (
                    <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                  ) : isActive ? (
                    <Ionicons name="radio-button-on" size={24} color="#FF6B00" />
                  ) : (
                    <Ionicons name="ellipse-outline" size={24} color="#64748B" />
                  )}
                </View>
                
                <Text style={[
                  styles.stepText,
                  isCompleted && styles.completedStepText,
                  isActive && styles.activeStepText
                ]}>
                  {step}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Footer Text & Robot Icon */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>This may take a few seconds...</Text>
          <MaterialCommunityIcons 
            name="robot-excited-outline" 
            size={60} 
            color="#FF6B00" 
            style={styles.robotIcon} 
          />
        </View>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#050B14' },
  contentWrapper: { flex: 1, alignItems: 'center', paddingHorizontal: 30, paddingTop: 40, paddingBottom: 20 },
  titleSection: { alignItems: 'center', marginBottom: 40 },
  mainTitle: { fontSize: 24, fontWeight: '800', color: '#FFFFFF', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#94A3B8', textAlign: 'center', lineHeight: 22, fontWeight: '500' },
  progressContainer: { width: 140, height: 140, justifyContent: 'center', alignItems: 'center', marginBottom: 50 },
  progressRing: { position: 'absolute', width: 140, height: 140, borderRadius: 70, borderWidth: 4, borderColor: 'rgba(30, 41, 59, 0.5)', justifyContent: 'center', alignItems: 'center' },
  ringHalf1: { position: 'absolute', top: -4, left: -4, width: 74, height: 148, borderTopLeftRadius: 74, borderBottomLeftRadius: 74, borderWidth: 4, borderRightWidth: 0, borderColor: '#FF6B00' },
  ringHalf2: { position: 'absolute', bottom: -4, right: -4, width: 74, height: 74, borderBottomRightRadius: 74, borderWidth: 4, borderTopWidth: 0, borderLeftWidth: 0, borderColor: '#10B981' },
  percentageWrapper: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#0E1629', justifyContent: 'center', alignItems: 'center', shadowColor: '#FF6B00', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 5 },
  percentageText: { fontSize: 28, fontWeight: '800', color: '#FFFFFF' },
  checklistContainer: { width: '100%', paddingHorizontal: 10, marginBottom: 40 },
  checklistItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, position: 'relative' },
  connectingLine: { position: 'absolute', left: 11, top: 24, width: 2, height: 25, zIndex: -1 },
  iconWrapper: { width: 24, alignItems: 'center', marginRight: 15, backgroundColor: '#050B14' },
  stepText: { fontSize: 16, fontWeight: '500', color: '#64748B' },
  activeStepText: { color: '#FF6B00', fontWeight: '700' },
  completedStepText: { color: '#F8FAFC', fontWeight: '600' },
  footerContainer: { alignItems: 'center', marginTop: 'auto' },
  footerText: { fontSize: 13, color: '#94A3B8', marginBottom: 15, fontWeight: '500' },
  robotIcon: { opacity: 0.9 }
});