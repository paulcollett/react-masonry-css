import * as React from 'react';

export interface MasonryProps {
  breakpointCols?: number | { default: number, [key: number]: number } | { [key: number]: number };
  columnClassName?: string;
  className: string;
}

export default class Masonry extends React.Component<MasonryProps & React.HTMLProps<HTMLElement>, any> {
  render(): JSX.Element;
}
