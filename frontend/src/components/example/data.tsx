export const TestForm = () => {
  return (
    <form action="/">
      <legend>A Sample Form Legend</legend>

      <label htmlFor="name">Name: </label>
      <input name="Name" type="text" value="Name" />

      <label htmlFor="email">Email: </label>
      <input name="Email" type="email" value="Email" />

      <label htmlFor="button">Button: </label>
      <input name="button" type="button" value="Button" />

      <label>
        Single Checkbox:
        <input name="button" type="checkbox" value="checkbox1" />
      </label>
    </form>
  );
};

export const TestText = () => {
  return (
    <>
      <h1>Testing display of HTML elements</h1>
      <p>
        This page contains a bunch of HTML Elements and text. You can copy the
        source code and use it test out various CSS Properties. For testing
        purposes, you may use{' '}
        <a href="css-linking#internal">
          <dfn>internal styles</dfn>
        </a>
        . Recall that these CSS rules are placed in between the{' '}
        <code>head</code> tags using the following format:
      </p>

      <h1>This is 1st level heading</h1>
      <p>This is a test paragraph.</p>
      <h2>This is 2nd level heading</h2>
      <p>This is a test paragraph.</p>
      <h3>This is 3rd level heading</h3>
      <p>This is a test paragraph.</p>
      <h4>This is 4th level heading</h4>
      <p>This is a test paragraph.</p>
      <h5>This is 5th level heading</h5>
      <p>This is a test paragraph.</p>
      <h6>This is 6th level heading</h6>
      <p>This is a test paragraph.</p>

      <h2>Basic block level elements</h2>

      <p>
        This is a normal paragraph (<code>p</code> element). To add some length
        to it, let us mention that this page was primarily written for testing
        the effect of <strong>user style sheets</strong>. You can use it for
        various other purposes as well, like just checking how your browser
        displays various HTML elements.
      </p>

      <p>
        This is another paragraph.{' '}
        <mark>
          I think it needs to be added that the set of elements tested is not
          exhaustive in any sense.
        </mark>{' '}
        I have selected those elements for which it can make sense to write user
        style sheet rules, in my opinion.
      </p>

      <div>
        This is a <code>div</code> element. Authors may use such elements
        instead of paragraph markup for various reasons. (End of{' '}
        <code>div</code>.)
      </div>

      <blockquote>
        <p>
          This is a <i>block quotation</i> containing a single paragraph. Well,
          not quite, since this is not <em>really</em> quoted text, but I hope
          you understand the point. After all, this page does not use HTML
          markup very normally anyway.
        </p>
      </blockquote>

      <p>The following contains links to the Comm-244 home page</p>

      <p>
        <a href="http://web.simmons.edu/~grovesd/comm244">Comm-244 Website</a>,
        <a href="http://web.simmons.edu/~grovesd/comm244/week3">
          Week 3 page for class
        </a>
      </p>

      <h2>Lists</h2>

      <p>
        This is a paragraph before an <strong>unordered</strong> list (
        <code>ul</code>). Note that the spacing between a paragraph and a list
        before or after that is hard to tune in a user style sheet. You can't
        guess which paragraphs are logically related to a list, e.g. as a "list
        header".
      </p>

      <ul>
        <li> One.</li>
        <li> Two.</li>
        <li>
          {' '}
          Three. Well, probably this list item should be longer. Note that for
          short items lists look better if they are compactly presented, whereas
          for long items, it would be better to have more vertical spacing
          between items.
        </li>
        <li>
          {' '}
          Four. This is the last item in this list Let us terminate the list now
          without making any more fuss about it.
        </li>
      </ul>

      <p>
        This is a paragraph before a <strong>ordered</strong> list (
        <code>ol</code>). Note that the spacing between a paragraph and a list
        before or after that is hard to tune in a user style sheet. You can't
        guess which paragraphs are logically related to a list, e.g. as a "list
        header".
      </p>

      <ol>
        <li> One.</li>
        <li> Two.</li>
        <li>
          {' '}
          Three. Well, probably this list item should be longer. Note that if
          items are short, lists look better if they are compactly presented,
          whereas for long items, it would be better to have more vertical
          spacing between items.{' '}
        </li>
        <li>
          {' '}
          Four. This is the last item in this list. Let us terminate the list
          now without making any more fuss about it.{' '}
        </li>
      </ol>

      <p>
        This is a paragraph before a <strong>definition</strong> list (
        <code>dl</code>). In principle, such a list should consist of{' '}
        <em>terms</em> and associated definitions. But many authors use{' '}
        <code>dl</code> elements for fancy "layout" things. Usually the effect
        is not <em>too</em> bad, if you design user style sheet rules for{' '}
        <code>dl</code> which are suitable for real definition lists.
      </p>

      <dl>
        <dt> recursion </dt>
        <dt />
        <dd> see recursion </dd>
        <dt> recursion, indirect</dt>
        <dd> see indirect recursion</dd>
        <dt> indirect recursion</dt>
        <dd> see recursion, indirect</dd>
        <dt> term</dt>
        <dd>
          {' '}
          a word or other expression taken into specific use in a well-defined
          meaning, which is often defined rather rigorously, even formally, and
          may differ quite a lot from an everyday meaning
        </dd>
      </dl>
    </>
  );
};
