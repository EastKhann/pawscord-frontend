import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './PrivacyPolicyPage.module.css';

const PrivacyPolicyPage = () => {
    const { t } = useTranslation();
    return (
        <main className={styles.page} aria-label={t('privacy.title')}>
            <div className={styles.inner}>
                <div className={styles.hero} role="banner">
                    <h1 className={styles.heroTitle}>🐾 {t('privacy.title')}</h1>
                    <p className={styles.heroDate}>{t('privacy.lastUpdated')}</p>
                </div>

                <article className={styles.card}>
                    <div
                        className={styles.summary}
                        role="note"
                        aria-label={t('privacy.quickSummaryLabel')}
                    >
                        <strong className={styles.emphasis}>
                            {t('privacy.quickSummaryLabel')}:
                        </strong>{' '}
                        {t('privacy.quickSummary')}
                    </div>

                    <section aria-labelledby="section-collect">
                        <h2 id="section-collect" className={styles.sectionHeading}>
                            {t('privacy.section1Title')}
                        </h2>
                        <p className={styles.text}>{t('privacy.section1Intro')}</p>

                        <h3 className={styles.subHeading}>{t('privacy.personalInfo')}</h3>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                <strong>{t('privacy.accountData')}:</strong>{' '}
                                {t('privacy.accountDataDesc')}
                            </li>
                            <li className={styles.listItem}>
                                <strong>{t('privacy.profileInfo')}:</strong>{' '}
                                {t('privacy.profileInfoDesc')}
                            </li>
                            <li className={styles.listItem}>
                                <strong>{t('privacy.userId')}:</strong> {t('privacy.userIdDesc')}
                            </li>
                        </ul>

                        <h3 className={styles.subHeading}>{t('privacy.commData')}</h3>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                <strong>{t('privacy.messages')}:</strong>{' '}
                                {t('privacy.messagesDesc')}
                            </li>
                            <li className={styles.listItem}>
                                <strong>{t('privacy.mediaFiles')}:</strong>{' '}
                                {t('privacy.mediaFilesDesc')}
                            </li>
                            <li className={styles.listItem}>
                                <strong>{t('privacy.voiceMessages')}:</strong>{' '}
                                {t('privacy.voiceMessagesDesc')}
                            </li>
                        </ul>

                        <h3 className={styles.subHeading}>{t('privacy.usageInfo')}</h3>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                <strong>{t('privacy.activityData')}:</strong>{' '}
                                {t('privacy.activityDataDesc')}
                            </li>
                            <li className={styles.listItem}>
                                <strong>{t('privacy.appInteractions')}:</strong>{' '}
                                {t('privacy.appInteractionsDesc')}
                            </li>
                        </ul>

                        <h3 className={styles.subHeading}>{t('privacy.deviceInfo')}</h3>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                <strong>{t('privacy.deviceIds')}:</strong>{' '}
                                {t('privacy.deviceIdsDesc')}
                            </li>
                            <li className={styles.listItem}>
                                <strong>{t('privacy.techData')}:</strong>{' '}
                                {t('privacy.techDataDesc')}
                            </li>
                        </ul>
                    </section>

                    <section aria-labelledby="section-use">
                        <h2 id="section-use" className={styles.sectionHeading}>
                            {t('privacy.section2Title')}
                        </h2>
                        <p className={styles.text}>{t('privacy.section2Intro')}</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>✅ {t('privacy.use1')}</li>
                            <li className={styles.listItem}>✅ {t('privacy.use2')}</li>
                            <li className={styles.listItem}>✅ {t('privacy.use3')}</li>
                            <li className={styles.listItem}>✅ {t('privacy.use4')}</li>
                            <li className={styles.listItem}>✅ {t('privacy.use5')}</li>
                            <li className={styles.listItem}>✅ {t('privacy.use6')}</li>
                        </ul>
                    </section>

                    <section aria-labelledby="section-sharing">
                        <h2 id="section-sharing" className={styles.sectionHeading}>
                            {t('privacy.section3Title')}
                        </h2>
                        <p className={styles.text}>
                            <strong className={styles.emphasis}>{t('privacy.noSell')}</strong>{' '}
                            {t('privacy.section3Intro')}
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                <strong>{t('privacy.withOtherUsers')}:</strong>{' '}
                                {t('privacy.withOtherUsersDesc')}
                            </li>
                            <li className={styles.listItem}>
                                <strong>{t('privacy.serviceProviders')}:</strong>{' '}
                                {t('privacy.serviceProvidersDesc')}
                            </li>
                            <li className={styles.listItem}>
                                <strong>{t('privacy.legalReqs')}:</strong>{' '}
                                {t('privacy.legalReqsDesc')}
                            </li>
                        </ul>
                    </section>

                    <section aria-labelledby="section-security">
                        <h2 id="section-security" className={styles.sectionHeading}>
                            {t('privacy.section4Title')}
                        </h2>
                        <p className={styles.text}>{t('privacy.section4Intro')}</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>🔒 {t('privacy.sec1')}</li>
                            <li className={styles.listItem}>🔒 {t('privacy.sec2')}</li>
                            <li className={styles.listItem}>🔒 {t('privacy.sec3')}</li>
                            <li className={styles.listItem}>🔒 {t('privacy.sec4')}</li>
                        </ul>
                    </section>

                    <section aria-labelledby="section-rights">
                        <h2 id="section-rights" className={styles.sectionHeading}>
                            {t('privacy.section5Title')}
                        </h2>
                        <p className={styles.text}>{t('privacy.section5Intro')}</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>📋 {t('privacy.right1')}</li>
                            <li className={styles.listItem}>✏️ {t('privacy.right2')}</li>
                            <li className={styles.listItem}>🗑️ {t('privacy.right3')}</li>
                            <li className={styles.listItem}>📥 {t('privacy.right4')}</li>
                            <li className={styles.listItem}>❌ {t('privacy.right5')}</li>
                        </ul>

                        <h3 className={styles.subHeading}>{t('privacy.howToDelete')}</h3>
                        <ol className={styles.list}>
                            <li className={styles.listItem}>{t('privacy.deleteStep1')}</li>
                            <li className={styles.listItem}>{t('privacy.deleteStep2')}</li>
                            <li className={styles.listItem}>{t('privacy.deleteStep3')}</li>
                            <li className={styles.listItem}>{t('privacy.deleteStep4')}</li>
                            <li className={styles.listItem}>{t('privacy.deleteStep5')}</li>
                        </ol>
                    </section>

                    <section aria-labelledby="section-contact" className={styles.contactBox}>
                        <h2 id="section-contact" className={styles.contactHeading}>
                            {t('privacy.contactTitle')}
                        </h2>
                        <p className={styles.text}>{t('privacy.contactIntro')}</p>
                        <ul className={styles.contactList}>
                            <li className={styles.listItem}>
                                📧 <strong>{t('privacy.email')}:</strong> support@pawscord.com
                            </li>
                            <li className={styles.listItem}>
                                🌐 <strong>{t('privacy.website')}:</strong> pawscord.com
                            </li>
                            <li className={styles.listItem}>
                                📱 <strong>{t('privacy.inApp')}:</strong> {t('privacy.inAppDesc')}
                            </li>
                        </ul>
                    </section>

                    <footer className={styles.footer} role="contentinfo">
                        <p>
                            <strong>Pawscord</strong> - {t('privacy.footerTagline')}
                        </p>
                        <p>{t('privacy.copyright')}</p>
                    </footer>
                </article>
            </div>
        </main>
    );
};

PrivacyPolicyPage.propTypes = {};

export default PrivacyPolicyPage;
