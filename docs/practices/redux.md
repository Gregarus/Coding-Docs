# The Redux Architecture
Before diving into the implementation details, let's get a high-level visual
overview of how a Redux application runs:

![Redux Architecture](https://camo.githubusercontent.com/5aba89b6daab934631adffc1f301d17bb273268b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343535322f415243482d5265647578322d7265616c2e676966)

Consider the following user workflows and how they fit into the above diagram.

## Initial Page Load
1. User loads the page in a browser.
2. The store is initialized with an `initialState`.
3. The React components are rendered with current values from the store

## User Performs an Action on the Page
1. User clicks on an "Increment" button.
2. The `{ type: INCREMENT }` action is created and dispatched.
3. The reducer is called with the action and the current state as arguments and returns a new state
4. The new state is persisted to the store.
5. The React components are re-rendered with new values from the store

## How To Think About It?
In an abstract sense, when a user performs an action (click on something), they
are expressing an intent (in this case, to increment a number). Action creators
translate a raw user action (like a click or a key press) into an intent
expressed using the language of the product. In other words,
`click on deposit button` is translated into `INCREMENT`.

That intent or action is then translated into an effect and executed. An action
should cause something to change in the world. In this case, `INCREMENT` causes
a number in the store to increase.

## API Requests
![Redux Architecture](https://camo.githubusercontent.com/9de527b9432cc9244dc600875b46b43311918b59/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343739302f415243482d5265647578322d657874656e6465642d7265616c2d6465636c657261746976652e676966)

Effects other than updates to the application state are usually handled by
middleware.

Considering the following workflows:

### Making an API Request
1. User sees a component render (`compomentDidMount`) or submits a form.
2. A `{ type: 'MAKE_API_REQUEST' }` action is created and dispatched.
3. A middleware notices that a `MAKE_API_REQUEST` is being dispatched.
4. The middleware makes an HTTP request.
5. The reducer is called with the `MAKE_API_REQUEST` action and returns the
   current state (with no update)
6. The React components are asked to re-render with the same values from the
   store, but built-in performance optimizations prevent re-rendering.

### Processing the Response from the API
1. The API responds with a payload.
2. The middleware creates and dispatches a
   `{ type: 'PROCESS_API_RESPONSE', payload }` action
3. The reducer is called with the `PROCESS_API_RESPONSE` action and returns a
   new state that contains the values returned from the API.
4. The React components are re-rendered with new values from the store

### Fitting Other Effects Into the Existing Mental Model
API requests are challenging to handle because they can take an unknown amount
of time to complete. They may never complete. They may fail. What do we do when
a request fails?

Also, fitting all of this into the above mental model is difficult. The API is
a user and can perform actions that change the state of the world?

Hopefully this gives a flavor of the limitations that are present within the
Redux architecture.

