[&#X21e7; back to the "README" &#X21e7;](../../../README.md)

# how to use the context api

1. a context needs to be created
2. the context needs to wrap the components to which it will be scoped and there values need to be passed
3. the component which (_no mather who deep_) should receive the values need to import the "context" and the "useContext" hook

## 1. create context

`createContext` lets you create a context that components can provide or read.

- import the `createContext` from `react`

```JSX
// _app.tsx
import { createContext } from "react";
```

- Call `createContext` outside of any components to create a context.
  - you can name the context anything you like
  - a default value needs to be passed to the `createContext` function (_in our example it is `null`_)

```JSX
export const UserLoggedInContext = createContext(null);
```

## 2. wrap component with provider and pass values

- this example wraps all components with the context

```JSX
// _app.tsx
export default function App({ Component, pageProps }: AppProps) {
    // define values which you want to pass to the context
  const [userLoggedIn, setUserLoggedIn] = useState({});
  return (
    // provide the component with the values by wrapping them into the context-provider
    <UserLoggedInContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserLoggedInContext.Provider>
  );
}
```

## 3. use the context value

- import the context and the `useContext` hook
- assign the values from the context via the "useContext" hook to a variable

```JSX
// component which uses the context
import { useContext } from "react";
import { UserLoggedInContext } from "../pages/_app";
// ... other code ...
// ... inside of the component function
const { userLoggedIn, setUserLoggedIn } = useContext(UserLoggedInContext);
```
