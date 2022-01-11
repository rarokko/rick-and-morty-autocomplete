1 - A PureComponent implements a verification that is used to understand if the component needs to be rerendered or not, based on its state/props change. A common Component doesn't implement this by default and will be rerendered on every state/prop change.
The problem is that a PureComponent doesn't have a deep validation, so since it is only shallow, if you have any changes on nested props, you may not have the desired result because it may not be rerendered;

2 - If a context value is changed, every component that are subscribed to this context and its children will be rerendered, but if any of these components implements a custom shouldComponentUpdate that only relies on its passed props/state, it can prevent a rerender and will not use context updated values.

3 - Callback function, context, state management libraries like redux

4 - ShouldComponentUpdate if it is a class component, React.memo

5 - Every component in React should return only one element. React Fragment have been created to simulate an element without it being created in the HTML DOM. As an example, lets imagine that we have a parent component that implements a grid layout, and we have a component that needs to return a list of elements that are basically the grid items. Since React expect us to return only one element, if we return our list wrapped in a div, the parent grid will only count as one grid item. In this case, we can return our list inside a React Fragment, and since it will not exist in the actual HTML DOM, grid items will be our actual list.

6 - HOCs that implement action/events in the component, HOCs that implements connections to store/state management, HOCs that implements component composition

7 - Promises deal with exceptions in an non-blocking way, so the code after the promise will be executed, and the exception will be handled inside the .catch() function. 
Callbacks are functions that are sent to another function and are executed after some code execution is done. You can have success callback and error callback.
Async/Await is more like an syntax sugar for promises, and it will block the execution of the code until it is completed. Exceptions should be dealt inside a try/catch block

8 - Nowadays setState takes two arguments. The first one is the state itself, can be the value directly or a function that receives the previous state. And the second argument is a callback function that is called once the new state is set. It is async because it is a heavy and complex operations, it can trigger a lot of rerenders depending on the composition and this could led to some clunky UI issues if it was synchronous

9 - I can think of a few
- Remove everything related to context (this)
- Move all state to hooks like useState
- Move all logic from shouldComponentUpdate/componentWillUnmount/componentDidMount to hooks like useEffect/useMemo
- Move all class functions to common functions

10 - You can use pure css with classNames props in elements. There is also a few CSS-in-JS approachs like styled-components that makes writing styles a lot flexible and easier to deal with states. You can also use css pre-processors like sass and less that helps with reusing css code through different files and classes

11 - Using the dangerouslySetInnerHTML prop
