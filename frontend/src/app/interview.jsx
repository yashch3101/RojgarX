import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, 
  Image, TouchableOpacity, Dimensions, StatusBar, Platform
} from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const tabs = [
  { name: 'Upcoming', badge: 0 },
  { name: 'Completed', badge: 0 },
  { name: 'Invites', badge: 2 },
  { name: 'Canceled', badge: 0 },
];

const interviews = [
  {
    id: '1',
    company: 'Google',
    role: 'Backend Developer',
    location: 'Bengaluru, India',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png',
    date: '20 May 2026',
    time: '10:00 AM',
    status: 'Confirmed',
    type: 'Video Interview',
    round: 'Technical',
    duration: '45 mins',
    interviewer: 'Rohit',
    interviewerPic: 'https://randomuser.me/api/portraits/men/41.jpg',
    actionType: 'primary', // solid orange
  },
  {
    id: '2',
    company: 'Microsoft',
    role: 'Software Engineer',
    location: 'Hyderabad, India',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png',
    date: '22 May 2026',
    time: '02:30 PM',
    status: 'Scheduled',
    type: 'Video Interview',
    round: 'HR',
    duration: '30 mins',
    interviewer: 'Neha',
    interviewerPic: 'https://randomuser.me/api/portraits/women/44.jpg',
    actionType: 'secondary', // outlined orange
  },
  {
    id: '3',
    company: 'TCS',
    role: 'Data Analyst',
    location: 'Pune, India',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1024px-Tata_Consultancy_Services_Logo.svg.png',
    date: '24 May 2026',
    time: '11:00 AM',
    status: 'Pending',
    type: '',
    round: 'Managerial',
    duration: '40 mins',
    interviewer: 'Amit',
    interviewerPic: 'https://randomuser.me/api/portraits/men/22.jpg',
    actionType: 'tertiary', // text only outlined
  }
];

