/* ============================================================
   Network Management — mock data
   A private AI memory for your relationships.
   (All people, companies and facts below are fictional mock data)
   ============================================================ */

const TODAY_LABEL = "Thursday, Oct 8, 2026";
const APP_NAME = "Network Management";
const TAGLINE = "Your relationships, remembered and managed.";

/* ---------- strength & frequency vocab ---------- */
const STRENGTHS = [
  { id: "close", label: "Close", color: "#E0452C" },
  { id: "important", label: "Important", color: "#B45F06" },
  { id: "normal", label: "Normal", color: "#3E7BB6" },
  { id: "weak", label: "Weak", color: "#8D867C" }
];
const FREQUENCIES = [
  { id: "monthly", label: "Monthly" },
  { id: "2months", label: "Every 2 months" },
  { id: "quarterly", label: "Quarterly" },
  { id: "biannual", label: "Twice a year" },
  { id: "yearly", label: "Yearly" },
  { id: "custom", label: "Custom" }
];
const strengthOf = (id) => STRENGTHS.find((s) => s.id === id) || STRENGTHS[2];
const frequencyOf = (id) => FREQUENCIES.find((f) => f.id === id);

/* ============================================================
   SAMPLE PEOPLE — extended data model (§9)
   (All people, companies and facts below are fictional mock data.
    Chỉ nạp khi bấm "Load sample data" — app thật bắt đầu RỖNG.)
   ============================================================ */
