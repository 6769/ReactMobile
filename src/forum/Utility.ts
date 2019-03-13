
declare global {
    interface Window { nativeface : any; }
}

window.nativeface = window.nativeface || '';
const javaPart = window.nativeface;



export default function getUserToken():string {
    //instant return token;
    if (javaPart === '') {
        console.log('Null of UserToken');
        return '';
    } else {
        let token:string = javaPart.getUserToken();
        console.log('UserToken (Partial): ' + token.substr(0, 16));
        return token;
    }
}

function getUrlPara(keys: string): string {
    let reg = new RegExp('(^|&)' + keys + '=([^&]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg);  //匹配目标参数

    if (r != null) {
        let ret = decodeURI(r[2]);
        console.log(keys, ret);
        return ret;
    }

    return ''; //返回参数值
}


export function getTopicId(): number {
    //get topicId from url part;
    let id = Number(getUrlPara('id'));
    console.log('GetTopicId: ', id);
    return id;
}
