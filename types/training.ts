
export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: 'ventilation' | 'equipment' | 'procedures' | 'safety' | 'protocols';
  duration: number; // in minutes
  completed: boolean;
  score?: number;
  completedDate?: string;
  dueDate?: string;
  required: boolean;
}

export interface ProgressStats {
  totalModules: number;
  completedModules: number;
  averageScore: number;
  upcomingDue: number;
}

export interface Certification {
  id: string;
  name: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expiring' | 'expired';
}
