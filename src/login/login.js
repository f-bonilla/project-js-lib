import Locale from '../locale.js';
import FileManager from '../file-manager.js';
import {getUniqueId} from '../utils.js';
import LoginView from './login-view.js';

const Login = async (containerId, loginOkCallback)=>{
	const id = 'login_' + getUniqueId();
	const cssPath = './src/login/style.css';
	const html = await FileManager.getHtml('./src/login/template.html');
	const sendForm = props=>{
		const serverResponse = props.email === 'guest@domain.com' && props.password === 'guest';
		if(serverResponse){
			loginOkCallback({email: props.email});
		}else{
			view.userMessages({
				data:[{lang: 'login_ko'}],
				message: Locale.get('login_ko')
			});
		}
	};
	const view = LoginView(id, containerId, cssPath, html, sendForm);
	return {
		id: id,
		destroy: ()=>{
			view.destroy();
		}
	}
};

export default Login;