const SAMPLE_PEOPLE = [
  {
    id: "tanaka",
    name: "Tanaka Hiroshi", nameJa: "田中 博", nickname: "Hiroshi", initials: "TH",
    gender: "Male", birthday: "Nov 22", nationality: "Japan", languages: ["Japanese", "English (business)"],
    currentCity: "Yokohama", area: "Kanagawa", hometown: "Yokohama", country: "Japan",
    email: "hiroshi.tanaka@abc-logistics.jp", phone: "+81 90-XXXX-XXXX",
    company: "ABC Logistics", department: "Logistics DX Division", title: "Logistics DX Director",
    industry: "Logistics", profession: "Corporate manager",
    expertise: ["Warehouse automation", "Logistics DX", "Supply chain"],
    previousCompanies: ["Yamato Transport"], careerHistory: ["Started at Yamato, joined ABC in 2019"],
    skills: ["WMS", "AGV", "Operations"], businessTopics: ["AGV integration", "WMS", "Vietnam expansion"],
    spouse: "Married", children: "Two children", parents: "", siblings: "", familyNotes: "Wife works in finance. Lives in Yokohama.",
    hobbies: ["Golf"], sports: ["Golf"], favoriteFood: "Soba", favoriteDrink: "Japanese whisky",
    restaurants: "", schools: "Keio University", pets: "", travelInterests: ["Vietnam"],
    relationshipType: "Key contact", strength: "important", frequency: "quarterly",
    firstMet: { date: "Mar 12, 2025", place: "EDIX, Tokyo", how: "Introduced by Yamamoto Ryo" },
    introducedBy: "Yamamoto Ryo",
    helpGiven: ["Introduced Ito Kenji (MotionWorks Robotics)"],
    helpReceived: ["Warehouse automation insights"],
    promises: ["Meet again in October — warehouse-robots PoC discussion"],
    role: "Key contact", since: "Mar 2025", location: "Yokohama, Japan",
    color: "#E0452C",
    interests: ["Robotics", "Vietnam", "Warehouse automation", "Golf", "AGV", "WMS"],
    dates: [
      { label: "Birthday", when: "Nov 22", icon: "cake" },
      { label: "First met", when: "Mar 12, 2025 · EDIX", icon: "hand" }
    ],
    last: { type: "Meeting", when: "Aug 22, 2026", place: "Yamato Logistics, Tokyo",
      summary: "Yamato warehouse visit — walked the floor, discussed AGV routes and warehouse management system.", tags: ["AGV", "WMS"] },
    followUp: { when: "Oct 12, 2026 · 14:00", what: "Meeting at ABC HQ — he is considering a PoC for warehouse robots", kind: "meeting" },
    meetings: [
      { date: "Aug 22, 2026", type: "Meeting", title: "Yamato warehouse visit",
        summary: "Walked the Yamato facility. Serious about AGV integration and WMS. Considering a PoC next year.", tags: ["AGV", "WMS", "PoC"] },
      { date: "May 18, 2026", type: "Meeting", title: "Lunch — ABC HQ",
        summary: "Talked about Vietnam expansion plans. Looking for logistics partners in Vietnam — I mentioned Nguyen Minh.", tags: ["Vietnam", "Logistics"] },
      { date: "Dec 3, 2025", type: "Event", title: "Logis-Tech Tokyo",
        summary: "Met Ito Kenji (MotionWorks) at the expo and introduced them. They discussed warehouse robotics.", tags: ["Event", "Robotics"] },
      { date: "Mar 12, 2025", type: "Event", title: "EDIX 2025",
        summary: "First met, introduced by Yamamoto Ryo. Started talking about logistics DX for ABC.", tags: ["First met", "EDIX"] }
    ],
    timelineExtra: [
      { date: "Oct 2026", kind: "job_change", title: "Frequency check", body: "No job change. Status: planning PoC with ABC budget." }
    ],
    memories: [
      { when: "Aug 2026", text: "Plays golf on weekends — member at a course in Chiba." },
      { when: "May 2026", text: "Seriously considering a PoC for warehouse robots next year." },
      { when: "Mar 2025", text: "Long logistics career — started at Yamato, joined ABC in 2019." },
      { when: "2026", text: "Lives in Yokohama. Two children. Wife works in finance." }
    ],
    raw: 'Voice memo · Aug 22, 2026 — "Met Tanaka-san at the Yamato warehouse today. He is responsible for logistics DX at ABC. Very interested in warehouse robots — considering a PoC next year. We walked the floor, looked at AGV routes and the WMS. Agreed to meet again in October to talk about next steps."',
    connections: ["Ito Kenji", "Nguyen Minh"], mutual: ["Ito Kenji", "Yamamoto Ryo"],
    tags: ["logistics-dx", "po-c-2027", "warehouse"],
    lastContactDays: 47, metCount: 4,
    about: "Tanaka Hiroshi — ABC Logistics, Logistics DX Director. Met 4 times since 2025. Lives in Yokohama, plays golf, has two children. Interested in robotics, Vietnam and warehouse automation. Last met: Yamato warehouse visit — Aug 2026. Discussed: AGV integration and warehouse management system."
  },
  {
    id: "suzuki",
    name: "Suzuki Keiko", nameJa: "鈴木 恵子", nickname: "Keiko", initials: "SK",
    gender: "Female", birthday: "Mar 21", nationality: "Japan", languages: ["Japanese", "English"],
    currentCity: "Tokyo", area: "Setagaya", hometown: "Tokyo", country: "Japan",
    email: "keiko.suzuki@nihon-ai.co.jp", phone: "+81 90-XXXX-XXXX",
    company: "Nihon AI Systems", department: "AI Platform", title: "AI Platform Team Lead",
    industry: "Technology", profession: "Engineering manager",
    expertise: ["AI agents", "ML platforms"], previousCompanies: [], careerHistory: ["Newly managing the AI platform team"],
    skills: ["LLM", "MLOps"], businessTopics: ["AI agents", "Vietnam talent"],
    spouse: "Married", children: "", parents: "", siblings: "", familyNotes: "Daughter entered university this year (2026).",
    hobbies: ["Reading"], sports: [], favoriteFood: "", favoriteDrink: "Matcha", restaurants: [], schools: "Tokyo University", pets: "",
    relationshipType: "Collaborator", strength: "normal", frequency: "2months",
    firstMet: { date: "Jun 14, 2025", place: "AI Meetup Tokyo", how: "Met at a meetup" },
    introducedBy: "",
    helpGiven: [], helpReceived: ["Great sparring on AI agents"], promises: ["Introduce someone familiar with Vietnam — still open"],
    role: "Collaborator", since: "Jun 2025", location: "Tokyo (Setagaya), Japan",
    color: "#7A5AF8",
    interests: ["AI", "Vietnam", "Recruiting"],
    dates: [{ label: "Birthday", when: "Mar 21", icon: "cake" }],
    last: { type: "Coffee", when: "Sep 30, 2026", place: "Roppongi, Tokyo",
      summary: "Her daughter entered university this year. She now manages the new AI team. She asked me to introduce someone familiar with Vietnam.", tags: ["Vietnam", "AI"] },
    followUp: { when: "Open", what: "Action — introduce someone familiar with Vietnam", kind: "action" },
    meetings: [
      { date: "Sep 30, 2026", type: "Coffee", title: "Roppongi coffee",
        summary: "Daughter entered university. Now managing the new AI team. Asked for a Vietnam introduction.", tags: ["Personal", "AI", "Vietnam"] },
      { date: "Jun 14, 2025", type: "Event", title: "AI Meetup Tokyo", summary: "First met at a meetup.", tags: ["First met", "Event"] }
    ],
    timelineExtra: [],
    memories: [
      { when: "Sep 2026", text: "Daughter entered university this year." },
      { when: "Sep 2026", text: "Newly managing the AI platform team." }
    ],
    raw: 'Voice memo · Sep 30, 2026 — "I just met Suzuki-san again. Her daughter entered university this year. She is now managing the new AI team. She asked me to introduce someone familiar with Vietnam."',
    connections: [], mutual: [], tags: ["ai-agents", "vietnam-intro"],
    lastContactDays: 8, metCount: 2,
    about: "Suzuki Keiko — Nihon AI Systems, AI Platform Team Lead. Met 2 times since 2025. Newly managing the AI team; daughter entered university this year. Asked for an introduction to someone familiar with Vietnam."
  },
  {
    id: "sato",
    name: "Sato Yuki", nameJa: "佐藤 由紀", nickname: "", initials: "SY",
    gender: "Female", birthday: "Feb 2", nationality: "Japan", languages: ["Japanese"],
    currentCity: "Tokyo", area: "Marunouchi", hometown: "Nagoya", country: "Japan",
    email: "yuki.sato@talentbridge.jp", phone: "+81 90-XXXX-XXXX",
    company: "TalentBridge", department: "Founder", title: "Founder & Headhunter",
    industry: "HR & Recruiting", profession: "Entrepreneur",
    expertise: ["Founder hiring", "Tokyo startup scene"], previousCompanies: [], careerHistory: ["Founded TalentBridge"],
    skills: ["Recruiting", "Advisory"], businessTopics: ["Startup hiring", "Vietnam expansion"],
    spouse: "", children: "", parents: "", siblings: "", familyNotes: "",
    hobbies: ["Wine"], sports: [], favoriteFood: "", favoriteDrink: "Wine", restaurants: [], schools: "Waseda University", pets: "",
    relationshipType: "Mentor", strength: "important", frequency: "quarterly",
    firstMet: { date: "Jan 2024", place: "Tokyo Founders Meetup", how: "Met in the founder community" },
    introducedBy: "",
    helpGiven: ["Career advice in Japan"], helpReceived: [], promises: [],
    role: "Mentor", since: "Jan 2024", location: "Tokyo, Japan",
    color: "#0E9F8A",
    interests: ["Startups", "Hiring", "Vietnam", "Wine"],
    dates: [{ label: "Birthday", when: "Feb 2", icon: "cake" }],
    last: { type: "Coffee", when: "Jun 10, 2026", place: "Marunouchi, Tokyo",
      summary: "Discussed founder hiring in tech. She knows the startup scene in Tokyo really well.", tags: ["Startups"] },
    followUp: { when: "Overdue · 4 months", what: "Reconnect — haven't spoken since June", kind: "reconnect" },
    meetings: [
      { date: "Jun 10, 2026", type: "Coffee", title: "Marunouchi coffee", summary: "Founder hiring in tech; offered her startup map.", tags: ["Startups", "Hiring"] },
      { date: "Jan 2024", type: "Event", title: "Tokyo Founders Meetup", summary: "First met. Great advice on building in Japan.", tags: ["First met", "Event"] }
    ],
    timelineExtra: [],
    memories: [
      { when: "Jun 2026", text: "Building TalentBridge beyond headhunting — advisory angle." },
      { when: "Jan 2024", text: "Met through the founder community." }
    ],
    raw: "", connections: ["Kobayashi Miki"], mutual: ["Kobayashi Miki", "Watanabe Aiko"],
    tags: ["headhunter", "founder-community"],
    lastContactDays: 120, metCount: 6,
    about: "Sato Yuki — TalentBridge, Founder & Headhunter. Known since 2024. A mentor for building in Japan. Last met: Marunouchi coffee — Jun 2026. Discussed founder hiring in tech."
  },
  {
    id: "ito",
    name: "Ito Kenji", nameJa: "伊藤 健二", nickname: "", initials: "IK",
    gender: "Male", birthday: "", nationality: "Japan", languages: ["Japanese"],
    currentCity: "Osaka", area: "", hometown: "Osaka", country: "Japan",
    email: "kenji.ito@motionworks.jp", phone: "+81 90-XXXX-XXXX",
    company: "MotionWorks Robotics", department: "Sales & BD", title: "Sales Director",
    industry: "Robotics", profession: "Sales",
    expertise: ["AGV", "Warehouse robotics"], previousCompanies: [], careerHistory: [],
    skills: ["AGV", "Solution sales"], businessTopics: ["AGV pricing", "PoC support"],
    spouse: "", children: "", parents: "", siblings: "", familyNotes: "",
    hobbies: ["Shochu"], sports: [], favoriteFood: "Takoyaki", favoriteDrink: "Shochu", restaurants: [], schools: "", pets: "",
    relationshipType: "Supplier connection", strength: "normal", frequency: "2months",
    firstMet: { date: "Dec 3, 2025", place: "Logis-Tech Tokyo", how: "Met at the expo" },
    introducedBy: "Tanaka Hiroshi (introduced by me)",
    helpGiven: ["AGV pricing info", "PoC support"], helpReceived: [], promises: ["Demo at Logis-Tech — Oct 18"],
    role: "Supplier connection", since: "Dec 2025", location: "Osaka, Japan",
    color: "#E08B00",
    interests: ["Robotics", "AGV", "Logistics", "Shochu"],
    dates: [],
    last: { type: "Call", when: "Sep 14, 2026", place: "Phone · 30 min",
      summary: "AGV pricing and PoC support for ABC. Happy to demo at Logis-Tech.", tags: ["AGV", "PoC"] },
    followUp: { when: "Oct 18, 2026", what: "Logis-Tech Expo — walk the booth together", kind: "meeting" },
    meetings: [
      { date: "Sep 14, 2026", type: "Call", title: "AGV pricing call", summary: "PoC support for ABC. Demo planned at Logis-Tech.", tags: ["AGV", "PoC"] },
      { date: "Dec 3, 2025", type: "Event", title: "Logis-Tech Tokyo", summary: "Introduced to Tanaka Hiroshi by me.", tags: ["Event", "Robotics"] }
    ],
    timelineExtra: [],
    memories: [
      { when: "Dec 2025", text: "Osaka-based, loves robots and shochu." },
      { when: "Sep 2026", text: "Can support a PoC at ABC — wants Tanaka to commit soon." }
    ],
    raw: "", connections: ["Tanaka Hiroshi"], mutual: ["Tanaka Hiroshi"],
    tags: ["agv", "logis-tech"],
    lastContactDays: 24, metCount: 2,
    about: "Ito Kenji — MotionWorks Robotics, Sales Director. Met 2 times since 2025. AGV & warehouse robotics. Connected to Tanaka Hiroshi. Next: Logis-Tech Expo — Oct 18."
  },
  {
    id: "nguyen",
    name: "Nguyen Minh", nameJa: "グエン・ミン", nickname: "", initials: "NM",
    gender: "Male", birthday: "", nationality: "Vietnam", languages: ["Vietnamese", "English"],
    currentCity: "Ho Chi Minh City", area: "", hometown: "Hanoi", country: "Vietnam",
    email: "minh.nguyen@saigonretail.vn", phone: "+84 90-XXXX-XXX",
    company: "Saigon Retail Group", department: "CEO Office", title: "CEO",
    industry: "Retail", profession: "Entrepreneur",
    expertise: ["Vietnam retail", "Cross-border e-commerce"], previousCompanies: [], careerHistory: ["Family chain of 40+ stores"],
    skills: ["Retail ops", "Network building"], businessTopics: ["Cross-border", "Logistics partners"],
    spouse: "Married", children: "", parents: "", siblings: "", familyNotes: "Family runs a chain of 40+ retail stores in the south.",
    hobbies: ["Golf"], sports: ["Golf"], favoriteFood: "Pho", favoriteDrink: "Vietnamese coffee", restaurants: [], schools: "", pets: "",
    relationshipType: "Partner — Vietnam", strength: "normal", frequency: "quarterly",
    firstMet: { date: "Apr 2025", place: "Ho Chi Minh City", how: "Vietnam Startup Trip, introduced by a mutual investor" },
    introducedBy: "Mutual investor",
    helpGiven: ["Vietnam retail network insights"], helpReceived: [], promises: ["Intro to Tanaka (Vietnam expansion)"],
    role: "Partner — Vietnam", since: "Apr 2025", location: "Ho Chi Minh City, Vietnam",
    color: "#C43A8B",
    interests: ["Vietnam", "Retail", "E-commerce", "Golf"],
    dates: [],
    last: { type: "Video call", when: "Aug 30, 2026", place: "Google Meet · 40 min",
      summary: "Wide retail network in Vietnam. Wants to meet logistics partners for cross-border e-commerce.", tags: ["Vietnam", "Retail"] },
    followUp: { when: "Open", what: "Intro to Tanaka Hiroshi (Vietnam expansion)", kind: "action" },
    meetings: [
      { date: "Aug 30, 2026", type: "Video call", title: "Cross-border call", summary: "Retail network in Vietnam; needs logistics partners.", tags: ["Vietnam", "Retail"] },
      { date: "Apr 2025", type: "Event", title: "Vietnam Startup Trip", summary: "First met in HCMC.", tags: ["First met", "Event"] }
    ],
    timelineExtra: [],
    memories: [
      { when: "Aug 2026", text: "Family runs a chain of 40+ retail stores in the south." },
      { when: "Apr 2025", text: "Very well connected in Vietnam retail." }
    ],
    raw: "", connections: ["Tanaka Hiroshi", "Mori Takashi"], mutual: [],
    tags: ["vietnam-retail", "cross-border"],
    lastContactDays: 39, metCount: 2,
    about: "Nguyen Minh — Saigon Retail Group, CEO. Met 2 times since 2025. Deep network in Vietnam retail & e-commerce. Open action: introduce to Tanaka for Vietnam expansion."
  },
  {
    id: "yamamoto",
    name: "Yamamoto Ryo", nameJa: "山本 遼", nickname: "Ryo", initials: "YR",
    gender: "Male", birthday: "Jun 8", nationality: "Japan", languages: ["Japanese", "English"],
    currentCity: "Tokyo", area: "Shibuya", hometown: "Tokyo", country: "Japan",
    email: "ryo@edutechlab.jp", phone: "+81 90-XXXX-XXXX",
    company: "EduTech Lab", department: "Founder", title: "Founder",
    industry: "Education", profession: "Entrepreneur",
    expertise: ["School SaaS", "EdTech"], previousCompanies: [], careerHistory: [],
    skills: ["Product", "SEA expansion"], businessTopics: ["SEA expansion", "School SaaS"],
    spouse: "", children: "", parents: "", siblings: "", familyNotes: "",
    hobbies: ["Travel"], sports: ["Basketball"], favoriteFood: "Ramen", favoriteDrink: "Beer", restaurants: [], schools: "Kyoto University", pets: "",
    relationshipType: "Friend", strength: "close", frequency: "2months",
    firstMet: { date: "2019", place: "University", how: "University friends" },
    introducedBy: "",
    helpGiven: ["Introduced me to Tanaka Hiroshi"], helpReceived: [], promises: ["Annual year-end catch-up"],
    role: "Friend", since: "2019", location: "Tokyo, Japan",
    color: "#3E7BB6",
    interests: ["Education", "Startups", "EDIX", "Travel"],
    dates: [{ label: "Birthday", when: "Jun 8", icon: "cake" }],
    last: { type: "Drinks", when: "Jul 30, 2026", place: "Shibuya",
      summary: "Annual mid-year catch-up. His school SaaS is growing well.", tags: ["Startups"] },
    followUp: { when: "Dec 2026", what: "Annual year-end catch-up", kind: "reconnect" },
    meetings: [
      { date: "Jul 30, 2026", type: "Drinks", title: "Shibuya drinks", summary: "EduTech Lab growing; considering SEA expansion.", tags: ["Startups"] },
      { date: "2019", type: "Event", title: "University days", summary: "Friends since university.", tags: ["First met"] }
    ],
    timelineExtra: [],
    memories: [
      { when: "Jul 2026", text: "School SaaS growing; looking at SEA (Vietnam included)." },
      { when: "2019", text: "Old friend — no small talk needed." }
    ],
    raw: "", connections: ["Tanaka Hiroshi", "Kobayashi Miki"], mutual: ["Tanaka Hiroshi"],
    tags: ["edtech", "sea"],
    lastContactDays: 70, metCount: 12,
    about: "Yamamoto Ryo — EduTech Lab, Founder. Friend since 2019. Met 12 times. Last: Shibuya drinks — Jul 2026. Considering SEA expansion."
  },
  {
    id: "watanabe",
    name: "Watanabe Aiko", nameJa: "渡辺 愛子", nickname: "", initials: "WA",
    gender: "Female", birthday: "Oct 11", nationality: "Japan", languages: ["Japanese"],
    currentCity: "Tokyo", area: "Azabudai", hometown: "Sendai", country: "Japan",
    email: "aiko.watanabe@hillsrealty.jp", phone: "+81 90-XXXX-XXXX",
    company: "Hills Realty", department: "Sales", title: "Real Estate Agent",
    industry: "Real Estate", profession: "Sales",
    expertise: ["Azabudai / Roppongi market"], previousCompanies: [], careerHistory: [],
    skills: ["Local network"], businessTopics: ["Office leasing"],
    spouse: "", children: "", parents: "", siblings: "", familyNotes: "",
    hobbies: ["Coffee"], sports: [], favoriteFood: "", favoriteDrink: "Specialty coffee", restaurants: [], schools: "", pets: "",
    relationshipType: "Client", strength: "important", frequency: "monthly",
    firstMet: { date: "Feb 2025", place: "Networking dinner", how: "Introduced by Sato Yuki" },
    introducedBy: "Sato Yuki",
    helpGiven: ["Office viewings"], helpReceived: ["Local introductions"], promises: [],
    role: "Key contact", since: "Feb 2025", location: "Tokyo (Azabudai), Japan",
    color: "#B45F06",
    interests: ["Real estate", "Networking", "Coffee"],
    dates: [{ label: "Birthday", when: "Oct 11 (in 3 days)", icon: "cake" }],
    last: { type: "Meeting", when: "Aug 5, 2026", place: "Her office, Azabudai",
      summary: "Showed two interesting offices. She knows everyone in Azabudai.", tags: ["Real estate"] },
    followUp: { when: "Oct 11", what: "Birthday — send a message", kind: "birthday" },
    meetings: [
      { date: "Aug 5, 2026", type: "Meeting", title: "Office viewing", summary: "Two interesting offices in Azabudai.", tags: ["Real estate"] },
      { date: "Feb 2025", type: "Event", title: "Networking dinner", summary: "First met. Introduced by Sato Yuki.", tags: ["First met", "Event"] }
    ],
    timelineExtra: [],
    memories: [
      { when: "Aug 2026", text: "Birthday Oct 11. Loves good coffee — gift idea." },
      { when: "Feb 2025", text: "Introduced by Sato Yuki." }
    ],
    raw: "", connections: ["Sato Yuki"], mutual: ["Sato Yuki"],
    tags: ["azabudai", "birthday-oct"],
    lastContactDays: 64, metCount: 3,
    about: "Watanabe Aiko — Hills Realty, Real Estate Agent. Met 3 times since 2025. Deep network in Azabudai / Roppongi. Birthday: Oct 11 — in 3 days."
  },
  {
    id: "kobayashi",
    name: "Kobayashi Miki", nameJa: "小林 美紀", nickname: "", initials: "KM",
    gender: "Female", birthday: "", nationality: "Japan", languages: ["Japanese", "English"],
    currentCity: "Tokyo", area: "", hometown: "", country: "Japan",
    email: "miki.kobayashi@strategyco.jp", phone: "+81 90-XXXX-XXXX",
    company: "Strategy & Co.", department: "Independent", title: "Consultant",
    industry: "Technology", profession: "Consultant",
    expertise: ["Retail & AI strategy"], previousCompanies: [], careerHistory: ["Ex-consultant, now independent"],
    skills: ["Strategy", "Retail"], businessTopics: ["Vietnam retail study"],
    spouse: "", children: "", parents: "", siblings: "", familyNotes: "",
    hobbies: [], sports: [], favoriteFood: "", favoriteDrink: "", restaurants: [], schools: "", pets: "",
    relationshipType: "Acquaintance", strength: "normal", frequency: "quarterly",
    firstMet: { date: "Mar 12, 2025", place: "EDIX", how: "Met at EDIX" },
    introducedBy: "",
    helpGiven: [], helpReceived: [], promises: ["Share Vietnam retail notes — Nov 1 call"],
    role: "Acquaintance", since: "Mar 2025", location: "Tokyo, Japan",
    color: "#5B8C5A",
    interests: ["Strategy", "Retail", "AI"],
    dates: [],
    last: { type: "Video call", when: "Oct 1, 2026", place: "Zoom · 25 min",
      summary: "Working on a retail study; wants a view of Vietnam retail.", tags: ["Retail", "Vietnam"] },
    followUp: { when: "Nov 1, 2026 · 10:00", what: "Video call — share Vietnam retail notes", kind: "meeting" },
    meetings: [
      { date: "Oct 1, 2026", type: "Video call", title: "Retail study call", summary: "Wants a view of Vietnam retail for a client study.", tags: ["Retail", "Vietnam"] },
      { date: "Mar 12, 2025", type: "Event", title: "EDIX 2025", summary: "First met at EDIX.", tags: ["First met", "EDIX"] }
    ],
    timelineExtra: [],
    memories: [{ when: "Oct 2026", text: "Independent consultant; retail & AI strategy." }],
    raw: "", connections: ["Sato Yuki", "Yamamoto Ryo"], mutual: ["Sato Yuki"],
    tags: ["strategy", "vietnam-study"],
    lastContactDays: 7, metCount: 2,
    about: "Kobayashi Miki — Strategy & Co., Consultant. Met 2 times since 2025 (EDIX). Retail & AI strategy. Next: Nov 1 video call — share Vietnam retail notes."
  },
  {
    id: "nakamura",
    name: "Nakamura Tetsuya", nameJa: "中村 哲也", nickname: "", initials: "NT",
    gender: "Male", birthday: "", nationality: "Japan", languages: ["Japanese"],
    currentCity: "Osaka", area: "", hometown: "Osaka", country: "Japan",
    email: "t.nakamura@kansai-robotics.jp", phone: "+81 6-XXXX-XXXX",
    company: "Kansai Robotics", department: "Sales & BD", title: "Business Development Manager",
    industry: "Robotics", profession: "BD",
    expertise: ["Warehouse automation"], previousCompanies: [], careerHistory: [],
    skills: [], businessTopics: ["AGV projects"],
    spouse: "", children: "", parents: "", siblings: "", familyNotes: "",
    hobbies: [], sports: [], favoriteFood: "", favoriteDrink: "", restaurants: [], schools: "", pets: "",
    relationshipType: "New — just captured", strength: "weak", frequency: "",
    firstMet: { date: "Today", place: "Networking event", how: "Met at an event today" },
    introducedBy: "",
    helpGiven: [], helpReceived: [], promises: [],
    role: "New · just captured", since: "Today", location: "Osaka, Japan",
    color: "#8E5A9E",
    interests: ["Robotics", "Warehouse automation"],
    dates: [],
    last: { type: "Business card", when: "Today", place: "Networking event", summary: "Captured from business card.", tags: [] },
    followUp: { when: "—", what: "Say hi in a few days with a note from today", kind: "reconnect" },
    meetings: [], timelineExtra: [], memories: [], raw: "",
    connections: [], mutual: [], tags: ["card-scan", "new"],
    lastContactDays: 0, metCount: 0,
    about: "Nakamura Tetsuya — Kansai Robotics, Business Development Manager. Captured today from a business card. Interested in warehouse automation."
  },
  {
    id: "mori",
    name: "Mori Takashi", nameJa: "森 隆", nickname: "", initials: "MT",
    gender: "Male", birthday: "", nationality: "Japan", languages: ["Japanese", "English"],
    currentCity: "Singapore", area: "", hometown: "Tokyo", country: "Singapore",
    email: "takashi.mori@xyzcapital.sg", phone: "+65 9XXX XXXX",
    company: "XYZ Capital", department: "Investment", title: "Partner / Investor",
    industry: "Finance", profession: "Investor",
    expertise: ["Vietnam startups", "AI deals"], previousCompanies: [], careerHistory: ["Series A/B investor"],
    skills: ["Deal sourcing", "Startup advisory"], businessTopics: ["Vietnam startup dealflow", "AI"],
    spouse: "Married", children: "", parents: "", siblings: "", familyNotes: "",
    hobbies: ["Travel"], sports: [], favoriteFood: "", favoriteDrink: "", restaurants: [], schools: "Hitotsubashi University", pets: "",
    relationshipType: "Investor", strength: "normal", frequency: "2months",
    firstMet: { date: "Jul 2025", place: "IVS, Kyoto", how: "Met at IVS" },
    introducedBy: "",
    helpGiven: ["Intro to Vietnam founders"], helpReceived: [], promises: ["Intro to Vietnam startup dealflow — still open"],
    role: "Investor", since: "Jul 2025", location: "Singapore",
    color: "#3E7BB6",
    interests: ["Vietnam", "AI", "Startups", "Investment"],
    dates: [],
    last: { type: "Call", when: "Aug 14, 2026", place: "Zoom · 20 min",
      summary: "Asked about Vietnam startup dealflow. Interested in AI + retail crossover.", tags: ["Vietnam", "AI"] },
    followUp: { when: "Open", what: "Promised: intro to Vietnam startup dealflow", kind: "action" },
    meetings: [
      { date: "Aug 14, 2026", type: "Call", title: "Dealflow call", summary: "Vietnam startup dealflow; interested in AI + retail.", tags: ["Vietnam", "AI"] },
      { date: "Jul 2025", type: "Event", title: "IVS 2025", summary: "First met at IVS. Likes Vietnam startups.", tags: ["First met", "Event", "IVS"] }
    ],
    timelineExtra: [],
    memories: [
      { when: "Jul 2025", text: "Based in Singapore; invests in Vietnam & SEA." },
      { when: "Aug 2026", text: "Wants AI + retail crossover deals." }
    ],
    raw: "", connections: ["Nguyen Minh"], mutual: [],
    tags: ["investor", "ivs", "singapore"],
    lastContactDays: 55, metCount: 2,
    about: "Mori Takashi — XYZ Capital, Partner / Investor. Met 2 times since 2025 (IVS). Based in Singapore. Interested in Vietnam startups and AI. Open promise: intro to Vietnam startup dealflow."
  }
];

