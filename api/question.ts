import axios from 'axios';

export interface Question {
  id: number;
  companyId: number;
  title: string;
  difficulty: number;
  major: string;
  type: string;
}

export interface QuestionRecord extends Question {
  pass: number;
  attempt: number;
}

export interface QuestionExamineRecord extends Question {
  pass: number;
  attempt: number;
  authorId: number;
  author: string;
  imageUrl: string;
}

export interface QuestionNotExamineRecord extends Question {
  authorId: number;
  author: string;
  imageUrl: string;
}

export interface QuestionDetailRecord extends Question {
  label: string[];
  pass: number;
  attempt: number;
  description: string;
  extra?: string[];
  answer: number[] | string;
  author: string;
  imageUrl: string;
}

export interface QuestionParamsWithExamine extends Partial<QuestionRecord> {
  examine: string;
  current: number;
  pageSize: number;
}

export interface QuestionListRes {
  list:
    | QuestionRecord[]
    | QuestionNotExamineRecord[]
    | QuestionExamineRecord[]
    | QuestionDetailRecord[];
  total: number;
}

export interface SingleQuestionParams {
  id: number;
  companyId: number;
}

export function querySingleQuestion(params: SingleQuestionParams) {
  return axios.get<QuestionDetailRecord>('/api/question/single', {
    params,
  });
}

export function queryQuestionList(params: QuestionParamsWithExamine) {
  return axios.get<QuestionListRes>('/api/question/list', {
    params,
  });
}

export function queryDetailQuestionList(params: QuestionParamsWithExamine) {
  return axios.get<QuestionListRes>('/api/question/detailList', {
    params,
  });
}
