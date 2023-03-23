import Views from '../views.js';
import Locale from '../locale.js';

const LanguageMenuView = (id, containerId, cssPath, html)=>{
	const view = Views(id, containerId, cssPath, html);
	view.events.suscribe('change', e=>Locale.change(e.target.value));
	return {
		enable: ()=>{},
		disable: ()=>{},
		destroy: ()=>{
			view.destroy();
		}
	};
};

export default LanguageMenuView;

