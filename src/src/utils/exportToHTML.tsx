import { Component } from '../types';

export const generateHTML = (components: Component[]): string => {
  const generateComponentHTML = (component: Component): string => {
    const { type, content, styles, children } = component;
    
    const styleString = Object.entries(styles)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');

    let childrenHTML = '';
    if (children && children.length > 0) {
      childrenHTML = children.map(generateComponentHTML).join('\n');
    }

    switch (type) {
      case 'heading':
        return `<h1 style="${styleString}">${content}</h1>`;
      case 'paragraph':
        return `<p style="${styleString}">${content}</p>`;
      case 'button':
        return `<button style="${styleString}">${content}</button>`;
      case 'image':
        return `<img src="${content}" style="${styleString}" alt="Image" />`;
      case 'container':
        return `<div style="${styleString}">${childrenHTML}</div>`;
      default:
        return `<div style="${styleString}">${content}</div>`;
    }
  };

  const componentsHTML = components.map(generateComponentHTML).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flexy Export</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 0;
      padding: 20px;
    }
  </style>
</head>
<body>
  ${componentsHTML}
</body>
</html>`;
};