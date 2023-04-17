export const Introduction = () => (
  <>
    <h1>Modal Demo</h1>
    <p>There are two types of modals in this demo application:</p>
    <ol>
      <li>
        <p>
          A modal built with the standard HTML <code>{'<dialog>'}</code>{' '}
          element. If I were tasked to build a modal, using this method would be
          my preference since it comes with built in{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility_considerations"
            target="_blank"
          >
            accessibility features that implicitly handles ARIA attributes
          </a>{' '}
          and usability features that handles focus trapping. The implementation
          is also{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#browser_compatibility"
            target="_blank"
          >
            stable across all modern browsers
          </a>
          , so compatibility shouldn't be an issue unless legacy browser support
          is required.
        </p>
        <p>
          The downside of this approach is that the built in JavaScript{' '}
          <code>dialog</code>
          methods do not have React bindings, so the developer must create them.
          My implementation uses the <code>useImperativeHandle()</code> hook to
          create these bindings rather than <code>useEffect()</code> for
          performance reasons. However, this also makes the code less "React"-y
          since it requires the use of more refs to access the modal's methods.
          This could conflict with the code style or standards used in the rest
          of the codebase.
        </p>
      </li>
      <li>
        <p>
          A custom modal built with React. I chose to include this
          implementation because I feel like this is closer to the spirit of the
          assessment. This uses a React portal to the body element and renders
          the modal based on the <code>open</code> prop, behaving similarly to
          the HTML <code>{'<dialog>'}</code>. This approach relies more on code
          rather than on browser implementations.
        </p>
      </li>
    </ol>
    <h2>Assumptions</h2>
    <ul>
      <li>
        <p>
          In both demonstrated approaches, exit animations aren't possible
          without adding extra code since browsers don't offer a native way of
          transitioning elements being removed from the DOM. I felt it was out
          of scope for this release.
        </p>
      </li>
      <li>
        <p>
          I chose not to add a <code>title</code> prop that would render the
          modal titles because it reduces flexibility and risks pigeonholing
          their usage to only what my implementation allows. Unfortunately, this
          means that it is the responsibility of the developer to include the{' '}
          <code>aria-labelledby</code> attribute for accessibility.
        </p>
      </li>
      <li>
        <p>
          There is no maximum amount of nested modals imposed by the component,
          it should be up to the developer to decide whether having too many
          nested dialogs is detrimental to UX.
        </p>
      </li>
    </ul>
  </>
);
