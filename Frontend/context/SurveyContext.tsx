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

interface SurveyContextType {
  surveys: Survey[];
  currentPhoto: PhotoData | null;
  addSurvey: (survey: Omit<Survey, 'id' | 'photoUri' | 'photoTime'>) => void;
  deleteSurvey: (id: string) => void;
  setCurrentPhoto: (photo: PhotoData | null) => void;
}

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
    <SurveyContext.Provider value={{ surveys, currentPhoto, addSurvey, deleteSurvey, setCurrentPhoto }}>
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
