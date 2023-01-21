import Mock, { setup } from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';
import {
  DocumentRecord,
  DocumentListRes,
  DocumentNotExamineRecord,
} from '@/api/document';
import qs from 'query-string';

const documentList: DocumentRecord[] = [
  {
    id: 1,
    title: '关于如何学习初等数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    releaseTime: '2022-11-20 10:10:10',
    readers: 56,
    likes: 30,
    major: '初等数学',
    companyId: 1,
    authorId: 1,
  },
  {
    id: 2,
    title: '关于如何学习中等数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '张三',
    releaseTime: '2022-11-22 18:44:11',
    readers: 26,
    likes: 30,
    major: '初等数学',
    companyId: 1,
    authorId: 1,
  },
  {
    id: 3,
    title: '关于如何学习初等数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '李四',
    releaseTime: '2021-11-22 16:17:11',
    readers: 56,
    likes: 30,
    major: '初等数学',
    companyId: 1,
    authorId: 1,
  },
  {
    id: 4,
    title: '关于如何学习高等数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    releaseTime: '2022-11-22 14:17:41',
    readers: 56,
    likes: 30,
    major: '初等数学',
    companyId: 1,
    authorId: 1,
  },
  {
    id: 5,
    title: '关于如何学习小学语文',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王五五',
    releaseTime: '2022-10-22 14:17:41',
    readers: 56,
    likes: 30,
    major: '初等数学',
    companyId: 1,
    authorId: 1,
  },
];

const notExaminedDocumentList: DocumentNotExamineRecord[] = [
  {
    id: 1,
    title: '关于如何学习初等数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    releaseTime: '2022-11-20 10:10:10',
    major: '初等数学',
    companyId: 1,
    authorId: 1,
  },
  {
    id: 2,
    title: '关于如何学习中等数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '张三',
    releaseTime: '2022-11-22 18:44:11',
    major: '初等数学',
    companyId: 1,
    authorId: 1,
  },
  {
    id: 3,
    title: '关于如何学习初等数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '李四',
    releaseTime: '2021-11-22 16:17:11',
    major: '初等数学',
    companyId: 1,
    authorId: 1,
  },
  {
    id: 4,
    title: '关于如何学习高等数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    releaseTime: '2022-11-22 14:17:41',
    major: '初等数学',
    companyId: 1,
    authorId: 1,
  },
  {
    id: 5,
    title: '关于如何学习小学语文',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王五五',
    releaseTime: '2022-10-22 14:17:41',
    major: '初等数学',
    companyId: 1,
    authorId: 1,
  },
];

const documentListRes: DocumentListRes = {
  list: documentList,
  total: documentList.length,
};

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/document/list'), (params: GetParams) => {
      const {
        current = 1,
        pageSize = 10,
        examine,
      } = qs.parseUrl(params.url).query;
      const resList: DocumentListRes = {
        list: [],
        total: 0,
      };
      if (examine === 'y') {
        resList.list = documentList;
        resList.total = documentList.length;
        return successResponseWrap(resList);
      }
      resList.list = notExaminedDocumentList;
      resList.total = notExaminedDocumentList.length;
      return successResponseWrap(resList);
    });
  },
});
