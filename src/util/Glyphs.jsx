import React from 'react';

export function Search(props) {
  return <svg width="16" height="16" viewBox="0 0 16 16" {...props}>
    <g stroke={props.color || "#BDBDBD"} strokeWidth="1.5" fill="none" fillRule="evenodd">
      <path d="M10 2.5c2 2 2 5.3 0 7.3s-5.4 2-7.5 0a5 5 0 0 1 0-7.3c2-2 5.4-2 7.5 0z" />
      <path d="M14.8 13.5c.3.2.3.7 0 1-.4.3-.8.3-1 0l-4.4-4.2 1.1-1 4.3 4.2z" />
    </g>
  </svg>;
}

export function ShippingIcon(props) {
  return <svg {...props} width="16" height="16" viewBox="0 0 16 16">
    <g>
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </g>
  </svg>;
}
