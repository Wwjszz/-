import axios from 'axios';

export interface NoteRecord {
  id: number;
  questionId: number;
  studentId: number;
  title: string;
  content: string;
}

export interface NoteParams {
  questionId: number;
  studentId: number;
}

export function queryNote(params: NoteParams) {
  return axios.get<NoteRecord>('/api/question/single', {
    params,
  });
}
