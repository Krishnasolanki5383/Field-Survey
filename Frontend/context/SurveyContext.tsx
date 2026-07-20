import React, { createContext, useState, useContext } from 'react';

export interface Survey {
  id: string;
  siteName: string;
  clientName: string;
  description: string;
  priority: string;
  date: string;
  photoUri: string | null;
  photoTime: string | null;
}

export interface PhotoData {
  uri: string;
  timestamp: string;
}

export interface InspectorProfile {
  name: string;
  avatar: string;
  id: string;
  course: string;
  department: string;
  year: string;
}

export interface SurveyStats {
  todayCount: number;
  targetCount: number;
  completionPercent: number;
}

export interface RecentSurvey {
  id: string;
  siteName: string;
  clientName: string;
  description: string;
  priority: string;
  location: string;
  date: string;
  time: string;
  status: string;
}

interface SurveyContextType {
  surveys: Survey[];
  currentPhoto: PhotoData | null;
  addSurvey: (survey: Omit<Survey, 'id' | 'photoUri' | 'photoTime'>) => void;
  deleteSurvey: (id: string) => void;
  setCurrentPhoto: (photo: PhotoData | null) => void;
  inspectorProfile: InspectorProfile;
  surveyStats: SurveyStats;
  recentSurveys: RecentSurvey[];
}

const NAMES = [
  { name: "Elena Rostova", gender: "female" },
  { name: "Rajesh Kumar", gender: "male" },
  { name: "Aisha Bello", gender: "female" },
  { name: "Mateo Fernandez", gender: "male" },
  { name: "Yuki Tanaka", gender: "female" },
  { name: "Sarah Jenkins", gender: "female" },
  { name: "David Ndlovu", gender: "male" },
  { name: "Sophia Martinez", gender: "female" },
  { name: "Ammar Al-Farsi", gender: "male" }
];

const FEMALE_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
];

const MALE_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80"
];

const COURSES = [
  { course: "B.E. Environmental Engineering", dept: "Environmental Engineering" },
  { course: "B.E. Civil & Infrastructure Engineering", dept: "Civil Engineering" },
  { course: "B.E. Electrical & Power Systems Engineering", dept: "Electrical Engineering" },
  { course: "B.E. Surveying & Geomatics", dept: "Geoinformatics" },
  { course: "B.E. Urban Planning & Design", dept: "Architecture & Planning" }
];

const SITE_NAMES = [
  "Solar Farm Grid Inspection",
  "Highrise Concrete Pour Review",
  "River Basin Soil Sampling",
  "Subway Tunnel Water Inflow Test",
  "Industrial Wastewater Drain Check",
  "Coastal Erosion Survey",
  "Bridge Foundation Sounding",
  "High-Voltage Substation Scan",
  "Village Water Source Inspection",
  "Road Condition Survey"
];

const CLIENT_NAMES = [
  "EcoPower Solutions",
  "Vertex Development Corp",
  "State Water Resources Board",
  "Metropolitan Transit Group",
  "ClearWater Quality Dept",
  "Maritime & Port Authority",
  "Public Works Department",
  "National Grid Agency"
];

const LOCATIONS = [
  "Ahmedabad, Gujarat",
  "Mehsana, Gujarat",
  "Gandhinagar, Gujarat",
  "Surat, Gujarat",
  "Vadodara, Gujarat",
  "Rajkot, Gujarat",
  "Chhapi, Banaskantha",
  "Palanpur, Gujarat",
  "Dantiwada, Banaskantha"
];

const generateRandomProfile = (): InspectorProfile => {
  const randomElement = <T extends unknown>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const person = randomElement(NAMES);
  const avatar = person.gender === "female" ? randomElement(FEMALE_AVATARS) : randomElement(MALE_AVATARS);
  const id = `CGCE24${Math.floor(1000 + Math.random() * 9000)}`;
  const courseObj = randomElement(COURSES);
  const year = randomElement(["1st Year", "2nd Year", "3rd Year", "Final Year"]);
  
  return {
    name: person.name,
    avatar,
    id,
    course: courseObj.course,
    department: courseObj.dept,
    year
  };
};

const generateRandomStats = (): SurveyStats => {
  const targetCount = Math.floor(8 + Math.random() * 8); // 8 to 15
  const todayCount = Math.floor(2 + Math.random() * 5); // 2 to 6
  const completionPercent = Math.round((todayCount / targetCount) * 100);
  
  return {
    todayCount,
    targetCount,
    completionPercent
  };
};

const generateRandomRecentSurveys = (): RecentSurvey[] => {
  const list: RecentSurvey[] = [];
  const priorities = ["High", "Medium", "Low"];
  const statuses = ["Completed", "In Progress", "Pending"];
  
  for (let i = 0; i < 3; i++) {
    const siteName = SITE_NAMES[Math.floor(Math.random() * SITE_NAMES.length)];
    const clientName = CLIENT_NAMES[Math.floor(Math.random() * CLIENT_NAMES.length)];
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const priority = priorities[i % 3];
    const status = statuses[i % 3];
    const date = `${15 + i} Jul 2026`;
    const time = `0${9 + i}:30 ${i % 2 === 0 ? 'AM' : 'PM'}`;
    list.push({
      id: `random-mock-${i}`,
      siteName,
      clientName,
      description: `Random automated checking and monitoring of the location to inspect structures, environmental impact and safety requirements.`,
      priority,
      location,
      date,
      time,
      status
    });
  }
  return list;
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [surveys, setSurveys] = useState<Survey[]>([
    // Start with some default/mock data for demonstration
    {
      id: '1',
      siteName: 'Metro Station Area A',
      clientName: 'City Transit Authority',
      description: 'Initial structural inspection of concrete support pillars.',
      priority: 'High',
      date: '2026-07-18',
      photoUri: null,
      photoTime: null,
    },
    {
      id: '2',
      siteName: 'Downtown Power Grid',
      clientName: 'Energy Corp',
      description: 'Inspecting backup transformers and safety fencing.',
      priority: 'Medium',
      date: '2026-07-17',
      photoUri: null,
      photoTime: null,
    }
  ]);
  const [currentPhoto, setCurrentPhoto] = useState<PhotoData | null>(null);

  // Initialize randomized user and data once on component mount
  const [inspectorProfile] = useState<InspectorProfile>(() => generateRandomProfile());
  const [surveyStats] = useState<SurveyStats>(() => generateRandomStats());
  const [recentSurveys] = useState<RecentSurvey[]>(() => generateRandomRecentSurveys());

  const addSurvey = (surveyData: Omit<Survey, 'id' | 'photoUri' | 'photoTime'>) => {
    const newSurvey: Survey = {
      ...surveyData,
      id: Date.now().toString(),
      photoUri: currentPhoto ? currentPhoto.uri : null,
      photoTime: currentPhoto ? currentPhoto.timestamp : null,
    };
    setSurveys((prev) => [newSurvey, ...prev]);
    setCurrentPhoto(null); // Reset after attaching to survey
  };

  const deleteSurvey = (id: string) => {
    setSurveys((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <SurveyContext.Provider value={{ 
      surveys, 
      currentPhoto, 
      addSurvey, 
      deleteSurvey, 
      setCurrentPhoto,
      inspectorProfile,
      surveyStats,
      recentSurveys
    }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurveys = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurveys must be used within a SurveyProvider');
  }
  return context;
};
