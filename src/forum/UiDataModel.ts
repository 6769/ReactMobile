import moment from 'moment';

const DATE_FORMAT="YYYY-MM-DD h:mm A";
moment.locale('en');

export class APost{

    postcontent:string;
    posttype:number;
    floor:number;
    userName:string;
    userId:number;
    gender:number;
    anonymous:boolean=false;
    posttime:string;
    userThumb:string;

    setTime(t:string){
        this.posttime=moment(t).format(DATE_FORMAT);
    }

}

export class Topic{
    constructor(id: number) {
        this.id = id;
    }
    id:number;
    totalPage:number=1;
    public  title:string;
    public replycnt:number;

    setTotalPages(replycnt:number){
        this.replycnt=replycnt;
        this.totalPage=Math.ceil((replycnt+1) / 10.0);

    }
}