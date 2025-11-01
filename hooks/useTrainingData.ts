
import { useState, useEffect } from 'react';
import { TrainingModule, ProgressStats, Certification } from '@/types/training';
import { trainingModules, certifications } from '@/data/trainingData';

export function useTrainingData() {
  const [modules, setModules] = useState<TrainingModule[]>(trainingModules);
  const [certs, setCerts] = useState<Certification[]>(certifications);
  const [stats, setStats] = useState<ProgressStats>({
    totalModules: 0,
    completedModules: 0,
    averageScore: 0,
    upcomingDue: 0,
  });

  useEffect(() => {
    calculateStats();
  }, [modules]);

  const calculateStats = () => {
    const total = modules.length;
    const completed = modules.filter(m => m.completed).length;
    const scores = modules.filter(m => m.score).map(m => m.score!);
    const avgScore = scores.length > 0 
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
    
    const now = new Date();
    const upcoming = modules.filter(m => {
      if (!m.dueDate || m.completed) return false;
      const dueDate = new Date(m.dueDate);
      const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilDue <= 30 && daysUntilDue >= 0;
    }).length;

    setStats({
      totalModules: total,
      completedModules: completed,
      averageScore: avgScore,
      upcomingDue: upcoming,
    });
  };

  const completeModule = (moduleId: string, score: number) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId
          ? {
              ...module,
              completed: true,
              score,
              completedDate: new Date().toISOString().split('T')[0],
            }
          : module
      )
    );
  };

  const getModulesByCategory = (category: string) => {
    return modules.filter(m => m.category === category);
  };

  const getUpcomingModules = () => {
    return modules.filter(m => !m.completed && m.dueDate).sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  };

  return {
    modules,
    certifications: certs,
    stats,
    completeModule,
    getModulesByCategory,
    getUpcomingModules,
  };
}
