import Views from '../views.js';
import Locale from '../locale.js';
import EventsManager from '../events-manager.js';

const LanguageMenuView = (id, containerId, cssPath, html)=>{
	const view = Views(id, containerId, cssPath, html);
	const events = EventsManager(view);
	const languages = view.get('#change-lang');
	events.suscribe(languages, 'change', e=>Locale.change(e.target.value));
	return {
		enable: ()=>{},
		disable: ()=>{},
		destroy: ()=>{
			view.destroy();
		}
	};
};

export default LanguageMenuView;

