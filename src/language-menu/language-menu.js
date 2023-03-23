import FileManager from '../file-manager.js';
import {getUniqueId} from '../utils.js';
import LanguageMenuView from './language-menu-view.js';

const LanguageMenu = async (containerId)=>{
	const id = 'languagemenu_' + getUniqueId();
	const cssPath = './src/language-menu/style.css';
	const html = await FileManager.getHtml('./src/language-menu/template.html');
	const view = LanguageMenuView(id, containerId, cssPath, html);
	return {
		id: id,
		destroy: ()=>{
			view.destroy();
		}
	}
};

export default LanguageMenu;

