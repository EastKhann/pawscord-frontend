// B2 Level Grammar Questions

    const B2_QUESTIONS = [

    // --- FUTURE PERFECT (GELECEKTE BİTMİŞ OLACAK) ---
    {
        id: 401, level: 'B2', type: 'choice',
        question: "By the time you arrive, I _____ the report.",
        options: ["will finish", "will have finished", "finish", "am finishing"],
        answer: "will have finished",
        explanation: {
            title: "Future Perfect Tense",
            rule: "Gelecekte belli bir noktadan önce (sen gelmeden önce) tamamlanmış olacak eylemler için 'will have + V3' kullanılır.",
            tips: "'By + zaman' kalıbı (By next week, By tomorrow) Future Perfect'in en büyük ipucusudur.",
            examples: ["I will have graduated by 2026. (2026'ya kadar mezun olmuş olacağım.)"],
            translation: "Sen gelene kadar ben raporu bitirmiş olacağım."
        }
    },

    // --- GERUND/INFINITIVE (REGRET - PİŞMANLIK VS HABER) ---
    {
        id: 402, level: 'B2', type: 'choice',
        question: "I regret _____ you that your application has been rejected.",
        options: ["telling", "to tell", "tell", "told"],
        answer: "to tell",
        explanation: {
            title: "Regret to do vs Regret doing",
            rule: "'Regret to tell/inform': Kötü bir haber vermekten üzüntü duymak (Şimdi). 'Regret telling': Geçmişte söylediğine pişman olmak.",
            tips: "Kötü haber veriyorsan -> To tell | Pişmansan -> -ing",
            examples: ["I regret to inform you... (Üzülerek bildiririm ki...)", "I regret buying this car. (Aldığıma pişmanım.)"],
            translation: "Başvurunuzun reddedildiğini size bildirmekten üzüntü duyuyorum."
        }
    },

    // --- THIRD CONDITIONAL (GEÇMİŞTEKİ PİŞMANLIKLAR) ---
    {
        id: 403, level: 'B2', type: 'input',
        question: "If I _____ (know) you were coming, I would have baked a cake.",
        answer: "had known",
        explanation: {
            title: "Third Conditional (Tip 3)",
            rule: "Geçmişte gerçekleşmemiş olayları ve 'keşke'leri anlatır. 'If + Past Perfect, ... would have + V3' kullanılır.",
            tips: "Geçmişin tersi: Bilseydim (ama bilmedim).",
            examples: ["If I had studied, I would have passed. (Çalışsaydım geçerdim - ama çalışmadım ve kaldım)"],
            translation: "Geleceğini bilseydim, kek yapardım."
        }
    },

    // --- MODALS OF DEDUCTION (GEÇMİŞ ÇIKARIMI) ---
    {
        id: 404, level: 'B2', type: 'choice',
        question: "He _____ have stolen the money. He is very honest.",
        options: ["must", "can't", "should", "might"],
        answer: "can't",
        explanation: {
            title: "Modals of Deduction (Geçmiş)",
            rule: "Geçmişte bir şeyin olmasının imkansız olduğunu düşünüyorsak 'can't have + V3' kullanırız.",
            tips: "Must have = Olmuş olmalı (Eminim) | Can't have = Olmuş olamaz (İmkansız)",
            examples: ["You can't have seen him; he is dead."],
            translation: "Parayı o çalmış olamaz. O çok dürüsttür."
        }
    },

    // --- UNREAL PAST (IT'S HIGH TIME) ---
    {
        id: 405, level: 'B2', type: 'choice',
        question: "It's high time we _____ home.",
        options: ["go", "went", "have gone", "will go"],
        answer: "went",
        explanation: {
            title: "It's High Time",
            rule: "'It's high time' kalıbından sonra özne geliyorsa fiil Past Simple (ama anlam şimdiki/gelecek) olur. 'Çoktan yapmalıydık' anlamı katar.",
            tips: "It's time + Subject + V2",
            examples: ["It's time you found a job."],
            translation: "Eve gitme vaktimiz çoktan geldi."
        }
    },

    // --- INVERSION (DEVRİK CÜMLE - ONLY AFTER) ---
    {
        id: 406, level: 'B2', type: 'choice',
        question: "Only after leaving the room _____ that I had forgotten my keys.",
        options: ["I realized", "did I realize", "I did realize", "realized I"],
        answer: "did I realize",
        explanation: {
            title: "Inversion (Devrik Cümle)",
            rule: "'Only after', 'Never', 'Rarely' gibi kısıtlayıcı zarflar cümle başına gelirse, ana cümle devrik olur (Soru formatı gibi: Yardımcı fiil + Özne).",
            tips: "Only then DID I understand.",
            examples: ["Never have I seen such a thing."],
            translation: "Ancak odadan çıktıktan sonra anahtarlarımı unuttuğumu fark ettim."
        }
    },

    // --- BE USED TO DOING (ALIŞKIN OLMAK) ---
    {
        id: 407, level: 'B2', type: 'choice',
        question: "I'm not used to _____ up so early.",
        options: ["get", "getting", "be getting", "got"],
        answer: "getting",
        explanation: {
            title: "Be Used To + V-ing",
            rule: "'Be used to doing' bir şeye alışkın olmak demektir ve -ing alır. 'Used to do' (eskiden yapardım) ile karıştırılmamalıdır.",
            tips: "Am/Is/Are used to + Doing",
            examples: ["I am used to working hard."],
            translation: "Bu kadar erken kalkmaya alışkın değilim."
        }
    },

    // --- INVERSION (NO SOONER) ---
    {
        id: 408, level: 'B2', type: 'input',
        question: "No sooner had I arrived _____ the phone rang.",
        answer: "than",
        explanation: {
            title: "No Sooner ... Than",
            rule: "'No sooner' (Tam ... yapmıştım ki) kalıbı her zaman 'than' ile birlikte kullanılır.",
            tips: "No sooner ... THAN | Hardly ... WHEN",
            examples: ["No sooner had he left than it rained."],
            translation: "Tam varmıştım ki telefon çaldı."
        }
    },

    // --- PREPOSITIONS (ACCUSE OF) ---
    {
        id: 409, level: 'B2', type: 'choice',
        question: "He was accused _____ stealing the car.",
        options: ["of", "for", "with", "about"],
        answer: "of",
        explanation: {
            title: "Fiil + Edat (Accuse)",
            rule: "'Accuse' fiili (suçlamak) her zaman 'of' edatı ile kullanılır: 'Accuse someone OF something'.",
            tips: "Guilty OF, Accused OF",
            examples: ["She accused me of lying."],
            translation: "Arabayı çalmakla suçlandı."
        }
    },

    // --- WHATEVER (NE OLURSA OLSUN) ---
    {
        id: 410, level: 'B2', type: 'choice',
        question: "Whatever _____ , keep calm.",
        options: ["happens", "happen", "will happen", "happening"],
        answer: "happens",
        explanation: {
            title: "Whatever + Present Tense",
            rule: "'Whatever' (ne olursa olsun) kalıbından sonra gelecek zaman kastedilse bile Geniş Zaman (Present Simple) kullanılır.",
            tips: "Whatever happens, don't cry.",
            examples: ["I will support you whatever you decide."],
            translation: "Ne olursa olsun, sakin ol."
        }
    },

    // --- WOULD RATHER (BAŞKASI İÇİN TERCİH) ---
    {
        id: 411, level: 'B2', type: 'choice',
        question: "I'd rather you _____ now.",
        options: ["leave", "left", "leaving", "have left"],
        answer: "left",
        explanation: {
            title: "Would Rather (Subject Change)",
            rule: "'Would rather' kalıbında, eğer bir başkasının bir şey yapmasını istiyorsak (özne değişiyorsa), Past Simple kullanılır.",
            tips: "I'd rather YOU went. (Gitmeni tercih ederim)",
            examples: ["I'd rather you didn't call me."],
            translation: "Şimdi gitmeni tercih ederim (gitsen iyi olur)."
        }
    },

    // --- MODALS (CAN'T HAVE V3) ---
    {
        id: 412, level: 'B2', type: 'choice',
        question: "You _____ seen him yesterday; he was out of town.",
        options: ["must have", "can't have", "should have", "needn't have"],
        answer: "can't have",
        explanation: {
            title: "Geçmiş İmkansızlık",
            rule: "Bir olayın geçmişte gerçekleşmiş olmasının mantıken imkansız olduğunu 'can't have + V3' ile anlatırız.",
            tips: "Şehir dışındaysa onu görmüş olamazsın -> Can't have seen",
            examples: ["He can't have driven, he has no car."],
            translation: "Onu dün görmüş olamazsın; şehir dışındaydı."
        }
    },

    // --- WISH CLAUSE (PAST PERFECT) ---
    {
        id: 413, level: 'B2', type: 'input',
        question: "If only I _____ (listen) to your advice yesterday.",
        answer: "had listened",
        explanation: {
            title: "If Only + Past Perfect",
            rule: "'If only' veya 'I wish' ile geçmişteki bir pişmanlığı dile getirirken Past Perfect Tense kullanılır.",
            tips: "Keşke dinleseydim -> I wish I had listened.",
            examples: ["I wish I hadn't eaten so much."],
            translation: "Keşke dün tavsiyeni dinleseydim."
        }
    },

    // --- CAUSATIVE (HAVE SOMETHING DONE) ---
    {
        id: 414, level: 'B2', type: 'choice',
        question: "We had the roof _____ last year.",
        options: ["repair", "repairing", "repaired", "to repair"],
        answer: "repaired",
        explanation: {
            title: "Causative (Passive)",
            rule: "'Have something done' (bir şeyi yaptırmak). Çatı kendi kendini tamir edemez, başkasına yaptırılır. Bu yüzden V3 (repaired) kullanılır.",
            tips: "Have + Nesne + V3",
            examples: ["I am having my hair cut."],
            translation: "Geçen yıl çatıyı tamir ettirdik."
        }
    },

    // --- INVERSION (SCARCELY... WHEN) ---
    {
        id: 415, level: 'B2', type: 'choice',
        question: "Scarcely had he entered the room _____ the lights went out.",
        options: ["than", "when", "after", "as"],
        answer: "when",
        explanation: {
            title: "Scarcely ... When",
            rule: "'Scarcely' (Hemen hemen hiç / Tam ... ki) yapısı 'when' ile tamamlanır. Bir olayın diğerinin hemen ardından olduğunu anlatır.",
            tips: "Hardly / Scarcely -> WHEN | No sooner -> THAN",
            examples: ["Hardly had I sat down when the phone rang."],
            translation: "Odaya girer girmez (tam girmişti ki) ışıklar gitti."
        }
    },

    // --- REPORTED SPEECH (SUGGEST) ---
    {
        id: 416, level: 'B2', type: 'choice',
        question: "She suggested _____ to the cinema.",
        options: ["to go", "going", "go", "that we go"],
        answer: "going",
        explanation: {
            title: "Suggest + Gerund",
            rule: "'Suggest' fiilinden sonra doğrudan bir eylem gelirse, o eylem Gerund (-ing) formunda olur. 'Suggest to do' YANLIŞTIR.",
            tips: "Suggest DOING something.",
            examples: ["He suggested waiting."],
            translation: "Sinemaya gitmeyi önerdi."
        }
    },

    // --- TIME CLAUSES (AS SOON AS) ---
    {
        id: 417, level: 'B2', type: 'choice',
        question: "I'll give you a call as soon as I _____.",
        options: ["arrive", "will arrive", "arrived", "am arriving"],
        answer: "arrive",
        explanation: {
            title: "Time Clauses (Zaman Bağlaçları)",
            rule: "'As soon as', 'when', 'after' gibi zaman bağlaçlarından sonraki cümlede gelecek zaman (will) KULLANILMAZ. Geniş zaman kullanılır.",
            tips: "As soon as I arrive (Doğru) | As soon as I will arrive (Yanlış)",
            examples: ["I will leave when he comes."],
            translation: "Varır varmaz seni arayacağım."
        }
    },

    // --- SUBJUNCTIVE (ESSENTIAL) ---
    {
        id: 418, level: 'B2', type: 'input',
        question: "It is essential that every student _____ (wear) a uniform.",
        answer: "wear",
        explanation: {
            title: "Subjunctive Mood",
            rule: "'It is essential/important/vital that...' kalıplarından sonraki fiil, özne ne olursa olsun (he/she/it dahil) YALIN (s takısı almadan) kullanılır.",
            tips: "That he GO (Goes değil!)",
            examples: ["It is important that she be there."],
            translation: "Her öğrencinin üniforma giymesi esastır/şarttır."
        }
    },

    // --- SUBJECT-VERB AGREEMENT (NEITHER OF) ---
    {
        id: 419, level: 'B2', type: 'choice',
        question: "Neither of the answers _____ correct.",
        options: ["are", "is", "were", "have"],
        answer: "is",
        explanation: {
            title: "Subject-Verb Agreement (Neither)",
            rule: "Resmi İngilizcede 'Neither of' tekil fiil alır (is). Günlük dilde 'are' kullanılsa da, gramer kurallarına göre 'is' doğrudur.",
            tips: "Neither of them IS coming.",
            examples: ["Neither of my parents knows."],
            translation: "Cevapların hiçbiri doğru değil."
        }
    },

    // --- PHRASAL VERBS (PUT OFF) ---
    {
        id: 420, level: 'B2', type: 'choice',
        question: "The meeting was put _____ until next week.",
        options: ["out", "off", "away", "up"],
        answer: "off",
        explanation: {
            title: "Phrasal Verbs (Put Off)",
            rule: "'Put off', ertelemek (postpone) anlamına gelen yaygın bir deyimsel fiildir.",
            tips: "Put off = Ertelemek | Call off = İptal etmek",
            examples: ["Don't put off your homework."],
            translation: "Toplantı gelecek haftaya ertelendi."
        }
    },

    // --- FIRST TIME (PRESENT PERFECT) ---
    {
        id: 421, level: 'B2', type: 'input',
        question: "This is the first time I _____ (eat) sushi.",
        answer: "have eaten",
        explanation: {
            title: "This is the first time...",
            rule: "'Bu ilk kez...' kalıbı her zaman Present Perfect Tense ile devam eder.",
            tips: "This is the first/second time + Have/Has V3",
            examples: ["It's the first time I have seen this movie."],
            translation: "Bu, ilk kez suşi yiyişim."
        }
    },

    // --- MODALS (NEEDN'T HAVE) ---
    {
        id: 422, level: 'B2', type: 'choice',
        question: "You _____ have brought a gift, but thank you!",
        options: ["mustn't", "couldn't", "needn't", "shouldn't"],
        answer: "needn't",
        explanation: {
            title: "Needn't Have V3",
            rule: "'Yapmana gerek yoktu ama yaptın' anlamı taşır. Genelde nezaket veya gereksiz yapılan bir işi belirtmek için kullanılır.",
            tips: "Needn't have done = Boşuna yaptın (ama sorun değil).",
            examples: ["I needn't have cooked so much food."],
            translation: "Hediye getirmene gerek yoktu ama teşekkürler!"
        }
    },

    // --- PARTICIPLES (HAVING DONE) ---
    {
        id: 423, level: 'B2', type: 'choice',
        question: "_____ his homework, he went out to play.",
        options: ["Finish", "Finished", "Having finished", "To finish"],
        answer: "Having finished",
        explanation: {
            title: "Perfect Participle",
            rule: "Bir eylem (ödev bitirmek) diğerinden (dışarı çıkmak) tamamen önce yapıldıysa 'Having + V3' ile cümle kısaltılır.",
            tips: "Having done X, he did Y. (X'i yaptıktan sonra Y'yi yaptı)",
            examples: ["Having eaten dinner, we watched TV."],
            translation: "Ödevini bitirdikten sonra oynamaya çıktı."
        }
    },

    // --- TAG QUESTIONS (LET'S) ---
    {
        id: 424, level: 'B2', type: 'choice',
        question: "Let's go out, _____?",
        options: ["will we", "do we", "shall we", "can we"],
        answer: "shall we",
        explanation: {
            title: "Question Tags (Let's)",
            rule: "'Let's' (Haydi) ile başlayan öneri cümlelerinin soru eklentisi istisnasız 'shall we'dir.",
            tips: "Let's -> shall we?",
            examples: ["Let's dance, shall we?"],
            translation: "Dışarı çıkalım, olur mu?"
        }
    },

    // --- FUTURE PERFECT CONTINUOUS ---
    {
        id: 425, level: 'B2', type: 'input',
        question: "By next year, I _____ (work) here for 10 years.",
        answer: "will have been working",
        explanation: {
            title: "Future Perfect Continuous",
            rule: "Gelecekteki bir noktada, bir eylemin ne kadar süredir devam ediyor olacağını vurgulamak için kullanılır.",
            tips: "By + zaman ... for + süre -> will have been V-ing",
            examples: ["By 5 PM, I will have been driving for 6 hours."],
            translation: "Gelecek yıl itibarıyla, burada 10 yıldır çalışıyor olacağım."
        }
    },

    // --- WISH (WOULD - ŞİKAYET) ---
    {
        id: 426, level: 'B2', type: 'choice',
        question: "I wish you _____ stop interrupting me!",
        options: ["will", "would", "did", "had"],
        answer: "would",
        explanation: {
            title: "Wish + Would (Şikayet)",
            rule: "Bir başkasının yaptığı rahatsız edici bir davranışı değiştirmesini isterken veya şikayet ederken 'I wish ... would' kullanılır.",
            tips: "Wish + Would = Lütfen yapma / Kes şunu!",
            examples: ["I wish it would stop raining."],
            translation: "Keşke sözümü kesmeyi bıraksan!"
        }
    },

    // --- ADJECTIVE ORDER (SIFAT SIRALAMASI) ---
    {
        id: 427, level: 'B2', type: 'choice',
        question: "She bought a _____ bag.",
        options: ["black leather new", "new leather black", "new black leather", "leather new black"],
        answer: "new black leather",
        explanation: {
            title: "Order of Adjectives",
            rule: "Sıfat sıralaması: Opinion (Fikir) - Size (Boyut) - Age (Yaş/Yeni) - Color (Renk) - Material (Materyal).",
            tips: "OSASCOMP kuralı.",
            examples: ["A beautiful old red car."],
            translation: "Yeni, siyah, deri bir çanta aldı."
        }
    },

    // --- PASSIVE (GET USED TO) ---
    {
        id: 428, level: 'B2', type: 'choice',
        question: "I can't get used to _____ on the left.",
        options: ["drive", "driving", "drove", "be driven"],
        answer: "driving",
        explanation: {
            title: "Get Used To (Alışmak)",
            rule: "'Get used to' kalıbındaki 'to' edattır. Kendisinden sonra isim veya -ing (Gerund) gelir.",
            tips: "Get used to DOING something.",
            examples: ["You will get used to the noise."],
            translation: "Soldan direksiyonda (solda) araba sürmeye alışamıyorum."
        }
    },

    // --- QUANTIFIERS (A FEW / A LITTLE) ---
    {
        id: 429, level: 'B2', type: 'choice',
        question: "I have _____ friends in this city, so I'm not lonely.",
        options: ["few", "a few", "little", "a little"],
        answer: "a few",
        explanation: {
            title: "A Few vs Few",
            rule: "'A few': Az ama yeterli (olumlu). 'Few': Çok az, yetersiz (olumsuz). Arkadaşları olduğu için yalnız değil, yani olumlu -> 'a few'.",
            tips: "A few = Birkaç tane (Yeterli) | Few = Neredeyse hiç (Yetersiz)",
            examples: ["I have a few ideas."],
            translation: "Bu şehirde birkaç arkadaşım var, o yüzden yalnız değilim."
        }
    },

    // --- INVERTED CONDITIONAL (HAD I KNOWN) ---
    {
        id: 430, level: 'B2', type: 'choice',
        question: "_____ I known the truth, I would have told you.",
        options: ["If", "Had", "Have", "Did"],
        answer: "Had",
        explanation: {
            title: "Inverted Conditional (Type 3)",
            rule: "'If I had known' yerine 'If' atılır ve 'Had' başa gelir: 'Had I known'. Daha resmi ve vurguludur.",
            tips: "Had + Özne + V3 ... Would have V3",
            examples: ["Had you called, I would have come."],
            translation: "Gerçeği bilseydim, sana söylerdim."
        }
    }
    ];

    // Listeyi ana havuza ekle

