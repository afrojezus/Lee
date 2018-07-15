import * as React from 'react';
import * as electron from 'electron';

export class Bar extends React.Component<{}, {}> {

    minW = () => {
        return electron.remote.getCurrentWindow().minimize();
    }

    maxW = () => {
        if (electron.remote.getCurrentWindow().isMaximized()) {
            return electron.remote.getCurrentWindow().unmaximize();
        } else {
            return electron.remote.getCurrentWindow().maximize();
        }
    }

    closeW = () => {
        return electron.remote.getCurrentWindow().close();
    }

    render() {
        return (
            <div className='bar'>
                <span>Lee</span>
                <div className='dropover'>
                    <span>File</span>
                    <div className='dropover-content'>
                        <ul>
                            <span>Open file</span>
                        </ul>
                        <ul>
                            <span>Stream URL</span>
                        </ul>
                        <ul>
                            <span>Exit</span>
                        </ul>
                    </div>
                </div>
                <div className='dropover'>
                    <span>Options</span>
                    <div className='dropover-content'>
                        <div className='dropover-content'>
                            <ul>
                                <span>Quality...</span>
                            </ul>
                            <ul>
                                <span>Subtitles...</span>
                            </ul>
                            <ul>
                                <span>UI...</span>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='dropover'>
                    <span>Help</span>
                    <div className='dropover-content'>
                        <div className='dropover-content'>
                            <ul>
                                <span>Terms of usage</span>
                            </ul>
                            <ul>
                                <span>Licenses</span>
                            </ul>
                            <ul>
                                <span>About Lee</span>
                            </ul>
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1 }} />
                <button onClick={this.minW} className='bar-button'>
                    <svg x='0px' y='0px' viewBox='0 0 10.2 1'><rect x='0' y='50%' width='10.2' height='1' /></svg>
                </button>
                <button onClick={this.maxW} className='bar-button'>
                    <svg viewBox='0 0 10 10'><path d='M0,0v10h10V0H0z M9,9H1V1h8V9z' /></svg>
                </button>
                <button onClick={this.closeW} className='bar-button close'>
                    <svg viewBox='0 0 10 10'>
                        <polygon points='10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1' /></svg>
                </button>
            </div>
        );
    }
}