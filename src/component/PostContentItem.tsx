import React, {Component} from 'react';
import {Card, WhiteSpace} from 'antd-mobile';
import {Icon, Avatar} from 'antd';

import ReactMarkdown from 'react-markdown';
import {PopUpList} from './PopUpList';
import {UbbContainer} from './UbbContainer';
import {APost} from '../forum/UiDataModel';
import './PostContentItem.scss';

export class PostContentItemProps{
    apost:APost;
}

export class PostContentItem extends Component<PostContentItemProps,{}> {

    render() {
        const apost:APost = this.props.apost;
        return (
            <div key={apost.floor} style={{padding: 5}}>
                <Card>
                    <Card.Header
                        title={
                            <span style={{fontSize: 12}}>
                            {apost.userName}
                            <WhiteSpace size="xs"/>
                                <Icon type={apost.gender ? "man" : "woman"}/>
                            </span>}
                        thumb={<Avatar shape='square' size="large" src={apost.userThumb}/>}
                        extra={<PopUpList apost={apost}/>}
                    />

                    <Card.Body>
                        <div className='ubb-container-div'>
                            {apost.posttype>0 ? <ReactMarkdown source={apost.postcontent}/>  : <UbbContainer code={apost.postcontent}/>}
                        </div>

                    </Card.Body>
                    <Card.Footer
                        content={<div style={{textAlign:'left'}}>{apost.posttime}</div>}
                        extra={<div>{getLabelForFloorX(apost.floor)}</div>}/>
                </Card>
            </div>);
    }

}

function getLabelForFloorX(i:number) {
    // pass in a post's floor value
    const FLOOR_LABELS = ["unset", "楼主", "沙发", "板凳", "地毯", "地板", "地下室"];
    let ret:string = FLOOR_LABELS[0];
    if (i < FLOOR_LABELS.length) {
        ret = FLOOR_LABELS[i]+" 楼层 " + i;
    }
    else {
        ret = "楼层 " + i;
    }
    return ret;

}


