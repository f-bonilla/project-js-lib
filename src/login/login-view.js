import Locale from '../locale.js';
import {isEmail} from '../utils.js';
import Views from '../views.js';
import UserMessages from '../user-messages.js';

const LoginView = (id, containerId, cssPath, html, sendFormCallback)=>{
	const view = Views(id, containerId, cssPath, html);
	const output = view.get('.js-user-messages');
	const userMessages = UserMessages(output);
	let email;
	const submitForm = e=>{
		e.preventDefault();
		email = view.get('#email');
		if(isEmail(email.value)){
			sendFormCallback({email: email.value, password: view.get('#password').value});
		}else{
			userMessages.show({
				data:[{lang: 'email_ko'}],
				message: Locale.get('email_ko')
			});
		}
	};
	view.events.suscribe('submit', submitForm);
	return {
		enable: ()=>{},
		disable: ()=>{},
		userMessages: props=>userMessages.show(props),
		destroy: ()=>{
			view.destroy();
		}
	};
};

export default LoginView;

