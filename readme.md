A new masonry component powered by CSS to be fast loading and free of jQuery or other dependencies. Build specifically for React projects.

![image](https://user-images.githubusercontent.com/1904774/30821174-491e9670-a1d9-11e7-8b18-250d54858c4f.png)

### 😎 Why?

Existing solutions like React wrapped DeSandro Masonry, while great had downfalls in our react app. It required rendering the DOM on load and on during resize before determining the layout which lead to a slow, laggy experiance that in our experiance would occasionally break the layout completely during resize. It also had depenancies on jQuery and while being feature packed it showed in resulting file size.

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

<Masonry
  breakpointCols={3}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
  {/* array of JSX items */}
</Masonry>
```

And, CSS:
```SCSS
.my-masonry-grid {
  display: -webkit-box; // Not needed if autoprefixing
  display: -ms-flexbox; // Not needed if autoprefixing
  display: flex;
  margin-left: -30px; // gutter size offset
}
.my-masonry-grid_column {
  border-left: 30px solid transparent; // gutter size
  background-clip: padding-box;
}

// Style your items
.my-masonry-grid_column > div { // change div to reference your elements you put in <Masonry>
  background: grey;
  margin-bottom: 30px;
}
```

### Resposive Breakpoints

Different columns can be specified by passing an object containing key's of the window widths and their value as the number of columns. To have a fallback value, use the `default` key.

```JSX

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

### Options (Props)

* `breakpointCols={{default: 4, 800: 2}}` optional (defaults to 2 columns)
* `className` and other props are added to the container
* `columnClassName` optional, string, classname to add to each generated column
* `columnAttrs` optional, object, additional attributes to add to each generated column

### Example Demo

https://paulcollett.github.io/react-masonry-css/

### Common usage

**outputting an array of items:**
```JSX
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

<Masonry breakpointCols={myBreakpointsAndCols}>
  {items}
</Masonry>
```

### Optional, Responsive gutters
We can add the following to the above CSS to futher adjust the layout between screen sizes.
```SCSS
// Optional, different gutter size on mobile
@media (max-width: 650px) {
  .my-masonry-grid {
    margin-left: -15px; // gutter size offset
  }
  .my-masonry-grid_column {
    border-left-width: 15px; // gutter size offset
  }
  .my-masonry-grid_column > div {
    margin-bottom: 15px; // space between items
  }
}
```

### Use with Preact
Currently you can use `react-masonry-css` with Preact (https://github.com/developit/preact) via the shim (https://github.com/developit/preact-compat)

### Suggestions & Issues
https://github.com/paulcollett/react-masonry-css/issues/

**Contact me direct:**
* https://github.com/paulcollett
* http://paulcollett.com
