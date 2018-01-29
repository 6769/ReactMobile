import * as React from 'react';
import * as ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {OneTopic} from './forum/Network';
import {PostContent} from './component/PostContent';
import {getTopicId} from './forum/Utility';



const onetopic=new OneTopic(getTopicId());
ReactDOM.render(
    <PostContent atopic={onetopic}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
