# 前端完整部署 (從0開始)
## 【Typescript 前端部屬】
**Typescript build new project** 

 - start project
```sh
    npx create-react-app _file_name --template typescript
```
 - cd into file
 ```sh
    cd _file_name
```
 - To add typescript into existing project
```sh
    npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```


## 【Tailwind 安裝】
**To add Tailwindcss**

- cd into project file first
```sh
    npm install -D tailwindcss
    npx tailwindcss init
```
 - check tailwind.config.js

    *Add the paths to all of your template files in your*

    **tailwind.config.js**
```typescript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
        content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        ],
        theme: {
        extend: {},
        },
        plugins: [],
    }
```

- add to index.css

    *Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/index.css` file.*

    **index.css**
```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

- start npm server!
```sh
    npm run start
```


## 【Redux 安裝】
-  install redux

    *If you use npm:*
```sh
    npm install react-redux

    # or use yarn
    
    yarn add react-redux
```

 - 安裝 redux toolkit
```sh
    npm install @reduxjs/toolkit
```

*若不能安裝，則去 **tsconfig.json** 中，加入 **"moduleResolution": "node"***

- quick start

    **建立 store.ts檔案**

    **.src/store.ts**
```typescript
    import { configureStore } from '@reduxjs/toolkit'
    // ...

    const store = configureStore({
        reducer: {
            // add reducer slice
        },
    })

    // Infer the `RootState` and `AppDispatch` types from the store itself
    export type RootState = ReturnType<typeof store.getState>
    // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
    export type AppDispatch = typeof store.dispatch
```


 - 建立 hooks.ts檔案 (for type version)

    **用 useAppDispatch，而非 useDispatch**

    **用 useAppSelector，而非 useSelector**

```typescript
    import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
    import type { RootState, AppDispatch } from './store'

    // Use throughout your app instead of plain `useDispatch` and `useSelector`
    export const useAppDispatch: () => AppDispatch = useDispatch
    export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```