/** Dữ liệu thật của người dùng — do js/store.js quản lý (bắt đầu rỗng). */
let PEOPLE = [];

const byId = (id) => PEOPLE.find((p) => p.id === id);
const personByName = (first) => PEOPLE.find((p) => p.name.split(" ")[0].toLowerCase() === first.toLowerCase());

/* ============================================================
   HOME / CARE — tính động từ PEOPLE (data thật của người dùng)
   ============================================================ */
const MONTHS_MAP = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
function validMonthDay(month, day) {
  if (!(month >= 1 && month <= 12 && day >= 1 && day <= 31)) return null;
  const check = new Date(2000, month - 1, day);
  return check.getMonth() === month - 1 && check.getDate() === day ? { month, day } : null;
}
function parseMonthDay(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;

  // ISO full date: year is optional knowledge for birthday reminders.
  let m = /(?:^|\D)(\d{4})-(\d{1,2})-(\d{1,2})(?:\D|$)/.exec(raw);
  if (m) return validMonthDay(parseInt(m[2], 10), parseInt(m[3], 10));

  // Japanese: 11月22日.
  m = /(\d{1,2})\s*月\s*(\d{1,2})\s*日/.exec(raw);
  if (m) return validMonthDay(parseInt(m[1], 10), parseInt(m[2], 10));

  // Vietnamese natural forms: 22 tháng 11 / tháng 11 ngày 22.
  m = /(?:ngày\s*)?(\d{1,2})\s*(?:tháng|thg)\s*(\d{1,2})/i.exec(raw);
  if (m) return validMonthDay(parseInt(m[2], 10), parseInt(m[1], 10));
  m = /(?:tháng|thg)\s*(\d{1,2})\D+(?:ngày\s*)?(\d{1,2})/i.exec(raw);
  if (m) return validMonthDay(parseInt(m[1], 10), parseInt(m[2], 10));

  // Numeric input follows the app's Vietnamese-first day/month convention.
  m = /(?:^|\D)(\d{1,2})\s*[\/.]\s*(\d{1,2})(?:\s*[\/.]\s*\d{2,4})?(?:\D|$)/.exec(raw);
  if (m) return validMonthDay(parseInt(m[2], 10), parseInt(m[1], 10));

  // Existing sample/import format: Nov 22.
  m = /([A-Za-z]{3})\s*(\d{1,2})/.exec(raw);
  if (!m) return null;
  const month = MONTHS_MAP[(m[1][0] || "").toUpperCase() + (m[1] || "").slice(1).toLowerCase()];
  return month ? validMonthDay(month, parseInt(m[2], 10)) : null;
}
function daysUntilBirthday(value, today) {
  const parsed = parseMonthDay(value);
  if (!parsed) return Number.POSITIVE_INFINITY;
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let next = new Date(today.getFullYear(), parsed.month - 1, parsed.day);
  if (next < now) next = new Date(today.getFullYear() + 1, parsed.month - 1, parsed.day);
  return Math.round((next.getTime() - now.getTime()) / 86400000);
}

