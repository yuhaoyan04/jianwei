export interface Section {
  id: 'math-finance' | 'ai-frontier' | 'reading-cognition' | 'build-in-public';
  title: string;
  subtitle: string;
  description: string;
  accent: string;
}

export const SITE = {
  name: '见微',
  nameEn: 'Jianwei',
  wordmark: '见微',
  slogan: '从细节，看见世界的结构。',
};

export const SECTIONS: Section[] = [
  {
    id: 'math-finance',
    title: '数学与金融',
    subtitle: 'Math & Finance',
    description: '用数学的语言，逼近金融与经济的真实结构。',
    accent: '#9C4A2A',
  },
  {
    id: 'ai-frontier',
    title: 'AI前沿',
    subtitle: 'AI Frontier',
    description: '拆解 AI 的前沿——从论文里的原理，到能跑起来的工程。',
    accent: '#16A34A',
  },
  {
    id: 'reading-cognition',
    title: '读书与认知',
    subtitle: 'Reading & Cognition',
    description: '把书读薄、读透，每本书解开几个现实问题。',
    accent: '#B45309',
  },
  {
    id: 'build-in-public',
    title: 'Build In Public',
    subtitle: 'Build in Person',
    description: '把想法做成可用的东西，并公开记录这个过程。',
    accent: '#B91C1C',
  },
];

export const SECTION_IDS = SECTIONS.map((s) => s.id) as Section['id'][];

export function getSection(id: string): Section | undefined {
  return SECTIONS.find((s) => s.id === id);
}
