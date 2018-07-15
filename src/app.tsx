import * as React from 'react';
import { Bar } from './components/bar';
import { Renderer } from './components/renderer';
import { Controls } from './components/controls';

export class App extends React.Component<any, any> {
  render() {
    return (
      <div className='flex-layout'>
        <Bar />
        <Renderer />
        <Controls />
      </div>
    );
  }
}