const insights = [
  { id: '1', value: '12', label: 'Interviews\nThis Month', icon: 'trending-up', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  { id: '2', value: '5', label: 'Completed', icon: 'check-circle', color: '#FF6B00', bg: 'rgba(255, 107, 0, 0.1)' },
  { id: '3', value: '3', label: 'Upcoming', icon: 'hourglass', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  { id: '4', value: '4.2', label: 'Average\nPerformance', icon: 'star', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
];

export default function InterviewScreen() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const router = useRouter();

  // Helper function to render status badges correctly
  const renderStatus = (status) => {
    let color = '#FFF';
    let bg = '#1F2937';
    if (status === 'Confirmed') { color = '#10B981'; bg = 'rgba(16, 185, 129, 0.1)'; }
    if (status === 'Scheduled') { color = '#F59E0B'; bg = 'rgba(245, 158, 11, 0.1)'; }
    if (status === 'Pending') { color = '#3B82F6'; bg = 'rgba(59, 130, 246, 0.1)'; }

    return (
      <View style={[styles.statusBadge, { backgroundColor: bg }]}>
        <Text style={[styles.statusText, { color }]}>{status}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F19" />
      
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>Rojgar<Text style={styles.logoTextOrange}>X</Text></Text>
          <Text style={styles.subLogoText}>AI POWERED CAREER INTELLIGE...</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.aiCoachBtn}>
            <MaterialCommunityIcons name="robot-outline" size={14} color="#FF6B00" />
            <Text style={styles.aiCoachText}>AI Coach</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bellIcon}>
            <Feather name="bell" size={20} color="#D1D5DB" />
            <View style={styles.notificationDot}><Text style={styles.dotText}>3</Text></View>
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.profilePic} />
            <View style={styles.onlineDot} />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* PAGE TITLE & HISTORY BUTTON */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.pageHeaderRow}>
          <View>
            <Text style={styles.pageTitle}>Interviews</Text>
            <Text style={styles.pageSubTitle}>Your scheduled and past interviews</Text>
          </View>
          <TouchableOpacity style={styles.historyBtn}>
            <Feather name="clock" size={14} color="#FF6B00" />
            <Text style={styles.historyBtnText}>History</Text>
            <Feather name="arrow-right" size={14} color="#FF6B00" />
          </TouchableOpacity>
        </Animated.View>

        {/* TABS */}
        <Animated.ScrollView 
          horizontal showsHorizontalScrollIndicator={false} 
          style={styles.tabScroll}
          contentContainerStyle={{ paddingRight: 20 }}
          entering={FadeInRight.delay(200).duration(500)}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.tabChip, activeTab === tab.name && styles.activeTabChip]}
              onPress={() => setActiveTab(tab.name)}
            >
              <Text style={[styles.tabText, activeTab === tab.name && styles.activeTabText]}>{tab.name}</Text>
              {tab.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{tab.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>

        <Animated.Text entering={FadeInDown.delay(300).duration(500)} style={styles.sectionTitle}>
          Upcoming Interviews
        </Animated.Text>

        {/* INTERVIEW CARDS */}
        {interviews.map((item, index) => (
          <Animated.View key={item.id} entering={FadeInDown.delay(400 + (index * 100)).duration(500)} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.logoBox}>
                {/* Logo will be empty black circle if TCS, otherwise image */}
                {item.company !== 'TCS' ? 
                  <Image source={{ uri: item.logo }} style={styles.companyLogo} /> : 
                  <View style={styles.emptyLogo} />
                }
              </View>
              <View style={styles.cardInfo}>
                <View style={styles.cardTopRow}>
                  {item.type ? (
                    <View style={styles.videoBadge}>
                      <Feather name="video" size={10} color="#FF6B00" />
                      <Text style={styles.videoBadgeText}>{item.type}</Text>
                    </View>
                  ) : <View />}
                  {renderStatus(item.status)}
                </View>
                
                <View style={styles.titleDateRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle} numberOfLines={1}>{item.role}</Text>
                    <Text style={styles.companyText} numberOfLines={1}>{item.company} • {item.location}</Text>
                  </View>
                  <View style={styles.dateBox}>
                    <View style={styles.dateIconRow}>
                      <Feather name="calendar" size={12} color="#9CA3AF" />
                      <Text style={styles.dateText}>{item.date}</Text>
                    </View>
                    <View style={styles.dateIconRow}>
                      <Feather name="clock" size={12} color="#9CA3AF" />
                      <Text style={styles.dateText}>{item.time}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardBottom}>
              <View style={styles.detailCol}>
                <View style={styles.detailIconRow}>
                  <Feather name="credit-card" size={12} color="#9CA3AF" />
                  <Text style={styles.detailLabel}>Round</Text>
                </View>
                <Text style={styles.detailValue}>{item.round}</Text>
              </View>
              <View style={styles.detailCol}>
                <View style={styles.detailIconRow}>
                  <Feather name="clock" size={12} color="#9CA3AF" />
                  <Text style={styles.detailLabel}>Duration</Text>
                </View>
                <Text style={styles.detailValue}>{item.duration}</Text>
              </View>
              <View style={styles.detailCol}>
                <View style={styles.detailIconRow}>
                  <Image source={{ uri: item.interviewerPic }} style={styles.miniAvatar} />
                  <Text style={styles.detailLabel}>Interviewer</Text>
                </View>
                <Text style={styles.detailValue}>{item.interviewer}</Text>
              </View>
              
              <View style={styles.actionCol}>
                {item.actionType === 'primary' && (
                  <TouchableOpacity style={styles.primaryBtn}>
                    <Feather name="video" size={14} color="#FFF" />
                    <Text style={styles.primaryBtnText}>Join</Text>
                  </TouchableOpacity>
                )}
                {item.actionType === 'secondary' && (
                  <TouchableOpacity style={styles.secondaryBtn}>
                    <Feather name="video" size={14} color="#FF6B00" />
                    <Text style={styles.secondaryBtnText}>Join</Text>
                  </TouchableOpacity>
                )}
                {item.actionType === 'tertiary' && (
                  <TouchableOpacity style={styles.tertiaryBtn}>
                    <Text style={styles.secondaryBtnText}>Details</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Animated.View>
        ))}

        <Animated.View entering={FadeInDown.delay(700).duration(500)}>
          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllBtnText}>View all upcoming </Text>
            <Feather name="arrow-right" size={16} color="#FF6B00" />
          </TouchableOpacity>
        </Animated.View>

        {/* INSIGHTS SECTION */}
        <Animated.View entering={FadeInDown.delay(800).duration(500)} style={styles.insightsHeader}>
          <Text style={styles.sectionTitle}>Interview Insights</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.viewReportText}>View Report </Text>
            <Feather name="arrow-right" size={14} color="#FF6B00" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(900).duration(500)} style={styles.insightsGrid}>
          {insights.map((item) => (
            <View key={item.id} style={styles.insightCard}>
              <View style={[styles.iconCircle, { backgroundColor: item.bg }]}>
                <Feather name={item.icon} size={18} color={item.color} />
              </View>
              <View>
                <Text style={styles.insightValue}>{item.value}</Text>
                <Text style={styles.insightLabel}>{item.label}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

      </ScrollView>

      {/* BOTTOM NAVIGATION (Interview tab active) */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
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
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  pageHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  pageTitle: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  pageSubTitle: { color: '#9CA3AF', fontSize: 12 },
  historyBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#151A28', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#1F2937', gap: 6 },
  historyBtnText: { color: '#FF6B00', fontSize: 12, fontWeight: '600' },
  tabScroll: { marginBottom: 25 },
  tabChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#151A28', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#1F2937' },
  activeTabChip: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  tabText: { color: '#9CA3AF', fontSize: 13, fontWeight: '600' },
  activeTabText: { color: '#FFF' },
  badge: { backgroundColor: '#EF4444', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, marginLeft: 8 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 16 },
  card: { backgroundColor: '#151A28', borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: '#1F2937', overflow: 'hidden' },
  cardTop: { flexDirection: 'row', padding: 16 },
  logoBox: { width: 45, height: 45, backgroundColor: '#0B0F19', borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  companyLogo: { width: 25, height: 25, resizeMode: 'contain' },
  emptyLogo: { width: 25, height: 25 },
  cardInfo: { flex: 1 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  videoBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  videoBadgeText: { color: '#FF6B00', fontSize: 10, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 10, fontWeight: '600' },
  titleDateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  jobTitle: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  companyText: { color: '#9CA3AF', fontSize: 12 },
  dateBox: { alignItems: 'flex-end', gap: 4 },
  dateIconRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dateText: { color: '#9CA3AF', fontSize: 11 },
  divider: { height: 1, backgroundColor: '#1F2937', width: '100%' },
  cardBottom: { flexDirection: 'row', padding: 16, justifyContent: 'space-between', alignItems: 'center' },
  detailCol: { gap: 4 },
  detailIconRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  miniAvatar: { width: 14, height: 14, borderRadius: 7 },
  detailLabel: { color: '#6B7280', fontSize: 10 },
  detailValue: { color: '#FFF', fontSize: 12, fontWeight: '600', marginLeft: 18 },
  actionCol: { justifyContent: 'flex-end' },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF6B00', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, gap: 6 },
  primaryBtnText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  secondaryBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#1F2937', gap: 6 },
  secondaryBtnText: { color: '#FF6B00', fontSize: 13, fontWeight: '600' },
  tertiaryBtn: { backgroundColor: 'transparent', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#1F2937' },
  viewAllBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: '#1F2937', gap: 8, marginBottom: 20 },
  viewAllBtnText: { color: '#FF6B00', fontSize: 14, fontWeight: '600' },
  insightsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  viewReportText: { color: '#FF6B00', fontSize: 13, fontWeight: '600' },
  insightsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  insightCard: { width: '48%', backgroundColor: '#151A28', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#1F2937', flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  insightValue: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  insightLabel: { color: '#9CA3AF', fontSize: 10, marginTop: 2 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#0B0F19', paddingVertical: Platform.OS === 'ios' ? 25 : 15, borderTopWidth: 1, borderTopColor: '#1F2937' },
  navItem: { alignItems: 'center', gap: 6, width: 60 },
  navText: { color: '#9CA3AF', fontSize: 10, fontWeight: '500' },
  activeNavIndicator: { position: 'absolute', bottom: Platform.OS === 'ios' ? -25 : -15, width: 35, height: 3, backgroundColor: '#FF6B00', borderTopLeftRadius: 3, borderTopRightRadius: 3 }
});