import axios from 'axios';
import { DocumentDetailRecord } from './document';
import { QuestionDetailRecord } from './question';
import { Folder, File } from './folder';

export interface TrainPlan {
  id: number;
  companyId: number;
  major: string;
  name: string;
  authorId: number;
  deadLine: string;
  imageUrl: string;
  releaseTime: string;
}

export interface TrainPlanRecord extends TrainPlan {
  author: string;
  authorImageUrl: string;
}

export interface TypeListParams {
  companyId: number;
}

export interface TypeList {
  typeList?: string[];
}

export interface TrainPlanParams {
  companyId: number;
  type: string;
}

export function queryTrainPlanList(params: TrainPlanParams) {
  return axios.get<TrainPlanRecord[]>('/api/trainplan/info', {
    params,
  });
}

export function queryTypeList(params: TypeListParams) {
  return axios.get<TypeList>('/api/trainplan/typeList', {
    params,
  });
}

export interface Chapter {
  trainPlanId: number;
  companyId: number;
  order: number;
  name: string;
  document: DocumentDetailRecord;
  questions: QuestionDetailRecord[];
}

export interface Exam {
  trainPlanId: number;
  companyId: number;
  order: number;
  questions: QuestionDetailRecord[];
}

export interface Resource {
  trainPlanId: number;
  companyId: number;
  resourece: (Folder | File)[];
}
