import Tag from './html-tags.js';

const UserMessages = container=>{
  const notice = Tag.fromObject('div', {class: 'user-message display-none'});
  container.appendChild(notice);
  let timeOut;
  return {
		show: (props={})=>{
      clearTimeout(timeOut);
      props.data.forEach((key, index)=>{
        Object.keys(key).forEach((value, index)=>{
          notice.dataset[value] = key[value];
        });
      });
      notice.textContent = props.message;
      notice.className = 'user-message display-block';
      timeOut = window.setTimeout(()=>{
        notice.className = 'user-message display-none';
      }, 4000);
    }
	};
};

export default UserMessages;
