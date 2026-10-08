import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TextInput, 
  Image, TouchableOpacity, Dimensions, StatusBar, Platform
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const filters = ['All', 'B.Tech', 'MBA', 'BCA', 'BBA', 'MCA', 'M.Tech', 'Diploma', 'More'];

const degrees = [
  {
    id: '1',
    initials: 'SU',
    logoBg: '#1E3A8A',
    title: 'Online B.Tech',
    uni: 'Sharda University',
    duration: '4 Years',
    level: 'UG Degree',
    desc: 'Specializations in CSE, ECE, ME, Civil, AI & DS and more.',
    tags: ['Live Classes', 'Industry Projects', 'Placement Support'],
    fee: '₹25,000',
    feeType: '/ Sem',
    totalFee: 'Total Fees: ₹2,00,000'
  },
  {
    id: '2',
    initials: 'AM',
    logoBg: '#F97316',
    title: 'Online BBA',
    uni: 'Amity University O...',
    duration: '3 Years',
    level: 'UG Degree',
    desc: 'Build strong business fundamentals and leadership skills.',
    tags: ['Live Classes', 'Case Studies', 'Career Support'],
    fee: '₹18,000',
    feeType: '/ Sem',
    totalFee: 'Total Fees: ₹1,08,000'
  },
  {
    id: '3',
    initials: 'MU',
    logoBg: '#EF4444',
    title: 'Online MBA',
    uni: 'Manipal University ...',
    duration: '2 Years',
    level: 'PG Degree',
    desc: 'Dual specialization with industry-oriented curriculum.',
    tags: ['Live Classes', 'Industry Mentorship', 'Placement Support'],
    fee: '₹30,000',
    feeType: '/ Sem',
    totalFee: 'Total Fees: ₹1,20,000'
  },
  {
    id: '4',
    initials: 'IG',
    logoBg: '#10B981',
    title: 'Online BCA',
    uni: 'IGNOU',
    duration: '3 Years',
    level: 'UG Degree',
    desc: 'Affordable and flexible learning for a successful IT career.',
    tags: ['Self Paced', 'Study Material', 'Exam Support'],
    fee: '₹7,200',
    feeType: '/ Year',
    totalFee: 'Total Fees: ₹21,600'
  }
];