const FREQUENCY_DAYS = { monthly: 30, "2months": 60, quarterly: 90, biannual: 180, yearly: 365 };
function silenceThreshold(freqId) {
  return FREQUENCY_DAYS[freqId] || 60;
}

function collectTagSuggestions(people, selected, query, limit) {
  const chosen = new Set((selected || []).map((tag) => String(tag).trim().toLocaleLowerCase()).filter(Boolean));
  const counts = new Map();
  const add = (tag) => {
    const value = String(tag || "").trim();
    if (!value) return;
    const key = value.toLocaleLowerCase();
    if (chosen.has(key)) return;
    const item = counts.get(key) || { value, count: 0 };
    item.count += 1;
    counts.set(key, item);
  };
  (people || []).forEach((p) => {
    (p.tags || []).forEach(add);
    (p.meetings || []).forEach((m) => (m.tags || []).forEach(add));
    if (p.last && Array.isArray(p.last.tags)) p.last.tags.forEach(add);
  });
  let items = [...counts.values()];
  const q = String(query || "").trim().toLocaleLowerCase();
  if (q) {
    items = items
      .map((item) => {
        const key = item.value.toLocaleLowerCase();
        const rank = key.startsWith(q) ? 0 : key.includes(q) ? 1 : 2;
        return Object.assign({ rank }, item);
      })
      .filter((item) => item.rank < 2)
      .sort((a, b) => a.rank - b.rank || b.count - a.count || a.value.localeCompare(b.value));
  } else {
    items.sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
  }
  return items.slice(0, limit || 8).map((item) => item.value);
}

