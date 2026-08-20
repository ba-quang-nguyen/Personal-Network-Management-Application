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
    circles: ["close", "robotics", "vietnam", "golf"], tags: ["logistics-dx", "po-c-2027", "warehouse"],
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
    connections: [], mutual: [], circles: ["ai", "vietnam"], tags: ["ai-agents", "vietnam-intro"],
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
    circles: ["mentors", "startups"], tags: ["headhunter", "founder-community"],
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
    circles: ["partners", "robotics"], tags: ["agv", "logis-tech"],
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
    circles: ["partners", "vietnam"], tags: ["vietnam-retail", "cross-border"],
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
    circles: ["university", "startups"], tags: ["edtech", "sea"],
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
    circles: ["close", "clients", "golf", "realestate"], tags: ["azabudai", "birthday-oct"],
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
    circles: ["clients", "ai"], tags: ["strategy", "vietnam-study"],
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
    connections: [], mutual: [], circles: ["robotics"], tags: ["card-scan", "new"],
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
    circles: ["investors", "vietnam", "startups"], tags: ["investor", "ivs", "singapore"],
    lastContactDays: 55, metCount: 2,
    about: "Mori Takashi — XYZ Capital, Partner / Investor. Met 2 times since 2025 (IVS). Based in Singapore. Interested in Vietnam startups and AI. Open promise: intro to Vietnam startup dealflow."
  }
];

/** Dữ liệu thật của người dùng — do js/store.js quản lý (bắt đầu rỗng). */
let PEOPLE = [];

const byId = (id) => PEOPLE.find((p) => p.id === id);
const personByName = (first) => PEOPLE.find((p) => p.name.split(" ")[0].toLowerCase() === first.toLowerCase());

/* ============================================================
   CIRCLES / TAGS (§14)
   ============================================================ */
const CIRCLES = [
  { id: "close", name: "Close Business", color: "#E0452C", members: ["tanaka", "watanabe", "ito"] },
  { id: "investors", name: "Investors", color: "#0E9F8A", members: ["mori"] },
  { id: "clients", name: "Clients", color: "#3E7BB6", members: ["watanabe", "kobayashi"] },
  { id: "partners", name: "Partners", color: "#7A5AF8", members: ["ito", "nguyen"] },
  { id: "mentors", name: "Mentors", color: "#B45F06", members: ["sato"] },
  { id: "university", name: "University Friends", color: "#5B8C5A", members: ["yamamoto"] },
  { id: "vietnam", name: "Vietnam", color: "#C43A8B", members: ["tanaka", "nguyen", "mori", "suzuki"] },
  { id: "robotics", name: "Robotics", color: "#8E5A9E", members: ["tanaka", "ito", "nakamura"] },
  { id: "golf", name: "Golf", color: "#E08B00", members: ["tanaka", "watanabe"] },
  { id: "startups", name: "Startup Founders", color: "#3E7BB6", members: ["yamamoto", "sato", "mori"] },
  { id: "ai", name: "AI & Tech", color: "#7A5AF8", members: ["suzuki", "kobayashi"] },
  { id: "realestate", name: "Real Estate", color: "#B45F06", members: ["watanabe"] }
];
const circleOf = (id) => CIRCLES.find((c) => c.id === id);

/* ============================================================
   HOME / CARE — tính động từ PEOPLE (data thật của người dùng)
   ============================================================ */
