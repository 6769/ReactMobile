import * as React from 'react';
import * as Ubb from './Core';

declare var DPlayer: any;

const vediostyle={width:"100%"};


/**
 * 处理 [video] 标签的处理器。
 */
export class VideoTagHandler extends Ubb.TextTagHandler {
    get supportedTagNames(): string {
        return 'video';
    }

    execCore(innerContent: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        //不允许显示媒体内容
        if (context.options.allowMediaContent === false) {
            return innerContent;
        }

        //return <VideoComponent src={innerContent} />;
        //2018年1月28日: added, Use pure H5 tags;
        return (
            <video style={vediostyle} src={innerContent} preload="auto" controls={true} autoPlay={false}>
                {innerContent
                    /*show url address if render failed*/}
            </video>
        );

    }
}

interface IProps {
    /**
     * 音频文件地址
     */
    src: string;
}

class VideoComponent extends React.Component<IProps> {
    /**
     * 对div的引用
     */
    div: HTMLDivElement;

    /**
     * 组件加载后初始化播放器
     */
    componentDidMount() {
        var dp = new DPlayer({
            element: this.div,
            autoplay: false,
            preload: 'metadata',
            video: {
                url: encodeURI(this.props.src)
            }
        });
    }

    render() {
        //重置继承自article的whiteSpace
        return <div className="aplayer" style={{whiteSpace: 'normal'}} ref={it => this.div = it}></div>;
    }
}
