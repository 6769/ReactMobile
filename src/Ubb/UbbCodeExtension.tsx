﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as Ubb from './Core';
import { BTagHandler } from './BTagHandler';
import { ImageTagHandler } from './ImageTagHandler';
import { ITagHandler } from './ITagHandler';
import { SizeTagHandler } from './SizeTagHandler';
import { QuoteTagHandler } from './QuoteTagHandler';
import { ColorTagHandler } from './ColorTagHandler';
import { UrlTagHandler } from './URLTagHandler';
import { UTagHandler } from './UTagHandler';
import { DelTagHandler } from './DelTagHandler';
import { MP3TagHandler } from './MP3TagHandler';
import { CursorTagHandler } from './CursorTagHandler';
import { EnglishTagHandler } from './EnglishTagHandler';
import { UserTagHandler } from './UserTagHandler';
import { CodeTagHandler } from './CodeTagHandler';
import { FontTagHandler } from './FontTagHandler';
import { AlignTagHandler } from './AlignTagHandler';
import { UploadTagHandler } from './UploadTagHandler';
import { LeftTagHandler } from './LeftTagHandler';
import { CenterTagHandler } from './CenterTagHandler';
import { RightTagHandler } from './RightTagHandler';
import { TableTagHandler } from './TableTagHandler';
import { TdTagHandler } from './TdTagHandler';
import { ThTagHandler } from './ThTagHandler';
import { TrTagHandler } from './TrTagHandler';
import { TopicTagHandler } from './TopicTagHandler';
import { MdTagHandler } from './MdTagHandler';
import { PmTagHandler } from './PmTagHandler'
import SandBoxTagHandler from './SandBoxTagHandler';
import LineTagHandler from './LineTagHandler';
import EmTagHandler from './EmTagHandler';
import AcTagHandler from './AcTagHandler';
import MahjongTagHandler from './MahjongTagHandler';
import TbTagHandler from './TbTagHandler';

import UrlTextHandler from './UrlTextHandler';
import { VideoTagHandler } from './VideoTagHandler';
import UrlTextHandler2 from './UrlTextHandler2';
/**
 * 创建一个具有所有功能的默认引擎。
 */
export function createEngine(): Ubb.UbbCodeEngine {

	const engine = new Ubb.UbbCodeEngine();

	// 在此处添加引擎所支持的所有标签处理器
	engine.handlers.register(BTagHandler);
	engine.handlers.register(ImageTagHandler);
	engine.handlers.register(ITagHandler);
	engine.handlers.register(SizeTagHandler);
	engine.handlers.register(QuoteTagHandler);
	engine.handlers.register(ColorTagHandler);
	engine.handlers.register(UrlTagHandler);
	engine.handlers.register(UTagHandler);
	engine.handlers.register(DelTagHandler);
	engine.handlers.register(MP3TagHandler);
	engine.handlers.register(CursorTagHandler);
	engine.handlers.register(EnglishTagHandler);
	engine.handlers.register(UserTagHandler);
	engine.handlers.register(CodeTagHandler);
	engine.handlers.register(FontTagHandler);
	engine.handlers.register(AlignTagHandler);
	engine.handlers.register(UploadTagHandler);
	engine.handlers.register(LeftTagHandler);
	engine.handlers.register(CenterTagHandler);
	engine.handlers.register(RightTagHandler);
	engine.handlers.register(TableTagHandler);
	engine.handlers.register(TdTagHandler);
	engine.handlers.register(ThTagHandler);
	engine.handlers.register(TrTagHandler);
	engine.handlers.register(TopicTagHandler);
	engine.handlers.register(MdTagHandler);
	engine.handlers.register(SandBoxTagHandler);
	engine.handlers.register(LineTagHandler);
	engine.handlers.register(PmTagHandler);
    engine.handlers.register(VideoTagHandler);

	// 以下是未命名标签处理程序，注意未命名标签处理程序的命中和注册顺序有关
	engine.handlers.register(EmTagHandler);
	engine.handlers.register(AcTagHandler);
	engine.handlers.register(MahjongTagHandler);
	engine.handlers.register(TbTagHandler);


	// 以下是文字处理程序，注意文字的处理顺序完全取决于处理程序，请注意控制处理程序的顺序
	engine.handlers.registerText(UrlTextHandler);
	engine.handlers.registerText(UrlTextHandler2);

	return engine;
}

// 重新导出核心功能
export * from './Core';