import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';
import { QuestionListRes, QuestionRecord } from '@/api/question';
import qs from 'query-string';
import { attempt } from 'lodash';

const questionList: QuestionRecord[] = [
  {
    id: 1,
    title: '初等数学',
    pass: 10,
    attempt: 40,
    difficulty: 0,
    type: '选择题',
    major: '数学',
    companyId: 1,
  },
  {
    id: 2,
    title: '中等数学',
    pass: 10,
    attempt: 40,
    difficulty: 1,
    type: '选择题',
    major: '数学',
    companyId: 1,
  },
  {
    id: 3,
    title: '高等数学',
    pass: 10,
    attempt: 40,
    difficulty: 2,
    type: '选择题',
    major: '数学',
    companyId: 1,
  },
  {
    id: 4,
    title: '语文',
    pass: 10,
    attempt: 40,
    difficulty: 1,
    type: '选择题',
    major: '语文',
    companyId: 1,
  },
  {
    id: 5,
    title: '英语',
    pass: 10,
    attempt: 40,
    difficulty: 2,
    type: '选择题',
    major: '英语',
    companyId: 1,
  },
];

const questionListRes: QuestionListRes = {
  list: questionList,
  total: questionList.length,
};

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/question/list'), (params: GetParams) => {
      const {
        current = 1,
        pageSize = 10,
        examine,
      } = qs.parseUrl(params.url).query;
      const resList: QuestionListRes = {
        list: [],
        total: 0,
      };
      resList.list = questionList;
      resList.total = questionList.length;
      return successResponseWrap(resList);
    });
  },
});
