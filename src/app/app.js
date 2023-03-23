import FileManager from '../file-manager.js';
import {getUniqueId} from '../utils.js';
import AppView from './app-view.js';

const App = async (containerId, props)=>{
	const id = 'app_' + getUniqueId();
	const cssPath = './src/app/style.css';
	const html = await FileManager.getHtml('./src/app/template.html');
	const view = AppView(id, containerId, cssPath, html,  props);
	return {
		id: id,
		destroy: ()=>{
			view.destroy();
		}
	}
};

export default App;

