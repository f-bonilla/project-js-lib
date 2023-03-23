'use strict';

import Locale from './locale.js';
import LanguageMenu from './language-menu/language-menu.js';
import Login from './login/login.js';
import App from './app/app.js';

await Locale.init(['./i18n/es.json', './i18n/en.json']);
await LanguageMenu('root');
const loginOk = props=>{
  login.destroy();
  login = null;
  App('root', props);
};
let login = await Login('root', loginOk);
