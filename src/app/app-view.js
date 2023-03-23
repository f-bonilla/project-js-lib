import Views from '../views.js';

const AppView = (id, containerId, cssPath, html, props)=>{
	const view = Views(id, containerId, cssPath, html);
	view.get('#user').textContent = props.email;
	return {
		enable: ()=>{},
		disable: ()=>{},
		destroy: ()=>{
			view.destroy();
		}
	};
};

export default AppView;

