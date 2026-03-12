---
title: "TypeScript 高级类型体操"
excerpt: "掌握 TypeScript 高级类型，提升代码的类型安全性和开发效率。"
date: "2024-10-10"
tags: ["TypeScript", "编程"]
---

# TypeScript 高级类型体操

TypeScript 的类型系统是图灵完备的，让我们探索一些高级技巧。

## 泛型基础

泛型让代码更具复用性：

```typescript
function identity<T>(arg: T): T {
  return arg
}

// 使用
identity<string>("hello")
identity<number>(42)
```

## 条件类型

根据条件选择类型：

```typescript
type IsString<T> = T extends string ? true : false

type A = IsString<"hello"> // true
type B = IsString<123>     // false
```

## 映射类型

批量转换类型属性：

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Partial<T> = {
  [P in keyof T]?: T[P]
}

// 使用
interface User {
  name: string
  age: number
}

type ReadonlyUser = Readonly<User>
```

## 类型推断 infer

从类型中提取信息：

```typescript
// 提取数组元素类型
type ElementType<T> = T extends (infer E)[] ? E : never

type Numbers = ElementType<number[]> // number
type Strings = ElementType<string[]> // string

// 提取函数返回值
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

function getUser() {
  return { name: "John", age: 30 }
}

type User = ReturnType<typeof getUser>
```

## 递归类型

处理嵌套结构：

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P]
}

interface Nested {
  a: {
    b: {
      c: string
    }
  }
}

type ReadonlyNested = DeepReadonly<Nested>
```

## 实用工具类型

### 实现 Pick

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface User {
  name: string
  age: number
  email: string
}

type UserPreview = MyPick<User, 'name' | 'email'>
// { name: string; email: string }
```

### 实现 Omit

```typescript
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

type UserWithoutEmail = MyOmit<User, 'email'>
// { name: string; age: number }
```

## 类型挑战

### 实现 Tuple to Union

```typescript
type TupleToUnion<T extends any[]> = T[number]

type Result = TupleToUnion<['a', 'b', 'c']>
// 'a' | 'b' | 'c'
```

### 实现 DeepPartial

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P]
}
```

## 总结

掌握这些高级类型技巧，可以让你：

- 构建更健壮的类型系统
- 提高代码复用性
- 增强 IDE 智能提示
- 减少运行时错误

继续练习，成为 TypeScript 高手！
