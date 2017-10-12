A new masonry component powered by CSS to be fast loading and free of jQuery or other dependacies. Build specifically for React projects.

![image](https://user-images.githubusercontent.com/1904774/30821174-491e9670-a1d9-11e7-8b18-250d54858c4f.png)

### 😎 Why?

Existing solutions like React wrapped DeSandro Masonry, while great had downfalls in our react app. It required rendering the DOM on load and on during resize before determining the layout which lead to a slow, laggy experiance that would occasionally break the layout completely during resize. It also had depenancies on jQuery and while being feature packed it showed in the large file size.

To combat this, we looked into the latest techniques using just CSS, including flexbox & grid which fell short for anything other than basic images. CSS columns came the closest though the ordering reflow (orders down each column before reflowing to the next) visually broke when working with large different sized  elements.

Plain ol, div columns to the rescue!

*`react-masonry-css`* Is a React Component with a simple interface to order items into the desired columns at specified breakpoints. With minimal CSS this leads to a quick, reliable solution that also has great browser support along with rendering performance.

#### 🏳️ What doesn't this do

* Animate when sorting
* Work with elements with different widths
* Box algorithm (not really needed if your elements have the same width)
* Break when resizing (at least, thats the goal)
* Load and render the DOM before sorting out the layout <= actually thats a plus

#### 😄 What does this do
* Responsive! ..always
* IE 9+ CSS Support
* Depedancy & jQuery free
* Work with existing load animations (say fade in)
* CSS powered (Fast loading & Performant)
* Allow for Gutters


### 😲 Simple Usage

Add `react-masonry-css` to your project:

`npm install react-masonry-css --save-dev`

In your React Component...
```JSX
import Masonry from 'react-masonry-css'

//...

var breakpointColumnsObj = {
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

And, CSS:
```SCSS
.my-masonry-grid {
  display: flex; // Make sure to autoprefix for full x-browser support
  margin-left: -20px;
}
.my-masonry-grid_column {
  border-left: 20px solid transparent;
  background-clip: padding-box;
}

// Style your items
.my-masonry-grid_column > div { // change div to reference your elements in <Masonry>
  background: grey;
  margin-bottom: 20px;
}
```

### Options (Props)

`breakpointCols={{default: 4, 800: 2}}` optional (defaults to 2 columns)

takes an object of key values. Each key is the breakpoint and the value is the number of columns

**Usage:**

```JSX
var myBreakpointsAndCols = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

<Masonry breakpointCols={myBreakpointsAndCols}>
  {/* array of JSX items */}
</Masonry>
```

* `className` and other props are added to the container
* `columnClassName` optional, string, classname to add to each generated column
* `columnAttrs` optional, object, additional attributes to add to each generated column

### More Examples

**outputting an array of items:**
```JSX
const items = [];

items.push(<div key="1">My First Item</div>);
items.push(<div key="2">Second Baby</div>);

<Masonry breakpointCols={myBreakpointsAndCols}>
  {items.map(jsx => jsx)}
</Masonry>
```

### Use with Preact
Currently you can use `react-masonry-css` with Preact (https://github.com/developit/preact) via the shim (https://github.com/developit/preact-compat)

### Suggestions & Issues
https://github.com/paulcollett/react-masonry-css

**Contact me direct:**
* https://github.com/paulcollett
* http://paulcollett.com
