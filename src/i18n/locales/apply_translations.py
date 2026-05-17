#!/usr/bin/env python3
"""Apply translations to 8 locale files for Pawscord.
Replaces English-placeholder values with proper translations.
"""

import json
import copy

BASE = "C:/Users/Eastkhan/Software/JavaScript/PAWSCORD/frontend/src/i18n/locales/"

# ------------------------------------------------------------------
# Translation dictionaries keyed by dotted path
# Values that are "keep-as-is" across all languages:
#   - "PawsCord", "Pawscord" brand name
#   - "FREE" (store label, used in all langs)
#   - "👑 Elite" (emoji + brand tier)
#   - "store.free": "FREE" — keep as-is everywhere
#   - "premium.nitro": "Pawscord Nitro" — keep as-is (brand)
#   - store.title: "Pawscord Store" — keep as-is (brand)
# ------------------------------------------------------------------

TRANSLATIONS = {

    # ============================================================
    # ITALIAN (it)
    # ============================================================
    "it": {
        # accountDeletion section
        "accountDeletion.allMessages": "✗ Tutti i tuoi messaggi",
        "accountDeletion.back": "Indietro",
        "accountDeletion.cancel": "Annulla",
        "accountDeletion.confirmLabel": "Digita {{phrase}} per confermare",
        "accountDeletion.connectedAccounts": "✗ I tuoi account collegati (Spotify, Steam, ecc.)",
        "accountDeletion.deleteForever": "Elimina definitivamente il mio account",
        "accountDeletion.friendList": "✗ La tua lista amici",
        "accountDeletion.infoNote": "Nota: i tuoi messaggi nei server di cui sei membro rimarranno visibili, ma il tuo nome utente verrà visualizzato come \"Utente eliminato\".",
        "accountDeletion.irreversible": "Questa azione non può essere annullata!",
        "accountDeletion.passwordLabel": "La tua password",
        "accountDeletion.passwordPlaceholder": "Inserisci la tua password",
        "accountDeletion.pleaseType": "Digita esattamente \"{{phrase}}\"",
        "accountDeletion.premiumSub": "✗ Il tuo abbonamento premium",
        "accountDeletion.proceed": "Continua",
        "accountDeletion.profileInfo": "✗ Le informazioni del tuo profilo e avatar",
        "accountDeletion.serverOwnership": "✗ Le tue proprietà di server (i server verranno eliminati)",
        "accountDeletion.successMessage": "Il tuo account è stato eliminato con successo. Arrivederci! 👋",
        "accountDeletion.verifyIdentity": "Verifica la tua identità",
        "accountDeletion.verifyText": "Inserisci la tua password e digita il testo di conferma per eliminare il tuo account.",
        "accountDeletion.warningText": "Quando elimini il tuo account, verranno rimossi definitivamente:",
        "accountDeletion.xpAndBadges": "✗ I tuoi XP, livello e badge",
        # auth section
        "auth.backToLogin": "Torna al login",
        "auth.buyNow": "Acquista ora",
        "auth.checkSpam": "Controlla la tua email (inclusa la cartella spam)",
        "auth.codeSent": "Un codice di verifica è stato inviato alla tua email",
        "auth.email": "Email",
        "auth.emailPlaceholder": "Il tuo indirizzo email",
        "auth.emailSent": "Email inviata!",
        "auth.emailSentDesc": "Se esiste un account con {email}, abbiamo inviato un link per reimpostare la password.",
        "auth.forgotPasswordDesc": "Inserisci il tuo indirizzo email e ti invieremo un link per reimpostare la password.",
        "auth.hasEmailAccess": "Devi avere accesso al tuo account email",
        "auth.invalidCode": "Codice non valido, riprova",
        "auth.linkExpiry": "Il link è valido per 1 ora",
        "auth.password": "Password",
        "auth.resendCode": "Reinvia codice",
        "auth.securityNote": "Per motivi di sicurezza non riveliamo se l'email è registrata",
        "auth.sendResetLink": "Invia link di reimpostazione",
        "auth.storeDesc": "Ottieni monete e funzionalità premium",
        "auth.storeTitle": "Negozio",
        "auth.verify": "Verifica",
        "auth.verifyEmailDesc": "Inserisci il codice di verifica inviato alla tua email",
        "auth.verifyEmailTitle": "Verifica la tua email",
        # common
        "common.no": "No",
        # landing
        "landing.privacyFirst": "Privacy al primo posto",
        # panels
        "panels.codeRunner": "Esecutore di codice",
        "panels.communitySettings": "Impostazioni community",
        "panels.dataRetention": "Conservazione dei dati",
        "panels.gamePresence": "Presenza di gioco",
        "panels.resetToDefault": "Ripristina predefiniti",
        "panels.selectLanguage": "Seleziona lingua",
        "panels.voiceRecording": "Registrazione vocale",
        # premium
        "premium.nitro": "Pawscord Nitro",
        # privacy
        "privacy.email": "Email",
        "privacy.inApp": "In-app",
        # profile
        "profile.xp": "XP",
        # store
        "store.buyNow": "Acquista ora",
        "store.category.all": "Tutti gli articoli",
        "store.category.badges": "Badge",
        "store.category.boosters": "Potenziamenti",
        "store.category.cosmetics": "Cosmetici",
        "store.category.special": "Speciali",
        "store.elite": "👑 Elite",
        "store.free": "GRATIS",
        "store.loading": "Caricamento negozio...",
        "store.noItems": "Nessun articolo in questa categoria",
        "store.owned": "Posseduto",
        "store.title": "Pawscord Store",
        "store.empty.title": "Nessun articolo",
        "store.empty.desc": "Nuovi articoli verranno aggiunti presto in questa categoria.",
    },

    # ============================================================
    # DUTCH (nl)
    # ============================================================
    "nl": {
        "auth.backToLogin": "Terug naar inloggen",
        "auth.buyNow": "Nu kopen",
        "auth.checkSpam": "Controleer je e-mail (ook de spammap)",
        "auth.codeSent": "Er is een verificatiecode naar je e-mail gestuurd",
        "auth.emailPlaceholder": "Jouw e-mailadres",
        "auth.emailSent": "E-mail verzonden!",
        "auth.emailSentDesc": "Als er een account bestaat met {email}, hebben we een link voor wachtwoordherstel verstuurd.",
        "auth.forgotPasswordDesc": "Voer je e-mailadres in en we sturen je een link om je wachtwoord te herstellen.",
        "auth.hasEmailAccess": "Je moet toegang hebben tot je e-mailaccount",
        "auth.invalidCode": "Ongeldige code, probeer opnieuw",
        "auth.linkExpiry": "Link is 1 uur geldig",
        "auth.resendCode": "Code opnieuw sturen",
        "auth.securityNote": "Om veiligheidsredenen onthullen we niet of het e-mailadres geregistreerd is",
        "auth.sendResetLink": "Herstelkoppeling verzenden",
        "auth.storeDesc": "Haal munten en premiumfuncties",
        "auth.storeTitle": "Winkel",
        "auth.verify": "Verifiëren",
        "auth.verifyEmailDesc": "Voer de verificatiecode in die naar je e-mail is gestuurd",
        "auth.verifyEmailTitle": "Verifieer je e-mail",
        "home.servers_title": "Servers",
        "panels.stickers": "Stickers",
        "premium.nitro": "Pawscord Nitro",
        "privacy.contactTitle": "Contact",
        "profile.xp": "XP",
        "store.buyNow": "Nu kopen",
        "store.category.all": "Alle items",
        "store.category.badges": "Badges",
        "store.category.boosters": "Boosters",
        "store.category.cosmetics": "Cosmetica",
        "store.category.special": "Speciaal",
        "store.elite": "👑 Elite",
        "store.free": "GRATIS",
        "store.loading": "Winkel laden...",
        "store.noItems": "Geen items in deze categorie",
        "store.owned": "Eigendom",
        "store.title": "Pawscord Store",
        "store.empty.title": "Nog geen items",
        "store.empty.desc": "Binnenkort worden nieuwe items aan deze categorie toegevoegd.",
        "voice.camera": "Camera",
    },

    # ============================================================
    # SWEDISH (sv)
    # ============================================================
    "sv": {
        "auth.backToLogin": "Tillbaka till inloggning",
        "auth.buyNow": "Köp nu",
        "auth.checkSpam": "Kontrollera din e-post (inklusive skräppostmappen)",
        "auth.codeSent": "En verifieringskod har skickats till din e-post",
        "auth.emailPlaceholder": "Din e-postadress",
        "auth.emailSent": "E-post skickad!",
        "auth.emailSentDesc": "Om ett konto med {email} finns har vi skickat en länk för lösenordsåterställning.",
        "auth.forgotPasswordDesc": "Ange din e-postadress så skickar vi en länk för att återställa lösenordet.",
        "auth.hasEmailAccess": "Du måste ha tillgång till ditt e-postkonto",
        "auth.invalidCode": "Ogiltig kod, försök igen",
        "auth.linkExpiry": "Länken är giltig i 1 timme",
        "auth.resendCode": "Skicka om koden",
        "auth.securityNote": "Av säkerhetsskäl avslöjar vi inte om e-postadressen är registrerad",
        "auth.sendResetLink": "Skicka återställningslänk",
        "auth.storeDesc": "Skaffa mynt och premiumfunktioner",
        "auth.storeTitle": "Butik",
        "auth.verify": "Verifiera",
        "auth.verifyEmailDesc": "Ange verifieringskoden som skickades till din e-post",
        "auth.verifyEmailTitle": "Verifiera din e-post",
        "premium.nitro": "Pawscord Nitro",
        "privacy.sec2": "Data",
        "profile.xp": "XP",
        "store.buyNow": "Köp nu",
        "store.category.all": "Alla objekt",
        "store.category.badges": "Märken",
        "store.category.boosters": "Boosters",
        "store.category.cosmetics": "Kosmetika",
        "store.category.special": "Speciellt",
        "store.elite": "👑 Elite",
        "store.free": "GRATIS",
        "store.loading": "Laddar butik...",
        "store.noItems": "Inga objekt i den här kategorin",
        "store.owned": "Äger",
        "store.title": "Pawscord Store",
        "store.empty.title": "Inga objekt ännu",
        "store.empty.desc": "Nya objekt kommer snart att läggas till i den här kategorin.",
    },

    # ============================================================
    # POLISH (pl)
    # ============================================================
    "pl": {
        "auth.backToLogin": "Powrót do logowania",
        "auth.buyNow": "Kup teraz",
        "auth.checkSpam": "Sprawdź swoją pocztę (w tym folder spam)",
        "auth.codeSent": "Kod weryfikacyjny został wysłany na Twój adres e-mail",
        "auth.email": "E-mail",
        "auth.emailPlaceholder": "Twój adres e-mail",
        "auth.emailSent": "E-mail wysłany!",
        "auth.emailSentDesc": "Jeśli konto z adresem {email} istnieje, wysłaliśmy link do resetowania hasła.",
        "auth.forgotPasswordDesc": "Wprowadź swój adres e-mail, a wyślemy Ci link do resetowania hasła.",
        "auth.hasEmailAccess": "Musisz mieć dostęp do swojego konta e-mail",
        "auth.invalidCode": "Nieprawidłowy kod, spróbuj ponownie",
        "auth.linkExpiry": "Link jest ważny przez 1 godzinę",
        "auth.resendCode": "Wyślij kod ponownie",
        "auth.securityNote": "Ze względów bezpieczeństwa nie ujawniamy, czy adres e-mail jest zarejestrowany",
        "auth.sendResetLink": "Wyślij link resetujący",
        "auth.storeDesc": "Zdobądź monety i funkcje premium",
        "auth.storeTitle": "Sklep",
        "auth.verify": "Zweryfikuj",
        "auth.verifyEmailDesc": "Wprowadź kod weryfikacyjny wysłany na Twój adres e-mail",
        "auth.verifyEmailTitle": "Zweryfikuj swój adres e-mail",
        "premium.nitro": "Pawscord Nitro",
        "store.buyNow": "Kup teraz",
        "store.category.all": "Wszystkie przedmioty",
        "store.category.badges": "Odznaki",
        "store.category.boosters": "Wzmacniacze",
        "store.category.cosmetics": "Kosmetyki",
        "store.category.special": "Specjalne",
        "store.elite": "👑 Elite",
        "store.free": "BEZPŁATNIE",
        "store.loading": "Ładowanie sklepu...",
        "store.noItems": "Brak przedmiotów w tej kategorii",
        "store.owned": "Posiadane",
        "store.title": "Pawscord Store",
        "store.empty.title": "Brak przedmiotów",
        "store.empty.desc": "Nowe przedmioty zostaną wkrótce dodane do tej kategorii.",
    },

    # ============================================================
    # RUSSIAN (ru)
    # ============================================================
    "ru": {
        # accountDeletion section
        "accountDeletion.allMessages": "✗ Все ваши сообщения",
        "accountDeletion.back": "Назад",
        "accountDeletion.cancel": "Отмена",
        "accountDeletion.confirmLabel": "Введите {{phrase}} для подтверждения",
        "accountDeletion.connectedAccounts": "✗ Ваши подключённые аккаунты (Spotify, Steam и др.)",
        "accountDeletion.deleteForever": "Удалить мой аккаунт навсегда",
        "accountDeletion.friendList": "✗ Ваш список друзей",
        "accountDeletion.infoNote": "Примечание: ваши сообщения на серверах, членом которых вы являетесь, останутся видимыми, но ваше имя пользователя будет отображаться как «Удалённый пользователь».",
        "accountDeletion.irreversible": "Это действие нельзя отменить!",
        "accountDeletion.passwordLabel": "Ваш пароль",
        "accountDeletion.passwordPlaceholder": "Введите ваш пароль",
        "accountDeletion.pleaseType": "Пожалуйста, введите точно \"{{phrase}}\"",
        "accountDeletion.premiumSub": "✗ Ваша премиум-подписка",
        "accountDeletion.proceed": "Продолжить",
        "accountDeletion.profileInfo": "✗ Информация вашего профиля и аватар",
        "accountDeletion.serverOwnership": "✗ Ваше владение серверами (серверы будут удалены)",
        "accountDeletion.successMessage": "Ваш аккаунт успешно удалён. До свидания! 👋",
        "accountDeletion.verifyIdentity": "Подтвердите вашу личность",
        "accountDeletion.verifyText": "Введите ваш пароль и подтверждающий текст для удаления аккаунта.",
        "accountDeletion.warningText": "При удалении аккаунта следующее будет удалено навсегда:",
        "accountDeletion.xpAndBadges": "✗ Ваши XP, уровень и значки",
        # auth section
        "auth.backToLogin": "Вернуться ко входу",
        "auth.buyNow": "Купить сейчас",
        "auth.checkSpam": "Проверьте вашу почту (включая папку со спамом)",
        "auth.codeSent": "Код подтверждения был отправлен на вашу электронную почту",
        "auth.emailPlaceholder": "Ваш адрес электронной почты",
        "auth.emailSent": "Письмо отправлено!",
        "auth.emailSentDesc": "Если учётная запись с адресом {email} существует, мы отправили ссылку для сброса пароля.",
        "auth.forgotPasswordDesc": "Введите ваш адрес электронной почты, и мы отправим вам ссылку для сброса пароля.",
        "auth.hasEmailAccess": "Вы должны иметь доступ к своей учётной записи электронной почты",
        "auth.invalidCode": "Неверный код, попробуйте ещё раз",
        "auth.linkExpiry": "Ссылка действительна в течение 1 часа",
        "auth.resendCode": "Отправить код повторно",
        "auth.securityNote": "В целях безопасности мы не сообщаем, зарегистрирован ли адрес электронной почты",
        "auth.sendResetLink": "Отправить ссылку для сброса",
        "auth.storeDesc": "Получайте монеты и премиум-функции",
        "auth.storeTitle": "Магазин",
        "auth.verify": "Подтвердить",
        "auth.verifyEmailDesc": "Введите код подтверждения, отправленный на вашу электронную почту",
        "auth.verifyEmailTitle": "Подтвердите вашу электронную почту",
        # panels
        "panels.codeRunner": "Запуск кода",
        "panels.communitySettings": "Настройки сообщества",
        "panels.dataRetention": "Хранение данных",
        "panels.gamePresence": "Статус игры",
        "panels.resetToDefault": "Сбросить до стандартных",
        "panels.selectLanguage": "Выбрать язык",
        "panels.voiceRecording": "Запись голоса",
        # premium
        "premium.nitro": "Pawscord Nitro",
        # store
        "store.buyNow": "Купить сейчас",
        "store.category.all": "Все товары",
        "store.category.badges": "Значки",
        "store.category.boosters": "Бустеры",
        "store.category.cosmetics": "Косметика",
        "store.category.special": "Особые",
        "store.elite": "👑 Elite",
        "store.free": "БЕСПЛАТНО",
        "store.loading": "Загрузка магазина...",
        "store.noItems": "В этой категории нет товаров",
        "store.owned": "Куплено",
        "store.title": "Pawscord Store",
        "store.empty.title": "Нет товаров",
        "store.empty.desc": "В эту категорию скоро будут добавлены новые товары.",
    },

    # ============================================================
    # UKRAINIAN (uk)
    # ============================================================
    "uk": {
        "auth.backToLogin": "Повернутися до входу",
        "auth.buyNow": "Купити зараз",
        "auth.checkSpam": "Перевірте свою пошту (включно з папкою спаму)",
        "auth.codeSent": "Код підтвердження було надіслано на вашу електронну пошту",
        "auth.emailPlaceholder": "Ваша електронна адреса",
        "auth.emailSent": "Лист надіслано!",
        "auth.emailSentDesc": "Якщо обліковий запис із адресою {email} існує, ми надіслали посилання для скидання пароля.",
        "auth.forgotPasswordDesc": "Введіть свою електронну адресу, і ми надішлемо вам посилання для скидання пароля.",
        "auth.hasEmailAccess": "Ви повинні мати доступ до свого облікового запису електронної пошти",
        "auth.invalidCode": "Неправильний код, спробуйте ще раз",
        "auth.linkExpiry": "Посилання дійсне протягом 1 години",
        "auth.resendCode": "Надіслати код повторно",
        "auth.securityNote": "З міркувань безпеки ми не повідомляємо, чи зареєстровано електронну адресу",
        "auth.sendResetLink": "Надіслати посилання для скидання",
        "auth.storeDesc": "Отримуйте монети та преміум-функції",
        "auth.storeTitle": "Магазин",
        "auth.verify": "Підтвердити",
        "auth.verifyEmailDesc": "Введіть код підтвердження, надісланий на вашу електронну пошту",
        "auth.verifyEmailTitle": "Підтвердьте свою електронну пошту",
        "premium.nitro": "Pawscord Nitro",
        "profile.xp": "XP",
        "store.buyNow": "Купити зараз",
        "store.category.all": "Усі товари",
        "store.category.badges": "Значки",
        "store.category.boosters": "Бустери",
        "store.category.cosmetics": "Косметика",
        "store.category.special": "Особливі",
        "store.elite": "👑 Elite",
        "store.free": "БЕЗКОШТОВНО",
        "store.loading": "Завантаження магазину...",
        "store.noItems": "Немає товарів у цій категорії",
        "store.owned": "Куплено",
        "store.title": "Pawscord Store",
        "store.empty.title": "Немає товарів",
        "store.empty.desc": "Нові товари невдовзі будуть додані до цієї категорії.",
    },

    # ============================================================
    # PERSIAN / FARSI (fa)
    # ============================================================
    "fa": {
        "auth.backToLogin": "بازگشت به ورود",
        "auth.buyNow": "همین حالا بخر",
        "auth.checkSpam": "ایمیلت را بررسی کن (از جمله پوشه اسپم)",
        "auth.codeSent": "یک کد تأیید به ایمیل شما ارسال شد",
        "auth.emailPlaceholder": "آدرس ایمیل شما",
        "auth.emailSent": "ایمیل ارسال شد!",
        "auth.emailSentDesc": "اگر حسابی با {email} وجود داشته باشد، لینک بازنشانی رمز عبور فرستاده‌ایم.",
        "auth.forgotPasswordDesc": "آدرس ایمیل خود را وارد کنید تا لینک بازنشانی رمز عبور برایتان ارسال کنیم.",
        "auth.hasEmailAccess": "باید به حساب ایمیل خود دسترسی داشته باشید",
        "auth.invalidCode": "کد نامعتبر، لطفاً دوباره امتحان کنید",
        "auth.linkExpiry": "لینک به مدت ۱ ساعت معتبر است",
        "auth.resendCode": "ارسال مجدد کد",
        "auth.securityNote": "به دلایل امنیتی فاش نمی‌کنیم که آیا ایمیل ثبت‌نام شده است",
        "auth.sendResetLink": "ارسال لینک بازنشانی",
        "auth.storeDesc": "سکه‌ها و ویژگی‌های پریمیوم بگیرید",
        "auth.storeTitle": "فروشگاه",
        "auth.verify": "تأیید",
        "auth.verifyEmailDesc": "کد تأیید ارسال‌شده به ایمیل خود را وارد کنید",
        "auth.verifyEmailTitle": "ایمیل خود را تأیید کنید",
        "common.addFriend": "افزودن دوست",
        "common.friendRequestSent": "درخواست دوستی ارسال شد",
        "common.manageSessions": "مدیریت نشست‌ها",
        "common.notes": "یادداشت‌ها",
        "common.sendCoins": "ارسال سکه",
        "common.sendMessage": "ارسال پیام",
        "common.userNotes": "یادداشت‌های کاربر",
        "premium.nitro": "Pawscord Nitro",
        "profile.xp": "XP",
        "store.buyNow": "همین حالا بخر",
        "store.category.all": "همه اقلام",
        "store.category.badges": "نشان‌ها",
        "store.category.boosters": "بوسترها",
        "store.category.cosmetics": "لوازم آرایشی",
        "store.category.special": "ویژه",
        "store.elite": "👑 Elite",
        "store.free": "رایگان",
        "store.loading": "در حال بارگذاری فروشگاه...",
        "store.noItems": "هیچ موردی در این دسته وجود ندارد",
        "store.owned": "خریداری‌شده",
        "store.title": "Pawscord Store",
        "store.empty.title": "هنوز هیچ موردی نیست",
        "store.empty.desc": "به زودی موارد جدیدی به این دسته اضافه خواهند شد.",
    },

    # ============================================================
    # HEBREW (he)
    # ============================================================
    "he": {
        "auth.backToLogin": "חזרה להתחברות",
        "auth.buyNow": "קנה עכשיו",
        "auth.checkSpam": "בדוק את האימייל שלך (כולל תיקיית הספאם)",
        "auth.codeSent": "קוד אימות נשלח לכתובת האימייל שלך",
        "auth.emailPlaceholder": "כתובת האימייל שלך",
        "auth.emailSent": "אימייל נשלח!",
        "auth.emailSentDesc": "אם קיים חשבון עם {email}, שלחנו קישור לאיפוס סיסמה.",
        "auth.forgotPasswordDesc": "הזן את כתובת האימייל שלך ונשלח לך קישור לאיפוס סיסמה.",
        "auth.hasEmailAccess": "עליך לקבל גישה לחשבון האימייל שלך",
        "auth.invalidCode": "קוד שגוי, נסה שוב",
        "auth.linkExpiry": "הקישור תקף למשך שעה אחת",
        "auth.resendCode": "שלח קוד מחדש",
        "auth.securityNote": "מסיבות אבטחה איננו חושפים אם האימייל רשום",
        "auth.sendResetLink": "שלח קישור לאיפוס",
        "auth.storeDesc": "קבל מטבעות ותכונות פרימיום",
        "auth.storeTitle": "חנות",
        "auth.verify": "אמת",
        "auth.verifyEmailDesc": "הזן את קוד האימות שנשלח לאימייל שלך",
        "auth.verifyEmailTitle": "אמת את האימייל שלך",
        "common.addFriend": "הוסף חבר",
        "common.friendRequestSent": "בקשת חברות נשלחה",
        "common.manageSessions": "ניהול הפעלות",
        "common.notes": "הערות",
        "common.sendCoins": "שלח מטבעות",
        "common.sendMessage": "שלח הודעה",
        "common.userNotes": "הערות משתמש",
        "premium.nitro": "Pawscord Nitro",
        "store.buyNow": "קנה עכשיו",
        "store.category.all": "כל הפריטים",
        "store.category.badges": "תגים",
        "store.category.boosters": "בוסטרים",
        "store.category.cosmetics": "קוסמטיקה",
        "store.category.special": "מיוחד",
        "store.elite": "👑 Elite",
        "store.free": "חינם",
        "store.loading": "טוען חנות...",
        "store.noItems": "אין פריטים בקטגוריה זו",
        "store.owned": "נרכש",
        "store.title": "Pawscord Store",
        "store.empty.title": "אין פריטים עדיין",
        "store.empty.desc": "פריטים חדשים יתווספו לקטגוריה זו בקרוב.",
    },
}


# ------------------------------------------------------------------
# Helper: set a value at dotted path in nested dict
# ------------------------------------------------------------------
def set_nested(d, path, value):
    keys = path.split(".")
    node = d
    for key in keys[:-1]:
        if key not in node or not isinstance(node[key], dict):
            node[key] = {}
        node = node[key]
    node[keys[-1]] = value


# ------------------------------------------------------------------
# Main: apply translations and write files
# ------------------------------------------------------------------
def load(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")


import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

for lang, trans in TRANSLATIONS.items():
    path = BASE + f"{lang}.json"
    data = load(path)
    for dotted_key, translated_value in trans.items():
        set_nested(data, dotted_key, translated_value)
    save(path, data)
    print(f"OK {lang}.json - {len(trans)} keys updated")

print("All done!")