function eventDaysUntil(value, today) {
  const parsed = parseMonthDay(value);
  if (!parsed) return Number.POSITIVE_INFINITY;
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let next = new Date(today.getFullYear(), parsed.month - 1, parsed.day);
  if (next < now) next = new Date(today.getFullYear() + 1, parsed.month - 1, parsed.day);
  return Math.round((next.getTime() - now.getTime()) / 86400000);
}

function hasRealFollowUp(followUp) {
  if (!followUp) return false;
  const when = String(followUp.when || "").trim();
  const what = String(followUp.what || "").trim();
  return Boolean(what) || Boolean(when && when !== "—");
}

/** Care queue tính động từ data: birthday / date / silence / promise / follow_up. */
function computeCareItems(people, todayInput) {
  const items = [];
  const today = todayInput || new Date();
  const nowTs = today.getTime();
  (people || []).forEach((p) => {
    if (p.active === false) return;
    if (p.snoozedUntil && p.snoozedUntil > nowTs) return; // snooze/dismiss
    if (p.birthday) {
      const days = daysUntilBirthday(p.birthday, today);
      if (days <= 30) {
        items.push({
          personId: p.id, reason: "birthday", group: "Coming up",
          urgency: days <= 3 ? "high" : "medium", days, sortDays: days,
          actions: ["profile"],
        });
      }
    }
    (p.dates || []).forEach((d) => {
      if (!d || /birthday/i.test(String(d.label || ""))) return;
      const days = eventDaysUntil(d.when, today);
      if (days <= 30) {
        items.push({
          personId: p.id, reason: "date", group: "Coming up",
          urgency: days <= 3 ? "high" : "medium", days, sortDays: days, date: d,
          actions: ["profile"],
        });
      }
    });
    if (typeof p.lastContactDays === "number") {
      const th = silenceThreshold(p.frequency);
      if (p.lastContactDays > th) {
        items.push({
          personId: p.id, reason: "silence", group: "Needs attention",
          urgency: p.lastContactDays > th * 2 ? "high" : "medium", days: p.lastContactDays, sortDays: -p.lastContactDays,
          actions: ["profile"],
        });
      }
    }
    if (hasRealFollowUp(p.followUp)) {
      const open = p.followUp.kind === "action" || p.followUp.when === "Open" || String(p.followUp.when).startsWith("Overdue");
      const dueDays = open ? 0 : eventDaysUntil(p.followUp.when, today);
      if (!open && Number.isFinite(dueDays) && dueDays > 30) return;
      items.push({
        personId: p.id, reason: open ? "promise" : "follow_up", group: open ? "Needs attention" : "Coming up",
        urgency: open ? "high" : "low", days: Number.isFinite(dueDays) ? dueDays : undefined,
        sortDays: Number.isFinite(dueDays) ? dueDays : 999, followUp: p.followUp,
        actions: open ? ["profile"] : ["refresh"],
      });
    }
  });
  const urgencyOrder = { high: 0, medium: 1, low: 2 };
  const groupOrder = { "Needs attention": 0, "Coming up": 1 };
  items.sort((a, b) => {
    const ap = byId(a.personId), bp = byId(b.personId);
    return groupOrder[a.group] - groupOrder[b.group] ||
      urgencyOrder[a.urgency] - urgencyOrder[b.urgency] ||
      (a.sortDays || 0) - (b.sortDays || 0) ||
      String((ap && ap.name) || "").localeCompare(String((bp && bp.name) || ""));
  });
  return items;
}

