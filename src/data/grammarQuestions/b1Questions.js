// B1 Level Grammar Questions

    const B1_QUESTIONS = [

    // --- PRESENT PERFECT (SÜREÇ) ---
    {
        id: 301, level: 'B1', type: 'choice',
        question: "I've lived here _____ 2010.",
        options: ["for", "since", "ago", "during"],
        answer: "since",
        explanation: {
            title: "Present Perfect (For vs Since)",
            rule: "Eylemin başlangıç noktası belliyse (2010, dün, geçen yıl) 'since' kullanılır. Geçen süre miktarı belliyse (10 yıldır, 2 aydır) 'for' kullanılır.",
            tips: "Since + Tarih/Olay | For + Süre",
            examples: ["Since Monday (Pazartesiden beri)", "For 3 days (3 gündür)"],
            translation: "2010'dan beri burada yaşıyorum."
        }
    },

    // --- SECOND CONDITIONAL (HAYALİ DURUMLAR) ---
    {
        id: 302, level: 'B1', type: 'choice',
        question: "If I were you, I _____ study harder.",
        options: ["will", "would", "did", "can"],
        answer: "would",
        explanation: {
            title: "Second Conditional (Tip 2)",
            rule: "Şu an gerçek olmayan veya hayali durumlar için: 'If + Past Simple, ... would + Verb' yapısı kullanılır. 'If I were you' (Senin yerinde olsam) kalıbıdır.",
            tips: "If I had money, I would buy a car. (Param yok, o yüzden alamam)",
            examples: ["If I were rich, I would travel the world."],
            translation: "Senin yerinde olsam daha sıkı çalışırdım."
        }
    },

    // --- PASSIVE VOICE (EDİLGEN ÇATI) ---
    {
        id: 303, level: 'B1', type: 'input',
        question: "The letter _____ (send) yesterday.",
        answer: "was sent",
        explanation: {
            title: "Passive Voice (Past Simple)",
            rule: "Geçmiş zamanda yapılan edilgen eylem (gönderildi) için 'was/were + V3' (fiilin 3. hali) kullanılır.",
            tips: "Active: I sent it. | Passive: It was sent.",
            examples: ["The car was washed.", "The book was written by Orhan Pamuk."],
            translation: "Mektup dün gönderildi."
        }
    },

    // --- ADJECTIVE + PREPOSITION ---
    {
        id: 304, level: 'B1', type: 'choice',
        question: "She is interested _____ learning French.",
        options: ["on", "at", "in", "with"],
        answer: "in",
        explanation: {
            title: "Sıfat + Edat Uyumu",
            rule: "'Interested' (ilgili, meraklı) sıfatı her zaman 'in' edatı ile kullanılır.",
            tips: "Interested IN something.",
            examples: ["I am interested in football.", "Are you interested in art?"],
            translation: "O, Fransızca öğrenmeye ilgili (meraklı)."
        }
    },

    // --- GERUND VS INFINITIVE (STOP) ---
    {
        id: 305, level: 'B1', type: 'choice',
        question: "I stopped _____ when I realized it was unhealthy.",
        options: ["to smoke", "smoking", "smoke", "smoked"],
        answer: "smoking",
        explanation: {
            title: "Gerund vs Infinitive (Stop)",
            rule: "'Stop smoking': Sigara içmeyi bırakmak (alışkanlığı terk etmek). 'Stop to smoke': Sigara içmek için durmak (yolda durmak).",
            tips: "Stop doing = Eylemi bırakmak | Stop to do = Yapmak için durmak",
            examples: ["He stopped talking. (Sustu.)", "He stopped to talk. (Konuşmak için durdu.)"],
            translation: "Sağlıksız olduğunu fark edince sigara içmeyi bıraktım."
        }
    },

    // --- RELATIVE CLAUSES (YER) ---
    {
        id: 306, level: 'B1', type: 'input',
        question: "This is the house _____ I was born.",
        answer: "where",
        explanation: {
            title: "Relative Clauses (Where)",
            rule: "Yer bildiren cümleleri (ev, okul, şehir) nitelerken 'where' ilgi zamiri kullanılır.",
            tips: "The place WHERE...",
            examples: ["This is the city where I live."],
            translation: "Burası benim doğduğum ev."
        }
    },

    // --- MODALS (HAD BETTER) ---
    {
        id: 307, level: 'B1', type: 'choice',
        question: "You had better _____ a doctor.",
        options: ["see", "to see", "seeing", "saw"],
        answer: "see",
        explanation: {
            title: "Had Better (Yapsan İyi Olur)",
            rule: "'Had better' güçlü bir tavsiye bildirir ve kendisinden sonra fiil YALIN (bare infinitive) halde gelir. 'To' almaz.",
            tips: "You'd better go. (Gitsen iyi olur, yoksa sorun çıkar.)",
            examples: ["You had better hurry."],
            translation: "Bir doktora görünsen iyi olur."
        }
    },

    // --- CONNECTORS (RAĞMEN) ---
    {
        id: 308, level: 'B1', type: 'choice',
        question: "Despite _____ tired, he continued working.",
        options: ["he was", "being", "to be", "of being"],
        answer: "being",
        explanation: {
            title: "Despite (Rağmen)",
            rule: "'Despite' edatından sonra isim veya gerund (-ing) gelir. Tam cümle (he was) gelemez.",
            tips: "Despite being tired = Yorgun olmasına rağmen.",
            examples: ["Despite the rain, we went out."],
            translation: "Yorgun olmasına rağmen çalışmaya devam etti."
        }
    },

    // --- USED TO (ESKİ ALIŞKANLIKLAR) ---
    {
        id: 309, level: 'B1', type: 'input',
        question: "I used to _____ (play) football when I was a child.",
        answer: "play",
        explanation: {
            title: "Used To",
            rule: "'Used to' (eskiden yapardım, artık yapmıyorum) kalıbından sonra fiil yalın halde gelir.",
            tips: "Used to + V1",
            examples: ["I used to smoke, but I stopped."],
            translation: "Çocukken futbol oynardım."
        }
    },

    // --- PHRASAL VERBS (TÜKENMEK) ---
    {
        id: 310, level: 'B1', type: 'choice',
        question: "We ran out _____ sugar.",
        options: ["of", "from", "out", "with"],
        answer: "of",
        explanation: {
            title: "Phrasal Verbs (Run out of)",
            rule: "'Run out of' bir şeyin tükenmesi/bitmesi anlamına gelen yaygın bir öbek fiildir.",
            tips: "Run out of time / money / sugar.",
            examples: ["I ran out of money."],
            translation: "Şekerimiz bitti (tükendi)."
        }
    },

    // --- REPORTED SPEECH (DOLAYLI ANLATIM) ---
    {
        id: 311, level: 'B1', type: 'choice',
        question: "He asked me if I _____ to the party.",
        options: ["go", "was going", "will go", "have gone"],
        answer: "was going",
        explanation: {
            title: "Reported Speech (Soru)",
            rule: "Doğrudan soru: 'Are you going?'. Dolaylı anlatıma çevirirken zaman bir derece geçmişe kayar (Present Cont. -> Past Cont.).",
            tips: "Is/Are going -> Was/Were going",
            examples: ["She asked if I was hungry."],
            translation: "Bana partiye gidip gitmeyeceğimi sordu."
        }
    },

    // --- CONDITIONALS (UNLESS) ---
    {
        id: 312, level: 'B1', type: 'input',
        question: "Unless you _____ (study), you will fail the exam.",
        answer: "study",
        explanation: {
            title: "Unless (Olmadıkça/Mezse)",
            rule: "'Unless', 'If...not' (Eğer yapmazsan) anlamına gelir. Kendisinden sonra olumlu yapı gelir ama anlam olumsuzdur.",
            tips: "Unless you study = If you don't study.",
            examples: ["Unless it rains, we will go."],
            translation: "Çalışmazsan, sınavdan kalırsın."
        }
    },

    // --- GERUND (LOOK FORWARD TO) ---
    {
        id: 313, level: 'B1', type: 'choice',
        question: "I look forward to _____ from you.",
        options: ["hear", "hearing", "heard", "be hearing"],
        answer: "hearing",
        explanation: {
            title: "Look Forward To",
            rule: "Buradaki 'to' mastar eki değil, edattır. Edatlardan sonra fiil gelirse -ing (Gerund) alır.",
            tips: "Look forward to DOING something. (Dört gözle beklemek)",
            examples: ["I look forward to meeting you."],
            translation: "Senden haber almayı dört gözle bekliyorum."
        }
    },

    // --- CONJUNCTIONS (NE O NE DE BU) ---
    {
        id: 314, level: 'B1', type: 'choice',
        question: "Neither Mark _____ Tom came to the party.",
        options: ["or", "and", "nor", "but"],
        answer: "nor",
        explanation: {
            title: "Paired Conjunctions (Neither...Nor)",
            rule: "'Neither...nor' (Ne o, ne de öbürü) kalıbıdır. İkisi de olumsuz anlam taşır.",
            tips: "Neither X nor Y (Ne X ne Y)",
            examples: ["Neither my mother nor my father speaks English."],
            translation: "Partiye ne Mark ne de Tom geldi."
        }
    },

    // --- WISH CLAUSES (KEŞKE) ---
    {
        id: 315, level: 'B1', type: 'choice',
        question: "I wish I _____ rich.",
        options: ["am", "will be", "were", "have been"],
        answer: "were",
        explanation: {
            title: "I Wish (Şimdiki Zaman Dileği)",
            rule: "Şu anki durumun tersini dilerken Past Tense kullanılır. 'Be' fiili için tüm öznelerde 'were' tercih edilir.",
            tips: "I wish I were... (Keşke ... olsaydım)",
            examples: ["I wish I were taller."],
            translation: "Keşke zengin olsaydım."
        }
    },

    // --- RELATIVE CLAUSES (SAHİPLİK) ---
    {
        id: 316, level: 'B1', type: 'input',
        question: "The man _____ (whose) car was stolen called the police.",
        answer: "whose",
        explanation: {
            title: "Relative Clauses (Whose)",
            rule: "Sahiplik bildirmek için (arabası çalınan adam) 'whose' ilgi zamiri kullanılır.",
            tips: "Man WHOSE car (Arabası olan adam)",
            examples: ["A woman whose son is a doctor."],
            translation: "Arabası çalınan adam polisi aradı."
        }
    },

    // --- MODALS (MUSTN'T - YASAK) ---
    {
        id: 317, level: 'B1', type: 'choice',
        question: "You _____ smoke in the hospital. It's forbidden.",
        options: ["don't have to", "mustn't", "shouldn't", "needn't"],
        answer: "mustn't",
        explanation: {
            title: "Modals (Mustn't vs Don't have to)",
            rule: "'Mustn't' yasak bildirir (Yapamazsın). 'Don't have to' ise zorunluluk olmadığını belirtir (Yapmana gerek yok).",
            tips: "Forbidden (Yasak) -> Mustn't",
            examples: ["You mustn't touch this."],
            translation: "Hastanede sigara içemezsin. Yasak."
        }
    },

    // --- INDIRECT QUESTIONS (DOLAYLI SORU) ---
    {
        id: 318, level: 'B1', type: 'choice',
        question: "Could you tell me where _____?",
        options: ["is the bank", "the bank is", "is bank", "bank is"],
        answer: "the bank is",
        explanation: {
            title: "Indirect Questions",
            rule: "Soru cümlesi bir başka cümlenin (Could you tell me...) içine girdiğinde, soru formatından çıkar ve düz cümle (Özne + Yüklem) sırasına döner.",
            tips: "Where IS it? -> Tell me where it IS.",
            examples: ["Do you know what time it is?"],
            translation: "Bankanın nerede olduğunu söyleyebilir misiniz?"
        }
    },

    // --- PREPOSITIONS (THINK OF) ---
    {
        id: 319, level: 'B1', type: 'choice',
        question: "I'm thinking _____ moving to London.",
        options: ["of", "to", "in", "for"],
        answer: "of",
        explanation: {
            title: "Fiil + Edat",
            rule: "'Think of' veya 'Think about' bir şeyi yapmayı düşünmek/planlamak anlamında kullanılır.",
            tips: "Think of doing something.",
            examples: ["He is thinking of quitting his job."],
            translation: "Londra'ya taşınmayı düşünüyorum."
        }
    },

    // --- PAST CONTINUOUS (PARALEL EYLEMLER) ---
    {
        id: 320, level: 'B1', type: 'input',
        question: "While I was reading, my sister _____ (watch) TV.",
        answer: "was watching",
        explanation: {
            title: "Past Continuous (Paralel Eylemler)",
            rule: "Geçmişte aynı anda devam eden iki uzun eylem için 'While' bağlacı ile iki tarafta da Past Continuous kullanılır.",
            tips: "While I was doing X, she was doing Y.",
            examples: ["While I was studying, he was sleeping."],
            translation: "Ben kitap okurken kardeşim TV izliyordu."
        }
    },

    // --- CAUSATIVE (ETTİRGEN ÇATI) ---
    {
        id: 321, level: 'B1', type: 'choice',
        question: "He _____ his hair cut yesterday.",
        options: ["has", "had", "did", "made"],
        answer: "had",
        explanation: {
            title: "Causative (Have sth Done)",
            rule: "Bir işi başkasına yaptırdığımızı söylerken 'Have + Nesne + V3' yapısını kullanırız. Geçmiş zaman olduğu için 'Had'.",
            tips: "He cut his hair (Kendi kesti) | He had his hair cut (Berbere kestirdi)",
            examples: ["I had my car repaired."],
            translation: "Dün saçını kestirdi."
        }
    },

    // --- TOO (AŞIRI) ---
    {
        id: 322, level: 'B1', type: 'choice',
        question: "This tea is _____ hot to drink.",
        options: ["very", "enough", "too", "much"],
        answer: "too",
        explanation: {
            title: "Too + Adjective",
            rule: "'Too', sıfatın önüne geldiğinde 'aşırı/gereğinden fazla' anlamı katar ve genellikle olumsuz sonuç doğurur (içilemeyecek kadar sıcak).",
            tips: "Too hot = İçilemez | Very hot = İçilebilir ama sıcak",
            examples: ["He is too young to drive."],
            translation: "Bu çay içilemeyecek kadar sıcak."
        }
    },

    // --- ENOUGH (YETERLİ) ---
    {
        id: 323, level: 'B1', type: 'choice',
        question: "He isn't old _____ to drive a car.",
        options: ["too", "enough", "very", "more"],
        answer: "enough",
        explanation: {
            title: "Adjective + Enough",
            rule: "'Enough' (yeterli), sıfattan SONRA gelir.",
            tips: "Old enough, Rich enough, Good enough.",
            examples: ["Is it big enough?"],
            translation: "Araba sürmek için yeterince büyük (yaşlı) değil."
        }
    },

    // --- PREFER (TERCİH ETMEK) ---
    {
        id: 324, level: 'B1', type: 'choice',
        question: "I prefer tea _____ coffee.",
        options: ["than", "to", "from", "over"],
        answer: "to",
        explanation: {
            title: "Prefer X to Y",
            rule: "'Prefer' fiili ile iki şeyi karşılaştırırken 'than' değil 'to' kullanılır.",
            tips: "Prefer A to B.",
            examples: ["I prefer walking to running."],
            translation: "Çayı kahveye tercih ederim."
        }
    },

    // --- FOR VS SINCE (INPUT TEST) ---
    {
        id: 325, level: 'B1', type: 'input',
        question: "I haven't seen him _____ (for/since) three years.",
        answer: "for",
        explanation: {
            title: "For (Süreç)",
            rule: "Bir eylemin ne kadar sürdüğünü (üç yıl) anlatırken 'for' kullanılır.",
            tips: "For 3 years, For a long time.",
            examples: ["I have waited for 2 hours."],
            translation: "Onu üç yıldır görmedim."
        }
    },

    // --- CONNECTORS (DESPITE) ---
    {
        id: 326, level: 'B1', type: 'choice',
        question: "_____ the rain, we went for a walk.",
        options: ["Although", "Despite", "However", "Even"],
        answer: "Despite",
        explanation: {
            title: "Despite + Noun",
            rule: "'The rain' bir isimdir. İsimlerden önce 'rağmen' demek için 'Despite' veya 'In spite of' kullanılır. 'Although' cümle alır.",
            tips: "Despite the problem (İsim) | Although there was a problem (Cümle)",
            examples: ["Despite the traffic, I arrived on time."],
            translation: "Yağmura rağmen yürüyüşe çıktık."
        }
    },

    // --- MAKE SOMEONE DO (ETTİRGEN) ---
    {
        id: 327, level: 'B1', type: 'choice',
        question: "You can't make him _____ if he doesn't want to.",
        options: ["study", "to study", "studying", "studied"],
        answer: "study",
        explanation: {
            title: "Make Someone Do Something",
            rule: "'Make' (zorlamak, yaptırmak) fiilinden sonra gelen fiil YALIN (bare infinitive) olur.",
            tips: "Make him go (Doğru) | Make him to go (Yanlış)",
            examples: ["She made me cry."],
            translation: "İstemiyorsa ona zorla ders çalıştıramazsın."
        }
    },

    // --- BE USED TO (ALIŞKIN OLMAK) ---
    {
        id: 328, level: 'B1', type: 'choice',
        question: "I am used to _____ up early.",
        options: ["get", "getting", "got", "be getting"],
        answer: "getting",
        explanation: {
            title: "Be Used To Doing",
            rule: "'Be used to' (bir şeye alışkın olmak) kalıbındaki 'to' edattır, bu yüzden fiil -ing alır.",
            tips: "I am used to getting up early. (Alışkınım)",
            examples: ["He is used to working hard."],
            translation: "Erken kalkmaya alışkınım."
        }
    },

    // --- SUBJECT-VERB AGREEMENT (POLICE) ---
    {
        id: 329, level: 'B1', type: 'choice',
        question: "The police _____ investigating the crime.",
        options: ["is", "are", "was", "has"],
        answer: "are",
        explanation: {
            title: "Collective Nouns (Police)",
            rule: "'Police' kelimesi İngilizcede her zaman çoğul kabul edilir ve çoğul fiil (are/were) alır.",
            tips: "The police ARE coming.",
            examples: ["The police have arrested him."],
            translation: "Polis suçu araştırıyor."
        }
    },

    // --- SECOND CONDITIONAL (INPUT TEST) ---
    {
        id: 330, level: 'B1', type: 'input',
        question: "If I had a car, I _____ (drive) to work.",
        answer: "would drive",
        explanation: {
            title: "Second Conditional",
            rule: "'If' kısmında Past Simple (had) varsa, ana cümlede 'would + Verb' kullanılır.",
            tips: "If + Past -> Would",
            examples: ["If I knew, I would tell you."],
            translation: "Arabam olsaydı, işe arabayla giderdim."
        }
    }
    ];

    // Listeyi ana havuza ekle

