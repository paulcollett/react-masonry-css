A Masonry component leveraging CSS and native React rendering, for fast, responsive masonry layouts

![image](https://user-images.githubusercontent.com/1904774/30821174-491e9670-a1d9-11e7-8b18-250d54858c4f.png)

### 😎 Why?

Existing solutions like React wrapped DeSandro Masonry, while popular, don't actually leverage React's highly optimized Virtual DOM renderer and in DeSandro Masonry's case, actually renders elements twice before showing the layout. All of this is ok but we found it to lead to a slow, "laggy" user experience that would occasionally miss-render our layout.

Our need for a simple Masonry layout that was fast, used React's Virtual DOM without needing jQuery or other dependencies led us to explore what we could do with the latest techniques using just CSS within a React Component.

Between flexbox, css columns, css grid we settled on plain ol' div's and a dab of flexbox that allows for "fluid" responsive layouts by default but most importantly is true to Reacts rendering lifecycle.

*`react-masonry-css`* Is a React Component with a simple interface to order items into the desired columns at specified breakpoints. With minimal CSS this leads to a quick, reliable solution that also has great browser support along with rendering performance.


#### 😄 What does this do
* Responsive! ..always
* IE 10+
* No Dependencies - Which means no need for jQuery!
* Works with existing CSS animations on your elements, like fading in on first load
* CSS powered (Faster to render)
* Allows for Gaps (Gutters) between elements

#### 🏳️ What doesn't this do

* Works with elements with different widths
* Sorting based on height - This kills performance, so if you don't need it we're here for you

### 😲 Simple Usage

Add `react-masonry-css` to your project:

```bash
npm install react-masonry-css
```

In your React Component...
```jsx
import Masonry from 'react-masonry-css'

//...

<Masonry
  breakpointCols={3}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
  {/* array of JSX items */}
</Masonry>
```

And, CSS:
```css
.my-masonry-grid {
  display: -webkit-box; /* Not needed if autoprefixing */
  display: -ms-flexbox; /* Not needed if autoprefixing */
  display: flex;
  margin-left: -30px; /* gutter size offset */
  width: auto;
}
.my-masonry-grid_column {
  padding-left: 30px; /* gutter size */
  background-clip: padding-box;
}

/* Style your items */
.my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
  background: grey;
  margin-bottom: 30px;
}
```

### Responsive Breakpoints

Different columns can be specified by passing an object containing key's of the window widths and their value as the number of columns. To have a fallback value, use the `default` key.

```jsx

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

//...

<Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column"
>
  <div>My Element</div>
  <div>My Element</div>
  <div>My Element</div>
  <div>My Element</div>
</Masonry>
```

### Configuration Props

* `breakpointCols={{default: 4, 800: 2}}` optional (defaults to 2 columns)
* `className` for the container
* `columnClassName` class name added to each generated column

### Example Demo

https://paulcollett.github.io/react-masonry-css/demo/

### Common usage

**outputting an array of items:**
```jsx
var items = [
  {id: 1, name: 'My First Item'},
  {id: 2, name: 'Another item'},
  {id: 3, name: 'Third Item'},
  {id: 4, name: 'Here is the Fourth'},
  {id: 5, name: 'High Five'}
];

// Convert array to JSX items
items = items.map(function(item) {
  return <div key={item.id}>{item.name}</div>
});

<Masonry
  breakpointCols={myBreakpointsAndCols}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column"
>
  {items}
</Masonry>
```

### Optional, Responsive gutters
We can add the following to the above CSS to further adjust the layout between screen sizes.
```css
/* Optional, different gutter size on mobile */
@media (max-width: 800px) {
  .my-masonry-grid {
    margin-left: -15px; /* gutter size offset */
  }
  .my-masonry-grid_column {
    padding-left: 15px; /* gutter size offset */
  }
  .my-masonry-grid_column > div {
    margin-bottom: 15px; /* space between items */
  }
}
```

### Use with Preact
You can use `react-masonry-css` with [Preact](https://github.com/preactjs/preact) when using `preact/compat`

### DummyJS
Improve your frontend builds with dynamic placeholder images and dummy text from [DummyJs.com](https://dummyjs.com/).
https://www.npmjs.com/package/dummyjs

### Suggestions & Issues
https://github.com/paulcollett/react-masonry-css/issues/

**Contact me direct:**
* https://github.com/paulcollett
* http://paulcollett.com
