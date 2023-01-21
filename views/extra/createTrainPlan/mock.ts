import { DocumentDetailRecord } from '@/api/document';
import { Chapter, Exam, Resource } from '@/api/trainplan';

export const defaultChapter = (index: number): Chapter => {
  return {
    trainPlanId: 1,
    companyId: 1,
    order: index,
    name: '',
    document: {} as DocumentDetailRecord,
    questions: [],
  };
};

export const ChapterList: Chapter[] = [
  {
    trainPlanId: 1,
    companyId: 1,
    order: 1,
    name: '初中数学',
    document: {} as DocumentDetailRecord,
    questions: [],
  },
  {
    trainPlanId: 1,
    companyId: 1,
    order: 2,
    name: '高中数学',
    document: {} as DocumentDetailRecord,
    questions: [],
  },
  {
    trainPlanId: 1,
    companyId: 1,
    order: 3,
    name: '大学数学',
    document: {} as DocumentDetailRecord,
    questions: [],
  },
];

export const defaultExam = (index: number): Exam => {
  return {
    trainPlanId: 1,
    companyId: 1,
    order: 1,
    questions: [],
  };
};

export const ExamList: Exam[] = [
  {
    trainPlanId: 1,
    companyId: 1,
    order: 1,
    questions: [],
  },
  {
    trainPlanId: 1,
    companyId: 1,
    order: 2,
    questions: [],
  },
  {
    trainPlanId: 1,
    companyId: 1,
    order: 3,
    questions: [],
  },
  {
    trainPlanId: 1,
    companyId: 1,
    order: 4,
    questions: [],
  },
];

export const defaultResource = (index: number) => {
  return { trainPlanId: 1, companyId: 1, resourece: [] };
};

export const ResourceList: Resource[] = [
  { trainPlanId: 1, companyId: 1, resourece: [] },
  { trainPlanId: 1, companyId: 1, resourece: [] },
  { trainPlanId: 1, companyId: 1, resourece: [] },
  { trainPlanId: 1, companyId: 1, resourece: [] },
  { trainPlanId: 1, companyId: 1, resourece: [] },
];
