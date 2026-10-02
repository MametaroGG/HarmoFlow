import en from './en.json';
import zh from './zh.json';
import ko from './ko.json';
import enArticles from './help-en.json';
import zhArticles from './help-zh.json';
import koArticles from './help-ko.json';
export const dictionaries = { en, zh, ko };
export const localizedArticles = { en: enArticles, zh: zhArticles, ko: koArticles };
export const languages = [{ code: 'ja', label: '日本語' }, { code: 'en', label: 'English' }, { code: 'zh', label: '简体中文' }, { code: 'ko', label: '한국어' }];
