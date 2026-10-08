import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isJobs = pathname === '/home';
  const isInterview = pathname === '/interview';
  const isFreelance = pathname === '/freelance';
  const isDegree = pathname === '/degree';

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => router.navigate('/home')}
        activeOpacity={0.8}
      >
        <Feather name="briefcase" size={22} color={isJobs ? '#FF6B00' : '#9CA3AF'} />
        <Text style={[styles.navText, isJobs && styles.activeNavText]}>Jobs</Text>
        {isJobs && <View style={styles.activeNavIndicator} />}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => router.navigate('/interview')}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="clipboard-text-outline" size={24} color={isInterview ? '#FF6B00' : '#9CA3AF'} />
        <Text style={[styles.navText, isInterview && styles.activeNavText]}>Interview</Text>
        {isInterview && <View style={styles.activeNavIndicator} />}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => router.navigate('/freelance')}
        activeOpacity={0.8}
      >
        <Feather name="monitor" size={22} color={isFreelance ? '#FF6B00' : '#9CA3AF'} />
        <Text style={[styles.navText, isFreelance && styles.activeNavText]}>Freelance</Text>
        {isFreelance && <View style={styles.activeNavIndicator} />}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => router.navigate('/degree')}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="school-outline" size={24} color={isDegree ? '#FF6B00' : '#9CA3AF'} />
        <Text style={[styles.navText, isDegree && styles.activeNavText]}>Degree</Text>
        {isDegree && <View style={styles.activeNavIndicator} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0B0F19',
    paddingVertical: Platform.OS === 'ios' ? 25 : 15,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  navItem: {
    alignItems: 'center',
    gap: 6,
    width: 60,
  },
  navText: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#FF6B00',
  },
  activeNavIndicator: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? -25 : -15,
    width: 35,
    height: 3,
    backgroundColor: '#FF6B00',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
});