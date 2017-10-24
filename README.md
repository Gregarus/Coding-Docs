# React Redux Reference

## Development

### Prerequisites
This project requires the following to be installed beforehand:

* [Node.js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/en/)

On OSX, these can be installed as follows:
```sh
brew update yarn || brew install yarn
```

### Running Automated Tests
```sh
yarn test
```

### Starting a Development Server
```sh
yarn start
```

## Documentation
* [React Practices](/docs/practices)

## Libraries Used
### Automated Tests
- [Mocha](https://mochajs.org/): A command line utility that runs our tests
- [Chai](http://chaijs.com/): The assertion syntax that we use (provides the `expect` syntax)
- [Babel](https://babeljs.io/): Allows Mocha (by importing `babel-register`) to support all of the new JavaScript features

### Linting
- [Standard](https://github.com/standard/standard) - ESLint with opinionated defaults
- [Prettier](https://github.com/prettier/prettier) - Automatic code reformatting

### Type Checking
- [Flow](https://flow.org/)
- [flow-typed](https://github.com/flowtype/flow-typed) - Community-contributed type definitions for popular packages

### Testing React Components
- [Enzyme](http://airbnb.io/enzyme/): Provides a jQuery-like syntax for controlling and reading React components
- [JSDOM](http://airbnb.io/enzyme/docs/guides/jsdom.html): Provides enough browser functionality to allow unit testing in Node.js

### Compiling JavaScript for the Browser
- [webpack](https://webpack.js.org/guides/getting-started/): Compiles JavaScript (and other languages) code for the browser.
- [babel-loader](https://github.com/babel/babel-loader): Configures webpack to compile JavaScript files.
- [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html): Serves static files and `bundle.js` to the browser.

### Redux
- [Usage with React](http://redux.js.org/docs/basics/UsageWithReact.html)
- [Reselect](http://redux.js.org/docs/recipes/ComputingDerivedData.html) - Caches data computations to reduce component re-rendering
# My project's README
