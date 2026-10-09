import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';

export default function ResumeUploadScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [isUploading, setIsUploading] = useState(false);

  // Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),

      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // =========================================================
  // PICK + UPLOAD RESUME (FRONTEND ONLY)
  // =========================================================

  const handleUploadResume = async () => {
    if (isUploading) return;

    try {
      // 1. Open document picker
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) return;

      const file = result.assets?.[0];

      if (!file) {
        Alert.alert('Resume Required', 'Please select a resume file.');
        return;
      }

      // 2. Validate file name & extension
      const fileName = file.name || '';
      const extension = fileName.split('.').pop()?.toLowerCase();
      const allowedExtensions = ['pdf', 'doc', 'docx'];

      if (!extension || !allowedExtensions.includes(extension)) {
        Alert.alert('Invalid File', 'Please upload a PDF, DOC or DOCX file.');
        return;
      }

      // 3. Validate file size (Max 5MB)
      const maxFileSize = 5 * 1024 * 1024;
      if (file.size && file.size > maxFileSize) {
        Alert.alert('File Too Large', 'Resume size must be less than 5 MB.');
        return;
      }

      // 4. Simulate Upload Process (Backend Logic Removed)
      setIsUploading(true);
      
      // Fake delay for animation (2 seconds)
      setTimeout(() => {
        setIsUploading(false);
        Alert.alert(
          'Resume Uploaded',
          'Your resume has been uploaded and processed successfully.',
          [
            {
              text: 'Continue',
              onPress: () => {
                // Yahan next screen par bhejenge, abhi ke liye home bhej raha hu
                router.replace('/connect');
              },
            },
          ]
        );
      }, 2000);

    } catch (error) {
      console.log('Resume Upload Error:', error);
      setIsUploading(false);
      Alert.alert('Upload Failed', 'Unable to upload resume right now.');
    }
  };

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
        disabled={isUploading}
      >
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.contentWrapper,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 40,
          },
        ]}
      >
        {/* Top Titles */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Upload your Resume</Text>
          <Text style={styles.subtitle}>
            Our AI will analyze your profile{'\n'}and build it automatically
          </Text>
        </View>

        {/* Upload Area */}
        <View style={styles.middleSection}>
          
          <TouchableOpacity
            style={[styles.uploadBox, isUploading && styles.uploadBoxDisabled]}
            activeOpacity={0.7}
            onPress={handleUploadResume}
            disabled={isUploading}
          >
            <View style={styles.iconCircle}>
              {isUploading ? (
                <ActivityIndicator size="large" color="#FF6B00" />
              ) : (
                <Feather name="upload" size={28} color="#FF6B00" />
              )}
            </View>

            <Text style={styles.uploadText}>
              {isUploading ? 'Uploading Resume...' : 'Upload Resume'}
            </Text>

            <Text style={styles.formatText}>PDF, DOC, DOCX (Max 5MB)</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          {/* LinkedIn Button */}
          <TouchableOpacity
            style={styles.linkedinBtn}
            activeOpacity={0.8}
            disabled={isUploading}
            onPress={() => {
              Alert.alert('Coming Soon', 'LinkedIn import will be integrated later.');
            }}
          >
            <FontAwesome name="linkedin-square" size={22} color="#0A66C2" />
            <Text style={styles.linkedinText}>Import from LinkedIn</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Text (Skip) */}
        <TouchableOpacity
          disabled={isUploading}
          activeOpacity={0.6}
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.bottomText}>You can update it later</Text>
        </TouchableOpacity>

      </Animated.View>
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
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignSelf: 'flex-start',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: 10,
  },
  // Titles
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  // Upload
  middleSection: {
    flex: 1,
    justifyContent: 'center',
  },
  uploadBox: {
    backgroundColor: 'rgba(14, 22, 41, 0.6)',
    borderWidth: 2,
    borderColor: '#1E293B',
    borderStyle: 'dashed',
    borderRadius: 20,
    paddingVertical: 40,
    alignItems: 'center',
    marginBottom: 30,
  },
  uploadBoxDisabled: {
    opacity: 0.7,
  },
  iconCircle: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B00',
    marginBottom: 8,
  },
  formatText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#1E293B',
  },
  orText: {
    color: '#64748B',
    paddingHorizontal: 15,
    fontSize: 14,
    fontWeight: '500',
  },
  // LinkedIn
  linkedinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E1629',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 10,
  },
  linkedinText: {
    color: '#0A66C2',
    fontSize: 16,
    fontWeight: '700',
  },
  // Bottom
  bottomText: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});