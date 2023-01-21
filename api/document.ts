import axios from 'axios';

interface Document {
  id: number;
  companyId: number;
  title: string;
  releaseTime: string;
  authorId: number;
  major: string;
}

export interface DocumentNotExamineRecord extends Document {
  author: string;
  imageUrl: string;
}

export interface DocumentRecord extends Document {
  readers: number;
  likes: number;
  author: string;
  imageUrl: string;
}

export interface DocumentCreateRecord extends Document {
  examine: string;
  content: string;
  video: string[];
}

export interface DocumentParams extends Partial<DocumentRecord> {
  current: number;
  pageSize: number;
}

export interface DocumentListRes {
  list: DocumentRecord[] | DocumentNotExamineRecord[];
  total: number;
}

export interface DocumentDetailRecord extends DocumentRecord {
  examine: number;
  content: string;
  video: string[];
}

export interface SingleDocumentParams {
  id: number;
}

export interface DocumentParamsWithExamine extends Partial<Document> {
  examine: string;
  current: number;
  pageSize: number;
}

export function querySingleDocument(params: SingleDocumentParams) {
  return axios.get<DocumentDetailRecord>('/api/document/single', {
    params,
  });
}

export function queryDocumentList(params: DocumentParamsWithExamine) {
  return axios.get<DocumentListRes>('/api/document/list', {
    params,
  });
}