const EXTRA_B2_QUESTIONS = [

    // --- MODALS OF DEDUCTION (PAST) ---
    {
        id: 431, level: 'B2', type: 'choice',
        question: "The streets are wet. It _____ rained last night.",
        options: ["must have", "should have", "can't have", "needn't have"],
        answer: "must have",
        explanation: {
            title: "Must have V3 (Güçlü Çıkarım)",
            rule: "Geçmişte bir olayın gerçekleştiğine dair elimizde güçlü bir kanıt (yerler ıslak) varsa 'must have + V3' kullanılır.",
            tips: "Kanıt var + Olumlu sonuç -> Must have",
            examples: ["He isn't here; he must have gone home."],
            translation: "Sokaklar ıslak. Dün gece yağmur yağmış olmalı."
        }
    },
    {
        id: 432, level: 'B2', type: 'choice',
        question: "She _____ seen me because she didn't wave.",
        options: ["must have", "can't have", "should have", "might have"],
        answer: "can't have",
        explanation: {
            title: "Can't have V3 (Olumsuz Çıkarım)",
            rule: "Geçmişte bir olayın gerçekleşmiş olmasının imkansız olduğunu düşünüyorsak 'can't have + V3' kullanırız.",
            tips: "El sallamadı -> Görmüş olamaz.",
            examples: ["He can't have stolen it; he was with me."],
            translation: "Beni görmüş olamaz çünkü el sallamadı."
        }
    },

    // --- PASSIVE WITH REPORTING VERBS ---
    {
        id: 433, level: 'B2', type: 'choice',
        question: "He is believed _____ the richest man in the town.",
        options: ["be", "to be", "being", "been"],
        answer: "to be",
        explanation: {
            title: "Passive Reporting",
            rule: "'He is believed/said/thought' yapılarından sonra 'to + fiil' gelir. Şimdiki zaman için 'to be' kullanılır.",
            tips: "He is said TO BE...",
            examples: ["She is thought to be living in Rome."],
            translation: "Kasabadaki en zengin adam olduğuna inanılıyor."
        }
    },

    // --- FUTURE CONTINUOUS ---
    {
        id: 434, level: 'B2', type: 'choice',
        question: "Don't call me at 8. I _____ dinner then.",
        options: ["will have", "will be having", "am having", "have"],
        answer: "will be having",
        explanation: {
            title: "Future Continuous",
            rule: "Gelecekte belirli bir anda (saat 8'de) devam edecek olan eylemler için 'will be + V-ing' kullanılır.",
            tips: "At 8 o'clock tomorrow -> Will be doing",
            examples: ["I will be sleeping when you arrive."],
            translation: "Beni 8'de arama. O sırada akşam yemeği yiyor olacağım."
        }
    },

    // --- CONJUNCTIONS (IN SPITE OF) ---
    {
        id: 435, level: 'B2', type: 'choice',
        question: "_____ the heavy rain, we went out.",
        options: ["Although", "In spite of", "Even though", "However"],
        answer: "In spite of",
        explanation: {
            title: "In spite of + Noun",
            rule: "'The heavy rain' bir isim tamlamasıdır. İsimlerden önce 'rağmen' demek için 'In spite of' veya 'Despite' kullanılır. 'Although' cümle ister.",
            tips: "In spite of + İsim | Although + Cümle",
            examples: ["In spite of his age, he is active."],
            translation: "Şiddetli yağmura rağmen dışarı çıktık."
        }
    },

    // --- CAUSATIVE (GET) ---
    {
        id: 436, level: 'B2', type: 'choice',
        question: "I must get my car _____ before the trip.",
        options: ["service", "to service", "serviced", "servicing"],
        answer: "serviced",
        explanation: {
            title: "Causative (Get sth Done)",
            rule: "Bir şeyi başkasına yaptırmak anlamında 'Get + Nesne + V3' kullanılır. (Have sth done ile aynıdır).",
            tips: "Get it done.",
            examples: ["I got my hair cut."],
            translation: "Yolculuktan önce arabamın bakımını yaptırmalıyım."
        }
    },

    // --- THIRD CONDITIONAL ---
    {
        id: 437, level: 'B2', type: 'input',
        question: "If you _____ (tell) me the truth, I wouldn't have been angry.",
        answer: "had told",
        explanation: {
            title: "Third Conditional",
            rule: "Geçmişteki hayali durumlar: 'If' cümlesi Past Perfect (had told), ana cümle 'would have V3' olur.",
            tips: "If + Had V3 ... Would have V3",
            examples: ["If I had studied, I would have passed."],
            translation: "Bana doğruyu söylemiş olsaydın, kızmazdım."
        }
    },

    // --- WISH CLAUSES (REGRET) ---
    {
        id: 438, level: 'B2', type: 'choice',
        question: "I wish I _____ spent so much money yesterday.",
        options: ["haven't", "didn't", "hadn't", "wouldn't"],
        answer: "hadn't",
        explanation: {
            title: "Wish + Past Perfect",
            rule: "Geçmişle ilgili pişmanlıkları anlatırken 'I wish'ten sonra Past Perfect (hadn't V3) kullanılır.",
            tips: "Past Regret -> I wish + Had V3",
            examples: ["I wish I had accepted the job."],
            translation: "Keşke dün o kadar çok para harcamasaydım."
        }
    },

    // --- ADJECTIVE ORDER ---
    {
        id: 439, level: 'B2', type: 'choice',
        question: "She bought a _____ table.",
        options: ["wooden round small", "small round wooden", "round small wooden", "wooden small round"],
        answer: "small round wooden",
        explanation: {
            title: "Adjective Order",
            rule: "Sıralama: Size (Küçük) - Shape (Yuvarlak) - Material (Ahşap).",
            tips: "SASCOMP kuralı (Size, Age, Shape, Color, Origin, Material, Purpose).",
            examples: ["A big old red bus."],
            translation: "Küçük, yuvarlak, ahşap bir masa aldı."
        }
    },

    // --- PHRASAL VERBS (PUT UP WITH) ---
    {
        id: 440, level: 'B2', type: 'choice',
        question: "I can't put _____ with this noise anymore!",
        options: ["on", "up", "in", "off"],
        answer: "up",
        explanation: {
            title: "Put Up With (Katlanmak)",
            rule: "'Put up with', tahammül etmek, katlanmak (tolerate) anlamına gelen 3 kelimeli bir öbek fiildir.",
            tips: "Put up with someone/something.",
            examples: ["How do you put up with him?"],
            translation: "Bu gürültüye daha fazla katlanamıyorum!"
        }
    },

    // --- QUANTIFIERS (A GREAT DEAL OF) ---
    {
        id: 441, level: 'B2', type: 'choice',
        question: "It takes a great _____ of patience to be a teacher.",
        options: ["number", "deal", "amount", "many"],
        answer: "deal",
        explanation: {
            title: "A Great Deal Of",
            rule: "Sayılamayan soyut isimlerle (patience, courage) 'a great deal of' (büyük miktarda/çokça) kullanılır.",
            tips: "A great deal of + Uncountable Noun",
            examples: ["He has a great deal of money."],
            translation: "Öğretmen olmak büyük miktarda sabır gerektirir."
        }
    },

    // --- RELATIVE CLAUSES (NON-DEFINING) ---
    {
        id: 442, level: 'B2', type: 'choice',
        question: "My brother, _____ lives in London, is coming to visit.",
        options: ["that", "who", "which", "whom"],
        answer: "who",
        explanation: {
            title: "Non-defining Relative Clauses",
            rule: "Virgülle ayrılan ek bilgi cümlelerinde insanlar için 'who' kullanılır, 'that' ASLA kullanılmaz.",
            tips: "Virgül varsa -> No 'That'",
            examples: ["My car, which is old, broke down."],
            translation: "Londra'da yaşayan kardeşim ziyarete geliyor."
        }
    },

    // --- WOULD RATHER (DIFFERENT SUBJECT) ---
    {
        id: 443, level: 'B2', type: 'choice',
        question: "I'd rather you _____ smoke in here.",
        options: ["don't", "didn't", "not", "won't"],
        answer: "didn't",
        explanation: {
            title: "Would Rather + Someone + Past",
            rule: "Bir başkasının bir şey yapmasını/yapmamasını tercih ederken (özne değişince) Past Simple kullanılır.",
            tips: "I'd rather YOU went.",
            examples: ["I'd rather you didn't tell anyone."],
            translation: "Burada sigara içmemeni tercih ederim."
        }
    },

    // --- IT'S TIME ---
    {
        id: 444, level: 'B2', type: 'choice',
        question: "It's time we _____ home.",
        options: ["go", "went", "are going", "have gone"],
        answer: "went",
        explanation: {
            title: "It's time + Past Simple",
            rule: "'Vakit geldi' anlamındaki 'It's time' yapısından sonra özne gelirse fiil geçmiş zaman (V2) olur. Anlam şimdiki zamandır.",
            tips: "It's time we left.",
            examples: ["It's time you found a job."],
            translation: "Eve gitme vaktimiz geldi."
        }
    },

    // --- SO THAT (PURPOSE) ---
    {
        id: 445, level: 'B2', type: 'choice',
        question: "I turned off the phone so that I _____ study.",
        options: ["can", "could", "will", "may"],
        answer: "could",
        explanation: {
            title: "So That (Amaç)",
            rule: "Ana cümle geçmiş zamansa (turned off), 'so that' (diye/olsun diye) kısmında 'could' veya 'might' kullanılır.",
            tips: "Past + So that + Could",
            examples: ["I worked hard so that I could buy a car."],
            translation: "Ders çalışabileyim diye telefonu kapattım."
        }
    },

    // --- PARTICIPLE CLAUSES (REASON) ---
    {
        id: 446, level: 'B2', type: 'choice',
        question: "_____ tired, I went to bed early.",
        options: ["Feel", "Felt", "Feeling", "To feel"],
        answer: "Feeling",
        explanation: {
            title: "Present Participle (Reason)",
            rule: "'Because I felt tired' yerine kısaltma olarak 'Feeling tired' kullanılabilir. Özneler aynı olmalıdır.",
            tips: "V-ing ile başlayan sebep cümlesi.",
            examples: ["Knowing the answer, he raised his hand."],
            translation: "Yorgun hissettiğim için erken yattım."
        }
    },

    // --- NO SOONER ... THAN ---
    {
        id: 447, level: 'B2', type: 'choice',
        question: "No sooner had I sat down _____ the phone rang.",
        options: ["when", "than", "that", "after"],
        answer: "than",
        explanation: {
            title: "No Sooner ... Than",
            rule: "'Tam ... yapmıştım ki' yapısında 'No sooner' varsa devamında mutlaka 'Than' kullanılır.",
            tips: "No sooner -> Than | Hardly -> When",
            examples: ["No sooner had he left than it started raining."],
            translation: "Tam oturmuştum ki telefon çaldı."
        }
    },

    // --- SUPPOSED TO ---
    {
        id: 448, level: 'B2', type: 'choice',
        question: "You were _____ to be here an hour ago!",
        options: ["supposed", "thought", "said", "believed"],
        answer: "supposed",
        explanation: {
            title: "Be Supposed To",
            rule: "'Be supposed to', planlanan veya beklenen ama gerçekleşmeyen durumlar için kullanılır (Gerekiyordu).",
            tips: "Supposed to = Should have been",
            examples: ["The movie was supposed to start at 9."],
            translation: "Bir saat önce burada olman gerekiyordu!"
        }
    },

    // --- GERUND AFTER PREPOSITIONS ---
    {
        id: 449, level: 'B2', type: 'choice',
        question: "He was accused _____ stealing the money.",
        options: ["for", "of", "with", "on"],
        answer: "of",
        explanation: {
            title: "Accuse OF",
            rule: "'Accuse' (suçlamak) fiili 'of' edatı ile kullanılır. Edattan sonra fiil gelirse -ing alır.",
            tips: "Accuse someone OF doing something.",
            examples: ["She accused him of lying."],
            translation: "Parayı çalmakla suçlandı."
        }
    },

    // --- USED TO vs BE USED TO ---
    {
        id: 450, level: 'B2', type: 'choice',
        question: "I am used to _____ in a noisy office.",
        options: ["work", "working", "worked", "be working"],
        answer: "working",
        explanation: {
            title: "Be Used To + V-ing",
            rule: "'Am/Is/Are used to' (alışkınım) kalıbından sonra fiil -ing alır. 'Used to work' (eskiden çalışırdım) ile karıştırılmamalı.",
            tips: "Be used to DOING.",
            examples: ["He is used to getting up early."],
            translation: "Gürültülü bir ofiste çalışmaya alışkınım."
        }
    },

    // --- FUTURE PERFECT ---
    {
        id: 451, level: 'B2', type: 'input',
        question: "By this time next year, I _____ (graduate) from university.",
        answer: "will have graduated",
        explanation: {
            title: "Future Perfect",
            rule: "Gelecekte belirli bir tarihten önce tamamlanmış olacak eylemler için 'will have V3' kullanılır.",
            tips: "By next year -> Will have done",
            examples: ["I will have finished the report by 5."],
            translation: "Gelecek yıl bu zamanlar üniversiteden mezun olmuş olacağım."
        }
    },

    // --- COMPARATIVES (THE... THE...) ---
    {
        id: 452, level: 'B2', type: 'choice',
        question: "The more you read, the _____ you learn.",
        options: ["much", "more", "most", "many"],
        answer: "more",
        explanation: {
            title: "Double Comparative",
            rule: "'The + comparative, the + comparative' yapısı. 'Ne kadar ... o kadar ...' demektir.",
            tips: "The more, the better.",
            examples: ["The harder you study, the better you get."],
            translation: "Ne kadar çok okursan, o kadar çok öğrenirsin."
        }
    },

    // --- NEITHER ... NOR ---
    {
        id: 453, level: 'B2', type: 'choice',
        question: "I have _____ the time nor the money to travel.",
        options: ["either", "neither", "both", "none"],
        answer: "neither",
        explanation: {
            title: "Neither ... Nor",
            rule: "'Ne ... ne de ...' anlamına gelir. Cümleye olumsuzluk katar.",
            tips: "Neither X nor Y.",
            examples: ["Neither Ali nor Veli came."],
            translation: "Seyahat etmek için ne vaktim ne de param var."
        }
    },

    // --- MODALS (NEEDN'T) ---
    {
        id: 454, level: 'B2', type: 'choice',
        question: "You _____ worry about it. I'll handle it.",
        options: ["needn't", "mustn't", "couldn't", "wouldn't"],
        answer: "needn't",
        explanation: {
            title: "Needn't (Gerek yok)",
            rule: "'Needn't' (Don't have to), zorunluluk olmadığını belirtir. 'Mustn't' yasak bildirir.",
            tips: "Needn't = It is not necessary.",
            examples: ["You needn't pay; it's free."],
            translation: "Bunun hakkında endişelenmene gerek yok. Ben hallederim."
        }
    },

    // --- PHRASAL VERBS (RUN OUT OF) ---
    {
        id: 455, level: 'B2', type: 'choice',
        question: "We have run _____ of coffee.",
        options: ["away", "out", "down", "off"],
        answer: "out",
        explanation: {
            title: "Run Out Of (Tükenmek)",
            rule: "Bir şeyin bitmesi/tükenmesi anlamında kullanılır.",
            tips: "Run out of petrol/time/money.",
            examples: ["My car ran out of gas."],
            translation: "Kahvemiz bitti (tükendi)."
        }
    },

    // --- PROVIDED THAT ---
    {
        id: 456, level: 'B2', type: 'choice',
        question: "I will go _____ that you come with me.",
        options: ["provided", "unless", "even", "case"],
        answer: "provided",
        explanation: {
            title: "Provided That (Şartıyla)",
            rule: "'Provided that' veya 'Providing that', 'If' yerine kullanılan biraz daha resmi bir şart bağlacıdır.",
            tips: "Provided that = Only if.",
            examples: ["You can drive provided that you have a license."],
            translation: "Benimle gelmen şartıyla giderim."
        }
    },

    // --- INVERSION (NEVER) ---
    {
        id: 457, level: 'B2', type: 'choice',
        question: "Never _____ I seen such a beautiful sunset.",
        options: ["did", "have", "had", "was"],
        answer: "have",
        explanation: {
            title: "Inversion with Never",
            rule: "'Never' cümle başına gelirse cümle devrik olur. 'Seen' (V3) olduğu için yardımcı fiil 'have' olmalıdır.",
            tips: "Never HAVE I seen...",
            examples: ["Never will I do that again."],
            translation: "Daha önce hiç bu kadar güzel bir gün batımı görmemiştim."
        }
    },

    // --- TAG QUESTIONS (LET'S) ---
    {
        id: 458, level: 'B2', type: 'choice',
        question: "Let's go for a walk, _____?",
        options: ["will we", "do we", "shall we", "aren't we"],
        answer: "shall we",
        explanation: {
            title: "Tag Questions (Let's)",
            rule: "'Let's' ile başlayan öneri cümlelerinin soru eklentisi (tag) her zaman 'shall we'dir.",
            tips: "Let's -> shall we?",
            examples: ["Let's dance, shall we?"],
            translation: "Yürüyüşe çıkalım, olur mu?"
        }
    },

    // --- VERB PATTERNS (REGRET) ---
    {
        id: 459, level: 'B2', type: 'choice',
        question: "I regret _____ you that you failed the exam.",
        options: ["telling", "to tell", "tell", "told"],
        answer: "to tell",
        explanation: {
            title: "Regret to tell (Haber verme)",
            rule: "Kötü bir haber verirken 'Regret to tell/inform' kullanılır. Geçmişteki pişmanlık için 'Regret -ing' kullanılır.",
            tips: "Bad news -> To tell.",
            examples: ["I regret to inform you that..."],
            translation: "Sınavdan kaldığınızı size söylemekten üzüntü duyuyorum."
        }
    },

    // --- PREPOSITIONS (PREVENT FROM) ---
    {
        id: 460, level: 'B2', type: 'choice',
        question: "The rain prevented us _____ playing football.",
        options: ["to", "from", "on", "with"],
        answer: "from",
        explanation: {
            title: "Prevent From",
            rule: "'Prevent' (engellemek) fiili 'from' edatı ile kullanılır.",
            tips: "Prevent someone FROM doing something.",
            examples: ["Nothing can prevent me from going."],
            translation: "Yağmur futbol oynamamızı engelledi."
        }
    }
];

// Ana listeye ekleme

export const b2Questions = [...B2_QUESTIONS, ...EXTRA_B2_QUESTIONS];
