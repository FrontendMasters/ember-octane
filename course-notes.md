# Course Notes

- open source for spa apps https://frontendmasters.com/courses/ember-octane/introduction/
- linkedin is invested in the ember community on linked. biggest spa app as of 2019
- ember is opinionated. for common solutions to make it good. once there is a solution for a problem, everyone is going to use it
- Stability without stagnation to use the upgrade path. Take the community from the ie 8 ages to the present with reasonable migration paths. There are no points of time to rewrite.

## Key things

- Declarative templates
- Glimmer components
- Routing and networking
- Services
- Tests
- Server rendering and pwa

## Editions

- Ember's major releases are really boring. Old code that has been deprecated
- Never ever introduce new features in a major release

## Running it

- `ember serve`
- Top level template is `app/templates/application.hbs`
- handlebars is a super-set of html

## components

- `components` folder within templates folder. Then the components can be referenced without importing. Feels like Rails

## parameterized components

- Pass in parameters to build up html
- Use named arguments to pass in parameters like `@title="hello"`
- Immutable piece of data that's being passed in from the outside
- `{{}}` is a handlebars expression. similar to tagged template literals
- component cannot change these values. they are immutable. this is similar in react to props. in ember, they are called arguments or args for short
- parameterized our component

## helpers

- Format a date
- Get the helper with a regular function. with a thin ember wrapper. if I ever need the same utility elsewhere, we have that behavior in its simplest most reusable form
- `ember g util date`. ember cli code generation utilities. ember generate = ember
- Testing mocha or qunit https://guides.emberjs.com/v1.10.0/testing/unit-testing-basics/
- mocha tests throw errors which means you can't solve all the problems. qunit gets a complete run of the test suite
- See the test runner `http://localhost:4200/tests`
- Passing in a helper `{{format-timestamp "05-01-2019"}}`. passing positional arguments to a helper
- params passes in array of the arguments. `{{format-timestamp params}}`

```js
// hash is the key value pairs
export default helper(function formatTimestamp(params/*, hash*/) {
  debugger;
  return params;
```

- fun ember shell around. should be writing thin helpers
- minimize integration tests to make sure that things are wired up

# Routing

- `/tests` is the test runner
- '/' is the root route
- get unrecognized url error when you go to a route that doesn't exist
- application hbs always shown
- `ember g route teams`
- `ember g route login` for rudimentary login setup
- in the router.js the maps over the function. `app/router.js`
- extend from route base class within the `app/routes` folder
- when you have nested content, with a parent route, you can use the `{{outlet}}` helper to render the child route
- Throws error "UnrecognizedURLError" if route not found
- Root application file is good for use if you need to include something like google analytics on all pages

## Linking to routes

- a tag is navigate request. full page refresh
- can't have a regular link in this spa
- `<LinkTo>` component ember-provided component. Must provide model @route or @models or @query params
- `<LinkTo> @route="login"` with glimmer components
- can customize to be `@tagName="button"` to ensure that it is the right tag for accessibility

## Acceptance tests

- imitate user behavior. should be thinking in terms of type into the following thing into this input
- should not try to reach into a component and observe non-rendered state. may not be best for what the acceptance test is trying to do
- `ember generate acceptance-test logout`
- `visit` is a test helper that will visit a url
- excellent for protecting critical workflows from regression
- `this.pauseTest()` is a test helper that will pause the test runner. can use the live app to poke and test at it rather than hitting play in the debugger. Using this will ensure that the import is not added hanging around in the codebase
- `click` is a test helper that will click on a selector

## User interaction

- Ember octane actions
- handle all of your actions within components is the best practice increasingly in the community. keep complexity in the component layer
- `ember g component login-form`
  next: https://frontendmasters.com/courses/ember-octane/event-handling-with-the-on-modifier/

## Event handling

- component js class can have a method when an event triggered
- modifier is always used in html element space. floating in a dom tag.
- `on` is a modifier. `{{on "click" this.handleClick}}`
- `{{ on "submit" this.onLoginFormSubmit}}` within the form tag. `this` is available in the component. `this` is the component instance. `this.onLoginFormSubmit` is a method on the component instance. it has improved in templates.
- `each` looping construct in ember templates is a future way of handling
- for spas, need to `event.preventDefault()` to intercept the form submit event
- `on` handler has to be within the form tag to listen to submit event

## Refactor with action

- Keep actions thin
- Delegate to something vanilla as quickly as possible. Update a helper to be within the same class
- Dom elements use `this` for form event happening. The component's js class should be an abstraction
- Decorator new js language syntax. In the proposal phase.
- import action from ember. Functions that have a particular kind of signature. critical part of enabling decorators within ember
- `action(myDecorator(target, "methodName"))`

## Test with action

- `deepEqual` will compare the two objects rather than a shallow one. will check individual members and their order

## Stateful components

- set the state of the class
- html selected attribute
- use helper called `eq` to compare the value of the selected attribute
- access the initial selection state with a this.userId from the component to the component's class
- `not` is another helper that will negate the value of the expression. similar to `!` in js
- In octane, one way data binding by default. for performance reasons
- `@action` used for on change selector. within the select html tag
- need to opt into mutations and data causing html changes
- "Uncaught Error: Assertion Failed: You attempted to update [object Object].userId to "2", but it is being tracked by a tracking context, such as a template, computed property, or observer. In order to make sure the context updates properly, you must invalidate the property when updating it. You can mark the property as `@tracked`, or use `@ember/object#set` to do this."
- `@tracked` to set the allow setting the property `import { tracked } from '@glimmer/tracking';`
- derived state relies on another value
- ember 3.4 tracked properties. enabled in the first stable release of octane

## Handlebars conditionals if helper

- `{{#if this.isDisabled}}` is a block helper. `{{/if}}` is the end of the block helper
- can be used `class="{{if this.isDisabled "bg-grey" "bg-teal-dark"}}` inline as well to set classes. it's like a ternary operator.

## Integration tests for stateful components

- Use `fillIn` from ember test helpers to fill in the input field
- `find` is like query selector but is a constrained query selector so the test runner html doesn't get in the way

## Service

https://frontendmasters.com/courses/ember-octane/services/

- Service is a class whose instances can connect various unrelated things together
- Similar to react's context api
- `ember generate service auth`
- singleton scoped to the application
- will use local storage in order to survive a reload
- can use inject from ember service to inject the service into the component. seems like a convention to import inject as service

## Stubbing service

- Since we're using the local storage api, we need to mock this service there
- Can use pause test to hit the debugger in the mock

## Guarded login

- model hook is used to fetch data for a route
- there's also a `beforeModel` that feels like rails before action
- keep the super.before() call to ensure that the parent class's beforeModel is called. don't try to strip that out to prematurely optimize
- can await and use `async` to ensure that the beforeModel is resolved before the rest of the code is executed
- can use the param transition for aborting and retrying the transition
- don't want to trap our users with route state
- in octane, action comes in the form of a decorator. a service can have an action

## Logout

- `ember g component team-sidebar`
- Don't overwrite
- do we want to overwrite. can type d to see the diff
- actions on services is a new feature in octane -- and it's nice.
