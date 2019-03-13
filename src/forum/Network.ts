import $ from 'jquery';
import getUserToken from './Utility';
import {Topic,APost} from './UiDataModel';



export class OneTopic{
    mtopicInfo:Topic;
    mpostContent:Array<APost>;
    muserIdToInfos:{}={};
    targetPage:number;


    protected oriPosts:any;
    finallcallback:any;
    errorcallback:any;



    constructor(tid:number) {
        this.mtopicInfo = new Topic(tid);
    }
    getPostsAndTopic(page:number,callback:Function,errorcallback:Function){
        this.finallcallback=callback;
        this.errorcallback=errorcallback;
        this.targetPage=page;
        this.getTopicInfo();

    }


    protected getTopicInfo(){
        let url:string=format(TopicUrl,this.mtopicInfo.id);
        ajaxWithTokens(url,atopicInfo=>{
            this.mtopicInfo.setTotalPages(atopicInfo.replyCount);
            this.mtopicInfo.title=atopicInfo.title;
            this.getPostsInfo();

        },this.errorcallback);
    }

    protected getUsersInfo(){

        let currentUsersUrl=USERURL;
        let userInOnePage=[];
        const para = 'id={0}&';
        let userinfotofetchCnt = 0;
        for (let i in this.oriPosts) {
            let id = this.oriPosts[i].userId;
            if (this.muserIdToInfos[id]) {
                continue;
            }
            if(userInOnePage.indexOf(id)>=0){
                continue;
            }
            currentUsersUrl += format(para, id);
            userInOnePage.push(id);
            userinfotofetchCnt++;
        }
        if (userinfotofetchCnt > 0)
        //check weather userinfos has all been cached
            ajaxWithTokens(currentUsersUrl, curruserinfos => {
                for (let i in curruserinfos) {
                    let ainfo = curruserinfos[i];
                    this.muserIdToInfos[ainfo.id] = ainfo;
                }
                this.genDataForUI();
            },this.errorcallback);
        else {
            this.genDataForUI();
        }

    }

    protected getPostsInfo(){
        let url:string=format(PostsUrl,this.mtopicInfo.id,(this.targetPage-1)*10);
        ajaxWithTokens(url,posts=>{
            this.oriPosts=posts;
            this.getUsersInfo();

        },this.errorcallback);

    }

    protected async fetchPostInfo(){
        let url:string=format(PostsUrl,this.mtopicInfo.id,(this.targetPage-1)*10);
        let apostresp=await fetch(url);
        let apostjson=await apostresp.json();
    }


    protected genDataForUI(){
        console.log('UserInfos: ',this.muserIdToInfos);
        this.mpostContent=[];
        for(let i in this.oriPosts){
            let apost=this.oriPosts[i];
            console.log('apost: ', apost);
            let apostUI=new APost();
            apostUI.setTime(apost.time);
            apostUI.postcontent=apost.content.trim();
            apostUI.floor=apost.floor;
            apostUI.userName=apost.userName;
            apostUI.userId=apost.userId;
            apostUI.posttype=apost.contentType;
            if(apost.isAnonymous){
                apostUI.anonymous=true;
                apostUI.gender=1;
                apostUI.userThumb=AnymousImg;

            }else if(this.muserIdToInfos[apost.userId]) {
                apostUI.gender=this.muserIdToInfos[apost.userId].gender;
                apostUI.userThumb=this.muserIdToInfos[apost.userId].portraitUrl;
                apostUI.anonymous=false;
            }else {//user not found in server side and local;
                apostUI.userName='ID已注销';
                apostUI.anonymous=true;
                apostUI.gender=0;
                apostUI.userThumb=AnymousImg;
            }
            this.mpostContent.push(apostUI);

        }
        if(this.finallcallback){
            console.log('push back posts',this.mpostContent);
            this.finallcallback(this.mtopicInfo,this.mpostContent);
        }


    }
}

const TopicUrl = 'https://api-v2.cc98.org/topic/{0}';
const PostsUrl = 'https://api-v2.cc98.org/Topic/{0}/post?from={1}&size=10';
const USERURL = 'https://api-v2.cc98.org/user?';
const AnymousImg = 'http://www.cc98.org/static/images/心灵头像.gif';
const AUTH = 'authorization';

function ajaxWithTokens(url:string, callback:any,errorcall:any) {
    $.ajax({
        type: "GET", dataType: "json",
        url: url, timeout: 30000,
        success: function (data) {
            if (callback)
                callback(data);
        },
        beforeSend: function (xhr) {

            let token:string = getUserToken();
            console.log('Dev:remove token function');
            if (token) {
                    xhr.setRequestHeader(AUTH, token);
            }

        },

        error: function (xhr, errmsg, excepobj) {
            if (errorcall){
                errorcall(errmsg);
            }
        },

    });
}

let format:any = function (src) {
    if (arguments.length == 0) return null;
    let args = Array.prototype.slice.call(arguments, 1);
    return src.replace(/\{(\d+)\}/g, function (m, i) {
        return args[i];
    });
};


export function _testTopicClass(id:number){
    let atopic=new OneTopic(id);
    atopic.getPostsAndTopic(1,(a,b)=>{
        console.log('topic:',a);
        console.log('posts',b);
    },console.log);
    return '123456';
}