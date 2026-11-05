# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.








# Trail Head: Phase 2 (Context refactor)


## What changed?

Phase 1 was done to realise the pain of prop drilling. Phase 1 passed trails and callbacks through props.
But,Phase 2 movesthem into TrailsContext. Filters stayed in the URL.


## 1.Provider placement

**Decision:** (outside the router / inside RootLayout): Decide
whether it goes outside the router or inside the layout route

**What I tried:**

Outside the router:
1.It survives every navigation, including routes outside the layout.
2.errorElement: <NotFoundPage /> can still call useTrails(), because it renders inside the provider.
3.The data layer doesn’t depend on layout code.

Inside RootLayout:
1.It also survives navigation between child routes, since the layout stays mounted.
2.But state is lost if the user ever lands on a route outside that layout.
3.When errorElement triggers, it replaces the layout, so the provider unmounts with it. A NotFoundPage that reads trails would then throw.
4.It couples trail data to the layout.



## 2.useMemo() on TrailContextProvider....(Requirement 8)

```Memoise the value you pass to the provider so it is not rebuilt on every render for no
reason. Be prepared to explain what that does and does not fix.```

It does: keep the value object’s identity the same across renders when none of its contents changed. Context compares value by reference. Without useMemo, any time TrailsProvider re-renders for a reason other than its own state (its parent re-rendering, for example), a new object is created and every consumer re-renders for nothing.

It doesn’t: stop consumers re-rendering when trails really changes. Every component calling useTrails() re-renders on any change to the value, even if it only uses toggleWalked. Fixing that takes split contexts (one for state, one for actions) or a state library.

An honest caveat: in this app the provider sits near the top and rarely re-renders without a state change, so useMemo is nearly a no-op in practice. It’s correct and cheap, and it prevents a bug that appears as the app grows.


## 3.props and context.... (Requirement 6)

```TrailCard may still receive a single trail prop, and DifficultyBadge may still receive a
difficulty string. That is data belonging to one item, not shared state, and passing it down
is correct. Know the difference and be ready to explain it.```

1.props are for data that belongs to one item or one instance (trail, difficulty)
2. Context is for state that many unrelated components read or change
3. WalkedToggle changes the shared list, so it gets the function from context
4. It still needs to know which trail, and that’s item data, so it takes the trail as a prop.

//Nepali ma: yo concept ley garda props haru lagvag sab gayeb hunxa trailGrid ma ni filtered prop array aaudaina, direct useFilteredTrail.js bata aauxa.
just trailCard ma single item prop matra aauxa. difficulty ma ni same.


 Questions to answer in the README

1. What problem does Context solve, and what problem does it not solve?

    It solves prop drilling. TrailGrid used to carry onToggleWalked without using it, and now TrailCard reaches the function directly.

    It doesn’t solve everything. It’s a delivery mechanism, not a state manager, because the state still comes from useState. It doesn’t persist across refresh, and it doesn’t prevent re-renders (every useTrails() caller re-renders when the value changes). It also doesn’t replace props for item-level data.


2. You kept trail as a prop on TrailCard but moved the trail array into Context. Why is that the right line to draw?

    A card is about one specific trail, so the data is part of what the component is. If TrailCard read “its” trail from context, it would need to know which one, which means passing an id anyway. Passing the trail also keeps the card reusable and testable without a provider. The array and the actions are shared, because many unrelated components need them.


3. Filters live in the URL and trails live in Context. What is the rule you used to decide which state goes where?

    The deciding rule. Ask these in order:

        A.Should someone be able to link to this, refresh and get the same view, or step through it with Back? That’s URL.
        B.Do many distant components read or change it? That’s Context.
        C.Does it describe one item? That’s props.
        D.Can it be computed from other state? Don’t store it.


4. Where did you place the provider relative to the router, and what would break if you put it in the other place?

    A provider can only serve components beneath it, and it keeps its state only as long as it stays mounted.

        >>Outside the router means it’s mounted for the life of the app, and everything the router renders, including error pages, sits beneath it.
        >>Inside RootLayout means it exists only while that layout is rendered. When an errorElement renders, it replaces the layout, so the provider unmounts along with it.


5. Where did you calculate the stats, and why did you not put them in useState?

    The stats are computed in StatsPage from trails. Storing them in useState would create a second copy of the truth, and you’d have to keep it in sync with every toggle, add and remove. Miss one place and the page lies. Computing during render makes the stats impossible to be out of date. useMemo is only a cache so the work doesn’t repeat. It stores nothing of its own.


6. What is the difference between <Link>, <NavLink> and useNavigate, and when would you reach for each?

    Three tools, three jobs:

        A. <Link> is for the user clicking to go somewhere. It renders a real <a>, so right-click, open in new tab and screen readers all work. Your card titles and the “Back to trails” link use it.
        B. <NavLink> is a Link that knows whether its destination matches the current URL, so it can style itself as active. It belongs in navigation menus. Yours is in NavItem.
        C. useNavigate() is for navigating from code, after something happens that isn’t a click on a link. You use it after the form submit (go to the new trail), after removing a trail, and for the empty-state button.


7. What does end do on a NavLink, and did your nav need it?

    By default NavLink matches by prefix. A link to /trails is active on /trails and also on /trails/tr-001. That’s often what you want, because the detail page belongs to the Trails section. end makes it match only the exact path. It’s essential for a link to /, which would otherwise be active on every page, because every URL starts with /.
