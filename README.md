## input method server

基于前缀树实现的输入法搜索服务

```sh
λ ~/oschina/inputengine/ main node test03.js
ready> :a:1
key: a
page:1,size:9
repl result: [
  { index: 0, key: 'a', value: 'wb_工', paths: '' },
  { index: 1, key: 'a', value: 'wb_戈', paths: '' },
  { index: 2, key: 'a', value: 'py_啊', paths: '' },
  { index: 3, key: 'a', value: 'py_阿', paths: '' },
  { index: 4, key: 'a', value: 'py_吖', paths: '' },
  { index: 5, key: 'a', value: 'py_呵', paths: '' },
  { index: 6, key: 'a', value: 'py_腌', paths: '' },
  { index: 7, key: 'a', value: 'py_嗄', paths: '' },
  { index: 8, key: 'a', value: 'py_锕', paths: '' }
]
search: 4.456ms
ready> :a:2
key: a
page:2,size:9
repl result: [
  { index: 9, key: 'a', value: 'py_吁', paths: '' },
  { index: 10, key: 'a', value: 'py_錒', paths: '' },
  { index: 11, key: 'a', value: 'wb_式', paths: 'a' },
  { index: 12, key: 'a', value: 'py_啊啊', paths: 'a' },
  { index: 13, key: 'a', value: 'wb_工', paths: 'aa' },
  { index: 14, key: 'a', value: 'py_啊啊啊', paths: 'aa' },
  { index: 15, key: 'a', value: 'wb_工', paths: 'aaa' },
  { index: 16, key: 'a', value: 'wb_恭恭敬敬', paths: 'aaa' },
  { index: 17, key: 'a', value: 'wb_花花草草', paths: 'aaa' }
]
search: 0.863ms
ready> :sh:1
key: sh
page:1,size:9
repl result: [
  { index: 0, key: 'sh', value: 'wb_相', paths: '' },
  { index: 1, key: 'sh', value: 'py_啥', paths: 'a' },
  { index: 2, key: 'sh', value: 'py_杀', paths: 'a' },
  { index: 3, key: 'sh', value: 'py_傻', paths: 'a' },
  { index: 4, key: 'sh', value: 'py_沙', paths: 'a' },
  { index: 5, key: 'sh', value: 'py_砂', paths: 'a' },
  { index: 6, key: 'sh', value: 'py_纱', paths: 'a' },
  { index: 7, key: 'sh', value: 'py_煞', paths: 'a' },
  { index: 8, key: 'sh', value: 'py_莎', paths: 'a' }
]
search: 0.65ms
ready> :gt:1
key: gt
page:1,size:9
repl result: [
  { index: 0, key: 'gt', value: 'wb_玫', paths: '' },
  { index: 1, key: 'gt', value: 'wb_麦芽', paths: 'aa' },
  { index: 2, key: 'gt', value: 'wb_不等式', paths: 'aa' },
  { index: 3, key: 'gt', value: 'wb_敖德萨', paths: 'ab' },
  { index: 4, key: 'gt', value: 'wb_麦茬', paths: 'ad' },
  { index: 5, key: 'gt', value: 'wb_不知其二', paths: 'af' },
  { index: 6, key: 'gt', value: 'wb_一盘散沙', paths: 'ai' },
  { index: 7, key: 'gt', value: 'wb_麦草', paths: 'aj' },
  { index: 8, key: 'gt', value: 'wb_一等功', paths: 'al' }
]
search: 2.016ms
ready> :gg:1
key: gg
page:1,size:9
repl result: [
  { index: 0, key: 'gg', value: 'wb_五', paths: '' },
  { index: 1, key: 'gg', value: 'wb_一式', paths: 'aa' },
  { index: 2, key: 'gg', value: 'wb_环节', paths: 'ab' },
  { index: 3, key: 'gg', value: 'wb_一节', paths: 'ab' },
  { index: 4, key: 'gg', value: 'wb_五一节', paths: 'ab' },
  { index: 5, key: 'gg', value: 'wb_一项', paths: 'ad' },
  { index: 6, key: 'gg', value: 'wb_王菲', paths: 'ad' },
  { index: 7, key: 'gg', value: 'wb_一期', paths: 'ad' },
  { index: 8, key: 'gg', value: 'wb_五项', paths: 'ad' }
]
search: 0.626ms
```
