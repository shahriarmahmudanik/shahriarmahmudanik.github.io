# Learning guide: how this site works

Read in this order. Each step: open the file, read it, then do the exercise.

## 1. The big picture
- `index.html` has one `<div id="root">`. `src/main.tsx` tells React to draw `<App />` inside it.
- A **component** is a function that returns JSX (HTML-like markup). Components nest like HTML tags.
- **Props** = inputs to a component. **State** (`useState`) = data that changes and redraws the component.
- **Hooks** (`useEffect`, `useRef`, your own `useXxx`) = reusable behaviour inside components.

## 2. Files, easiest to hardest
1. `src/types.ts` - TypeScript shapes of your data.
2. `src/data/profile.ts`, `projects.ts` - all text. Change something, save, watch the page update.
3. `components/Footer.tsx`, `Services.tsx` - map over an array to render a list (`.map` + `key`).
4. `components/Reveal.tsx` - framer-motion `whileInView`: the scroll fade-in used everywhere.
5. `components/Header.tsx` - `useState` for menu open/closed, `useEffect` for scroll and Escape key (with cleanup).
6. `hooks/useTyping.ts` - state machine with `setTimeout`; the typing roles.
7. `hooks/useCountUp.ts` + `components/About.tsx` - `requestAnimationFrame`, `useInView`.
8. `components/ProjectGrid.tsx` + `ProjectCard.tsx` - filter state, `AnimatePresence`, `layout` animations.
9. `hooks/useGitHubRepos.ts` + `GitHubRepos.tsx` - fetching: loading / success / error, abort, caching.
10. `components/Contact.tsx` + `lib/validate.ts` - controlled inputs, validation, submit handling.
11. `App.tsx`, `pages/*` - routing with react-router (`/`, `/projects/:slug`, `*`).
12. `hooks/useSpotlight.ts` + `Hero.tsx` - refs and direct DOM updates for smooth animation.
13. `*.test.ts(x)` - how tests are written.

## 3. Exercises
1. Add a 7th project in `projects.ts`; check the card and its detail page appear.
2. Change the accent colour in `index.css` (`--accent`).
3. Add a new role to `roles` and watch the typing line.
4. Add a "Blog" link to the menu in `Header.tsx`.
5. Add a third project type (e.g. 'WordPress') in `types.ts` and a project using it.
6. Write a test for `Services` that checks all three titles render.
7. Show 9 repos instead of 6 (`useGitHubRepos(user, 9)`).

## 4. Interview topics this project covers
components and props, state, effects and cleanup, refs, custom hooks, lists and keys, controlled forms,
routing, data fetching, accessibility (reduced motion, labels, focus), TypeScript basics, tests,
responsive CSS, deployment.