const EXTRA_B1_QUESTIONS = [

    // --- PASSIVE VOICE (EDİLGEN ÇATI) ---
    {
        id: 331, level: 'B1', type: 'choice',
        question: "Penicillin _____ by Alexander Fleming in 1928.",
        options: ["discovered", "was discovered", "is discovered", "has been discovered"],
        answer: "was discovered",
        explanation: {
            title: "Passive Voice (Past Simple)",
            rule: "Geçmişte yapılan ve tarihi belli olan edilgen eylemler için 'was/were + V3' kullanılır. Fleming kendi kendine keşfedilmedi, penisilin keşfedildi.",
            tips: "Tarih var (1928) -> Was/Were V3",
            examples: ["The book was written in 1990."],
            translation: "Penisilin, 1928'de Alexander Fleming tarafından keşfedildi."
        }
    },
    {
        id: 332, level: 'B1', type: 'choice',
        question: "English _____ in many countries around the world.",
        options: ["speaks", "is spoken", "was spoken", "speaking"],
        answer: "is spoken",
        explanation: {
            title: "Passive Voice (Present Simple)",
            rule: "Genel geçer doğrular ve alışkanlıklar için edilgen çatıda 'am/is/are + V3' kullanılır. İngilizce konuşmaz, konuşulur.",
            tips: "Object + is + V3",
            examples: ["Tea is grown in Rize."],
            translation: "İngilizce, dünya çapında birçok ülkede konuşulur."
        }
    },

    // --- REPORTED SPEECH (DOLAYLI ANLATIM) ---
    {
        id: 333, level: 'B1', type: 'choice',
        question: "She said that she _____ tired.",
        options: ["is", "was", "has been", "will be"],
        answer: "was",
        explanation: {
            title: "Reported Speech (Backshift)",
            rule: "Dolaylı anlatımda ana fiil geçmiş zamansa (She said), aktarılan cümlenin zamanı bir derece geçmişe kayar. (Present -> Past).",
            tips: "She said: 'I am tired' -> She said she WAS tired.",
            examples: ["He said he liked the movie."],
            translation: "Yorgun olduğunu söyledi."
        }
    },
    {
        id: 334, level: 'B1', type: 'choice',
        question: "He told me _____ the window.",
        options: ["not open", "not to open", "don't open", "not opening"],
        answer: "not to open",
        explanation: {
            title: "Reported Commands",
            rule: "Emir cümlelerini aktarırken 'to' veya olumsuzsa 'not to' kullanılır.",
            tips: "'Don't open' -> told me NOT TO open.",
            examples: ["She told me to wait."],
            translation: "Bana pencereyi açmamamı söyledi."
        }
    },

    // --- RELATIVE CLAUSES (DEFINING) ---
    {
        id: 335, level: 'B1', type: 'choice',
        question: "A doctor is a person _____ treats sick people.",
        options: ["which", "who", "where", "whose"],
        answer: "who",
        explanation: {
            title: "Relative Clauses (People)",
            rule: "İnsanları nitelerken 'who' veya 'that' ilgi zamiri kullanılır.",
            tips: "Person -> Who",
            examples: ["The girl who is singing is my sister."],
            translation: "Doktor, hasta insanları tedavi eden kişidir."
        }
    },
    {
        id: 336, level: 'B1', type: 'choice',
        question: "This is the laptop _____ I bought yesterday.",
        options: ["who", "where", "which", "whose"],
        answer: "which",
        explanation: {
            title: "Relative Clauses (Things)",
            rule: "Nesneleri nitelerken 'which' veya 'that' kullanılır.",
            tips: "Thing -> Which/That",
            examples: ["The car which I drive is red."],
            translation: "Bu, dün aldığım dizüstü bilgisayar."
        }
    },

    // --- TAG QUESTIONS (EKLENTİ SORULAR) ---
    {
        id: 337, level: 'B1', type: 'choice',
        question: "You haven't seen my phone, _____?",
        options: ["have you", "haven't you", "did you", "do you"],
        answer: "have you",
        explanation: {
            title: "Question Tags",
            rule: "Cümle olumsuzsa soru eklentisi olumlu, cümle olumluysa eklenti olumsuz olur. Yardımcı fiil (have) korunur.",
            tips: "Negative sentence (-) -> Positive tag (+)",
            examples: ["She is nice, isn't she?"],
            translation: "Telefonumu görmedin, değil mi?"
        }
    },

    // --- USED TO (GEÇMİŞ ALIŞKANLIK) ---
    {
        id: 338, level: 'B1', type: 'input',
        question: "I _____ (use/live) in Paris, but now I live in London.",
        answer: "used to live",
        explanation: {
            title: "Used To",
            rule: "Geçmişte yapılan ama artık yapılmayan alışkanlıklar veya durumlar için 'used to + V1' kullanılır.",
            tips: "Used to = Eskiden yapardım (artık yapmıyorum).",
            examples: ["I used to smoke."],
            translation: "Eskiden Paris'te yaşardım ama şimdi Londra'da yaşıyorum."
        }
    },

    // --- MODALS (MIGHT/COULD - POSSIBILITY) ---
    {
        id: 339, level: 'B1', type: 'choice',
        question: "Take an umbrella. It _____ rain later.",
        options: ["must", "should", "might", "has to"],
        answer: "might",
        explanation: {
            title: "Modals of Possibility",
            rule: "Düşük veya orta seviyeli ihtimallerden bahsederken 'might' veya 'may' kullanılır. 'Must' çok güçlü bir tahmindir.",
            tips: "Might = Belki",
            examples: ["Where is Ali? He might be at home."],
            translation: "Şemsiye al. Daha sonra yağmur yağabilir."
        }
    },

    // --- COMPARATIVES (AS...AS) ---
    {
        id: 340, level: 'B1', type: 'choice',
        question: "This movie is not _____ good _____ the first one.",
        options: ["more / than", "so / as", "as / as", "as / than"],
        answer: "as / as",
        explanation: {
            title: "As ... As Comparison",
            rule: "Eşitlik veya benzerlik bildirmek için 'as + sıfat + as' yapısı kullanılır. Olumsuzda 'not as...as' (onun kadar ... değil) olur.",
            tips: "As tall as (Onun kadar uzun)",
            examples: ["He is as fast as a cheetah."],
            translation: "Bu film, birincisi kadar iyi değil."
        }
    },

    // --- PRESENT PERFECT CONTINUOUS ---
    {
        id: 341, level: 'B1', type: 'input',
        question: "It _____ (rain) for two hours.",
        answer: "has been raining",
        explanation: {
            title: "Present Perfect Continuous",
            rule: "Geçmişte başlayıp şu ana kadar devam eden ve etkisi süren eylemler için kullanılır. (Hala yağıyor veya yerler ıslak).",
            tips: "Has/Have been + V-ing",
            examples: ["I have been waiting for you all day."],
            translation: "İki saattir yağmur yağıyor."
        }
    },

    // --- QUANTIFIERS (A LITTLE / A FEW) ---
    {
        id: 342, level: 'B1', type: 'choice',
        question: "I have _____ money, enough to buy a coffee.",
        options: ["a few", "a little", "many", "few"],
        answer: "a little",
        explanation: {
            title: "A Little vs A Few",
            rule: "Sayılamayan isimler (money) için 'a little' (biraz/yeterli) kullanılır. Sayılabilenler için 'a few' kullanılır.",
            tips: "Money -> Uncountable -> A little",
            examples: ["I have a little time."],
            translation: "Biraz param var, kahve almaya yeter."
        }
    },

    // --- GERUND/INFINITIVE (REMEMBER) ---
    {
        id: 343, level: 'B1', type: 'choice',
        question: "Did you remember _____ the door?",
        options: ["locking", "to lock", "lock", "locked"],
        answer: "to lock",
        explanation: {
            title: "Remember To Do vs Remember Doing",
            rule: "'Remember to do': Bir görevi yapmayı hatırlamak (unutmamak). 'Remember doing': Geçmişte yaptığını hatırlamak (anı).",
            tips: "Yapmayı unutma/hatırla -> To lock",
            examples: ["Remember to call your mom."],
            translation: "Kapıyı kilitlemeyi hatırladın mı (unuttun mu)?"
        }
    },

    // --- ADJECTIVES (-ED vs -ING) ---
    {
        id: 344, level: 'B1', type: 'choice',
        question: "I was very _____ by the news.",
        options: ["shocking", "shocked", "shock", "shocks"],
        answer: "shocked",
        explanation: {
            title: "Adjectives ending in -ed vs -ing",
            rule: "Hislerimizden bahsederken '-ed' (I am bored), nesnenin özelliğinden bahsederken '-ing' (The movie is boring) kullanılır.",
            tips: "Person's feeling -> -ed",
            examples: ["I am tired. The job is tiring."],
            translation: "Haberler karşısında çok şok oldum."
        }
    },

    // --- SO vs SUCH ---
    {
        id: 345, level: 'B1', type: 'choice',
        question: "It was _____ a beautiful day that we went to the beach.",
        options: ["so", "such", "very", "too"],
        answer: "such",
        explanation: {
            title: "So vs Such",
            rule: "İsim tamlaması (a beautiful day) varsa 'Such', sadece sıfat varsa 'So' kullanılır.",
            tips: "Such a [Adjective] [Noun] | So [Adjective]",
            examples: ["She is so beautiful. | She is such a beautiful girl."],
            translation: "O kadar güzel bir gündü ki sahile gittik."
        }
    },

    // --- FIRST CONDITIONAL (UNLESS) ---
    {
        id: 346, level: 'B1', type: 'choice',
        question: "_____ you hurry, you will miss the bus.",
        options: ["If", "Unless", "When", "As soon as"],
        answer: "Unless",
        explanation: {
            title: "Unless (If not)",
            rule: "'Unless', 'If you don't' (Eğer ... yapmazsan) anlamına gelir. Anlamı olumsuzdur ama cümle yapısı olumludur.",
            tips: "Unless you hurry = If you don't hurry.",
            examples: ["Unless it rains, we will go."],
            translation: "Acele etmezsen otobüsü kaçıracaksın."
        }
    },

    // --- VERB + PREPOSITION (DEPEND ON) ---
    {
        id: 347, level: 'B1', type: 'choice',
        question: "It depends _____ the weather.",
        options: ["of", "from", "on", "at"],
        answer: "on",
        explanation: {
            title: "Depend On",
            rule: "'Depend' fiili her zaman 'on' edatı ile kullanılır.",
            tips: "Depend ON someone/something.",
            examples: ["I depend on you."],
            translation: "Havaya bağlı."
        }
    },

    // --- REFLEXIVE PRONOUNS ---
    {
        id: 348, level: 'B1', type: 'choice',
        question: "Did you enjoy _____ at the party?",
        options: ["you", "your", "yours", "yourself"],
        answer: "yourself",
        explanation: {
            title: "Reflexive Pronouns",
            rule: "Özne ve nesne aynı kişi olduğunda dönüşlü zamir (myself, yourself, himself...) kullanılır. 'Enjoy yourself' (Eğlenmek) bir kalıptır.",
            tips: "I cut myself. You enjoyed yourself.",
            examples: ["He looked at himself in the mirror."],
            translation: "Partide eğlendin mi?"
        }
    },

    // --- BOTH / EITHER / NEITHER ---
    {
        id: 349, level: 'B1', type: 'choice',
        question: "_____ of them wanted to go to the cinema, so they stayed home.",
        options: ["Both", "Neither", "Either", "All"],
        answer: "Neither",
        explanation: {
            title: "Neither of",
            rule: "İki kişiden hiçbiri anlamında 'Neither' kullanılır. Sonuçta evde kaldıklarına göre ikisi de istememiş.",
            tips: "Neither = 0/2 (İkisi de değil)",
            examples: ["Neither of my parents speaks French."],
            translation: "İkisi de sinemaya gitmek istemedi, bu yüzden evde kaldılar."
        }
    },

    // --- WOULD LIKE TO ---
    {
        id: 350, level: 'B1', type: 'choice',
        question: "I _____ to order a pizza, please.",
        options: ["like", "would like", "want", "will like"],
        answer: "would like",
        explanation: {
            title: "Would Like (Polite Request)",
            rule: "'Want' fiilinin kibar halidir. 'Would like + to + V1' şeklinde kullanılır.",
            tips: "I would like to... = İsterim (kibarca)",
            examples: ["I would like to book a room."],
            translation: "Bir pizza sipariş etmek istiyorum, lütfen."
        }
    },

    // --- PAST PERFECT (BASİT GİRİŞ) ---
    {
        id: 351, level: 'B1', type: 'choice',
        question: "When I arrived at the station, the train _____ already left.",
        options: ["has", "had", "was", "did"],
        answer: "had",
        explanation: {
            title: "Past Perfect Tense",
            rule: "Geçmişteki iki olaydan daha önce olanını anlatmak için 'had + V3' kullanılır. (Ben vardım - geçmiş, tren gitmişti - daha eski geçmiş).",
            tips: "Past of the Past -> Had V3",
            examples: ["She had finished dinner when I came."],
            translation: "İstasyona vardığımda, tren çoktan gitmişti."
        }
    },

    // --- AGREEING (SO DO I) ---
    {
        id: 352, level: 'B1', type: 'choice',
        question: "A: I love chocolate. B: So _____ I.",
        options: ["do", "am", "have", "will"],
        answer: "do",
        explanation: {
            title: "So do I (Katılıyorum)",
            rule: "Olumlu bir cümleye katılırken, o cümlenin zamanına uygun yardımcı fiil kullanılır. 'I love (Genis Zaman)' -> 'So DO I'.",
            tips: "I am happy -> So am I. | I worked -> So did I.",
            examples: ["I can swim. -> So can I."],
            translation: "A: Çikolatayı severim. B: Ben de."
        }
    },

    // --- PREPOSITIONS OF TIME (DURING) ---
    {
        id: 353, level: 'B1', type: 'choice',
        question: "I fell asleep _____ the movie.",
        options: ["while", "during", "for", "in"],
        answer: "during",
        explanation: {
            title: "During vs While",
            rule: "'During'den sonra isim gelir (the movie). 'While'dan sonra cümle gelir (I was watching).",
            tips: "During + Noun",
            examples: ["During the holiday.", "While I was on holiday."],
            translation: "Film sırasında uyuyakaldım."
        }
    },

    // --- MAKE vs DO ---
    {
        id: 354, level: 'B1', type: 'choice',
        question: "Stop _____ noise! I'm trying to study.",
        options: ["doing", "making", "having", "getting"],
        answer: "making",
        explanation: {
            title: "Make vs Do",
            rule: "Gürültü, hata, şaka, yemek, karar gibi şeyler 'Make' ile kullanılır. İş, ödev, spor 'Do' ile kullanılır.",
            tips: "Make a mistake, Make noise, Do homework.",
            examples: ["Don't make noise."],
            translation: "Gürültü yapmayı kes! Ders çalışmaya çalışıyorum."
        }
    },

    // --- SOMEWHERE / ANYWHERE ---
    {
        id: 355, level: 'B1', type: 'choice',
        question: "I can't find my keys _____. Have you seen them?",
        options: ["somewhere", "anywhere", "nowhere", "everywhere"],
        answer: "anywhere",
        explanation: {
            title: "Indefinite Pronouns",
            rule: "Olumsuz cümlelerde 'bir yer/hiçbir yer' anlamında 'anywhere' kullanılır.",
            tips: "Negative -> Anywhere",
            examples: ["I didn't go anywhere."],
            translation: "Anahtarlarımı hiçbir yerde bulamıyorum. Onları gördün mü?"
        }
    },

    // --- HAD BETTER ---
    {
        id: 356, level: 'B1', type: 'choice',
        question: "You had better _____ a coat. It's cold outside.",
        options: ["wear", "to wear", "wearing", "wore"],
        answer: "wear",
        explanation: {
            title: "Had Better",
            rule: "'Had better' (yapsan iyi olur) kalıbından sonra fiil YALIN gelir. 'To' almaz.",
            tips: "Had better + V1",
            examples: ["You'd better go now."],
            translation: "Bir mont giysen iyi edersin. Dışarısı soğuk."
        }
    },

    // --- INFINITIVE OF PURPOSE ---
    {
        id: 357, level: 'B1', type: 'choice',
        question: "I went to the market _____ some milk.",
        options: ["for buy", "to buy", "for buying", "buy"],
        answer: "to buy",
        explanation: {
            title: "Infinitive of Purpose",
            rule: "Bir şeyi yapma amacımızı belirtirken 'to + V1' (mek için) kullanılır. 'For buying' genelde yanlıştır.",
            tips: "To + V1 = ...mek için",
            examples: ["I am here to help you."],
            translation: "Biraz süt almak için markete gittim."
        }
    },

    // --- RELATIVE CLAUSES (WHOSE) ---
    {
        id: 358, level: 'B1', type: 'choice',
        question: "That's the man _____ dog bit me.",
        options: ["who", "which", "whose", "that"],
        answer: "whose",
        explanation: {
            title: "Relative Clause (Whose)",
            rule: "Sahiplik bildirmek için (köpeği beni ısıran adam) 'whose' kullanılır.",
            tips: "Person + WHOSE + Noun",
            examples: ["The woman whose car was stolen."],
            translation: "Köpeği beni ısıran adam şu."
        }
    },

    // --- SUGGESTIONS (HOW ABOUT) ---
    {
        id: 359, level: 'B1', type: 'choice',
        question: "How about _____ to the cinema tonight?",
        options: ["go", "to go", "going", "we go"],
        answer: "going",
        explanation: {
            title: "Suggestions (How about)",
            rule: "'How about' veya 'What about' (ne dersin?) kalıplarından sonra fiil -ing alır.",
            tips: "How about + V-ing?",
            examples: ["How about eating pizza?"],
            translation: "Bu akşam sinemaya gitmeye ne dersin?"
        }
    },

    // --- CONNECTORS (ALTHOUGH) ---
    {
        id: 360, level: 'B1', type: 'choice',
        question: "_____ it rained, we enjoyed the picnic.",
        options: ["Despite", "However", "Although", "Because"],
        answer: "Although",
        explanation: {
            title: "Although (Rağmen)",
            rule: "'Although' kendisinden sonra tam cümle (Özne + Yüklem) alır. 'Despite' isim alırdı.",
            tips: "Although + Cümle (It rained)",
            examples: ["Although he is rich, he is not happy."],
            translation: "Yağmur yağmasına rağmen piknikten keyif aldık."
        }
    },

    // --- QUANTIFIERS (PLENTY OF) ---
    {
        id: 361, level: 'B1', type: 'choice',
        question: "Don't rush. We have _____ time.",
        options: ["plenty of", "many", "a few", "several"],
        answer: "plenty of",
        explanation: {
            title: "Plenty Of",
            rule: "'Plenty of', 'bolca, çokça' anlamına gelir ve hem sayılabilen hem sayılamayanlarla (time) kullanılır. Olumlu anlam taşır.",
            tips: "Plenty of time = A lot of time",
            examples: ["There is plenty of food."],
            translation: "Acele etme. Bolca vaktimiz var."
        }
    },

    // --- SHOULD HAVE V3 (PAST ADVICE) ---
    {
        id: 362, level: 'B1', type: 'choice',
        question: "You _____ called me when you arrived.",
        options: ["should", "should have", "must", "had to"],
        answer: "should have",
        explanation: {
            title: "Should Have V3",
            rule: "Geçmişte yapılması gereken ama yapılmayan şeyler için (eleştiri/tavsiye) 'should have + V3' kullanılır.",
            tips: "Yapmalıydın (ama yapmadın).",
            examples: ["You should have studied more."],
            translation: "Vardığında beni aramalıydın."
        }
    },

    // --- BE ABLE TO ---
    {
        id: 363, level: 'B1', type: 'choice',
        question: "I haven't been _____ to find a job yet.",
        options: ["can", "could", "able", "ability"],
        answer: "able",
        explanation: {
            title: "Be Able To",
            rule: "Perfect tense gibi 'can' veya 'could'un kullanılamadığı zamanlarda 'be able to' kullanılır. Burada 'been able to'.",
            tips: "Have been ABLE to.",
            examples: ["Will you be able to come?"],
            translation: "Henüz bir iş bulamadım (bulmaya muktedir olamadım)."
        }
    },

    // --- GET USED TO ---
    {
        id: 364, level: 'B1', type: 'choice',
        question: "I am slowly getting used to _____ on the left.",
        options: ["drive", "driving", "drove", "be driven"],
        answer: "driving",
        explanation: {
            title: "Get Used To",
            rule: "Alışma sürecini anlatır. 'To' edat olduğu için fiil -ing alır.",
            tips: "Get used to DOING.",
            examples: ["He got used to the cold weather."],
            translation: "Soldan sürmeye yavaş yavaş alışıyorum."
        }
    },

    // --- PREPOSITIONS (GOOD AT) ---
    {
        id: 365, level: 'B1', type: 'choice',
        question: "She is very good _____ math.",
        options: ["in", "on", "at", "with"],
        answer: "at",
        explanation: {
            title: "Adjective + Preposition",
            rule: "Bir şeyde iyi veya kötü olduğunu söylerken 'Good AT' veya 'Bad AT' kullanılır.",
            tips: "Good AT, Bad AT, Brilliant AT.",
            examples: ["I am bad at cooking."],
            translation: "Matematikte çok iyidir."
        }
    }
];

// Listeyi ana havuza ekleme komutu

export const b1Questions = [...B1_QUESTIONS, ...EXTRA_B1_QUESTIONS];
