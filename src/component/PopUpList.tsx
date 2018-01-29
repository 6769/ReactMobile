import {Popover, Icon} from 'antd-mobile';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {APost} from '../forum/UiDataModel';


import {Textsms, Face, Comment} from 'material-ui-icons';

const Item = Popover.Item;

const iconStyles = {
    marginLeft: -5,
    marginTop: -3,
    whiteSpace: 'nowrap',
    paddingRight: 5,
    color: 'gray',
};

function quoteRefer(apost: APost) {
    console.log(apost.userName, apost.postcontent);
    if (window.nativeface) {
        window.nativeface.replyHasRefers(apost.userName, apost.postcontent);
    }
}

function messageToUser(apost: APost) {
    let id = apost.userId;
    console.log(id);
    if (id) {
        if (window.nativeface) {
            window.nativeface.userMessageSend(id);
        }
    }
}

function viewUser(apost: APost) {
    let id = apost.userId;
    console.log(id);
    if (id) {
        if (window.nativeface) {
            window.nativeface.userProfileView(id);
        }
    }
}


const valuesForHint = [quoteRefer, messageToUser, viewUser];

export class PopUpListProps {
    apost: APost;
}


export class PopUpList extends Component<PopUpListProps> {
    state = {
        visible: false,
        selected: '',
    };
    onSelect = (opt) => {
        console.log(opt.props);
        const value = opt.props.value;
        valuesForHint[value](this.props.apost);


        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };

    render() {
        return (<div>
            <Popover placement='bottomRight' mask={true}   overlayStyle={{color: 'currentColor'}}
                     visible={this.state.visible}
                     overlay={[
                         (<Item key="0" value={0} icon={<Comment style={iconStyles}/>}>Quote</Item>),
                         (<Item key="1" value={1} disabled={this.props.apost.anonymous}
                                icon={<Textsms style={iconStyles}/>}>Message</Item>),
                         (<Item key="2" value={2} disabled={this.props.apost.anonymous}
                                icon={<Face style={iconStyles}/>}>User</Item>),
                     ]}

                     onVisibleChange={this.handleVisibleChange}
                     onSelect={this.onSelect}
            >
                <div style={{
                    height: '100%',
                    alignItems: 'center',
                }}
                >
                    <Icon type="ellipsis"/>
                </div>
            </Popover>
        </div>);
    }
}