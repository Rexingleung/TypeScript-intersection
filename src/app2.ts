/* 
获取T01和T02的交集
情况二: 当交集的key值类型不一样时, 同时获取; 该情况同样适用于出现可选符号?的情况
如下: 
获取出的交集为
{
  id: string;
  name: string | number;
}
 */
namespace APP2 {
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
  type TGet12 = Filter<T01, T02, TK12, TK12>; // 传进两个key和两个type进行对比 
  type TGet34 = Filter<T03, T04, TK34, TK34>; // 传进两个key和两个type进行对比 
}