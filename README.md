# SB Frontend case
React app that fetches, posts and displays messages.

## Dependencies
[React Transition Group](http://reactcommunity.org/react-transition-group/)
[React Router DOM](https://reactrouter.com/web/guides/quick-start)

## Notes
I usually prefer strong type systems. In the future I'd like to use something like
[PropTypes](https://www.npmjs.com/package/prop-types) and/or use TypeScript. Considering
I was also getting used to React while writing this, I opted out of adding more layers of
things that would make me need more practice. I did some searching online, 
[Redux](https://redux.js.org/introduction/getting-started) looked nice for future projects
but seemed overkill here. All in all it was a good experience.

### Costly mistakes
These are the things I found challenging, or cost me some time to fix:
1. Deciding on what component should own what state.

...I decided to lift the posts state to the App, so I could update it from one child and view the
results in the other. I think it is the right way to do it, but it comes at a cost of more renders.

2. Figuring out the hard way that you shouldn't update a state within a state update hook.

3. A function that returns JSX inside a component is not an actual component.

...This resulted in the routing troubles.