/* ---------- home lists (tính động) ---------- */
function homeCareSnapshot() {
  return computeCareItems(activePeople()).slice(0, 3);
}
function homeUpcoming() {
  return activePeople()
    .filter((p) => p.followUp && p.followUp.when && !["Open", "—"].includes(p.followUp.when) && !String(p.followUp.when).startsWith("Overdue") && p.followUp.kind !== "action")
    .map((p) => ({ personId: p.id, when: p.followUp.when, where: p.followUp.what, label: "follow_up", prep: false }))
    .slice(0, 3);
}
function homeDates() {
  const out = [];
  const today = new Date();
  activePeople().forEach((p) => {
    if (p.birthday) {
      const days = daysUntilBirthday(p.birthday, today);
      if (days <= 30) out.push({ personId: p.id, kind: "birthday", label: "birthday", when: p.birthday + (days <= 7 ? " · in " + days + " days" : "") });
    }
    (p.dates || []).forEach((d) => {
      if (!d || /birthday/i.test(String(d.label || ""))) return;
      const days = eventDaysUntil(d.when, today);
      if (days <= 30) out.push({ personId: p.id, kind: "date", label: d.label, when: d.when + (days <= 7 ? " · in " + days + " days" : "") });
    });
  });
  return out.slice(0, 6);
}
function homeRecent() {
  return activePeople()
    .filter((p) => typeof p.lastContactDays === "number")
    .sort((a, b) => a.lastContactDays - b.lastContactDays)
    .slice(0, 5)
    .map((p) => p.id);
}
function homeMemories() {
  return activePeople()
    .filter((p) => (p.memories || []).length)
    .sort((a, b) => (a.lastContactDays || 999) - (b.lastContactDays || 999))
    .slice(0, 3)
    .map((p) => {
      const m = p.memories[p.memories.length - 1];
      return { personId: p.id, when: m.when, text: m.text };
    });
}

/* ============================================================
   SEARCH (§15)
   ============================================================ */
const QUICK_QUESTIONS = [
  "AI",
  "Ho Chi Minh",
  "Investor",
  "ABC Logistics",
  "Children",
  "Golf",
  "Vietnam"
];

/* ============================================================
   RELATIONSHIP CARE (§13) — care queue giờ tính động (computeCareItems ở trên)
   ============================================================ */

/* ============================================================
   NETWORK MAP (§16–18)
   ============================================================ */
const PERSON_POS = {
  you: [460, 300],
  tanaka: [330, 170], suzuki: [590, 150], sato: [560, 430], ito: [220, 330],
  nguyen: [330, 440], yamamoto: [700, 300], watanabe: [600, 540], kobayashi: [690, 90],
  nakamura: [220, 480], mori: [120, 190]
};

// person ↔ person relationships (People lens, §16.1) — sinh động từ field connections/mutual (personLinks bên dưới)

/** Vị trí node cho người BẤT KỲ (người mới thêm → vị trí tất định theo id). */
function personPos(p) {
  if (PERSON_POS[p.id]) return PERSON_POS[p.id];
  let h = 0;
  for (const ch of String(p.id)) h = (h * 31 + ch.charCodeAt(0)) % 100000;
  return [150 + (h % 620), 120 + ((h * 7) % 440)];
}

/** Links giữa người ↔ người sinh từ field connections/mutual (data thật). */
function personLinks() {
  const links = [];
  const seen = new Set();
  activePeople().forEach((p) => {
    (p.connections || []).forEach((name) => {
      const other = personByName(String(name).split(" ")[0]);
      if (!other || other.active === false || other.id === p.id) return;
      const key = [p.id, other.id].sort().join("|");
      if (seen.has(key)) return;
      seen.add(key);
      links.push({ a: p.id, b: other.id, why: "Connection" });
    });
    (p.mutual || []).forEach((name) => {
      const other = personByName(String(name).split(" ")[0]);
      if (!other || other.active === false || other.id === p.id) return;
      const key = [p.id, other.id].sort().join("|");
      if (seen.has(key)) return;
      seen.add(key);
      links.push({ a: p.id, b: other.id, why: "Mutual" });
    });
  });
  return links;
}

const LENSES = {
  people: { label: "People", desc: "People and how they relate" },
  location: { label: "Location", desc: "Where people live" }
};

/* ============================================================
   QUICK REFRESH (§21) — generated from memory via buildRefresh()
   ============================================================ */

/* ---------- quick/manual entry form definition (§7.5, §9) ---------- */
const MANUAL_SECTIONS = [
  { key: "basic", title: "Basic information", fields: [
    { k: "name", label: "Full name", control: "text", tier: "quick", req: true, autocomplete: "name" },
    { k: "relationshipType", label: "Relationship type", control: "select", tier: "quick", options: ["", "Key contact", "Client", "Partner", "Investor", "Mentor", "Friend", "Collaborator", "Acquaintance"] },
    { k: "company", label: "Company", control: "text", tier: "quick", autocomplete: "organization" },
    { k: "currentCity", label: "Current city", control: "location", tier: "quick", phKey: "location_ph", autocomplete: "address-level2" },
    { k: "birthday", label: "Birthday", control: "text", tier: "quick", phKey: "birthday_flexible_ph", autocomplete: "bday" },
    { k: "tags", label: "Tags", control: "chips", tier: "quick" }
  ]},
  { key: "work", title: "Work notes", fields: [
    { k: "workNotes", label: "Work notes", control: "textarea", phKey: "work_notes_ph" }
  ]},
  { key: "family", title: "Family notes", fields: [
    { k: "familyNotes", label: "Family notes", control: "textarea", phKey: "family_notes_ph" }
  ]},
  { key: "interests", title: "Interests notes", fields: [
    { k: "interestsNotes", label: "Interests notes", control: "textarea", phKey: "interests_notes_ph" }
  ]},
  { key: "relationship", title: "Relationship notes", fields: [
    { k: "relationshipNotes", label: "Relationship notes", control: "textarea", phKey: "relationship_notes_ph" }
  ]},
  { key: "notes", title: "Other notes", fields: [
    { k: "notes", label: "Other notes", control: "textarea", phKey: "quick_note_ph" }
  ]}
];

const MANUAL_FIELDS = MANUAL_SECTIONS.flatMap((sec) =>
  sec.fields.map((field) => Object.assign({ sec: sec.key, tier: "advanced", control: "text" }, field)),
);
const MANUAL_FIELD_MAP = Object.fromEntries(MANUAL_FIELDS.map((field) => [field.sec + "." + field.k, field]));
const MANUAL_QUICK_FIELDS = [
  "basic.name",
  "basic.relationshipType",
  "basic.company",
  "basic.currentCity",
  "basic.birthday",
  "basic.tags",
];
const MANUAL_ARRAY_FIELDS = new Set([
  "languages", "expertise", "skills", "hobbies", "sports", "businessTopics", "previousCompanies",
  "careerHistory", "travelInterests", "interests", "helpGiven", "helpReceived", "promises", "tags",
]);

function manualHasValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  const clean = String(value == null ? "" : value).trim();
  return !!clean && clean !== "—";
}

function manualArrayValue(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  return String(value || "").split(/[,，]/).map((item) => item.trim()).filter(Boolean);
}

function createManualDraft(person, prefill, review) {
  const source = prefill || {};
  const draft = {};
  MANUAL_FIELDS.forEach((field) => {
    const key = field.sec + "." + field.k;
    let value = "";
    if (field.k === "notes" && review) {
      value = ""; // raw voice/text/card memory is stored separately
    } else if (Object.prototype.hasOwnProperty.call(source, field.k) && manualHasValue(source[field.k])) {
      value = source[field.k];
    } else if (person) {
      if (field.k === "kana") value = person.nameJa || "";
      else if (field.k === "firstMetDate") value = person.firstMet && person.firstMet.date !== "—" ? person.firstMet.date || "" : "";
      else if (field.k === "firstMetPlace") value = person.firstMet ? person.firstMet.place || "" : "";
      else value = person[field.k] == null ? "" : person[field.k];
    }
    if ((field.k === "company" || field.k === "title") && value === "—") value = "";
    draft[key] = field.control === "chips" || MANUAL_ARRAY_FIELDS.has(field.k)
      ? manualArrayValue(value)
      : String(value == null ? "" : value);
  });
  return draft;
}

