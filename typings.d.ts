import * as React from 'react';

export interface MasonryProps {
  breakpointCols?: Object;
  columnClassName?: string;
}

export default class Masonry extends React.Component<MasonryProps & React.HTMLProps<HTMLElement>, any> {
  render(): JSX.Element;
}
