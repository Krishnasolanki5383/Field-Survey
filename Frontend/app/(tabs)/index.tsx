import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSurveys } from '@/context/SurveyContext';
import data from '@/constants/data.json';

export default function DashboardScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { surveys } = useSurveys();

  // Get current date string in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Count surveys created today from global context
  const contextSurveysToday = surveys.filter((s) => s.date === todayStr).length;

  // Combine initial JSON statistics with context updates
  const todayCount = data.surveyStats.todayCount + contextSurveysToday;
  const targetCount = data.surveyStats.targetCount;
  const completionPercent = Math.min(
    100,
    Math.round((todayCount / targetCount) * 100)
  );

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning,';
    if (hour < 17) return 'Good Afternoon,';
    return 'Good Evening,';
  };

  const openDrawerMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Premium Header */}
      <View style={styles.header}>
        <Pressable onPress={openDrawerMenu} style={styles.headerButton}>
          <Ionicons name="grid-outline" size={24} color="#0F7A5E" />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitleMain}>Smart Field Survey</Text>
          <Text style={styles.headerTitleSub}>& Inspection Hub</Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable style={styles.notificationIconContainer}>
            <Ionicons name="notifications-outline" size={24} color="#0F7A5E" />
            <View style={styles.notificationDot} />
          </Pressable>
          <Pressable onPress={() => router.push('/(tabs)/profile')}>
            <Image
              source={require('@/assets/images/avatar_ammar.png')}
              style={styles.headerAvatar}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Dynamic Welcome Card */}
        <View style={styles.welcomeBanner}>
          <View>
            <Text style={styles.welcomeTextLabel}>{getGreeting()}</Text>
            <Text style={styles.welcomeTextName}>{data.student.name}</Text>
          </View>
          <View style={styles.badgeContainer}>
            <Ionicons name="shield-checkmark" size={16} color="#ffffff" style={{ marginRight: 4 }} />
            <Text style={styles.badgeText}>Verified Inspector</Text>
          </View>
        </View>

        {/* Student Profile Card (Re-styled for a premium badge layout) */}
        <View style={styles.profileBadgeCard}>
          <View style={styles.badgeLeft}>
            <View style={styles.avatarOutlineRing}>
              <Image
                source={require('@/assets/images/avatar_ammar.png')}
                style={styles.profileBadgeAvatar}
              />
            </View>
            <View style={styles.statusLabelContainer}>
              <View style={styles.statusLabelDot} />
              <Text style={styles.statusLabelText}>Active Inspector</Text>
            </View>
          </View>

          <View style={styles.badgeRight}>
            <View style={styles.badgeDetailItem}>
              <Ionicons name="id-card-outline" size={14} color="#0F7A5E" style={styles.badgeDetailIcon} />
              <View>
                <Text style={styles.badgeDetailLabel}>ID NUMBER</Text>
                <Text style={styles.badgeDetailValue}>{data.student.id}</Text>
              </View>
            </View>

            <View style={styles.badgeDetailItem}>
              <Ionicons name="school-outline" size={14} color="#0F7A5E" style={styles.badgeDetailIcon} />
              <View>
                <Text style={styles.badgeDetailLabel}>SPECIALIZATION</Text>
                <Text style={styles.badgeDetailValue} numberOfLines={1}>
                  {data.student.course.replace('B.E. ', '')}
                </Text>
              </View>
            </View>

            <View style={styles.badgeDetailItem}>
              <Ionicons name="business-outline" size={14} color="#0F7A5E" style={styles.badgeDetailIcon} />
              <View>
                <Text style={styles.badgeDetailLabel}>DEPARTMENT</Text>
                <Text style={styles.badgeDetailValue}>{data.student.department}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Survey Metrics Card (Re-styled with dynamic stats & clean layout) */}
        <View style={styles.metricsCard}>
          <View style={styles.metricsHeader}>
            <View style={styles.metricsHeaderLeft}>
              <Ionicons name="analytics" size={20} color="#0F7A5E" />
              <Text style={styles.metricsTitle}>Daily Inspection Progress</Text>
            </View>
            <View style={styles.liveIndicatorContainer}>
              <View style={styles.liveIndicatorDot} />
              <Text style={styles.liveIndicatorText}>LIVE SYNC</Text>
            </View>
          </View>

          <View style={styles.metricsBody}>
            <View style={styles.metricStatBox}>
              <Text style={styles.metricLargeNumber}>
                {todayCount < 10 ? `0${todayCount}` : todayCount}
              </Text>
              <Text style={styles.metricSubText}>Surveys Logged</Text>
            </View>

            <View style={styles.metricDividerLine} />

            <View style={styles.metricStatBox}>
              <Text style={styles.metricLargeNumber}>{targetCount}</Text>
              <Text style={styles.metricSubText}>Target Goal</Text>
            </View>

            <View style={styles.metricDividerLine} />

            {/* Circular Progress Arc */}
            <View style={styles.progressCircleContainer}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressPercentageText}>{completionPercent}%</Text>
                <Text style={styles.progressCompletedText}>Done</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <Text style={styles.sectionHeading}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {/* Action 1: New Survey */}
          <Pressable
            style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
            onPress={() => router.push('/new-survey')}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="camera-sharp" size={20} color="#2E7D32" />
            </View>
            <Text style={styles.actionLabel}>New Survey</Text>
            <Text style={styles.actionDescription}>Capture site checkup details</Text>
          </Pressable>

          {/* Action 2: Location */}
          <Pressable
            style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
            onPress={() => router.push('/location')}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="location-sharp" size={20} color="#1565C0" />
            </View>
            <Text style={styles.actionLabel}>Location</Text>
            <Text style={styles.actionDescription}>Get active GPS coordinates</Text>
          </Pressable>

          {/* Action 3: Contacts */}
          <Pressable
            style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
            onPress={() => router.push('/contacts')}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="people-sharp" size={20} color="#6A1B9A" />
            </View>
            <Text style={styles.actionLabel}>Contacts</Text>
            <Text style={styles.actionDescription}>Select client profile card</Text>
          </Pressable>

          {/* Action 4: Paste Data */}
          <Pressable
            style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
            onPress={() => router.push('/clipboard')}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="clipboard-sharp" size={20} color="#E65100" />
            </View>
            <Text style={styles.actionLabel}>Paste Data</Text>
            <Text style={styles.actionDescription}>Retrieve clipboard survey</Text>
          </Pressable>
        </View>

        {/* Recent Survey Summary List */}
        <View style={styles.recentSectionHeader}>
          <Text style={styles.sectionHeadingNoMargin}>Recent Surveys</Text>
          <Pressable onPress={() => router.push('/(tabs)/history')}>
            <Text style={styles.viewAllText}>View All {'>'}</Text>
          </Pressable>
        </View>

        <View style={styles.recentList}>
          {data.recentSurveys.map((survey) => {
            // Pick styling based on status and priority
            let badgeBg = '#E8F5E9';
            let badgeColor = '#2E7D32';
            let iconBg = '#E8F5E9';
            let iconColor = '#2E7D32';
            let iconName: any = 'checkmark-circle-outline';
            let priorityStripColor = '#81C784'; // Low (Green)

            if (survey.priority === 'High') {
              priorityStripColor = '#EF5350'; // Red
            } else if (survey.priority === 'Medium') {
              priorityStripColor = '#FFB74D'; // Orange
            }

            if (survey.status === 'In Progress') {
              badgeBg = '#E3F2FD';
              badgeColor = '#1565C0';
              iconBg = '#E3F2FD';
              iconColor = '#1565C0';
              iconName = 'trending-up-outline';
            } else if (survey.status === 'Pending') {
              badgeBg = '#FFF3E0';
              badgeColor = '#E65100';
              iconBg = '#F3E5F5';
              iconColor = '#6A1B9A';
              iconName = 'time-outline';
            }

            return (
              <Pressable
                key={survey.id}
                style={({ pressed }) => [styles.surveyCardItem, pressed && styles.surveyCardItemPressed]}
                onPress={() => router.push('/(tabs)/history')}
              >
                {/* Brand-new Priority Left Edge Indicator Strip */}
                <View style={[styles.priorityIndicatorStrip, { backgroundColor: priorityStripColor }]} />

                <View style={[styles.surveyIconOuter, { backgroundColor: iconBg }]}>
                  <Ionicons name={iconName} size={20} color={iconColor} />
                </View>

                <View style={styles.surveyContentBlock}>
                  <Text style={styles.surveyTitleText} numberOfLines={1}>
                    {survey.siteName}
                  </Text>
                  
                  <View style={styles.surveyMetaRow}>
                    <Ionicons name="location-outline" size={11} color="#666666" style={{ marginRight: 3 }} />
                    <Text style={styles.surveyMetaLabel} numberOfLines={1}>
                      {survey.location}
                    </Text>
                  </View>

                  <View style={styles.surveyMetaRow}>
                    <Ionicons name="time-outline" size={11} color="#888888" style={{ marginRight: 3 }} />
                    <Text style={styles.surveyDateLabel}>
                      {survey.date} - {survey.time}
                    </Text>
                  </View>
                </View>

                <View style={styles.surveyRightContainer}>
                  <View style={[styles.statusBadgePill, { backgroundColor: badgeBg }]}>
                    <Text style={[styles.statusBadgeLabelText, { color: badgeColor }]}>
                      {survey.status}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#BFC9C5" style={styles.chevron} />
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F6F5', // Refreshing light slate background
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2EAE7',
    backgroundColor: '#ffffff',
  },
  headerButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleMain: {
    fontSize: 13,
    color: '#8E9A96',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  headerTitleSub: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F7A5E',
    marginTop: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIconContainer: {
    position: 'relative',
    marginRight: 14,
    padding: 4,
  },
  notificationDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF5350', // Attention-grabbing red notifications badge dot
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  headerAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: '#0F7A5E',
  },
  welcomeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 18,
  },
  welcomeTextLabel: {
    fontSize: 13,
    color: '#71807B',
    fontWeight: '500',
  },
  welcomeTextName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#13352C',
    marginTop: 2,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F7A5E',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#0F7A5E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileBadgeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2EAE7',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#0F7A5E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  avatarOutlineRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: '#E2EAE7',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBadgeAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    resizeMode: 'cover',
  },
  statusLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  statusLabelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2E7D32',
    marginRight: 4,
  },
  statusLabelText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  badgeRight: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#F0F3F2',
    paddingLeft: 16,
  },
  badgeDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  badgeDetailIcon: {
    marginRight: 10,
    width: 16,
    textAlign: 'center',
  },
  badgeDetailLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#8E9A96',
    letterSpacing: 0.5,
  },
  badgeDetailValue: {
    fontSize: 11,
    color: '#13352C',
    fontWeight: '700',
    marginTop: 1,
  },
  metricsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2EAE7',
    padding: 16,
    marginBottom: 20,
    shadowColor: '#0F7A5E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  metricsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F6F5',
    paddingBottom: 10,
    marginBottom: 14,
  },
  metricsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#13352C',
    marginLeft: 8,
  },
  liveIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  liveIndicatorDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#E65100',
    marginRight: 4,
  },
  liveIndicatorText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#E65100',
  },
  metricsBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metricStatBox: {
    flex: 1,
    alignItems: 'center',
  },
  metricLargeNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F7A5E',
  },
  metricSubText: {
    fontSize: 9,
    color: '#8E9A96',
    fontWeight: '600',
    marginTop: 2,
  },
  metricDividerLine: {
    width: 1,
    height: 35,
    backgroundColor: '#E2EAE7',
  },
  progressCircleContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  progressCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 4.5,
    borderColor: '#E2EAE7',
    borderTopColor: '#0F7A5E',
    borderRightColor: '#0F7A5E',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-15deg' }],
  },
  progressPercentageText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F7A5E',
    transform: [{ rotate: '15deg' }],
  },
  progressCompletedText: {
    fontSize: 6,
    color: '#8E9A96',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 1,
    transform: [{ rotate: '15deg' }],
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#13352C',
    marginBottom: 12,
  },
  sectionHeadingNoMargin: {
    fontSize: 15,
    fontWeight: '800',
    color: '#13352C',
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  actionButton: {
    width: '23.5%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2EAE7',
    paddingVertical: 14,
    paddingHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.015,
    shadowRadius: 4,
    elevation: 1.5,
  },
  actionButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  actionIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#13352C',
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 7,
    color: '#8E9A96',
    textAlign: 'center',
    marginTop: 3,
    lineHeight: 9,
  },
  recentSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F7A5E',
  },
  recentList: {
    marginBottom: 20,
  },
  surveyCardItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2EAE7',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.015,
    shadowRadius: 4,
    elevation: 2,
  },
  surveyCardItemPressed: {
    opacity: 0.92,
  },
  priorityIndicatorStrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  surveyIconOuter: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  surveyContentBlock: {
    flex: 1,
    marginLeft: 12,
    marginRight: 6,
  },
  surveyTitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#13352C',
  },
  surveyMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  surveyMetaLabel: {
    fontSize: 10,
    color: '#71807B',
    flex: 1,
  },
  surveyDateLabel: {
    fontSize: 9,
    color: '#8E9A96',
  },
  surveyRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadgePill: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadgeLabelText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  chevron: {
    marginLeft: 4,
  },
});