function manualDraftToFields(draft) {
  const fields = {};
  MANUAL_FIELDS.forEach((field) => {
    const value = draft[field.sec + "." + field.k];
    if (field.k === "firstMetDate" || field.k === "firstMetPlace") return;
    const target = field.k === "kana" ? "nameJa" : field.k;
    fields[target] = field.control === "chips" || MANUAL_ARRAY_FIELDS.has(field.k)
      ? manualArrayValue(value)
      : String(value == null ? "" : value).trim();
  });
  return fields;
}

function locationSuggestions(people) {
  const seen = new Set();
  const out = [];
  const add = (value) => {
    const clean = String(value || "").trim();
    const key = clean.toLocaleLowerCase();
    if (!clean || clean === "—" || seen.has(key)) return;
    seen.add(key);
    out.push(clean);
  };
  (people || []).forEach((p) => add(p.currentCity));
  Object.keys(CITY_GEO).forEach(add);
  return out.slice(0, 30);
}

function normalizePersonName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function findPotentialDuplicate(name, people, excludeId) {
  const target = normalizePersonName(name);
  if (target.length < 2) return null;
  const targetParts = target.split(" ");
  return (people || []).find((p) => {
    if (!p || p.id === excludeId) return false;
    const candidate = normalizePersonName(p.name);
    if (!candidate) return false;
    if (candidate === target) return true;
    const parts = candidate.split(" ");
    if (targetParts.length > 1 && parts.length > 1) {
      return targetParts[0] === parts[0] && targetParts[targetParts.length - 1] === parts[parts.length - 1];
    }
    return target.length >= 5 && candidate.length >= 5 && (candidate.includes(target) || target.includes(candidate));
  }) || null;
}

/* ============================================================
   Normalization — giờ do js/store.js (normalize) lo; mục này bỏ.
   ============================================================ */
const activePeople = () => PEOPLE.filter((p) => p.active !== false);

/* ============================================================
   Geography — city -> [lat, lng] cho location lens
   ============================================================ */
const CITY_GEO = {
  "Tokyo": [35.6762, 139.6503],
  "Yokohama": [35.4437, 139.638],
  "Osaka": [34.6937, 135.5023],
  "Kyoto": [35.0116, 135.7681],
  "Nagoya": [35.1815, 136.9066],
  "Fukuoka": [33.5902, 130.4017],
  "Hanoi": [21.0278, 105.8342],
  "Da Nang": [16.0544, 108.2022],
  "Ho Chi Minh City": [10.8231, 106.6297],
  "Singapore": [1.3521, 103.8198]
};

/* deterministic per-person jitter so people in the same city spread out */
function personGeo(p) {
  let h = 0;
  for (const ch of String(p.id)) h = (h * 31 + ch.charCodeAt(0)) % 997;
  const base = CITY_GEO[p.currentCity];
  if (!base) return null;
  const j = (h % 200) / 10000 - 0.01; // ±0.01° (~±1.1 km)
  return [base[0] + j, base[1] + j];
}

/* ============================================================
   CAPTURE PARSE — trích tự động trường từ text/voice (heuristic, không LLM).
   3 pass ngôn ngữ (vi → en → ja), merge first-wins; notes luôn = raw text.
   Người dùng sẽ KIỂM TRA + SỬA trong màn confirm trước khi lưu.
   ============================================================ */
const _grab = (re, s) => {
  const m = re.exec(s);
  return m && m[1] ? m[1].trim().replace(/[.,;!?]+$/, "") : null;
};

