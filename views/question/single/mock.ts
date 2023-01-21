import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';
import { QuestionDetailRecord } from '@/api/question';
import qs from 'query-string';

const questionList: QuestionDetailRecord[] = [
  {
    id: 1,
    title: '初等数学',
    pass: 10,
    attempt: 23,
    difficulty: 0,
    label: ['初等数学'],
    type: '选择题',
    major: '数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    description: '1+1========2',
    answer: ' 11111',
    companyId: 1,
  },
  {
    id: 2,
    title: '中等数学',
    pass: 10,
    attempt: 23,
    difficulty: 1,
    label: ['中等数学'],
    type: '选择题',
    major: '数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    description: '1+1========2',
    answer: ' 11111',
    companyId: 1,
  },
  {
    id: 3,
    title: '高等数学',
    pass: 10,
    attempt: 23,
    difficulty: 2,
    label: ['高等数学', '111'],
    type: '选择题',
    major: '数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    description: '输入两个整数，求这两个整数的和是多少。',
    answer: ' 11111',
    extra: ['答案为1', '答案为2', '答案为3', '答案为3', '答案为3'],
    companyId: 1,
  },
  {
    id: 4,
    title: '语文',
    pass: 10,
    attempt: 23,
    difficulty: 1,
    label: ['语文'],
    type: '判断题',
    major: '语文',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    description: '1+1========2',
    answer: ' 11111',
    companyId: 1,
  },
  {
    id: 5,
    title: '英语',
    pass: 10,
    attempt: 23,
    difficulty: 2,
    label: ['英语'],
    type: '简答题',
    major: '英语',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    description: '1+1========2',
    answer: ' 11111',
    companyId: 1,
  },
];

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/question/single'), (params: GetParams) => {
      const { id } = qs.parseUrl(params.url).query;

      const tmp = questionList.find((item) => {
        return item.id === +(id as string);
      });

      return successResponseWrap(tmp);
    });
  },
});
