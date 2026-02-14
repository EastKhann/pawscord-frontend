// Tab Components
import ProfileTab from './tabs/ProfileTab';
import SecurityTab from './tabs/SecurityTab';
import BadgesTab from './tabs/BadgesTab';
import PrivacyTab from './tabs/PrivacyTab';
import FriendsTab from './tabs/FriendsTab';
import AppearanceTab from './tabs/AppearanceTab';
import NotificationsTab from './tabs/NotificationsTab';
import SoundSettingsTab from './tabs/SoundSettingsTab';
import PremiumTab from './tabs/PremiumTab';
import ActivityTab from './tabs/ActivityTab';
import DraftsTab from './tabs/DraftsTab';
import BookmarksTab from './tabs/BookmarksTab';
import CustomStatusTab from './tabs/CustomStatusTab';
import GDPRTab from './tabs/GDPRTab';
import DeveloperTab from './tabs/DeveloperTab';
import InventoryTab from './tabs/InventoryTab';
import EndorsementsTab from './tabs/EndorsementsTab';
import NicknameHistoryTab from './tabs/NicknameHistoryTab';

/**
 * Routes the active tab to the correct tab component with appropriate props.
 */
const ProfileTabContent = ({ activeTab, api, isOwnProfile, user }) => {
  switch (activeTab) {
    case 'profile':
      return (
        <ProfileTab
          defaultAvatars={api.defaultAvatars}
          emailVerified={api.emailVerified}
          fileInputRef={api.fileInputRef}
          formData={api.formData}
          handleAvatarUpload={api.handleAvatarUpload}
          handleInputChange={api.handleInputChange}
          handlePhoneUpdate={api.handlePhoneUpdate}
          handleSaveProfile={api.handleSaveProfile}
          isOwnProfile={isOwnProfile}
          loading={api.loading}
          phoneNumber={api.phoneNumber}
          resendVerificationEmail={api.resendVerificationEmail}
          selectDefaultAvatar={api.selectDefaultAvatar}
          setPhoneNumber={api.setPhoneNumber}
        />
      );
    case 'security':
      return (
        <SecurityTab
          backupCodes={api.backupCodes}
          disable2FA={api.disable2FA}
          enable2FA={api.enable2FA}
          handlePasswordChange={api.handlePasswordChange}
          hasPassword={api.hasPassword}
          loading={api.loading}
          passwordData={api.passwordData}
          revokeAllSessions={api.revokeAllSessions}
          revokeSession={api.revokeSession}
          sessions={api.sessions}
          setPasswordData={api.setPasswordData}
          setVerificationCode={api.setVerificationCode}
          twoFactorData={api.twoFactorData}
          twoFactorEnabled={api.twoFactorEnabled}
          user={user}
          verificationCode={api.verificationCode}
          verify2FASetup={api.verify2FASetup}
        />
      );
    case 'badges':
      return (
        <BadgesTab
          achievements={api.achievements}
          badges={api.badges}
          calculateXPProgress={api.calculateXPProgress}
          storeBalance={api.storeBalance}
          userStats={api.userStats}
        />
      );
    case 'privacy':
      return <PrivacyTab blockedUsers={api.blockedUsers} unblockUser={api.unblockUser} />;
    case 'friends':
      return (
        <FriendsTab
          friendRequests={api.friendRequests}
          friends={api.friends}
          removeFriend={api.removeFriend}
          respondToFriendRequest={api.respondToFriendRequest}
        />
      );
    case 'appearance':
      return (
        <AppearanceTab
          applyTheme={api.applyTheme}
          availableLanguages={api.availableLanguages}
          currentTheme={api.currentTheme}
          language={api.language}
          themes={api.themes}
          updateLanguage={api.updateLanguage}
        />
      );
    case 'notifications':
      return <NotificationsTab handleNotificationSettingsUpdate={api.handleNotificationSettingsUpdate} notificationSettings={api.notificationSettings} />;
    case 'sounds':
      return <SoundSettingsTab handleSoundSettingsUpdate={api.handleSoundSettingsUpdate} soundSettings={api.soundSettings} />;
    case 'premium':
      return <PremiumTab premiumStatus={api.premiumStatus} />;
    case 'activity':
      return <ActivityTab userActivity={api.userActivity} />;
    case 'drafts':
      return <DraftsTab deleteDraft={api.deleteDraft} drafts={api.drafts} />;
    case 'bookmarks':
      return <BookmarksTab bookmarks={api.bookmarks} />;
    case 'status':
      return <CustomStatusTab customStatus={api.customStatus} setCustomStatus={api.setCustomStatus} updateCustomStatus={api.updateCustomStatus} />;
    case 'gdpr':
      return <GDPRTab exportRequested={api.exportRequested} gdprExports={api.gdprExports} requestGDPRExport={api.requestGDPRExport} />;
    case 'developer':
      return <DeveloperTab botAccounts={api.botAccounts} oauthApps={api.oauthApps} webhooks={api.webhooks} />;
    case 'inventory':
      return (
        <InventoryTab
          equipItem={api.equipItem}
          equippedItems={api.equippedItems}
          inventory={api.inventory}
          unequipItem={api.unequipItem}
        />
      );
    case 'endorsements':
      return <EndorsementsTab endorsements={api.endorsements} />;
    case 'history':
      return <NicknameHistoryTab nicknameHistory={api.nicknameHistory} />;
    default:
      return null;
  }
};

export default ProfileTabContent;