const benefits = [
  { id: 1, icon: 'shield-check-outline', title: 'UGC Approved', desc: 'All degrees are UGC entitled & valid', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  { id: 2, icon: 'wifi', title: '100% Online', desc: 'Learn from anywhere at your convenience', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  { id: 3, icon: 'credit-card-outline', title: 'Easy EMI', desc: 'Flexible payment options available', color: '#F97316', bg: 'rgba(249, 115, 22, 0.1)' },
  { id: 4, icon: 'briefcase-outline', title: 'Career Support', desc: 'Get placement & career assistance', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' }
];

export default function DegreeScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F19" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>Rojgar<Text style={styles.logoTextOrange}>X</Text></Text>
          <Text style={styles.subLogoText}>Learn Today, Lead Tomorrow.</Text>
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
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.profilePic} />
            <View style={styles.onlineDot} />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* PAGE TITLE & ACTION BUTTONS */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <Text style={styles.pageTitle}>Degree & Education</Text>
          <Text style={styles.pageSubtitle}>Explore online degrees from top universities</Text>
          
          <View style={styles.actionBtnRow}>
            <TouchableOpacity style={styles.outlineActionBtn}>
              <MaterialCommunityIcons name="school-outline" size={16} color="#9CA3AF" />
              <Text style={styles.outlineActionText}>My Enrollments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlineActionBtn}>
              <MaterialCommunityIcons name="scale-balance" size={16} color="#9CA3AF" />
              <Text style={styles.outlineActionText}>Compare</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* SEARCH & FILTER ROW */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Feather name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search courses, universities..." 
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Feather name="filter" size={16} color="#9CA3AF" />
            <Text style={styles.filterBtnText}>Filters</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* FILTER CHIPS */}
        <Animated.ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterScroll}
          contentContainerStyle={{ paddingRight: 20 }}
          entering={FadeInRight.delay(300).duration(500)}
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
              {item === 'More' && <Feather name="chevron-down" size={14} color="#9CA3AF" style={{marginLeft: 4}} />}
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>

        {/* SECTION HEADER */}
        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Degrees</Text>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.viewAllText}>View all </Text>
            <Feather name="arrow-right" size={14} color="#FF6B00" />
          </TouchableOpacity>
        </Animated.View>

        {/* DEGREE CARDS */}
        {degrees.map((degree, index) => (
          <Animated.View 
            key={degree.id} 
            entering={FadeInDown.delay(500 + (index * 100)).duration(500)}
            style={styles.degreeCard}
          >
            <View style={styles.cardHeaderRow}>
              {/* Left side: Logo & UGC Badge */}
              <View style={styles.logoCol}>
                <View style={[styles.uniLogo, { backgroundColor: degree.logoBg }]}>
                  <Text style={styles.uniLogoText}>{degree.initials}</Text>
                </View>
                <View style={styles.ugcBadge}>
                  <Text style={styles.ugcText}>UGC Entitled</Text>
                </View>
              </View>
              
              {/* Middle: Details */}
              <View style={styles.cardInfo}>
                <Text style={styles.degreeTitle}>{degree.title}</Text>
                <Text style={styles.uniName}>{degree.uni}</Text>
                
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Feather name="calendar" size={12} color="#9CA3AF" />
                    <Text style={styles.metaText}>{degree.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons name="cube-outline" size={14} color="#9CA3AF" />
                    <Text style={styles.metaText}>{degree.level}</Text>
                  </View>
                </View>
                
                <Text style={styles.descText}>{degree.desc}</Text>
              </View>

              {/* Right: Pricing */}
              <View style={styles.priceCol}>
                <Text style={styles.feeMain}>{degree.fee}<Text style={styles.feeType}>{degree.feeType}</Text></Text>
                <Text style={styles.totalFee}>{degree.totalFee}</Text>
              </View>
            </View>

            {/* Tags and Action Row */}
            <View style={styles.cardFooterRow}>
              <View style={styles.tagsCol}>
                {degree.tags.map((tag, idx) => (
                  <View key={idx} style={styles.tagBadge}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.actionsCol}>
                <TouchableOpacity style={styles.viewDetailsBtn}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.compareCheckboxRow}>
                  <Feather name="square" size={14} color="#9CA3AF" />
                  <Text style={styles.compareText}>Compare</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        ))}

        {/* BENEFITS GRID */}
        <Animated.View entering={FadeInDown.delay(1000).duration(500)} style={styles.benefitsGrid}>
          {benefits.map((item) => (
            <View key={item.id} style={styles.benefitCard}>
              <View style={[styles.benefitIconBg, { backgroundColor: item.bg }]}>
                <MaterialCommunityIcons name={item.icon} size={20} color={item.color} />
              </View>
              <View style={styles.benefitInfo}>
                <Text style={styles.benefitTitle}>{item.title}</Text>
                <Text style={styles.benefitDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

      </ScrollView>

      {/* BOTTOM NAVIGATION (Degree Active) */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  // Base & Header (Consistent with other screens)
  container: { flex: 1, backgroundColor: '#0B0F19' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 50,
    paddingBottom: 20, backgroundColor: '#0B0F19',
  },
  logoText: { color: '#FFF', fontSize: 22, fontWeight: 'bold', letterSpacing: -0.5 },
  logoTextOrange: { color: '#FF6B00' },
  subLogoText: { color: '#9CA3AF', fontSize: 9, marginTop: 2, letterSpacing: 0.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  aiCoachBtn: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#FF6B00',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6, gap: 4, backgroundColor: 'rgba(255, 107, 0, 0.08)',
  },
  aiCoachText: { color: '#FF6B00', fontSize: 11, fontWeight: '700' },
  bellIcon: { position: 'relative' },
  notificationDot: {
    position: 'absolute', top: -4, right: -4, backgroundColor: '#EF4444', borderRadius: 10,
    width: 14, height: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#0B0F19',
  },
  dotText: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },
  profileContainer: { position: 'relative', marginLeft: 4 },
  profilePic: { width: 32, height: 32, borderRadius: 16 },
  onlineDot: {
    position: 'absolute', bottom: -2, right: -2, width: 10, height: 10, backgroundColor: '#10B981',
    borderRadius: 5, borderWidth: 2, borderColor: '#0B0F19',
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 110 },
  
  // Page Title & Action Buttons
  pageTitle: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  pageSubtitle: { color: '#9CA3AF', fontSize: 13, marginBottom: 15 },
  actionBtnRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  outlineActionBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#1F2937', backgroundColor: '#151A28', gap: 6 },
  outlineActionText: { color: '#D1D5DB', fontSize: 12, fontWeight: '500' },

  // Search & Filter
  searchRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#151A28', borderRadius: 12, paddingHorizontal: 15, height: 50, borderWidth: 1, borderColor: '#1F2937' },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#FFF', fontSize: 13 },
  filterBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#151A28', borderRadius: 12, paddingHorizontal: 15, borderWidth: 1, borderColor: '#1F2937', gap: 6 },
  filterBtnText: { color: '#D1D5DB', fontSize: 13, fontWeight: '500' },

  // Filters Scroll
  filterScroll: { marginBottom: 25 },
  filterChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#151A28', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#1F2937', alignSelf: 'flex-start' },
  activeChip: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  filterText: { color: '#9CA3AF', fontSize: 13, fontWeight: '600' },
  activeFilterText: { color: '#FFF' },

  // Section Header
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  viewAllText: { color: '#FF6B00', fontSize: 13, fontWeight: '600' },

  // Degree Cards
  degreeCard: { backgroundColor: '#151A28', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#1F2937' },
  cardHeaderRow: { flexDirection: 'row', marginBottom: 12 },
  logoCol: { alignItems: 'center', marginRight: 12, width: 60 },
  uniLogo: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  uniLogoText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  ugcBadge: { backgroundColor: 'rgba(16, 185, 129, 0.1)', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)' },
  ugcText: { color: '#10B981', fontSize: 8, fontWeight: '700', textAlign: 'center' },
  
  cardInfo: { flex: 1, paddingRight: 5 },
  degreeTitle: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 2 },
  uniName: { color: '#9CA3AF', fontSize: 12, marginBottom: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: '#D1D5DB', fontSize: 11 },
  descText: { color: '#9CA3AF', fontSize: 11, lineHeight: 16 },

  priceCol: { alignItems: 'flex-end', width: 90 },
  feeMain: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  feeType: { color: '#9CA3AF', fontSize: 10, fontWeight: 'normal' },
  totalFee: { color: '#6B7280', fontSize: 9, marginTop: 4 },

  cardFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 5 },
  tagsCol: { flex: 1, alignItems: 'flex-start', gap: 6 },
  tagBadge: { backgroundColor: '#1F2937', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  tagText: { color: '#9CA3AF', fontSize: 10 },
  
  actionsCol: { alignItems: 'flex-end', gap: 8 },
  viewDetailsBtn: { backgroundColor: '#FF6B00', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  viewDetailsText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  compareCheckboxRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  compareText: { color: '#9CA3AF', fontSize: 11 },

  // Benefits Grid
  benefitsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginTop: 10, marginBottom: 20 },
  benefitCard: { width: '48%', backgroundColor: '#151A28', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#1F2937', flexDirection: 'row', alignItems: 'center', gap: 10 },
  benefitIconBg: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  benefitInfo: { flex: 1 },
  benefitTitle: { color: '#FFF', fontSize: 12, fontWeight: '700', marginBottom: 2 },
  benefitDesc: { color: '#9CA3AF', fontSize: 9, lineHeight: 12 },

  // Bottom Nav
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#0B0F19', paddingVertical: Platform.OS === 'ios' ? 25 : 15, borderTopWidth: 1, borderTopColor: '#1F2937' },
  navItem: { alignItems: 'center', gap: 6, width: 60 },
  navText: { color: '#9CA3AF', fontSize: 10, fontWeight: '500' },
  activeNavIndicator: { position: 'absolute', bottom: Platform.OS === 'ios' ? -25 : -15, width: 35, height: 3, backgroundColor: '#FF6B00', borderTopLeftRadius: 3, borderTopRightRadius: 3 }
});