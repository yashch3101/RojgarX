import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TextInput, 
  Image, TouchableOpacity, Dimensions, StatusBar, Platform
} from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const filters = [
  { id: 'all', label: 'All', icon: null },
  { id: 'hourly', label: 'Hourly', icon: 'clock' },
  { id: 'fixed', label: 'Fixed Price', icon: 'tag' },
  { id: 'parttime', label: 'Part Time', icon: 'briefcase' },
  { id: 'remote', label: 'Remote', icon: 'wifi' },
  { id: 'onsite', label: 'On-site', icon: 'server' }
];

const projects = [
  {
    id: '1',
    title: 'UI/UX Designer for SaaS Dashboard',
    skills: 'Figma • Design System • Dashboard',
    posted: 'Posted 1h ago',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg', // Fallback to normal img if SVG fails, but let's use png
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1024px-Figma-logo.svg.png',
    badges: [
      { type: 'hourly', label: 'Hourly', icon: 'clock', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
      { type: 'rate', label: '₹800 - ₹1,200 /hr', icon: 'credit-card', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
      { type: 'remote', label: 'Remote', icon: 'wifi', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' }
    ],
    price: '₹25,000 - ₹40,000',
    estimate: 'Est. 20 - 30 hrs / week',
    featured: true
  },
  {
    id: '2',
    title: 'WordPress Website Development',
    skills: 'WordPress • Elementor • SEO',
    posted: 'Posted 3h ago',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/WordPress_blue_logo.svg/1024px-WordPress_blue_logo.svg.png',
    badges: [
      { type: 'fixed', label: 'Fixed Price', icon: 'tag', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
      { type: 'rate', label: '₹15,000 - ₹30,000', icon: 'credit-card', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
      { type: 'remote', label: 'Remote', icon: 'wifi', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' }
    ],
    price: '₹15,000 - ₹30,000',
    estimate: 'Est. 7 - 10 days',
    featured: false
  },
  {
    id: '3',
    title: 'Mobile App Developer (Flutter)',
    skills: 'Flutter • Firebase • API Integration',
    posted: 'Posted 5h ago',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png',
    badges: [
      { type: 'fixed', label: 'Fixed Price', icon: 'tag', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
      { type: 'rate', label: '₹40,000 - ₹70,000', icon: 'credit-card', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
      { type: 'remote', label: 'Remote', icon: 'wifi', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' }
    ],
    price: '₹40,000 - ₹70,000',
    estimate: 'Est. 15 - 20 days',
    featured: false
  }
];

export default function FreelanceScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F19" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>Rojgar<Text style={styles.logoTextOrange}>X</Text></Text>
          <Text style={styles.subLogoText}>Your Skills. Your Freedom.</Text>
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
        
        {/* PAGE TITLE & POST BUTTON */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.pageHeaderRow}>
          <View style={{flex: 1}}>
            <Text style={styles.pageTitle}>Freelance</Text>
            <Text style={styles.pageSubtitle}>Find freelance projects and work on your terms</Text>
          </View>
          <TouchableOpacity style={styles.postBtn}>
            <Feather name="plus-circle" size={14} color="#FF6B00" />
            <Text style={styles.postBtnText}>Post a Project</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* SEARCH BAR */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.searchContainer}>
          <Feather name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search freelance projects by title..." 
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
          entering={FadeInRight.delay(300).duration(500)}
        >
          {filters.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.filterChip, activeFilter === item.id && styles.activeChip]}
              onPress={() => setActiveFilter(item.id)}
              activeOpacity={0.7}
            >
              {item.icon && (
                <Feather 
                  name={item.icon} 
                  size={14} 
                  color={activeFilter === item.id ? '#FFF' : '#9CA3AF'} 
                  style={{ marginRight: 6 }}
                />
              )}
              <Text style={[styles.filterText, activeFilter === item.id && styles.activeFilterText]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>

        {/* PROMO BANNER */}
        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Work on exciting projects and grow your career</Text>
            <Text style={styles.promoSub}>Top clients are hiring now!</Text>
          </View>
          <Image 
            source={{ uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/programmer-4996962-4159581.png' }} 
            style={styles.promoImage} 
          />
        </Animated.View>

        {/* SECTION HEADER */}
        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <TouchableOpacity style={styles.sortBtn}>
            <Text style={styles.sortText}>Sort by: Newest</Text>
            <Feather name="chevron-down" size={14} color="#FF6B00" />
          </TouchableOpacity>
        </Animated.View>

        {/* PROJECT CARDS */}
        {projects.map((project, index) => (
          <Animated.View 
            key={project.id} 
            entering={FadeInDown.delay(600 + (index * 100)).duration(500)}
            style={styles.projectCard}
          >
            <View style={styles.cardHeader}>
              <View style={styles.companyLogoContainer}>
                <Image source={{ uri: project.logoUrl }} style={styles.companyLogo} />
              </View>
              <View style={styles.cardInfo}>
                {project.featured && (
                  <View style={styles.featuredBadge}>
                    <Feather name="star" size={10} color="#10B981" />
                    <Text style={styles.featuredText}>Featured</Text>
                  </View>
                )}
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.skillsText}>{project.skills}</Text>
              </View>
              <View style={styles.cardRight}>
                <TouchableOpacity>
                  <Feather name="bookmark" size={20} color="#9CA3AF" />
                </TouchableOpacity>
                <Text style={styles.postedText}>{project.posted}</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.badgesContainer}>
                {project.badges.map((badge, idx) => (
                  <View key={idx} style={[styles.badge, { backgroundColor: badge.bg }]}>
                    <Feather name={badge.icon} size={10} color={badge.color} />
                    <Text style={[styles.badgeText, { color: badge.color }]}>{badge.label}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{project.price}</Text>
                <Text style={styles.estimateText}>{project.estimate}</Text>
              </View>
            </View>
          </Animated.View>
        ))}

        {/* VIEW ALL BUTTON */}
        <Animated.View entering={FadeInDown.delay(900).duration(500)}>
          <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.8}>
            <Text style={styles.viewAllBtnText}>View all projects </Text>
            <Feather name="arrow-right" size={16} color="#FF6B00" />
          </TouchableOpacity>
        </Animated.View>

        {/* HOW IT WORKS SECTION */}
        <Animated.View entering={FadeInDown.delay(1000).duration(500)} style={styles.howItWorksContainer}>
          <Text style={styles.sectionTitle}>How it Works</Text>
          
          <View style={styles.timelineWrapper}>
            {/* Dashed Line Background */}
            <View style={styles.dashedLine} />
            
            <View style={styles.timelineRow}>
              <View style={styles.timelineStep}>
                <View style={[styles.stepIconBg, { borderColor: '#10B981' }]}>
                  <Feather name="search" size={16} color="#10B981" />
                </View>
                <Text style={styles.stepTitle}>1. Find Projects</Text>
                <Text style={styles.stepDesc}>Browse and choose{'\n'}the best projects</Text>
              </View>
              
              <View style={styles.timelineStep}>
                <View style={[styles.stepIconBg, { borderColor: '#8B5CF6' }]}>
                  <Feather name="send" size={16} color="#8B5CF6" />
                </View>
                <Text style={styles.stepTitle}>2. Apply & Bid</Text>
                <Text style={styles.stepDesc}>Send proposals and{'\n'}get noticed</Text>
              </View>
              
              <View style={styles.timelineStep}>
                <View style={[styles.stepIconBg, { borderColor: '#F59E0B' }]}>
                  <Feather name="briefcase" size={16} color="#F59E0B" />
                </View>
                <Text style={styles.stepTitle}>3. Work & Deliver</Text>
                <Text style={styles.stepDesc}>Collaborate and{'\n'}deliver quality work</Text>
              </View>
              
              <View style={styles.timelineStep}>
                <View style={[styles.stepIconBg, { borderColor: '#3B82F6' }]}>
                  <Feather name="credit-card" size={16} color="#3B82F6" />
                </View>
                <Text style={styles.stepTitle}>4. Get Paid</Text>
                <Text style={styles.stepDesc}>Receive payments{'\n'}securely</Text>
              </View>
            </View>
          </View>
        </Animated.View>

      </ScrollView>

      {/* BOTTOM NAVIGATION (Freelance Active) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
          <Feather name="briefcase" size={22} color="#9CA3AF" />
          <Text style={styles.navText}>Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/interview')}>
          <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navText}>Interview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="monitor" size={22} color="#FF6B00" />
          <Text style={[styles.navText, { color: '#FF6B00' }]}>Freelance</Text>
          <View style={styles.activeNavIndicator} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="award" size={22} color="#9CA3AF" />
          <Text style={styles.navText}>Degree</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Base & Header
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
  
  // Page Header & Post Btn
  pageHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, gap: 10 },
  pageTitle: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  pageSubtitle: { color: '#9CA3AF', fontSize: 13, lineHeight: 18 },
  postBtn: { 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, 
    borderRadius: 20, gap: 6, borderWidth: 1, borderColor: '#FF6B00', backgroundColor: 'transparent' 
  },
  postBtnText: { color: '#FF6B00', fontSize: 12, fontWeight: '600' },
  
  // Search Bar
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#151A28', borderRadius: 12,
    paddingHorizontal: 15, height: 52, marginBottom: 20, borderWidth: 1, borderColor: '#1F2937',
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#FFF', fontSize: 14 },
  
  // Filters
  filterScroll: { marginBottom: 20 },
  filterChip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#151A28', paddingHorizontal: 16,
    paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#1F2937', alignSelf: 'flex-start',
  },
  activeChip: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  filterText: { color: '#9CA3AF', fontSize: 13, fontWeight: '600' },
  activeFilterText: { color: '#FFF' },

  // Promo Banner
  promoBanner: {
    flexDirection: 'row', backgroundColor: '#151A28', borderRadius: 16, padding: 20, 
    marginBottom: 25, borderWidth: 1, borderColor: '#1F2937', alignItems: 'center'
  },
  promoContent: { flex: 1, paddingRight: 10 },
  promoTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 8, lineHeight: 22 },
  promoSub: { color: '#FF6B00', fontSize: 12, fontWeight: '600' },
  promoImage: { width: 80, height: 80, resizeMode: 'contain' },

  // Section Header
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  sortBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sortText: { color: '#FF6B00', fontSize: 13, fontWeight: '600' },

  // Project Cards
  projectCard: { backgroundColor: '#151A28', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#1F2937' },
  cardHeader: { flexDirection: 'row', marginBottom: 15 },
  companyLogoContainer: { width: 45, height: 45, backgroundColor: '#1F2937', borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  companyLogo: { width: 22, height: 22, resizeMode: 'contain' },
  cardInfo: { flex: 1, paddingRight: 10 },
  featuredBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.1)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 6, gap: 4 },
  featuredText: { color: '#10B981', fontSize: 10, fontWeight: '600' },
  projectTitle: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  skillsText: { color: '#9CA3AF', fontSize: 11 },
  cardRight: { alignItems: 'flex-end', justifyContent: 'space-between' },
  postedText: { color: '#6B7280', fontSize: 10, marginTop: 10 },

  // Card Footer (Badges & Price)
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 5 },
  badgesContainer: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingRight: 10 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 6, gap: 6 },
  badgeText: { fontSize: 10, fontWeight: '600' },
  priceContainer: { alignItems: 'flex-end' },
  priceText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  estimateText: { color: '#9CA3AF', fontSize: 10, marginTop: 4 },

  // View All Button
  viewAllBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: '#1F2937', gap: 8, marginBottom: 30 },
  viewAllBtnText: { color: '#FF6B00', fontSize: 14, fontWeight: '600' },

  // How it works
  howItWorksContainer: { marginBottom: 20 },
  timelineWrapper: { position: 'relative', marginTop: 20 },
  dashedLine: { position: 'absolute', top: 20, left: '10%', right: '10%', height: 1, borderWidth: 1, borderColor: '#374151', borderStyle: 'dashed' },
  timelineRow: { flexDirection: 'row', justifyContent: 'space-between' },
  timelineStep: { alignItems: 'center', width: '24%' },
  stepIconBg: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#151A28', justifyContent: 'center', alignItems: 'center', borderWidth: 2, marginBottom: 10 },
  stepTitle: { color: '#FFF', fontSize: 10, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  stepDesc: { color: '#9CA3AF', fontSize: 9, textAlign: 'center', lineHeight: 12 },

  // Bottom Nav
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#0B0F19', paddingVertical: Platform.OS === 'ios' ? 25 : 15, borderTopWidth: 1, borderTopColor: '#1F2937' },
  navItem: { alignItems: 'center', gap: 6, width: 60 },
  navText: { color: '#9CA3AF', fontSize: 10, fontWeight: '500' },
  activeNavIndicator: { position: 'absolute', bottom: Platform.OS === 'ios' ? -25 : -15, width: 35, height: 3, backgroundColor: '#FF6B00', borderTopLeftRadius: 3, borderTopRightRadius: 3 }
});