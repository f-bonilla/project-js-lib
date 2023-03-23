const EventsManager = (view)=>{
  const abortController = new AbortController();
  return {
    suscribe: (event, callback)=>{
      view.addEventListener(event, callback, {signal: abortController.signal});
    },
    unsuscribe: (event, callback)=>{
      view.removeEventListener(event, callback);
    },
    send: (event, props)=>{
      view.dispatchEvent(new CustomEvent(event, {detail: props}));
    },
    destroy: ()=>abortController.abort(),
  };
};

export default EventsManager;