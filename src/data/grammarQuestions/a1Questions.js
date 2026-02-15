// A1 Level Grammar Questions

const A1_QUESTIONS = [
    // =================================================================
    // === A1 SEVİYESİ (GENİŞLETİLMİŞ ÖĞRETİCİ PAKET)
    // =================================================================

    // --- TO BE (OLMAK FİİLİ) ---
    {
        id: 1001, level: 'A1', type: 'choice',
        question: "My brother _____ a doctor.",
        options: ["are", "am", "is", "be"],
        answer: "is",
        explanation: {
            title: "To Be (Olmak) Fiili - Tekil",
            rule: "Tekil öznelerde (He, She, It, My brother, The cat) 'is' yardımcı fiili kullanılır.",
            tips: "He/She/It -> IS",
            examples: ["She is tall.", "It is a book."],
            translation: "Benim kardeşim bir doktordur."
        }
    },
    {
        id: 1002, level: 'A1', type: 'choice',
        question: "You and I _____ friends.",
        options: ["am", "is", "are", "be"],
        answer: "are",
        explanation: {
            title: "To Be (Olmak) Fiili - Çoğul",
            rule: "'You and I' (Sen ve ben) aslında 'We' (Biz) demektir. Çoğul özneler 'are' alır.",
            tips: "We/You/They -> ARE",
            examples: ["We are happy.", "Tom and Jerry are enemies."],
            translation: "Sen ve ben arkadaşız."
        }
    },
    {
        id: 1003, level: 'A1', type: 'choice',
        question: "_____ they at home now?",
        options: ["Is", "Am", "Are", "Do"],
        answer: "Are",
        explanation: {
            title: "Soru Cümlesi (To Be)",
            rule: "İsim cümlelerinde (fiil yoksa) soru sorarken 'Am/Is/Are' başa gelir.",
            tips: "They are -> Are they...?",
            examples: ["Are you hungry?", "Is she okay?"],
            translation: "Onlar şu an evde mi?"
        }
    },

    // --- PRESENT SIMPLE (GENİŞ ZAMAN) ---
    {
        id: 1004, level: 'A1', type: 'input',
        question: "She _____ (drink) coffee every morning.",
        answer: "drinks",
        explanation: {
            title: "Geniş Zaman - 3. Tekil Şahıs",
            rule: "Geniş zamanda (Simple Present) özne 'He, She, It' ise fiile '-s' takısı gelir.",
            tips: "I drink -> She drinks",
            examples: ["He plays football.", "It rains a lot."],
            translation: "O, her sabah kahve içer."
        }
    },
    {
        id: 1005, level: 'A1', type: 'choice',
        question: "We _____ go to school on Sundays.",
        options: ["not", "doesn't", "don't", "aren't"],
        answer: "don't",
        explanation: {
            title: "Geniş Zaman - Olumsuzluk",
            rule: "Fiil cümlelerinde 'I, You, We, They' özneleri için olumsuzluk eki 'don't'tur.",
            tips: "I/You/We/They -> DON'T | He/She/It -> DOESN'T",
            examples: ["I don't know.", "They don't like pizza."],
            translation: "Pazar günleri okula gitmeyiz."
        }
    },
    {
        id: 1006, level: 'A1', type: 'choice',
        question: "_____ Ali play tennis?",
        options: ["Do", "Does", "Is", "Are"],
        answer: "Does",
        explanation: {
            title: "Geniş Zaman - Soru",
            rule: "Ali (He) tekil olduğu için ve cümlede bir eylem (play) olduğu için 'Does' kullanılır.",
            tips: "Fiil varsa -> Do/Does | Durum varsa -> Am/Is/Are",
            examples: ["Does she work?", "Do you swim?"],
            translation: "Ali tenis oynar mı?"
        }
    },

    // --- HAVE GOT / HAS GOT (SAHİPLİK) ---
    {
        id: 1007, level: 'A1', type: 'choice',
        question: "She _____ got blue eyes.",
        options: ["have", "has", "is", "does"],
        answer: "has",
        explanation: {
            title: "Have/Has Got (Sahiplik)",
            rule: "3. tekil şahıslar (He, She, It) için 'has got' kullanılır.",
            tips: "I have got | She has got",
            examples: ["He has got a car.", "We have got a cat."],
            translation: "Onun mavi gözleri var."
        }
    },

    // --- THERE IS / THERE ARE (VAR) ---
    {
        id: 1008, level: 'A1', type: 'choice',
        question: "There _____ two books on the table.",
        options: ["is", "are", "am", "have"],
        answer: "are",
        explanation: {
            title: "There is / There are",
            rule: "Bahsedilen nesne çoğulsa (two books) 'There are' kullanılır.",
            tips: "Tekil -> There is | Çoğul -> There are",
            examples: ["There is a pen.", "There are five pens."],
            translation: "Masada iki kitap var."
        }
    },
    {
        id: 1009, level: 'A1', type: 'choice',
        question: "Is there _____ milk in the fridge?",
        options: ["a", "many", "any", "some"],
        answer: "any",
        explanation: {
            title: "Any (Hiç/Herhangi)",
            rule: "Soru cümlelerinde ve sayılamayan (milk) isimlerde 'any' kullanılır.",
            tips: "Soru ve Olumsuz -> Any | Olumlu -> Some",
            examples: ["Do you have any money?", "There isn't any water."],
            translation: "Dolapta hiç süt var mı?"
        }
    },

    // --- PRONOUNS (ZAMİRLER) ---
    {
        id: 1010, level: 'A1', type: 'choice',
        question: "This is my brother. Look at _____.",
        options: ["he", "him", "his", "she"],
        answer: "him",
        explanation: {
            title: "Object Pronouns (Nesne Zamirleri)",
            rule: "Fiilden (look at) sonra özne zamiri (he) değil, nesne zamiri (him) gelir.",
            tips: "He -> Him | She -> Her | They -> Them",
            examples: ["I love her.", "Call them."],
            translation: "Bu benim kardeşim. Ona bak."
        }
    },
    {
        id: 1011, level: 'A1', type: 'choice',
        question: "This car is not mine. It is _____.",
        options: ["her", "hers", "she", "my"],
        answer: "hers",
        explanation: {
            title: "Possessive Pronouns (İyelik Zamirleri)",
            rule: "Cümle sonunda 'onunki, benimki' demek için iyelik zamiri kullanılır. İsimden önce değil, tek başına kullanılır.",
            tips: "Her car (Sıfat) | Hers (Zamir - 'Onunki')",
            examples: ["This book is mine.", "Is this yours?"],
            translation: "Bu araba benim değil. Onunki."
        }
    },

    // --- PRESENT CONTINUOUS (ŞİMDİKİ ZAMAN) ---
    {
        id: 1012, level: 'A1', type: 'input',
        question: "Look! It _____ (snow).",
        answer: "is snowing",
        explanation: {
            title: "Şimdiki Zaman (Present Continuous)",
            rule: "'Look!' (Bak!) ifadesi olayın şu an gerçekleştiğini gösterir. 'am/is/are + V-ing' kullanılır.",
            tips: "Now, At the moment, Look! -> -ing",
            examples: ["I am running.", "She is sleeping."],
            translation: "Bak! Kar yağıyor."
        }
    },
    {
        id: 1013, level: 'A1', type: 'choice',
        question: "They _____ watching TV right now.",
        options: ["don't", "isn't", "aren't", "not"],
        answer: "aren't",
        explanation: {
            title: "Şimdiki Zaman - Olumsuz",
            rule: "Şimdiki zamanda 'They' için olumsuzluk 'are not' (aren't) ile yapılır.",
            tips: "They are -> They aren't",
            examples: ["We aren't playing."],
            translation: "Onlar şu an TV izlemiyorlar."
        }
    },

    // --- CAN / CAN'T (YETENEK) ---
    {
        id: 1014, level: 'A1', type: 'choice',
        question: "I _____ speak English very well.",
        options: ["cans", "can", "am can", "to can"],
        answer: "can",
        explanation: {
            title: "Can (Ebilmek)",
            rule: "'Can' tüm özneler için aynıdır, ek almaz (-s almaz).",
            tips: "I can, She can, They can... Hepsi aynı.",
            examples: ["Birds can fly."],
            translation: "Ben çok iyi İngilizce konuşabilirim."
        }
    },
    {
        id: 1015, level: 'A1', type: 'input',
        question: "Can you _____ (help) me?",
        answer: "help",
        explanation: {
            title: "Modals ve Fiil Uyumu",
            rule: "'Can'den sonra gelen fiil her zaman YALIN (bare infinitive) haldedir. To almaz, -ing almaz.",
            tips: "Can to help (YANLIŞ) | Can helping (YANLIŞ) | Can help (DOĞRU)",
            examples: ["Can I go?", "She can swim."],
            translation: "Bana yardım edebilir misin?"
        }
    },

    // --- PLURALS (ÇOĞULLAR) ---
    {
        id: 1016, level: 'A1', type: 'input',
        question: "I have two _____ (watch).",
        answer: "watches",
        explanation: {
            title: "Düzenli Çoğullar (-es)",
            rule: "Sonu -ch, -sh, -x, -s ile biten kelimeler çoğul olurken '-es' alır.",
            tips: "Box -> Boxes | Bus -> Buses | Watch -> Watches",
            examples: ["Two boxes", "Three buses"],
            translation: "İki tane saatim var."
        }
    },
    {
        id: 1017, level: 'A1', type: 'input',
        question: "Look at those _____ (person).",
        answer: "people",
        explanation: {
            title: "Düzensiz Çoğullar",
            rule: "'Person' kelimesinin çoğulu düzensizdir ve 'People' olur.",
            tips: "Persons (Resmi/Hukuki) | People (Yaygın)",
            examples: ["Many people are waiting."],
            translation: "Şu insanlara bak."
        }
    },

    // --- PREPOSITIONS (EDATLAR) ---
    {
        id: 1018, level: 'A1', type: 'choice',
        question: "The meeting is _____ Monday.",
        options: ["in", "on", "at", "to"],
        answer: "on",
        explanation: {
            title: "Zaman Edatları (Days)",
            rule: "Günlerden bahsederken her zaman 'ON' kullanılır.",
            tips: "ON Monday, ON Tuesday, ON my birthday.",
            examples: ["See you on Friday."],
            translation: "Toplantı Pazartesi günü."
        }
    },
    {
        id: 1019, level: 'A1', type: 'choice',
        question: "I wake up _____ 7 o'clock.",
        options: ["in", "on", "at", "for"],
        answer: "at",
        explanation: {
            title: "Zaman Edatları (Hours)",
            rule: "Saatlerden bahsederken her zaman 'AT' kullanılır.",
            tips: "AT 5 PM, AT noon, AT night.",
            examples: ["The movie starts at 8."],
            translation: "Saat 7'de uyanırım."
        }
    },
    {
        id: 1020, level: 'A1', type: 'choice',
        question: "My birthday is _____ June.",
        options: ["in", "on", "at", "of"],
        answer: "in",
        explanation: {
            title: "Zaman Edatları (Months)",
            rule: "Sadece aydan bahsediyorsak 'IN' kullanılır. (Tarih verseydik 'ON' olurdu).",
            tips: "IN June | ON June 25th",
            examples: ["It is cold in December."],
            translation: "Doğum günüm Haziran'da."
        }
    },

    // --- PAST SIMPLE (Dİ'Lİ GEÇMİŞ ZAMAN - TO BE) ---
    {
        id: 1021, level: 'A1', type: 'choice',
        question: "I _____ at home yesterday.",
        options: ["am", "was", "were", "is"],
        answer: "was",
        explanation: {
            title: "Past Simple (Was/Were)",
            rule: "Geçmiş zamanda 'I' (ben) öznesi için 'was' kullanılır.",
            tips: "Am/Is -> Was | Are -> Were",
            examples: ["She was sad.", "I was busy."],
            translation: "Dün evdeydim."
        }
    },
    {
        id: 1022, level: 'A1', type: 'choice',
        question: "They _____ happy with the result.",
        options: ["wasn't", "weren't", "didn't", "not"],
        answer: "weren't",
        explanation: {
            title: "Past Simple (Olumsuz)",
            rule: "Çoğul öznelerde (They) geçmiş zaman olumsuzu 'were not' (weren't) şeklindedir.",
            tips: "They were -> They weren't",
            examples: ["We weren't there."],
            translation: "Sonuçtan mutlu değillerdi."
        }
    },

    // --- DEMONSTRATIVES (İŞARET SIFATLARI) ---
    {
        id: 1023, level: 'A1', type: 'choice',
        question: "_____ is my book here.",
        options: ["This", "That", "These", "Those"],
        answer: "This",
        explanation: {
            title: "İşaret Sıfatları (Tekil/Yakın)",
            rule: "Yakındaki tekil bir nesneyi göstermek için 'This' kullanılır.",
            tips: "This (Bu - Yakın/Tekil) | That (Şu - Uzak/Tekil)",
            examples: ["This is my pen."],
            translation: "Bu (buradaki) benim kitabım."
        }
    },
    {
        id: 1024, level: 'A1', type: 'choice',
        question: "_____ are my shoes over there.",
        options: ["This", "That", "These", "Those"],
        answer: "Those",
        explanation: {
            title: "İşaret Sıfatları (Çoğul/Uzak)",
            rule: "Uzaktaki (over there) çoğul nesneleri göstermek için 'Those' kullanılır.",
            tips: "These (Bunlar - Yakın) | Those (Şunlar - Uzak)",
            examples: ["Those birds are flying."],
            translation: "Şunlar (oradaki) benim ayakkabılarım."
        }
    },

    // --- OBJECTS (NESNELER) & POSSESSIVES ('S) ---
    {
        id: 1025, level: 'A1', type: 'choice',
        question: "This is _____ car.",
        options: ["Ahmet", "Ahmet's", "Ahmets", "of Ahmet"],
        answer: "Ahmet's",
        explanation: {
            title: "Possessive 's (İyelik Eki)",
            rule: "İngilizcede 'nin/nın' eki kesme işareti ve s ('s) ile yapılır.",
            tips: "Ahmet's car = Ahmet'in arabası",
            examples: ["My father's job.", "Turkey's capital."],
            translation: "Bu Ahmet'in arabası."
        }
    },

    // --- IMPERATIVES (EMİR KİPİ) ---
    {
        id: 1026, level: 'A1', type: 'choice',
        question: "_____ close the door, please.",
        options: ["No", "Not", "Don't", "You"],
        answer: "Don't",
        explanation: {
            title: "Emir Kipi (Olumsuz)",
            rule: "Birine bir şey yapmamasını söylerken cümle başına 'Don't' getirilir.",
            tips: "Don't go! (Gitme!) | Don't touch! (Dokunma!)",
            examples: ["Don't speak loudly."],
            translation: "Lütfen kapıyı kapatma."
        }
    },
    {
        id: 1027, level: 'A1', type: 'choice',
        question: "_____ your homework.",
        options: ["Do", "Doing", "Does", "To do"],
        answer: "Do",
        explanation: {
            title: "Emir Kipi (Olumlu)",
            rule: "Emir cümleleri fiilin yalın haliyle başlar. Özne (You) kullanılmaz.",
            tips: "Listen to me! (Beni dinle!)",
            examples: ["Clean your room."],
            translation: "Ödevini yap."
        }
    },

    // --- WH- QUESTIONS (SORU KELİMELERİ) ---
    {
        id: 1028, level: 'A1', type: 'choice',
        question: "_____ time is it?",
        options: ["When", "Where", "What", "Who"],
        answer: "What",
        explanation: {
            title: "Soru Kalıbı (Saat)",
            rule: "Saati sormak için 'What time' kalıbı kullanılır.",
            tips: "What time...? (Saat kaç?)",
            examples: ["What time does the film start?"],
            translation: "Saat kaç?"
        }
    },
    {
        id: 1029, level: 'A1', type: 'choice',
        question: "_____ old are you?",
        options: ["How", "What", "Who", "When"],
        answer: "How",
        explanation: {
            title: "Soru Kalıbı (Yaş)",
            rule: "Yaş sormak için 'How old' kalıbı kullanılır.",
            tips: "How old is she?",
            examples: ["I am 20 years old."],
            translation: "Kaç yaşındasın?"
        }
    },
    {
        id: 1030, level: 'A1', type: 'choice',
        question: "_____ is your birthday?",
        options: ["What", "When", "Where", "Who"],
        answer: "When",
        explanation: {
            title: "Soru Kelimeleri (Zaman)",
            rule: "Bir şeyin ne zaman olduğunu sormak için 'When' kullanılır.",
            tips: "When = Ne zaman",
            examples: ["When do you sleep?"],
            translation: "Doğum günün ne zaman?"
        }
    }
    ];


