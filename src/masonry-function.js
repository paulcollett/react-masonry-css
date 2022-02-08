import React from "react";

const DEFAULT_COLUMNS = 2;

const reCalculateColumnCount = (breakpointCols) => {
  const windowWidth = (window && window.innerWidth) || Infinity;
  let breakpointColsObject = breakpointCols;

  // Allow passing a single number to `breakpointCols` instead of an object
  if (typeof breakpointColsObject !== "object") {
    breakpointColsObject = {
      default: parseInt(breakpointColsObject) || DEFAULT_COLUMNS,
    };
  }

  let matchedBreakpoint = Infinity;
  let columns = breakpointColsObject.default || DEFAULT_COLUMNS;

  for (let breakpoint in breakpointColsObject) {
    const optBreakpoint = parseInt(breakpoint);
    const isCurrentBreakpoint =
      optBreakpoint > 0 && windowWidth <= optBreakpoint;

    if (isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
      matchedBreakpoint = optBreakpoint;
      columns = breakpointColsObject[breakpoint];
    }
  }

  columns = Math.max(1, parseInt(columns) || 1);
  return columns;
};

const reCalculateColumnCountDebounce = (columnCountCallback, lastFrameRef) => {
  if (!window || !window.requestAnimationFrame) {
    // IE10+
    columnCountCallback();
  }

  if (window.cancelAnimationFrame) {
    // IE10+
    const lastFrame = lastFrameRef.current;
    window.cancelAnimationFrame(lastFrame);
  }

  lastFrameRef.current = window.requestAnimationFrame(columnCountCallback);
};

const itemsInColumns = (currentColumnCount, children) => {
  const itemsInColumns = new Array(currentColumnCount);

  // Force children to be handled as an array
  const items = React.Children.toArray(children);

  for (let i = 0; i < items.length; i++) {
    const columnIndex = i % currentColumnCount;

    if (!itemsInColumns[columnIndex]) {
      itemsInColumns[columnIndex] = [];
    }

    itemsInColumns[columnIndex].push(items[i]);
  }

  return itemsInColumns;
};

const logDeprecated = (message) => {
  console.error("[Masonry]", message);
};

const renderColumns = (
  children,
  currentColumnCount,
  column,
  columnAttrs = {},
  columnClassName
) => {
  const childrenInColumns = itemsInColumns(currentColumnCount, children);
  const columnWidth = `${100 / childrenInColumns.length}%`;
  let className = columnClassName;

  if (className && typeof className !== "string") {
    logDeprecated('The property "columnClassName" requires a string');

    // This is a deprecated default and will be removed soon.
    if (typeof className === "undefined") {
      className = "my-masonry-grid_column";
    }
  }

  const columnAttributes = {
    // NOTE: the column property is undocumented and considered deprecated.
    // It is an alias of the `columnAttrs` property
    ...column,
    ...columnAttrs,
    style: {
      ...columnAttrs.style,
      width: columnWidth,
    },
    className,
  };

  return childrenInColumns.map((items, i) => {
    return (
      <div {...columnAttributes} key={i}>
        {items}
      </div>
    );
  });
};

const Masonry = ({
  breakpointCols = undefined, // optional, number or object { default: number, [key: number]: number }
  className = undefined, // required, string
  columnClassName = undefined, // optional, string
  children = undefined, // Any React children. Typically an array of JSX items

  // Custom attributes, however it is advised against
  // using these to prevent unintended issues and future conflicts
  // ...any other attribute, will be added to the container
  columnAttrs = undefined, // object, added to the columns

  // Deprecated props
  // The column property is deprecated.
  // It is an alias of the `columnAttrs` property
  column = undefined,
  ...rest
}) => {
  const [columnCount, setColumnCount] = React.useState(() => {
    let count;
    if (breakpointCols && breakpointCols.default) {
      count = breakpointCols.default;
    } else {
      count = parseInt(breakpointCols) || DEFAULT_COLUMNS;
    }
    return count;
  });

  const lastFrameRef = React.useRef();

  const columnCountCallback = React.useCallback(() => {
    const columns = reCalculateColumnCount(breakpointCols);
    if (columnCount !== columns) {
      setColumnCount(columns);
    }
  }, [breakpointCols, columnCount]);

  React.useLayoutEffect(() => {
    columnCountCallback();
    const handleWindowResize = () => {
      reCalculateColumnCountDebounce(columnCountCallback, lastFrameRef);
    };
    // window may not be available in some environments
    if (window) {
      window.addEventListener("resize", handleWindowResize);
    }

    return () => {
      if (window) {
        window.removeEventListener("resize", handleWindowResize);
      }
    };
  }, [columnCountCallback]);

  let classNameOutput = className;

  if (typeof className !== "string") {
    logDeprecated('The property "className" requires a string');

    // This is a deprecated default and will be removed soon.
    if (typeof className === "undefined") {
      classNameOutput = "my-masonry-grid";
    }
  }
  return (
    <div {...rest} className={classNameOutput}>
      {renderColumns(
        children,
        columnCount,
        column,
        columnAttrs,
        columnClassName
      )}
    </div>
  );
};

export default Masonry;
