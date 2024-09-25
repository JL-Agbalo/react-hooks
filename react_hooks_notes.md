
# Full List of React Hooks with Explanations

## Basic Hooks
1. **`useState`**
   - Used for adding state to functional components.

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

2. **`useEffect`**
   - Perform side effects like data fetching or manipulating the DOM.

```jsx
import React, { useState, useEffect } from 'react';

function FetchData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

3. **`useContext`**
   - Share state between components without passing props manually.

```jsx
import React, { useContext } from 'react';

const MyContext = React.createContext();

function Parent() {
  return (
    <MyContext.Provider value="Hello, World!">
      <Child />
    </MyContext.Provider>
  );
}

function Child() {
  const value = useContext(MyContext);
  return <p>{value}</p>;
}
```

## Additional Hooks
4. **`useReducer`**
   - Alternative to `useState` for more complex state logic.

```jsx
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

5. **`useCallback`**
   - Memoize functions to avoid unnecessary re-creation.

```jsx
import React, { useState, useCallback } from 'react';

function Button({ handleClick }) {
  return <button onClick={handleClick}>Click me</button>;
}

function Parent() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <Button handleClick={increment} />
    </div>
  );
}
```

6. **`useMemo`**
   - Memoize expensive calculations to avoid recalculating on every render.

```jsx
import React, { useMemo, useState } from 'react';

function ExpensiveCalculation() {
  const [count, setCount] = useState(0);

  const expensiveCalculation = useMemo(() => {
    return count * 2;
  }, [count]);

  return (
    <div>
      <p>Result: {expensiveCalculation}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

7. **`useRef`**
   - Persist values across renders without causing re-renders.

```jsx
import React, { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </div>
  );
}
```

8. **`useImperativeHandle`**
   - Customize the instance value exposed to parent components via `ref`.

```jsx
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return <input ref={inputRef} />;
});

function Parent() {
  const ref = useRef();
  return (
    <div>
      <CustomInput ref={ref} />
      <button onClick={() => ref.current.focus()}>Focus Input</button>
    </div>
  );
}
```

9. **`useLayoutEffect`**
   - Similar to `useEffect`, but fires synchronously after all DOM mutations.

```jsx
import React, { useLayoutEffect, useRef, useState } from 'react';

function LayoutEffectDemo() {
  const divRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setHeight(divRef.current.getBoundingClientRect().height);
  });

  return (
    <div>
      <div ref={divRef}>Hello World!</div>
      <p>Height: {height}</p>
    </div>
  );
}
```

10. **`useDebugValue`**
   - Add labels in React DevTools to custom hooks for easier debugging.

```jsx
import React, { useDebugValue } from 'react';

function useCustomHook(value) {
  useDebugValue(value ? "Value exists" : "No value");
  return value;
}
```

## Concurrent Mode Hooks (Experimental)
11. **`useTransition`**
   - Manage non-urgent state updates to improve performance.

```jsx
import React, { useState, useTransition } from 'react';

function TransitionDemo() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  const handleClick = () => {
    startTransition(() => {
      setCount(count + 1);
    });
  };

  return (
    <div>
      {isPending ? <p>Loading...</p> : <p>Count: {count}</p>}
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

12. **`useDeferredValue`**
   - Defer a value update until after more urgent updates.

```jsx
import React, { useState, useDeferredValue } from 'react';

function DeferredValueDemo() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>Deferred value: {deferredText}</p>
    </div>
  );
}
```

13. **`useId`**
   - Generate unique IDs, especially useful for accessibility and SSR.

```jsx
import React, { useId } from 'react';

function AccessibleInput() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </div>
  );
}
```

14. **`useSyncExternalStore`**
   - Subscribe to external stores for updating state from external sources.

```jsx
import React, { useSyncExternalStore } from 'react';

const store = {
  state: 0,
  listeners: new Set(),
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  },
  increment() {
    this.state += 1;
    this.listeners.forEach(listener => listener());
  }
};

function Counter() {
  const state = useSyncExternalStore(store.subscribe, () => store.state);

  return (
    <div>
      <p>{state}</p>
      <button onClick={() => store.increment()}>Increment</button>
    </div>
  );
}
```

15. **`useInsertionEffect`**
   - Inject CSS styles into the DOM synchronously before browser paints.

```jsx
import React, { useInsertionEffect } from 'react';

function StyledComponent() {
  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.textContent = 'body { background-color: lightblue; }';
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <div>Styled Background</div>;
}
```

---

This list covers the essential hooks React offers, along with some more advanced ones for performance and concurrent mode.

# React Hooks

## Basic Hooks
- **`useState`** – Manage state in a functional component.
- **`useEffect`** – Perform side effects like data fetching or DOM manipulation.
- **`useContext`** – Access values from a React context.

## Additional Hooks
- **`useReducer`** – An alternative to `useState` for more complex state logic.
- **`useCallback`** – Memoize a function to avoid unnecessary re-creation on each render.
- **`useMemo`** – Memoize a computed value to avoid recomputation on every render.
- **`useRef`** – Store a mutable value that persists across renders or reference a DOM element.
- **`useImperativeHandle`** – Customize the instance value that is exposed to parent components when using `ref`.
- **`useLayoutEffect`** – Like `useEffect`, but fires synchronously after DOM mutations.
- **`useDebugValue`** – Display a label for custom hooks in React DevTools.

## Concurrent Mode Hooks (Experimental)
- **`useTransition`** – Mark state updates as non-urgent to improve performance.
- **`useDeferredValue`** – Defer a state value until after higher-priority updates.
- **`useId`** – Generate unique IDs that are stable across renders.
- **`useSyncExternalStore`** – Subscribe to an external store to update the component.
- **`useInsertionEffect`** – Allows injecting CSS styles into the DOM synchronously before b


# Using Loading Fallback in React

A loading fallback improves user experience by displaying a placeholder (like a spinner or loading message) while waiting for asynchronous tasks to complete. This can be achieved using **React Suspense** and hooks like `useTransition`.

## Example: Using `Suspense` with a Fallback

```jsx
import React, { Suspense } from 'react';

// Lazy load a component
const LazyComponent = React.lazy(() => import('./MyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* This component will show the fallback until it's loaded */}
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```


# React Notes

## Combining Suspense and Error Boundary

When using **Suspense** for data fetching, you can combine it with an **Error Boundary** to manage both loading states and errors effectively. This combination allows your application to display a loading indicator while data is being fetched and to show a fallback UI in case of an error during the fetch process.

### How It Works

1. **Suspense** is used to delay the rendering of components that rely on asynchronous data fetching. While the data is being fetched, the `fallback` prop is displayed.
2. If an error occurs during the fetching process, the **Error Boundary** catches it and displays a fallback UI instead of crashing the entire application.

### Example of Combined Usage

```jsx
import React, { Suspense, lazy } from 'react';

// Lazy load the component that fetches data
const DataFetchingComponent = lazy(() => import('./DataFetchingComponent'));

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error captured by Error Boundary: ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong while fetching data.</h1>;
        }

        return this.props.children; 
    }
}

function App() {
    return (
        <ErrorBoundary>
            <Suspense fallback={<div>Loading data...</div>}>
                <DataFetchingComponent />
            </Suspense>
        </ErrorBoundary>
    );
}

export default App;
```