const EXTRA_A1_QUESTIONS = [

    // --- TO BE (AM / IS / ARE) ---
    {
        id: 1031, level: 'A1', type: 'choice',
        question: "I _____ a student.",
        options: ["is", "are", "am", "be"],
        answer: "am",
        explanation: {
            title: "To Be (I am)",
            rule: "'I' (Ben) öznesi ile her zaman 'am' yardımcı fiili kullanılır.",
            tips: "I -> am",
            examples: ["I am happy.", "I am 20 years old."],
            translation: "Ben bir öğrenciyim."
        }
    },
    {
        id: 1032, level: 'A1', type: 'choice',
        question: "My parents _____ in Turkey.",
        options: ["is", "am", "are", "do"],
        answer: "are",
        explanation: {
            title: "To Be (Plural)",
            rule: "'My parents' (Anne babam) çoğul olduğu için 'They' (Onlar) yerine geçer ve 'are' alır.",
            tips: "They -> are",
            examples: ["They are at home."],
            translation: "Anne babam Türkiye'deler."
        }
    },

    // --- PRESENT SIMPLE (DO / DOES) ---
    {
        id: 1033, level: 'A1', type: 'choice',
        question: "_____ you like pizza?",
        options: ["Are", "Do", "Does", "Is"],
        answer: "Do",
        explanation: {
            title: "Present Simple Question",
            rule: "Fiil cümlelerinde (like) soru sorarken 'I, You, We, They' için 'Do' kullanılır.",
            tips: "Do you...? Do they...?",
            examples: ["Do you speak English?"],
            translation: "Pizza sever misin?"
        }
    },
    {
        id: 1034, level: 'A1', type: 'choice',
        question: "Where _____ she live?",
        options: ["do", "does", "is", "are"],
        answer: "does",
        explanation: {
            title: "Present Simple (She)",
            rule: "3. tekil şahıslarda (He, She, It) soru sorarken 'Does' kullanılır.",
            tips: "Does he...? Does she...?",
            examples: ["Where does he work?"],
            translation: "O nerede yaşıyor?"
        }
    },

    // --- POSSESSIVE ADJECTIVES (MY, YOUR...) ---
    {
        id: 1035, level: 'A1', type: 'choice',
        question: "This is my brother. _____ name is Ali.",
        options: ["Her", "His", "He", "Him"],
        answer: "His",
        explanation: {
            title: "Possessive Adjectives (His)",
            rule: "Erkekler için 'Onun' demek istediğimizde 'His' kullanırız.",
            tips: "He -> His | She -> Her",
            examples: ["His car is red."],
            translation: "Bu benim kardeşim. Onun adı Ali."
        }
    },
    {
        id: 1036, level: 'A1', type: 'choice',
        question: "We have a car. _____ car is blue.",
        options: ["Our", "Your", "Their", "Us"],
        answer: "Our",
        explanation: {
            title: "Possessive Adjectives (Our)",
            rule: "'We' (Biz) öznesinin iyelik sıfatı 'Our' (Bizim) kelimesidir.",
            tips: "We -> Our",
            examples: ["Our house is big."],
            translation: "Bir arabamız var. Bizim arabamız mavi."
        }
    },

    // --- PLURALS (S TAKISI) ---
    {
        id: 1037, level: 'A1', type: 'input',
        question: "There are three _____ (cat) in the garden.",
        answer: "cats",
        explanation: {
            title: "Plural Nouns (-s)",
            rule: "Düzenli isimleri çoğul yapmak için sonuna '-s' takısı eklenir.",
            tips: "One cat -> Two cats",
            examples: ["I have two dogs."],
            translation: "Bahçede üç kedi var."
        }
    },
    {
        id: 1038, level: 'A1', type: 'input',
        question: "I brush my teeth, but the baby has only one _____ (tooth).",
        answer: "tooth",
        explanation: {
            title: "Irregular Plurals",
            rule: "'Teeth' (dişler) kelimesinin tekili 'Tooth' (diş) tur. Düzensiz bir isimdir.",
            tips: "Plural: Teeth | Singular: Tooth",
            examples: ["My tooth hurts."],
            translation: "Dişlerimi fırçalarım ama bebeğin sadece bir dişi var."
        }
    },

    // --- PREPOSITIONS (IN / ON / AT) ---
    {
        id: 1039, level: 'A1', type: 'choice',
        question: "The picture is _____ the wall.",
        options: ["in", "on", "at", "under"],
        answer: "on",
        explanation: {
            title: "Prepositions (On)",
            rule: "Duvarda, masada gibi yüzey belirten durumlarda 'ON' kullanılır.",
            tips: "On the wall, On the table.",
            examples: ["Your phone is on the desk."],
            translation: "Resim duvarda."
        }
    },
    {
        id: 1040, level: 'A1', type: 'choice',
        question: "I live _____ Istanbul.",
        options: ["at", "on", "in", "to"],
        answer: "in",
        explanation: {
            title: "Prepositions (In)",
            rule: "Şehirlerde, ülkelerde ve kapalı alanlarda 'IN' kullanılır.",
            tips: "In London, In Turkey, In the room.",
            examples: ["She lives in Paris."],
            translation: "İstanbul'da yaşıyorum."
        }
    },

    // --- CAN / CAN'T (YETENEK) ---
    {
        id: 1041, level: 'A1', type: 'choice',
        question: "A bird _____ fly, but a fish can't.",
        options: ["can", "cant", "is", "do"],
        answer: "can",
        explanation: {
            title: "Can (Ability)",
            rule: "Yeteneği (yapabilmek) ifade etmek için 'Can' kullanılır.",
            tips: "Birds can fly.",
            examples: ["I can swim."],
            translation: "Bir kuş uçabilir ama balık uçamaz."
        }
    },

    // --- THIS / THAT / THESE / THOSE ---
    {
        id: 1042, level: 'A1', type: 'choice',
        question: "_____ are my books here.",
        options: ["This", "That", "These", "Those"],
        answer: "These",
        explanation: {
            title: "Demonstratives (These)",
            rule: "Yakındaki çoğul nesneler için 'These' (Bunlar) kullanılır.",
            tips: "Yakın ve Çoğul -> These",
            examples: ["These are my pens."],
            translation: "Bunlar (buradaki) benim kitaplarım."
        }
    },

    // --- HAVE GOT / HAS GOT ---
    {
        id: 1043, level: 'A1', type: 'choice',
        question: "My father _____ got a new car.",
        options: ["have", "has", "is", "are"],
        answer: "has",
        explanation: {
            title: "Has Got (Sahiplik)",
            rule: "3. tekil şahıslar (He - My father) için 'Has got' kullanılır.",
            tips: "He/She/It -> Has got",
            examples: ["She has got blue eyes."],
            translation: "Babamın yeni bir arabası var."
        }
    },

    // --- IMPERATIVES (EMİR KİPİ) ---
    {
        id: 1044, level: 'A1', type: 'choice',
        question: "Please _____ quiet. The baby is sleeping.",
        options: ["be", "are", "is", "do"],
        answer: "be",
        explanation: {
            title: "Imperatives (Be)",
            rule: "Emir cümlelerinde 'Be' fiili yalın kullanılır. 'Be quiet' (Sessiz ol) bir kalıptır.",
            tips: "Be careful! Be quiet!",
            examples: ["Be nice to your sister."],
            translation: "Lütfen sessiz ol. Bebek uyuyor."
        }
    },

    // --- DAYS OF THE WEEK ---
    {
        id: 1045, level: 'A1', type: 'choice',
        question: "Today is Monday. Tomorrow is _____.",
        options: ["Sunday", "Tuesday", "Wednesday", "Friday"],
        answer: "Tuesday",
        explanation: {
            title: "Days (Tuesday)",
            rule: "Monday (Pazartesi) -> Tuesday (Salı).",
            tips: "Mon, Tue, Wed, Thu, Fri, Sat, Sun.",
            examples: ["See you on Tuesday."],
            translation: "Bugün Pazartesi. Yarın Salı."
        }
    },

    // --- NUMBERS ---
    {
        id: 1046, level: 'A1', type: 'input',
        question: "Ten plus five is _____ (15).",
        answer: "fifteen",
        explanation: {
            title: "Numbers (15)",
            rule: "15 sayısının İngilizcesi 'Fifteen'dir. 'Five-teen' değil!",
            tips: "13-19 arası genelde -teen ile biter.",
            examples: ["I am fifteen years old."],
            translation: "On artı beş, on beş eder."
        }
    },

    // --- OBJECT PRONOUNS (ME) ---
    {
        id: 1047, level: 'A1', type: 'choice',
        question: "Give the book to _____, please.",
        options: ["I", "my", "me", "mine"],
        answer: "me",
        explanation: {
            title: "Object Pronouns (Me)",
            rule: "Fiilden veya edattan (to) sonra 'I' değil 'Me' (bana) kullanılır.",
            tips: "To me, For me, With me.",
            examples: ["Listen to me."],
            translation: "Kitabı bana ver, lütfen."
        }
    },

    // --- WH- QUESTIONS (WHO) ---
    {
        id: 1048, level: 'A1', type: 'choice',
        question: "_____ is that girl?",
        options: ["What", "Who", "Where", "When"],
        answer: "Who",
        explanation: {
            title: "Question Word: Who",
            rule: "İnsanları sormak için 'Who' (Kim) kullanılır.",
            tips: "Who = Kim",
            examples: ["Who is your teacher?"],
            translation: "Şu kız kim?"
        }
    },

    // --- A / AN ARTICLES ---
    {
        id: 1049, level: 'A1', type: 'choice',
        question: "I have _____ apple.",
        options: ["a", "an", "two", "some"],
        answer: "an",
        explanation: {
            title: "Articles (An)",
            rule: "Sesli harfle (a, e, i, o, u) başlayan kelimelerden önce 'an' kullanılır.",
            tips: "An apple, An orange, An umbrella.",
            examples: ["It is an old car."],
            translation: "Bir elmam var."
        }
    },
    {
        id: 1050, level: 'A1', type: 'choice',
        question: "He is _____ doctor.",
        options: ["a", "an", "the", "-"],
        answer: "a",
        explanation: {
            title: "Articles (A)",
            rule: "Mesleklerden önce 'a' veya 'an' kullanılır. 'Doctor' sessiz harfle başladığı için 'a' gelir.",
            tips: "A teacher, A doctor, A student.",
            examples: ["My mom is a nurse."],
            translation: "O bir doktor."
        }
    },

    // --- PRESENT CONTINUOUS (NOW) ---
    {
        id: 1051, level: 'A1', type: 'choice',
        question: "We _____ watching TV now.",
        options: ["do", "are", "is", "have"],
        answer: "are",
        explanation: {
            title: "Present Continuous (We are)",
            rule: "Şimdiki zamanda 'We' öznesi ile 'are' ve fiile '-ing' gelir. (We are watching).",
            tips: "We are + V-ing",
            examples: ["We are playing."],
            translation: "Şu an televizyon izliyoruz."
        }
    },

    // --- FAMILY VOCABULARY ---
    {
        id: 1052, level: 'A1', type: 'choice',
        question: "My father's sister is my _____.",
        options: ["uncle", "grandmother", "aunt", "sister"],
        answer: "aunt",
        explanation: {
            title: "Family Members",
            rule: "Babanın veya annenin kız kardeşine 'Aunt' (Hala/Teyze) denir.",
            tips: "Father's sister = Aunt",
            examples: ["My aunt lives in Germany."],
            translation: "Babamın kız kardeşi benim halamdır."
        }
    },

    // --- CONJUNCTIONS (AND / BUT) ---
    {
        id: 1053, level: 'A1', type: 'choice',
        question: "I like tea, _____ I don't like coffee.",
        options: ["and", "or", "but", "so"],
        answer: "but",
        explanation: {
            title: "Conjunctions (But)",
            rule: "Zıtlık bildirmek için (seviyorum AMA sevmiyorum) 'But' kullanılır.",
            tips: "+ But -",
            examples: ["It is cheap but good."],
            translation: "Çayı severim ama kahveyi sevmem."
        }
    },

    // --- TELLING TIME ---
    {
        id: 1054, level: 'A1', type: 'choice',
        question: "It is half _____ six.",
        options: ["to", "past", "clock", "on"],
        answer: "past",
        explanation: {
            title: "Telling Time (Half Past)",
            rule: "Buçuklu saatlerde 'Half past' kalıbı kullanılır.",
            tips: "Half past six = 06:30",
            examples: ["It is half past ten."],
            translation: "Saat altı buçuk."
        }
    },

    // --- THERE IS / THERE ARE ---
    {
        id: 1055, level: 'A1', type: 'choice',
        question: "_____ a book on the desk?",
        options: ["Is there", "Are there", "There is", "There are"],
        answer: "Is there",
        explanation: {
            title: "Question: Is there?",
            rule: "Tekil bir nesne için 'Var mı?' diye sorarken 'Is there...?' kullanılır.",
            tips: "Is there a ...?",
            examples: ["Is there a bank near here?"],
            translation: "Sırada bir kitap var mı?"
        }
    },

    // --- FREQUENCY ADVERBS (ALWAYS) ---
    {
        id: 1056, level: 'A1', type: 'choice',
        question: "I _____ drink milk for breakfast. Every day!",
        options: ["never", "sometimes", "always", "rarely"],
        answer: "always",
        explanation: {
            title: "Frequency Adverbs (Always)",
            rule: "'Every day' (Her gün) dediği için sıklık zarfı 'Always' (Her zaman/Daima) olmalıdır.",
            tips: "Every day -> Always",
            examples: ["I always brush my teeth."],
            translation: "Kahvaltıda her zaman süt içerim. Her gün!"
        }
    },

    // --- MONTHS ---
    {
        id: 1057, level: 'A1', type: 'choice',
        question: "January, February, _____ , April.",
        options: ["May", "June", "March", "July"],
        answer: "March",
        explanation: {
            title: "Months",
            rule: "Yılın 3. ayı March (Mart) tır.",
            tips: "Jan, Feb, Mar, Apr...",
            examples: ["March comes after February."],
            translation: "Ocak, Şubat, Mart, Nisan."
        }
    },

    // --- SHORT ANSWERS ---
    {
        id: 1058, level: 'A1', type: 'choice',
        question: "Are you happy? Yes, I _____.",
        options: ["am", "are", "do", "have"],
        answer: "am",
        explanation: {
            title: "Short Answers",
            rule: "'Are you...?' sorusunun kısa cevabı 'Yes, I am' veya 'No, I'm not' tır.",
            tips: "Are you...? Yes, I am.",
            examples: ["Is she nice? Yes, she is."],
            translation: "Mutlu musun? Evet, mutluyum."
        }
    },

    // --- COLOURS ---
    {
        id: 1059, level: 'A1', type: 'choice',
        question: "The sky is _____.",
        options: ["red", "green", "blue", "yellow"],
        answer: "blue",
        explanation: {
            title: "Colours",
            rule: "Gökyüzü mavidir (blue).",
            tips: "Sky -> Blue",
            examples: ["Grass is green."],
            translation: "Gökyüzü mavidir."
        }
    },

    // --- PREPOSITIONS (FROM) ---
    {
        id: 1060, level: 'A1', type: 'choice',
        question: "Where are you _____? I am from Turkey.",
        options: ["of", "from", "at", "in"],
        answer: "from",
        explanation: {
            title: "Where are you from?",
            rule: "Nereli olduğunu sorarken 'Where are you from?' kalıbı kullanılır.",
            tips: "I am from...",
            examples: ["Where is he from?"],
            translation: "Nerelisiniz? Türkiye'denim."
        }
    }
];

// Ana listeye ekleme

export const a1Questions = [...A1_QUESTIONS, ...EXTRA_A1_QUESTIONS];