const MONTHS_MAP = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
function parseMonthDay(value) {
  const m = /([A-Za-z]{3})\s*(\d{1,2})/.exec(String(value || ""));
  if (!m) return null;
  const month = MONTHS_MAP[(m[1][0] || "").toUpperCase() + (m[1] || "").slice(1).toLowerCase()];
  if (!month) return null;
  const day = parseInt(m[2], 10);
  if (!(day >= 1 && day <= 31)) return null;
  return { month, day };
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

/** Care queue tính động từ data: birthday / silence / promise / follow_up. */
function computeCareItems(people) {
  const items = [];
  const today = new Date();
  (people || []).forEach((p) => {
    if (p.active === false) return;
    if (p.snoozedUntil && p.snoozedUntil > Date.now()) return; // snooze/dismiss
    if (p.birthday) {
      const days = daysUntilBirthday(p.birthday, today);
      if (days <= 14) {
        items.push({
          personId: p.id, reason: "birthday", group: "Coming up",
          urgency: days <= 3 ? "high" : "medium", days,
          actions: days <= 7 ? ["message", "dismiss"] : ["dismiss"],
        });
      }
    }
    if (typeof p.lastContactDays === "number") {
      const th = silenceThreshold(p.frequency);
      if (p.lastContactDays > th) {
        items.push({
          personId: p.id, reason: "silence", group: "Needs attention",
          urgency: p.lastContactDays > th * 2 ? "high" : "medium", days: p.lastContactDays,
          actions: ["reconnect", "snooze"],
        });
      }
    }
    if (p.followUp) {
      const open = p.followUp.kind === "action" || p.followUp.when === "Open" || String(p.followUp.when).startsWith("Overdue");
      items.push({
        personId: p.id, reason: open ? "promise" : "follow_up", group: open ? "Needs attention" : "Coming up",
        urgency: open ? "high" : "low", followUp: p.followUp,
        actions: open ? ["do", "snooze"] : ["refresh", "dismiss"],
      });
    }
  });
  const urgencyOrder = { high: 0, medium: 1, low: 2 };
  const groupOrder = { "Needs attention": 0, "Coming up": 1 };
  items.sort((a, b) => groupOrder[a.group] - groupOrder[b.group] || urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
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
    (p.dates || []).forEach((d) => out.push({ personId: p.id, kind: "date", label: d.label, when: d.when }));
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
  "Who is interested in robotics?",
  "Who lives in Yokohama?",
  "Which investors do I know?",
  "Who introduced me to Tanaka-san?",
  "What do I know about Suzuki-san?",
  "Who in my network has children?",
  "Who did I meet at EDIX?"
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

// person ↔ person relationships (People lens, §16.1) — dùng cho sample data
const PERSON_LINKS = [
  { a: "tanaka", b: "yamamoto", why: "Introduced by Yamamoto" },
  { a: "tanaka", b: "ito", why: "Introduced at Logis-Tech" },
  { a: "tanaka", b: "nguyen", why: "Pending intro · Vietnam" },
  { a: "sato", b: "watanabe", why: "Introduced by Sato" },
  { a: "sato", b: "kobayashi", why: "Same community" },
  { a: "nguyen", b: "mori", why: "Shared interest · Vietnam" },
  { a: "yamamoto", b: "kobayashi", why: "Same event · EDIX" },
  { a: "suzuki", b: "kobayashi", why: "Same circle · AI & Tech" }
];

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
  location: {
    label: "Location", desc: "Where people live",
    groups: [
      { id: "loc-tokyo", label: "Tokyo", query: "Tokyo, Japan", members: ["suzuki", "sato", "yamamoto", "watanabe", "kobayashi"] },
      { id: "loc-yokohama", label: "Yokohama", query: "Yokohama, Japan", members: ["tanaka"] },
      { id: "loc-osaka", label: "Osaka", query: "Osaka, Japan", members: ["ito", "nakamura"] },
      { id: "loc-hcmc", label: "Ho Chi Minh", query: "Ho Chi Minh City, Vietnam", members: ["nguyen"] },
      { id: "loc-sg", label: "Singapore", query: "Singapore", members: ["mori"] }
    ]
  },
  industry: {
    label: "Industry", desc: "Professional industry",
    groups: [
      { id: "ind-logistics", label: "Logistics", members: ["tanaka", "ito"] },
      { id: "ind-robotics", label: "Robotics", members: ["ito", "nakamura"] },
      { id: "ind-tech", label: "Technology / AI", members: ["suzuki", "kobayashi"] },
      { id: "ind-retail", label: "Retail", members: ["nguyen"] },
      { id: "ind-re", label: "Real Estate", members: ["watanabe"] },
      { id: "ind-edu", label: "Education", members: ["yamamoto"] },
      { id: "ind-fin", label: "Finance", members: ["mori"] },
      { id: "ind-hr", label: "HR", members: ["sato"] }
    ]
  },
  company: {
    label: "Company", desc: "Current organization",
    groups: [
      { id: "co-abc", label: "ABC Logistics", members: ["tanaka"] },
      { id: "co-nihon", label: "Nihon AI Systems", members: ["suzuki"] },
      { id: "co-talent", label: "TalentBridge", members: ["sato"] },
      { id: "co-motion", label: "MotionWorks", members: ["ito"] },
      { id: "co-saigon", label: "Saigon Retail", members: ["nguyen"] },
      { id: "co-edu", label: "EduTech Lab", members: ["yamamoto"] },
      { id: "co-hills", label: "Hills Realty", members: ["watanabe"] },
      { id: "co-strategy", label: "Strategy & Co.", members: ["kobayashi"] },
      { id: "co-kansai", label: "Kansai Robotics", members: ["nakamura"] },
      { id: "co-xyz", label: "XYZ Capital", members: ["mori"] }
    ]
  },
  interest: {
    label: "Interest", desc: "Shared topics & hobbies",
    groups: [
      { id: "in-robotics", label: "Robotics", members: ["tanaka", "ito", "nakamura"] },
      { id: "in-vietnam", label: "Vietnam", members: ["tanaka", "nguyen", "mori", "suzuki"] },
      { id: "in-golf", label: "Golf", members: ["tanaka", "watanabe"] },
      { id: "in-ai", label: "AI", members: ["suzuki", "kobayashi", "mori"] },
      { id: "in-startups", label: "Startups", members: ["yamamoto", "sato", "mori"] },
      { id: "in-retail", label: "Retail", members: ["nguyen", "kobayashi"] },
      { id: "in-re", label: "Real estate", members: ["watanabe"] }
    ]
  },
  relationship: {
    label: "Relationship", desc: "How you know them",
    groups: [
      { id: "rel-key", label: "Key contact", members: ["tanaka"] },
      { id: "rel-collab", label: "Collaborator", members: ["suzuki"] },
      { id: "rel-mentor", label: "Mentor", members: ["sato"] },
      { id: "rel-partner", label: "Partner", members: ["ito", "nguyen"] },
      { id: "rel-friend", label: "Friend", members: ["yamamoto"] },
      { id: "rel-client", label: "Client", members: ["watanabe", "kobayashi"] },
      { id: "rel-investor", label: "Investor", members: ["mori"] },
      { id: "rel-new", label: "New", members: ["nakamura"] }
    ]
  },
  community: {
    label: "Community / Event", desc: "Where you know them from",
    groups: [
      { id: "ev-edix", label: "EDIX", members: ["tanaka", "yamamoto", "kobayashi"] },
      { id: "ev-ivs", label: "IVS", members: ["mori", "nguyen"] },
      { id: "ev-logis", label: "Logis-Tech", members: ["tanaka", "ito"] },
      { id: "ev-meetup", label: "AI Meetup", members: ["suzuki"] },
      { id: "ev-univ", label: "University", members: ["yamamoto"] },
      { id: "ev-net", label: "Networking dinners", members: ["sato", "watanabe"] }
    ]
  }
};

/* ============================================================
   QUICK REFRESH (§21) — generated from memory via buildRefresh()
   ============================================================ */

/* ============================================================
   CAPTURE DEMOS (§7, §10, §11)
   ============================================================ */
const CARD_DEMO = {
  kanji: "中村 哲也",
  romaji: "NAKAMURA TETSUYA",
  company: "Kansai Robotics Co., Ltd.",
  title: "Business Development Manager",
  dept: "Sales & BD Division",
  email: "t.nakamura@kansai-robotics.jp",
  phone: "+81 6-XXXX-XXXX",
  address: "Osaka, Japan",
  website: "www.kansai-robotics.jp",
  extracted: [
    { label: "Name", value: "Nakamura Tetsuya", conf: 98 },
    { label: "Company", value: "Kansai Robotics Co., Ltd.", conf: 97 },
    { label: "Department", value: "Sales & BD Division", conf: 94 },
    { label: "Title", value: "Business Development Manager", conf: 96 },
    { label: "Email", value: "t.nakamura@kansai-robotics.jp", conf: 99 },
    { label: "Phone", value: "+81 6-XXXX-XXXX", conf: 91 },
    { label: "Address", value: "Osaka, Japan", conf: 88 },
    { label: "Website", value: "www.kansai-robotics.jp", conf: 90 }
  ]
};

// §7.3 voice creation example (resolves to existing Tanaka — no duplicate)
const VOICE_DEMO = {
  transcript: "I met Tanaka Hiroshi from ABC Logistics today at an industry event. He manages warehouse automation. He likes golf and lives in Yokohama.",
  resolved: {
    personId: "tanaka",
    note: "Matched existing person — no duplicate created.",
    facts: [
      { cat: "Profile update", text: "Lives in Yokohama", kind: "profile" },
      { cat: "Profile update", text: "Likes golf", kind: "profile" },
      { cat: "Work", text: "Manages warehouse automation at ABC Logistics", kind: "profile" },
      { cat: "Interaction memory", text: "Met today at an industry event", kind: "interaction" }
    ]
  }
};

// §10 add-information example
const ADDINFO_DEMO = {
  transcript: "Met her again today. She recently moved to Setagaya. Her husband works in finance. She has a five-year-old son and recently started playing tennis.",
  facts: [
    { cat: "Profile update", text: "Location → Setagaya, Tokyo", kind: "both", note: "Also saved as interaction" },
    { cat: "Profile update", text: "Family: husband in finance, five-year-old son", kind: "profile" },
    { cat: "Profile update", text: "Hobby: recently started tennis", kind: "profile" },
    { cat: "Interaction memory", text: "Met again today — recorded to timeline", kind: "interaction" }
  ]
};

const TEXT_DEMO =
  "I met Tanaka-san from ABC today. He is responsible for logistics DX. He is interested in warehouse robots and is considering a PoC next year. We agreed to meet again in October.";

/* ---------- manual entry form definition (§7.5, §9) ---------- */
const MANUAL_SECTIONS = [
  { key: "basic", title: "Basic information", fields: [
    { k: "name", label: "Full name", type: "text", req: true },
    { k: "kana", label: "Kana", type: "text" },
    { k: "nickname", label: "Nickname", type: "text" },
    { k: "gender", label: "Gender", type: "select", options: ["", "Male", "Female", "Other"] },
    { k: "birthday", label: "Birthday", type: "text", ph: "e.g. Nov 22" },
    { k: "nationality", label: "Nationality", type: "text" },
    { k: "languages", label: "Languages", type: "text", ph: "comma separated" },
    { k: "currentCity", label: "Current city", type: "text" },
    { k: "hometown", label: "Hometown", type: "text" },
    { k: "country", label: "Country of residence", type: "text" },
    { k: "email", label: "Email", type: "text" },
    { k: "phone", label: "Phone", type: "text" }
  ]},
  { key: "work", title: "Professional information", fields: [
    { k: "company", label: "Company", type: "text" },
    { k: "department", label: "Department", type: "text" },
    { k: "title", label: "Position", type: "text" },
    { k: "industry", label: "Industry", type: "text" },
    { k: "profession", label: "Profession", type: "text" },
    { k: "expertise", label: "Expertise", type: "text", ph: "comma separated" },
    { k: "previousCompanies", label: "Previous companies", type: "text" },
    { k: "skills", label: "Skills", type: "text" },
    { k: "businessTopics", label: "Business topics", type: "text" }
  ]},
  { key: "personal", title: "Personal information", fields: [
    { k: "spouse", label: "Spouse / partner", type: "text" },
    { k: "children", label: "Children", type: "text" },
    { k: "familyNotes", label: "Family notes", type: "text" },
    { k: "hobbies", label: "Hobbies", type: "text" },
    { k: "sports", label: "Sports", type: "text" },
    { k: "favoriteFood", label: "Favorite food", type: "text" },
    { k: "favoriteDrink", label: "Favorite drink", type: "text" },
    { k: "schools", label: "Schools / university", type: "text" },
    { k: "pets", label: "Pets", type: "text" }
  ]},
  { key: "relationship", title: "Relationship information", fields: [
    { k: "relationshipType", label: "Relationship type", type: "select", options: ["", "Key contact", "Client", "Partner", "Investor", "Mentor", "Friend", "Collaborator", "Acquaintance"] },
    { k: "strength", label: "Relationship strength", type: "select", options: ["", "close", "important", "normal", "weak"] },
    { k: "frequency", label: "Contact rhythm", type: "select", options: ["", "monthly", "2months", "quarterly", "biannual", "yearly", "custom"] },
    { k: "firstMetDate", label: "First met — date", type: "text" },
    { k: "firstMetPlace", label: "First met — place", type: "text" },
    { k: "introducedBy", label: "Introduced by", type: "text" },
    { k: "helpGiven", label: "What I've helped with", type: "text" },
    { k: "helpReceived", label: "What they've helped me with", type: "text" },
    { k: "promises", label: "Promises / follow-ups", type: "text" }
  ]},
  { key: "notes", title: "Free notes", fields: [
    { k: "notes", label: "Anything else", type: "textarea", ph: "Unstructured info — AI will file it in the right place later." }
  ]}
];

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
  "Ho Chi Minh City": [10.8231, 106.6297],
  "Singapore": [1.3521, 103.8198]
};

/* deterministic per-person jitter so people in the same city spread out */
function personGeo(p) {
  let h = 0;
  for (const ch of String(p.id)) h = (h * 31 + ch.charCodeAt(0)) % 997;
  const base = CITY_GEO[p.currentCity] || CITY_GEO["Tokyo"];
  const j = (h % 200) / 10000 - 0.01; // ±0.01° (~±1.1 km)
  return [base[0] + j, base[1] + j];
}

/* ============================================================
   CAPTURE PARSE — trích tự động trường từ text/voice (heuristic, không LLM).
   Người dùng sẽ KIỂM TRA + SỬA trong màn confirm trước khi lưu.
   ============================================================ */
function parseCaptureText(text) {
  const out = { name: "", company: "", title: "", currentCity: "", hobbies: [], interests: [], followUpWhat: "", notes: text || "" };
  const s = " " + String(text || "") + " ";
  const grab = (re) => {
    const m = re.exec(s);
    return m && m[1] ? m[1].trim().replace(/[.,;!?]+$/, "") : null;
  };

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
  if (out.interests.length) out.hobbies = [out.interests[0]];

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

/** Map CARD_DEMO.extracted → field của form manual (chỉ field CÓ dữ liệu). */
function cardDemoFields() {
  const map = {
    "Name": "name",
    "Company": "company",
    "Department": "department",
    "Title": "title",
    "Email": "email",
    "Phone": "phone",
    "Address": "currentCity",
  };
  const out = { name: "", company: "", department: "", title: "", email: "", phone: "", currentCity: "" };
  (CARD_DEMO.extracted || []).forEach((f) => {
    if (map[f.label] && f.value) out[map[f.label]] = f.value;
  });
  return out;
}
