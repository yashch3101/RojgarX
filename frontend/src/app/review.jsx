import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Animated, ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function ReviewProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const slideUpAnim = useRef(new Animated.Value(20)).current;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Faking an API call delay
    setTimeout(() => {
      // Temporary Dummy Profile Data
      setProfile({
        full_name: "Rahul Developer",
        email: "rahul@example.com",
        headline: "Frontend Engineer | React Native Developer",
        summary: "Passionate software engineer with experience building scalable mobile applications and connecting APIs.",
        github_url: "https://github.com/rahul",
        linkedin_url: "https://linkedin.com/in/rahul",
        portfolio_url: "",
        profile_photo_url: ""
      });
      setLoading(false);

      // Triggering animations once data is loaded
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 8, tension: 40, useNativeDriver: true }),
        Animated.timing(slideUpAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]).start();
    }, 1500);
  }, []);

  const handleContinue = () => {
    router.replace('/interview-intro'); 
  };

  if (loading) {
    return (
      <View style={[styles.mainContainer, styles.centerContainer, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={[styles.mainContainer, styles.centerContainer, { paddingTop: insets.top }]}>
        <Text style={styles.errorTitle}>Unable to load profile</Text>
        <Text style={styles.errorText}>{error || 'Profile information could not be loaded.'}</Text>
      </View>
    );
  }

  const fullName = profile.full_name?.trim() || 'Your Profile';
  const email = profile.email?.trim() || 'Not available';
  const headline = profile.headline?.trim() || 'Profile information imported successfully';
  const summary = profile.summary?.trim() || 'Resume/profile information will be processed shortly.';
  const githubConnected = Boolean(profile.github_url?.trim());
  const linkedinConnected = Boolean(profile.linkedin_url?.trim());
  const portfolioConnected = Boolean(profile.portfolio_url?.trim());
  const profilePhoto = profile.profile_photo_url?.trim();
  const profileInitial = fullName.charAt(0).toUpperCase();

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <Animated.View
        style={[
          styles.contentWrapper,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: slideUpAnim }],
            paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 40,
          },
        ]}
      >
        <View style={styles.topSection}>
          <View style={styles.header}>
            <Text style={styles.mainTitle}>Review your profile</Text>
            <Text style={styles.subtitle}>
              Please review the details{'\n'}we found from your information
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Profile Summary</Text>
            
            <View style={styles.profileInfoSection}>
              {profilePhoto ? (
                <Image source={{ uri: profilePhoto }} style={styles.profilePic} />
              ) : (
                <View style={styles.profileInitial}>
                  <Text style={styles.profileInitialText}>{profileInitial}</Text>
                </View>
              )}
              <View style={styles.nameRoleSection}>
                <Text style={styles.nameText} numberOfLines={1}>{fullName}</Text>
                <Text style={styles.roleText} numberOfLines={2}>{headline}</Text>
              </View>
            </View>

            <View style={styles.detailsSection}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue} numberOfLines={2}>{email}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>GitHub</Text>
                <Text style={[styles.detailValue, githubConnected ? styles.connectedText : styles.notConnectedText]} numberOfLines={2}>
                  {githubConnected ? 'Connected' : 'Not connected'}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>LinkedIn</Text>
                <Text style={[styles.detailValue, linkedinConnected ? styles.connectedText : styles.notConnectedText]} numberOfLines={2}>
                  {linkedinConnected ? 'Connected' : 'Not connected'}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Portfolio</Text>
                <Text style={[styles.detailValue, portfolioConnected ? styles.connectedText : styles.notConnectedText]} numberOfLines={2}>
                  {portfolioConnected ? 'Connected' : 'Not connected'}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.detailLabel}>Summary</Text>
                <Text style={styles.detailValue} numberOfLines={4}>{summary}</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.continueBtn} activeOpacity={0.8} onPress={handleContinue}>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#050B14' },
  centerContainer: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  contentWrapper: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 25, marginTop: 20 },
  topSection: { flex: 1 },
  header: { alignItems: 'center', marginBottom: 40 },
  mainTitle: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', marginBottom: 10 },
  subtitle: { fontSize: 15, color: '#94A3B8', textAlign: 'center', lineHeight: 22, fontWeight: '500' },
  card: { backgroundColor: '#0E1629', borderRadius: 20, borderWidth: 1, borderColor: '#1E293B', overflow: 'hidden' },
  cardHeader: { backgroundColor: 'rgba(255, 107, 0, 0.05)', color: '#FFFFFF', fontSize: 16, fontWeight: '700', textAlign: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#1E293B' },
  profileInfoSection: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#1E293B' },
  profilePic: { width: 60, height: 60, borderRadius: 30, marginRight: 15, borderWidth: 2, borderColor: '#FF6B00' },
  profileInitial: { width: 60, height: 60, borderRadius: 30, marginRight: 15, borderWidth: 2, borderColor: '#FF6B00', backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center' },
  profileInitialText: { color: '#FFFFFF', fontSize: 28, fontWeight: '700' },
  nameRoleSection: { flex: 1 },
  nameText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  roleText: { fontSize: 14, color: '#94A3B8', fontWeight: '500' },
  detailsSection: { padding: 20, gap: 15 },
  detailRow: { flexDirection: 'row', alignItems: 'flex-start' },
  summaryRow: { flexDirection: 'row', alignItems: 'flex-start' },
  detailLabel: { width: 100, fontSize: 14, color: '#64748B', fontWeight: '600' },
  detailValue: { flex: 1, fontSize: 14, color: '#E2E8F0', fontWeight: '500' },
  connectedText: { color: '#4ADE80', fontWeight: '600' },
  notConnectedText: { color: '#94A3B8' },
  loadingText: { marginTop: 15, color: '#94A3B8', fontSize: 15 },
  errorTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
  errorText: { color: '#94A3B8', fontSize: 14, textAlign: 'center', lineHeight: 21, marginBottom: 25 },
  continueBtn: { backgroundColor: '#FF6B00', width: '100%', paddingVertical: 16, borderRadius: 16, alignItems: 'center', shadowColor: '#FF6B00', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  continueBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});