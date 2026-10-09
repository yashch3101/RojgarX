import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ConnectProfilesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Profile connection states
  const [isGithubConnected, setIsGithubConnected] = useState(true);
  const [isLinkedinConnected, setIsLinkedinConnected] = useState(true);
  const [isPortfolioConnected, setIsPortfolioConnected] = useState(false);

  // Profile URLs
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  // Loading & Animation
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 25,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // URL VALIDATION
  const isValidUrl = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const isValidGithubUrl = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.hostname.toLowerCase() === 'github.com' && parsed.pathname.length > 1;
    } catch {
      return false;
    }
  };

  const isValidLinkedinUrl = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.hostname.toLowerCase().includes('linkedin.com') && parsed.pathname.length > 1;
    } catch {
      return false;
    }
  };

  // HANDLE CONTINUE
  const handleContinue = () => {
    if (isLoading) return;

    if (isGithubConnected) {
      if (!githubUrl.trim()) {
        Alert.alert('GitHub URL Required', 'Please enter your GitHub profile URL.');
        return;
      }
      if (!isValidGithubUrl(githubUrl.trim())) {
        Alert.alert('Invalid GitHub URL', 'Please enter a valid GitHub profile URL.');
        return;
      }
    }

    if (isLinkedinConnected) {
      if (!linkedinUrl.trim()) {
        Alert.alert('LinkedIn URL Required', 'Please enter your LinkedIn profile URL.');
        return;
      }
      if (!isValidLinkedinUrl(linkedinUrl.trim())) {
        Alert.alert('Invalid LinkedIn URL', 'Please enter a valid LinkedIn profile URL.');
        return;
      }
    }

    if (isPortfolioConnected) {
      if (!portfolioUrl.trim()) {
        Alert.alert('Portfolio URL Required', 'Please enter your portfolio URL.');
        return;
      }
      if (!isValidUrl(portfolioUrl.trim())) {
        Alert.alert('Invalid Portfolio URL', 'Please enter a valid portfolio URL.');
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/building'); 
    }, 1500);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* FIXED BACK BUTTON */}
      <View style={[styles.fixedHeader, { top: insets.top > 0 ? insets.top : 20 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
          disabled={isLoading}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 20 : 0}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { 
              paddingTop: insets.top > 0 ? insets.top + 60 : 80, 
              paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 30 
            }
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              styles.contentWrapper,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* TOP SECTION: Title & Cards (Scrolls together) */}
            <View>
              {/* TITLE SECTION */}
              <View style={styles.titleSection}>
                <Text style={styles.mainTitle}>Connect your profiles</Text>
                <Text style={styles.subtitle}>
                  We'll fetch your projects,{'\n'}skills and achievements
                </Text>
              </View>

              {/* GITHUB CARD */}
              <View style={styles.profileSection}>
                <TouchableOpacity
                  style={[styles.connectionCard, isGithubConnected && styles.activeCard]}
                  activeOpacity={0.8}
                  onPress={() => setIsGithubConnected(!isGithubConnected)}
                  disabled={isLoading}
                >
                  <View style={styles.cardLeft}>
                    <FontAwesome name="github" size={28} color="#FFFFFF" />
                    <View style={styles.cardTextWrapper}>
                      <Text style={styles.cardTitle}>GitHub</Text>
                      <Text style={styles.cardSubtitle}>Fetch your repositories</Text>
                    </View>
                  </View>
                  <Ionicons
                    name={isGithubConnected ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={isGithubConnected ? '#FF6B00' : '#64748B'}
                  />
                </TouchableOpacity>

                {isGithubConnected && (
                  <TextInput
                    style={styles.urlInput}
                    placeholder="https://github.com/username"
                    placeholderTextColor="#64748B"
                    value={githubUrl}
                    onChangeText={setGithubUrl}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="url"
                  />
                )}
              </View>

              {/* LINKEDIN CARD */}
              <View style={styles.profileSection}>
                <TouchableOpacity
                  style={[styles.connectionCard, isLinkedinConnected && styles.activeCard]}
                  activeOpacity={0.8}
                  onPress={() => setIsLinkedinConnected(!isLinkedinConnected)}
                  disabled={isLoading}
                >
                  <View style={styles.cardLeft}>
                    <View style={styles.linkedinIconBg}>
                      <FontAwesome name="linkedin" size={18} color="#FFFFFF" />
                    </View>
                    <View style={styles.cardTextWrapper}>
                      <Text style={styles.cardTitle}>LinkedIn</Text>
                      <Text style={styles.cardSubtitle}>Import your profile</Text>
                    </View>
                  </View>
                  <Ionicons
                    name={isLinkedinConnected ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={isLinkedinConnected ? '#FF6B00' : '#64748B'}
                  />
                </TouchableOpacity>

                {isLinkedinConnected && (
                  <TextInput
                    style={styles.urlInput}
                    placeholder="https://linkedin.com/in/username"
                    placeholderTextColor="#64748B"
                    value={linkedinUrl}
                    onChangeText={setLinkedinUrl}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="url"
                  />
                )}
              </View>

              {/* PORTFOLIO CARD */}
              <View style={styles.profileSection}>
                <TouchableOpacity
                  style={[styles.connectionCard, isPortfolioConnected && styles.activeCard]}
                  activeOpacity={0.8}
                  onPress={() => setIsPortfolioConnected(!isPortfolioConnected)}
                  disabled={isLoading}
                >
                  <View style={styles.cardLeft}>
                    <Feather name="globe" size={26} color="#94A3B8" />
                    <View style={styles.cardTextWrapper}>
                      <Text style={styles.cardTitle}>Other Portfolio</Text>
                      <Text style={styles.cardSubtitle}>Behance, Dribbble, etc.</Text>
                    </View>
                  </View>
                  <Ionicons
                    name={isPortfolioConnected ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={isPortfolioConnected ? '#FF6B00' : '#64748B'}
                  />
                </TouchableOpacity>

                {isPortfolioConnected && (
                  <TextInput
                    style={styles.urlInput}
                    placeholder="https://yourportfolio.com"
                    placeholderTextColor="#64748B"
                    value={portfolioUrl}
                    onChangeText={setPortfolioUrl}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="url"
                  />
                )}
              </View>
            </View>

            <View style={styles.spacer} />

            <TouchableOpacity
              style={[styles.continueBtn, isLoading && styles.disabledButton]}
              onPress={handleContinue}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.continueBtnText}>Continue</Text>
              )}
            </TouchableOpacity>

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// =============================================================
// STYLES
// =============================================================
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#050B14',
  },
  fixedHeader: {
    position: 'absolute',
    left: 0,
    zIndex: 999,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 25,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 26,
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
  profileSection: {
    marginBottom: 15,
  },
  connectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0E1629',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
  },
  activeCard: {
    borderColor: 'rgba(255, 107, 0, 0.3)',
    backgroundColor: 'rgba(255, 107, 0, 0.05)',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  linkedinIconBg: {
    width: 28,
    height: 28,
    backgroundColor: '#0A66C2',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextWrapper: {
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  urlInput: {
    height: 48,
    backgroundColor: '#0E1629',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    marginTop: 8,
    paddingHorizontal: 15,
    color: '#F8FAFC',
    fontSize: 13,
  },
  spacer: {
    flex: 1,
    minHeight: 40,
  },
  continueBtn: {
    backgroundColor: '#FF6B00',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});