/* 
获取T01和T02的交集
情况一: 当两个key的类型相同时
如下: 
获取出的交集为
{
  id: string;
  name: string;
}
 */
namespace APP1 {
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
  type T03 = Filter<T01, TK12>; // 因为交集的key的类型是相同的, 所以随便去一个即可
}