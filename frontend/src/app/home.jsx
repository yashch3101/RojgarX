import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TextInput, 
  Image, TouchableOpacity, Dimensions, StatusBar, Platform
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const filters = ['All', '✨ For You', '📶 Remote', '🏢 On-site'];
const jobs = [
  {
    id: '1',
    company: 'Google',
    role: 'Backend Developer',
    salary: '₹12 - 18 LPA',
    location: 'Bengaluru, India',
    time: '2h ago',
    tags: ['Full Time', 'Backend', 'Java'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png'
  },
  {
    id: '2',
    company: 'Microsoft',
    role: 'Software Engineer',
    salary: '₹15 - 25 LPA',
    location: 'Hyderabad, India',
    time: '4h ago',
    tags: ['Full Time', 'Python', 'Azure'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png'
  }
];

export default function Home() {

  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F19" />
      
      {/* HEADER SECTION - Responsive Padding for Android & iOS Notch */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>Rojgar<Text style={styles.logoTextOrange}>X</Text></Text>
          <Text style={styles.subLogoText}>AI POWERED CAREER INTELLIGE...</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.aiCoachBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="robot-outline" size={14} color="#FF6B00" />
            <Text style={styles.aiCoachText}>AI Coach</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bellIcon}>
            <Feather name="bell" size={20} color="#D1D5DB" />
            <View style={styles.notificationDot}>
              <Text style={styles.dotText}>3</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
              style={styles.profilePic} 
            />
            <View style={styles.onlineDot} />
          </View>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* SEARCH BAR */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.searchContainer}>
          <Feather name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search by job title, skills..." 
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
          <TouchableOpacity>
            <Feather name="sliders" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </Animated.View>

        {/* FILTER CHIPS */}
        <Animated.ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterScroll}
          contentContainerStyle={{ paddingRight: 20 }}
          entering={FadeInRight.delay(200).duration(500)}
        >
          {filters.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.filterChip, activeFilter === item && styles.activeChip]}
              onPress={() => setActiveFilter(item)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, activeFilter === item && styles.activeFilterText]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>

        {/* RECOMMENDED SECTION HEADER */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* JOB CARDS */}
        {jobs.map((job, index) => (
          <Animated.View 
            key={job.id} 
            entering={FadeInDown.delay(400 + (index * 100)).duration(500)}
            style={styles.jobCard}
          >
            <View style={styles.jobHeader}>
              <View style={styles.companyLogoContainer}>
                <Image source={{ uri: job.logo }} style={styles.companyLogo} />
              </View>
              <View style={styles.jobInfo}>
                <View style={styles.matchBadge}>
                  <Feather name="trending-up" size={12} color="#00B87C" />
                  <Text style={styles.matchText}>Highly Matched</Text>
                </View>
                <Text style={styles.jobTitle} numberOfLines={1}>{job.role}</Text>
                <Text style={styles.companyText} numberOfLines={1}>{job.company} • {job.location}</Text>
              </View>
              <View style={styles.jobRight}>
                <TouchableOpacity>
                  <Feather name="bookmark" size={20} color="#9CA3AF" />
                </TouchableOpacity>
                <Text style={styles.salaryText}>{job.salary}</Text>
                <Text style={styles.timeText}>{job.time}</Text>
              </View>
            </View>

            <View style={styles.tagsContainer}>
              {job.tags.map((tag, idx) => (
                <View key={idx} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        ))}

        {/* VIEW ALL JOBS BUTTON */}
        <Animated.View entering={FadeInDown.delay(700).duration(500)}>
          <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.8}>
            <Text style={styles.viewAllBtnText}>View all jobs </Text>
            <Feather name="arrow-right" size={16} color="#FF6B00" />
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>

      {/* BOTTOM NAVIGATION (Responsive & Fixed at Bottom) */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    // Android aur iOS dono ke liye safe top padding
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 50,
    paddingBottom: 20,
    backgroundColor: '#0B0F19',
  },
  logoText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  logoTextOrange: {
    color: '#FF6B00',
  },
  subLogoText: {
    color: '#9CA3AF',
    fontSize: 9,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aiCoachBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B00',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
    backgroundColor: 'rgba(255, 107, 0, 0.08)',
  },
  aiCoachText: {
    color: '#FF6B00',
    fontSize: 11,
    fontWeight: '700',
  },
  bellIcon: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#0B0F19',
  },
  dotText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  profileContainer: {
    position: 'relative',
    marginLeft: 4,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  onlineDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 10,
    height: 10,
    backgroundColor: '#10B981',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#0B0F19',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    // Bottom padding taaki last job card footer ke peeche na chhupe
    paddingBottom: 100, 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151A28',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 52,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
  },
  filterScroll: {
    marginBottom: 25,
  },
  filterChip: {
    backgroundColor: '#151A28',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#1F2937',
    alignSelf: 'flex-start',
  },
  activeChip: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  filterText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  viewAllText: {
    color: '#FF6B00',
    fontSize: 13,
    fontWeight: '600',
  },
  jobCard: {
    backgroundColor: '#151A28',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  jobHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  companyLogoContainer: {
    width: 45,
    height: 45,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  companyLogo: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  jobInfo: {
    flex: 1,
    paddingRight: 10,
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 184, 124, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 6,
    gap: 4,
  },
  matchText: {
    color: '#00B87C',
    fontSize: 10,
    fontWeight: '600',
  },
  jobTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  companyText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  jobRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  salaryText: {
    color: '#FF6B00',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,
  },
  timeText: {
    color: '#6B7280',
    fontSize: 11,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    color: '#D1D5DB',
    fontSize: 11,
    fontWeight: '500',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    gap: 8,
  },
  viewAllBtnText: {
    color: '#FF6B00',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0B0F19',
    paddingVertical: Platform.OS === 'ios' ? 25 : 15, // iOS ke bottom swipe indicator ke liye extra jagah
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
  activeNavIndicator: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? -25 : -15,
    width: 35,
    height: 3,
    backgroundColor: '#FF6B00',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  }
});