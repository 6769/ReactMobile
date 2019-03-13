import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Modal,
    ActivityIndicator,
    Icon,
    Flex,
    Button,
    Toast,
} from 'antd-mobile';
import { Pagination } from 'antd-mobile';


import {APost,Topic} from '../forum/UiDataModel';
import {OneTopic} from '../forum/Network';
import {PostContentItem} from './PostContentItem';
import './PostContent.scss'


const backStyle = {background: '#ECECEC'};


export class PostContentProps{

    atopic:OneTopic;
}

class PostContentState{
    topicInfo:Topic;
    postsInfo:Array<APost>;
    refreshing:boolean= false;
    animating: boolean=false;
    down:  boolean=true;
    height:number;
    currentPage:number=1;
    totalPage:number=1;
}

let currentClass:PostContent;

export class PostContent extends Component<PostContentProps,any> {


    constructor(props) {
        super(props);
        console.log('topicId', this.props.atopic.mtopicInfo.id);
        this.state={
            height:document.documentElement.clientHeight,
            totalPage:1,
            currentPage:1,
            postsInfo:[],
            topicInfo: {},
            animating:false,
            refreshing: false,
        };
        currentClass=this;

    }

    errorToast(msg:any){
        console.log('Loading Error: ', msg);
        Toast.fail(msg, 2);
        currentClass.setState({
            //use [this.setState] will produce null ptr;
            animating: false,
        });
    }

    componentDidMount() {
        console.log('componentDidMount');
        let page=1;
        this.props.atopic.getPostsAndTopic(page,(topicinfo, posts) => {

            document.title=topicinfo.title ;
            this.setState({
                postsInfo: posts,
                topicInfo: topicinfo,
                totalPage: topicinfo.totalPage,
            });

        },this.errorToast);
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
        //window.scrollTo(0, 0);
    }

    loadPage(targetPage:number) {
        console.log('loadPage', targetPage);

        this.props.atopic.getPostsAndTopic( targetPage, (topicinfo, posts) => {
            this.setState({
                postsInfo: posts,
                topicInfo: topicinfo,
                currentPage: targetPage,
                refreshing: false,
                animating: false,
            });
            window.scrollTo(0, 0);
        },this.errorToast);

    }

    render() {
        return (<div className='one-topic-body' style={backStyle}>

            <div className='header-content-div'>
                <Pagination className="custom-pagination-with-icon"
                            current={this.state.currentPage}
                            total={this.state.totalPage}
                            onChange={(i)=>{
                                console.log(i);
                                this.setState({animating:true});
                                this.loadPage(i);
                            }}
                />
            </div>

            <div className='main-content-div'>
                {
                    this.state.postsInfo.map((item,index)=>(
                        <div>
                            <PostContentItem apost={item}/>
                        </div>
                    ))
                }
                <ActivityIndicator
                    toast={true}
                    text="Loading..."
                    animating={this.state.animating}
                />

            </div>
            <Button className='go-btn' onClick={() => Modal.prompt('页面跳转', '',
                [
                    {text: 'Cancel'},
                    {
                        text: 'Submit',
                        onPress: value => new Promise((resolve) => {

                            let targetPage = Number(value);
                            if (targetPage && targetPage <= this.state.totalPage) {
                                this.setState({animating:true});
                                this.loadPage(targetPage);

                                console.log(`jump:${value}`);
                                resolve();

                            } else {
                                Toast.info('看起来不像是个能跳转的地方 >.<', 2);
                            }


                        }),
                    },
                ], 'default', null, ['要去哪一页呢'])}
            >Go</Button>
            <div className='footer-content-div'>
                <Pagination className="custom-pagination-with-icon"
                            current={this.state.currentPage}
                            total={this.state.totalPage}
                            onChange={(i)=>{
                                console.log(i);
                                this.setState({animating:true});
                                this.loadPage(i);
                            }}
                />
            </div>



        </div>);


    }
}


const pageLocal={
    prevText: (<span className="arrow-align"><Icon type="left"/>Prev</span>),
    nextText: (<span className="arrow-align">Next<Icon type="right"/></span>),
};

const INDICATOR={ activate: 'release', deactivate: 'pull', release: 'loading', finish: 'finish' };

//http://www.cc98.org/topic/4748615