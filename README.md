#### TypeScript 获取两个type的交集及其对应的类型
要求1: 当两个key的类型相同时, 获取交集及其类型
```Typescript
// 两个type如下:
type T01 = {
    id: string;
    name: string;
    sex: number;
  };
type T02 = {
  id: string;
  name: string;
  age: number;
  addr: string;
}
// 获取结果如下
{
  id: string;
  name: string;
}
```
```Typescript
namespace TYPE1 {
  type T01 = {
    id: string;
    name: string;
    sex: number;
  };
  type T02 = {
    id: string;
    name: string;
    age: number;
    addr: string;
  }
  type FilterKey<T, U> = T extends U ? T : never; // 找出交集
  type TK<T> = keyof T; // 获取key值
  type Filter<T, K extends keyof T> = {
    [P in K]: T[P];
  };
  type TK12 = FilterKey<TK<T01>, TK<T02>>;  // 获取对应T01和T02 key的交集

  type TGet12 = Filter<T01, TK12>; // 因为交集的key的类型是相同的, 所以随便去一个即可
  /*
    TGet12结果如下
    type TGet12 = {
      id: string;
      name: string;
    }
  */
}
```

要求2: 当交集的key值类型不一样时, 同时获取; 该情况同样适用于出现可选符号?的情况
```Typescript
// 两个type如下:
type T01 = {
    id?: string;
    name: number;
    sex: number;
  };
type T02 = {
  id: string;
  name: string;
  age: number;
  addr: string;
}
// 获取结果如下
{
  id?: string;
  name: string | number;
}
```
```Typescript
namespace TYPE2 {
  type T01 = {
    id: string;
    name: number;
    sex: number;
  };
  type T02 = {
    id: string;
    name: string;
    age: number;
    addr: string;
  }
  type T03 = {
    id?: string;
    name: number;
    sex: number;
  };
  type T04 = {
    id: string;
    name: string;
    age: number;
    addr: string;
  }
  
  type FilterKey<T, U> = T extends U ? T : never; // 找出交集
  type TK<T> = keyof T; // 获取key值
  type TPValue<T, P extends keyof T> = T[P]; // 获取对应的类型
  type Filter<T, U, K extends keyof T, K2 extends keyof U> = {
    [P in K]: TPValue<T, P> | TPValue<U, K2>;
  };
  
  type TK12 = FilterKey<TK<T01>, TK<T02>>; // 获取对应T01和T02 key的交集
  type TK34 = FilterKey<TK<T03>, TK<T04>>; // 获取对应T03和T04 key的交集

  type TGet12 = Filter<T01, T02, TK12, TK12>; // 传进两个key和两个type进行对比, 并获取结果
  /*
    TGet12结果如下
    type TGet12 = {
      id: string;
      name: string | number;
    }
  */

  type TGet34 = Filter<T03, T04, TK34, TK34>; // 传进两个key和两个type进行对比, 并获取结果
  /*
    TGet34结果如下
    type TGet34 = {
      id?: string;
      name: string | number;
    }
  */
}
```
详情见 [TypeScript实战-TypeScript 获取两个type的交集及其对应的类型](https://zhuanlan.zhihu.com/p/348712825)
