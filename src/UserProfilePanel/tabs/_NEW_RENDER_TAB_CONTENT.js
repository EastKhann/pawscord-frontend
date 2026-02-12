  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileTab
            defaultAvatars={defaultAvatars}
            emailVerified={emailVerified}
            fileInputRef={fileInputRef}
            formData={formData}
            handleAvatarUpload={handleAvatarUpload}
            handleInputChange={handleInputChange}
            handlePhoneUpdate={handlePhoneUpdate}
            handleSaveProfile={handleSaveProfile}
            isOwnProfile={isOwnProfile}
            loading={loading}
            phoneNumber={phoneNumber}
            resendVerificationEmail={resendVerificationEmail}
            selectDefaultAvatar={selectDefaultAvatar}
            setPhoneNumber={setPhoneNumber}
          />
        );
      case 'security':
        return (
          <SecurityTab
            backupCodes={backupCodes}
            disable2FA={disable2FA}
            enable2FA={enable2FA}
            handlePasswordChange={handlePasswordChange}
            hasPassword={hasPassword}
            loading={loading}
            passwordData={passwordData}
            revokeAllSessions={revokeAllSessions}
            revokeSession={revokeSession}
            sessions={sessions}
            setPasswordData={setPasswordData}
            setVerificationCode={setVerificationCode}
            twoFactorData={twoFactorData}
            twoFactorEnabled={twoFactorEnabled}
            user={user}
            verificationCode={verificationCode}
            verify2FASetup={verify2FASetup}
          />
        );
      case 'badges':
        return (
          <BadgesTab
            achievements={achievements}
            badges={badges}
            calculateXPProgress={calculateXPProgress}
            storeBalance={storeBalance}
            userStats={userStats}
          />
        );
      case 'privacy':
        return <PrivacyTab blockedUsers={blockedUsers} unblockUser={unblockUser} />;
      case 'friends':
        return (
          <FriendsTab
            friendRequests={friendRequests}
            friends={friends}
            removeFriend={removeFriend}
            respondToFriendRequest={respondToFriendRequest}
          />
        );
      case 'appearance':
        return (
          <AppearanceTab
            applyTheme={applyTheme}
            availableLanguages={availableLanguages}
            currentTheme={currentTheme}
            language={language}
            themes={themes}
            updateLanguage={updateLanguage}
          />
        );
      case 'notifications':
        return <NotificationsTab handleNotificationSettingsUpdate={handleNotificationSettingsUpdate} notificationSettings={notificationSettings} />;
      case 'sounds':
        return <SoundSettingsTab handleSoundSettingsUpdate={handleSoundSettingsUpdate} soundSettings={soundSettings} />;
      case 'premium':
        return <PremiumTab premiumStatus={premiumStatus} />;
      case 'activity':
        return <ActivityTab userActivity={userActivity} />;
      case 'drafts':
        return <DraftsTab deleteDraft={deleteDraft} drafts={drafts} />;
      case 'bookmarks':
        return <BookmarksTab bookmarks={bookmarks} />;
      case 'status':
        return <CustomStatusTab customStatus={customStatus} setCustomStatus={setCustomStatus} updateCustomStatus={updateCustomStatus} />;
      case 'gdpr':
        return <GDPRTab exportRequested={exportRequested} gdprExports={gdprExports} requestGDPRExport={requestGDPRExport} />;
      case 'developer':
        return <DeveloperTab botAccounts={botAccounts} oauthApps={oauthApps} webhooks={webhooks} />;
      case 'inventory':
        return (
          <InventoryTab
            equipItem={equipItem}
            equippedItems={equippedItems}
            inventory={inventory}
            unequipItem={unequipItem}
          />
        );
      case 'endorsements':
        return <EndorsementsTab endorsements={endorsements} />;
      case 'history':
        return <NicknameHistoryTab nicknameHistory={nicknameHistory} />;
      default:
        return null;
    }
  };