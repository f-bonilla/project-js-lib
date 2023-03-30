const EventsManager = (view)=>{
  let listeners = {};
  return {
    suscribe: (listener, event, callback)=>{
      if(!listeners) return;
      if(!listeners[event]) listeners[event] = [];
      listeners[event] = [listener, callback];
      listener.addEventListener(event, callback);
    },
    unsuscribe: (listener, event)=>{
      if(listeners[event]){
        listener.removeEventListener(event, listeners[event][1]);
        delete listeners[event];
      }
    },
    send: (event, props)=>{
      view.dispatchEvent(new CustomEvent(event, {detail: props}));
    },
    destroy: ()=>{
      let el, cb;
      for(let event in listeners){
        el = listeners[event][0];
        cb = listeners[event][1];
        el.removeEventListener(event, cb);
      }
      listeners = null;
    },
  };
};

export default EventsManager;