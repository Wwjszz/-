import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';
import {
  QuestionListRes,
  QuestionRecord,
  QuestionNotExamineRecord,
  QuestionExamineRecord,
} from '@/api/question';
import qs from 'query-string';

const questionExamineList: QuestionExamineRecord[] = [
  {
    id: 1,
    title: '铁路标题1',
    difficulty: 0,
    type: '选择题',
    pass: 10,
    attempt: 40,
    major: '铁路',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    authorId: 1,
    companyId: 1,
  },
  {
    id: 2,
    title: '铁路标题2',
    difficulty: 0,
    type: '选择题',
    pass: 10,
    attempt: 40,
    major: '铁路',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    authorId: 1,
    companyId: 1,
  },
  {
    id: 3,
    title: '铁路标题3',
    difficulty: 0,
    type: '选择题',
    pass: 10,
    attempt: 40,
    major: '铁路',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    authorId: 1,
    companyId: 1,
  },
];

const questionNotExamineList: QuestionNotExamineRecord[] = [
  {
    id: 1,
    title: '铁路标题1',
    difficulty: 0,
    type: '选择题',
    major: '铁路',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    authorId: 1,
    companyId: 1,
  },
  {
    id: 2,
    title: '铁路标题2',
    difficulty: 0,
    type: '选择题',
    major: '铁路',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    authorId: 1,
    companyId: 1,
  },
  {
    id: 3,
    title: '铁路标题3',
    difficulty: 0,
    type: '选择题',
    major: '铁路',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    authorId: 1,
    companyId: 1,
  },
];

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/question/detailList'), (params: GetParams) => {
      const {
        current = 1,
        pageSize = 10,
        examine,
      } = qs.parseUrl(params.url).query;
      const resList: QuestionListRes = {
        list: [],
        total: 0,
      };
      if (examine === 'y') {
        resList.list = questionExamineList;
        resList.total = questionExamineList.length;
        return successResponseWrap(resList);
      }
      resList.list = questionNotExamineList;
      resList.total = questionNotExamineList.length;
      return successResponseWrap(resList);
    });
  },
});