/** Pass tiếng Anh (logic cũ, giữ nguyên). */
function parseEn(text) {
  const out = { name: "", company: "", title: "", currentCity: "", hobbies: [], interests: [], followUpWhat: "" };
  const s = " " + String(text || "") + " ";
  const grab = (re) => _grab(re, s);

  // Tên: "met X" / "X from" / "with X"
  let name = grab(/ (?:met|saw|talked with|spoke with|had coffee with|met up with) ([A-Z][a-zA-Z-]+(?: [A-Z][a-zA-Z-]+){0,2}) /);
  if (!name) name = grab(/ ([A-Z][a-zA-Z-]+ [A-Z][a-zA-Z-]+) (?:from|works|is|at|the) /);
  if (!name) name = grab(/ (?:with|to|about) ([A-Z][a-zA-Z-]+(?: [A-Z][a-zA-Z-]+){0,2}) /);
  if (name) out.name = name;

  // Công ty: "from/at X" (lookahead terminator — tránh nuốt cả câu)
  let company = grab(/ (?:from|at) ([A-Z][A-Za-z0-9&.' -]{2,45}?)(?=,|\.| today| for | as | who | he | she | and | to |$)/);
  if (!company) {
    company = grab(/ ([A-Z][A-Za-z0-9&.'-]{0,40}?(?:Logistics|Robotics|Systems|Technologies|Retail|Capital|Group|Co\.|Inc\.|Ltd\.|Corp\.|Bank)[A-Za-z0-9&.'-]{0,12}?)(?= |,|\.|$)/);
  }
  if (company) out.company = company;

  // Chức danh: "is the X" / "as X" (lookahead terminator)
  let title = grab(/ is (?:the )?([A-Za-z][A-Za-z0-9 &-]{2,45}?)(?= at | of | for |,|\.| and | to |$)/);
  if (!title) title = grab(/ as (?:the )?([A-Za-z][A-Za-z0-9 &-]{2,45}?)(?= at | of | for |,|\.| and | to |$)/);
  if (title) out.title = title.replace(/^(?:the|a|an) /, "");

  // Thành phố
  const city =
    grab(/ lives in ([A-Z][a-zA-Z-]+)/) ||
    grab(/ based in ([A-Z][a-zA-Z-]+)/) ||
    grab(/ in (Yokohama|Tokyo|Osaka|Singapore|Hanoi|Ho Chi Minh City|Kyoto|Nagoya|Sendai|Fukuoka|Da Nang)/);
  if (city) out.currentCity = city;

  // Sở thích: "likes/interested in/plays/loves/enjoys X"
  const reInt = / (?:likes|interested in|plays|loves|enjoys) ([A-Za-z][A-Za-z0-9 &-]{2,35}?)(?= and |,|\.| but | to |$)/g;
  let mm;
  while ((mm = reInt.exec(s))) {
    const v = mm[1].trim().replace(/[.,;!?]+$/, "");
    if (v && !out.interests.includes(v)) out.interests.push(v);
  }

  // Follow-up: "agreed to / promised / will / meet again / follow up"
  const fu =
    grab(/ agreed to ([^.]{3,90})[.]?/) ||
    grab(/ promised (?:to )?([^.]{3,90})[.]?/) ||
    grab(/ will ([^.]{3,90})[.]?/) ||
    grab(/ meet again ([^.]{3,70})[.]?/) ||
    grab(/ follow up (?:on|with) ([^.]{3,90})[.]?/);
  if (fu) out.followUpWhat = fu;

  return out;
}

/** Pass tiếng Việt (locale mặc định) — pattern dấu qua Unicode property escapes. */
function parseVi(text) {
  const out = { name: "", company: "", title: "", currentCity: "", hobbies: [], interests: [], followUpWhat: "" };
  const s = " " + String(text || "") + " ";
  const grab = (re) => _grab(re, s);
  const END = "(?= |,|\\.|;|$)";
  const CAP = "\\p{Lu}";
  const LOW = "\\p{Ll}";
  const WORD = "(" + CAP + LOW + "*(?: " + CAP + LOW + "*){0,3})";

  // Tên: "gặp anh X" / "tên (là) X" / "anh X làm…"
  let name = grab(new RegExp(" (?:gặp|quen|biết|mới quen|gặp được) (?:anh|chị|em|ông|bà|cô|chú|bác|bạn|thầy) " + WORD + END, "u"));
  if (!name) name = grab(new RegExp(" (?:tên|tên đầy đủ) (?:là )?" + WORD + END, "u"));
  if (!name) name = grab(new RegExp(" (?:anh|chị|em|ông|bà|cô|chú|bác|bạn|thầy) " + WORD + " (?:là|học|làm|ở|sống|chơi|mới|hiện)" + END, "u"));
  if (name) out.name = name;

  // Công ty: "làm (tại|ở|cho) X" / "(ở|tại) công ty X" / hậu tố tên công ty
  let company = grab(new RegExp(" (?:làm|làm việc) (?:tại|ở|cho) (" + CAP + "[\\p{L}\\p{N}&.' -]{2,45}?)" + END, "u"));
  if (!company) company = grab(new RegExp(" (?:ở|tại) (?:công ty|cty|tập đoàn|trung tâm|ngân hàng) (" + CAP + "[\\p{L}\\p{N}&.' -]{2,45}?)" + END, "u"));
  if (!company) company = grab(new RegExp(" (" + CAP + "[\\p{L}\\p{N}&.'-]{0,40}?(?:Logistics|Robotics|Systems|Technologies|Group|JSC|Corp|Inc|Ltd|TNHH|Pharmaceuticals|Bank|Retail|Media|Capital|Construction)[\\p{L}\\p{N}&.'-]{0,12}?)" + END, "u"));
  if (company) out.company = company;

  // Chức danh: danh sách chức vụ (+modifier) trước, rồi fallback "là X"
  let title = grab(new RegExp(" (?:là|làm|đảm nhận vị trí|giữ chức) (?:một )?(giám đốc|trưởng phòng|phó giám đốc|chuyên viên|nhân viên|kỹ sư|quản lý|trợ lý|điều phối viên|thư ký|kế toán trưởng|kế toán|kiến trúc sư|bác sĩ|luật sư|giáo viên|nhà thiết kế|lập trình viên|developer|director|manager|engineer)( (?:kinh doanh|marketing|bán hàng|nhân sự|tài chính|kỹ thuật|vận hành|dự án|sản phẩm|thiết kế|it|sales|truyền thông|đối ngoại|kỹ thuật số))?" + END, "iu"));
  if (!title) title = grab(new RegExp(" (?:là) (?:một )?(" + LOW + "[\\p{L}\\p{N} &-]{2,45}?)(?= (?:của|tại|ở|cho)|,|\\.| và |$)", "iu"));
  if (title) out.title = title.replace(/^(?:một |các )/, "");

  // Thành phố: danh sách TP VN trước, rồi fallback "sống (ở|tại) X"
  const VN_CITIES = "Hà Nội|Hồ Chí Minh|TP\\.? ?HCM|Sài Gòn|Đà Nẵng|Hải Phòng|Cần Thơ|Huế|Nha Trang|Đà Lạt|Vũng Tàu|Biên Hòa|Bình Dương|Đồng Nai|Long An|Bắc Ninh|Hải Dương|Thái Nguyên|Hạ Long|Quảng Ninh|Phú Quốc|Vinh|Thanh Hóa|Buôn Ma Thuột|Cà Mau|Rạch Giá";
  let city = grab(new RegExp(" (?:sống|đang sống|định cư)? ?(?:ở|tại) (" + VN_CITIES + ")" + END, "iu"));
  if (!city) city = grab(new RegExp(" (?:sống|đang sống|định cư) (?:ở|tại) (" + CAP + LOW + "*(?: " + CAP + LOW + "*){0,2})" + END, "u"));
  if (city) out.currentCity = city;

  // Sở thích: "thích/đam mê/mê/chơi X"
  const reInt = new RegExp(" (?:thích|đam mê|mê|chơi) (" + LOW + "[\\p{L}\\p{N} &-]{2,35}?)(?= và |,|\\.| nhưng | với |$)", "giu");
  let mm;
  while ((mm = reInt.exec(s))) {
    let v = mm[1].trim().replace(/[.,;!?]+$/, "");
    v = v.replace(/^(?:anh|chị|em|ông|bà|cô|chú|bác|bạn|thầy) /, "");
    if (v && !out.interests.includes(v)) out.interests.push(v);
  }

  // Follow-up: "hẹn gặp lại…" / "hứa…" / "sẽ <hành động>…"
  let fu =
    grab(/ (?:hẹn gặp lại|sẽ gặp lại|hẹn) ([^.,]{3,70})[.,]?/) ||
    grab(/ (?:hứa|thống nhất|dự định) (?:sẽ )?([^.,]{3,90})[.,]?/) ||
    grab(/ sẽ ((?:gửi|gọi|liên hệ|trao đổi|gặp|họp|bàn|chia sẻ|chuyển|email|book|lên lịch|sắp xếp|cập nhật|share)[^.,]{3,90})[.,]?/);
  if (fu) out.followUpWhat = fu;

  return out;
}

/** Pass tiếng Nhật (tối thiểu). */
function parseJa(text) {
  const out = { name: "", company: "", title: "", currentCity: "", hobbies: [], interests: [], followUpWhat: "" };
  const s = " " + String(text || "") + " ";
  const grab = (re) => _grab(re, s);

  // Tên: "Xさん/くん/ちゃん" (kanji hoặc romaji) — không END vì sau さん là trợ từ
  let name = grab(new RegExp(" ([\\p{Script=Han}]{1,4}|[A-Za-z][A-Za-z-]{1,30}?)(?:さん|くん|ちゃん)", "u"));
  if (name) out.name = name;

  // Công ty: "株式会社X" / "X株式会社" / "Xの会社で働く" / "X社"
  let company =
    grab(new RegExp(" (株式会社[A-Za-z0-9&.'-]{2,30}?)", "u")) ||
    grab(new RegExp("(?:の| |^)([A-Za-z][A-Za-z0-9&.'-]{1,40}?株式会社)", "u")) ||
    grab(new RegExp("(?:の| |^)([\\p{Script=Katakana}]{1,20}?株式会社)", "u")) ||
    grab(new RegExp(" ([A-Za-z][A-Za-z0-9&.'-]{1,40}?)(?:の会社|社)で働", "u"));
  if (company) out.company = company;

  // Chức danh: "X部長/課長/…"
  let title = grab(new RegExp("(?:で|の|は| |^)(部長|課長|社長|マネージャー|エンジニア|担当|ディレクター|マネジャー|リーダー)(?:として|を務め|をしてい)?", "u"));
  if (title) out.title = title;

  // Thành phố: danh sách TP Nhật + trợ từ
  let city = grab(new RegExp("(?:は|が| |^)(東京|大阪|横浜|京都|名古屋|福岡|札幌|神戸|広島|仙台|千葉|さいたま|川崎)(?:に|で|の)", "u"));
  if (city) out.currentCity = city;

  // Sở thích: "Xが好き" / "Xに興味"
  const reInt = new RegExp("(?:、| |^)([\\p{L}]{2,30}?)(?:が好き|に興味)", "gu");
  let mm;
  while ((mm = reInt.exec(s))) {
    const v = mm[1].trim().replace(/[.,;!?]+$/, "");
    if (v && !out.interests.includes(v)) out.interests.push(v);
  }

  return out;
}

function parseCaptureText(text) {
  const out = { name: "", company: "", title: "", currentCity: "", hobbies: [], interests: [], followUpWhat: "", notes: String(text || "") };
  const merge = (p) => {
    ["name", "company", "title", "currentCity", "followUpWhat"].forEach((k) => { if (!out[k] && p[k]) out[k] = p[k]; });
    (p.interests || []).forEach((v) => { if (v && !out.interests.includes(v)) out.interests.push(v); });
  };
  merge(parseVi(text));
  merge(parseEn(text));
  merge(parseJa(text));
  if (out.interests.length) out.hobbies = [out.interests[0]];
  return out;
}
