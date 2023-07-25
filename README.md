## input method server

基于前缀树实现的输入法搜索服务

```sh
λ ~/oschina/inputengine/ main node test03.js
ready> :a:1
key: a
page:1,size:9
repl result: [
  { index: 0, key: 'a', value: '工', paths: '', type: 'wb' },
  { index: 1, key: 'a', value: '戈', paths: '', type: 'wb' },
  { index: 2, key: 'a', value: '啊', paths: '', type: 'py' },
  { index: 3, key: 'a', value: '阿', paths: '', type: 'py' },
  { index: 4, key: 'a', value: '吖', paths: '', type: 'py' },
  { index: 5, key: 'a', value: '呵', paths: '', type: 'py' },
  { index: 6, key: 'a', value: '腌', paths: '', type: 'py' },
  { index: 7, key: 'a', value: '嗄', paths: '', type: 'py' },
  { index: 8, key: 'a', value: '锕', paths: '', type: 'py' }
]
search: 4.765ms
ready> :a:2
key: a
page:2,size:9
repl result: [
  { index: 9, key: 'a', value: '吁', paths: '', type: 'py' },
  { index: 10, key: 'a', value: '錒', paths: '', type: 'py' },
  { index: 11, key: 'a', value: '式', paths: 'a', type: 'wb' },
  { index: 12, key: 'a', value: '啊啊', paths: 'a', type: 'py' },
  { index: 13, key: 'a', value: '工', paths: 'aa', type: 'wb' },
  { index: 14, key: 'a', value: '啊啊啊', paths: 'aa', type: 'py' },
  { index: 15, key: 'a', value: '工', paths: 'aaa', type: 'wb' },
  { index: 16, key: 'a', value: '恭恭敬敬', paths: 'aaa', type: 'wb' },
  { index: 17, key: 'a', value: '花花草草', paths: 'aaa', type: 'wb' }
]
search: 1.042ms
ready> :gg:1
key: gg
page:1,size:9
repl result: [
  { index: 0, key: 'gg', value: '五', paths: '', type: 'wb' },
  { index: 1, key: 'gg', value: '一式', paths: 'aa', type: 'wb' },
  { index: 2, key: 'gg', value: '环节', paths: 'ab', type: 'wb' },
  { index: 3, key: 'gg', value: '一节', paths: 'ab', type: 'wb' },
  { index: 4, key: 'gg', value: '五一节', paths: 'ab', type: 'wb' },
  { index: 5, key: 'gg', value: '一项', paths: 'ad', type: 'wb' },
  { index: 6, key: 'gg', value: '王菲', paths: 'ad', type: 'wb' },
  { index: 7, key: 'gg', value: '一期', paths: 'ad', type: 'wb' },
  { index: 8, key: 'gg', value: '五项', paths: 'ad', type: 'wb' }
]
search: 2.212ms
ready> :ggtt:1
key: ggtt
page:1,size:9
repl result: [
  { index: 0, key: 'ggtt', value: '五笔', paths: '', type: 'wb' },
  { index: 1, key: 'ggtt', value: '开玩笑', paths: '', type: 'wb' },
  { index: 2, key: 'ggtt', value: '来来往往', paths: '', type: 'wb' },
  { index: 3, key: 'ggtt', value: '一笔', paths: '', type: 'wb' },
  { index: 4, key: 'ggtt', value: '一笑', paths: '', type: 'wb' }
]
search: 0.546ms
ready> :sh:1
key: sh
page:1,size:9
repl result: [
  { index: 0, key: 'sh', value: '相', paths: '', type: 'wb' },
  { index: 1, key: 'sh', value: '啥', paths: 'a', type: 'py' },
  { index: 2, key: 'sh', value: '杀', paths: 'a', type: 'py' },
  { index: 3, key: 'sh', value: '傻', paths: 'a', type: 'py' },
  { index: 4, key: 'sh', value: '沙', paths: 'a', type: 'py' },
  { index: 5, key: 'sh', value: '砂', paths: 'a', type: 'py' },
  { index: 6, key: 'sh', value: '纱', paths: 'a', type: 'py' },
  { index: 7, key: 'sh', value: '煞', paths: 'a', type: 'py' },
  { index: 8, key: 'sh', value: '莎', paths: 'a', type: 'py' }
]
search: 0.81ms
ready> 
```
