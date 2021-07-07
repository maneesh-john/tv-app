//  Types

const global = { target: {}, paused: false, shuffle: false };

function shuffleList(list){
  const shuffled = list.map((a) => ({sort: Math.random(), value: a}))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value);
  return shuffled;
}

const types = {
  getOtp: "GENERATE_ACTIVATION_CODE",
  getOtpResp: "GENERATE_ACTIVATION_CODE_RESPONSE",
  deviceActivationResp: "DEVICE_ACTIVATED",
  getPlaylist: "GET_PLAYLISTS_AND_DISPLAY_STATE",
  getPlaylistResp: "GET_PLAYLISTS_AND_DISPLAY_STATE_RESPONSE",
  playlistUpdateResp: "UPDATED_PLAYLISTS",
  changePlaylistResp: "CHANGE_PLAYLIST"
}

//  Components

function splash(){
  return {
    id: "splash",
    layout: () => {
      const d1 = document.createElement("div");
      d1.setAttribute("id", "splash");
      d1.classList.toggle("modal");
      const d2 = document.createElement("div");
      d2.classList.toggle("overlay");
      const img = document.createElement("img");
      img.setAttribute("src", "images/logo.svg");
      img.classList.toggle("splash-logo");
      d2.appendChild(img);
      d1.appendChild(d2);
      return d1;
    }
  }
}

function auth(props){
  return {
    id: "auth",
    // layout: `
    //   <div id="auth" class="main">
    //     <div class="overlay">
    //       <div class="container">
    //         <img src="images/logo.svg" class="main-logo" />
    //         <div class="wrapper">
    //           <h6 class="main-text">
    //             1. Login to your mobile app
    //           </h6>
    //           <h6 class="main-text">
    //             2. Enter the following code
    //           </h6>
    //           <h6 class="code-text">
    //             ${props.otp}
    //           </h6>
    //         </div>
    //         <div class="footer">
    //           <div>
    //             <img src="images/qr.png" />
    //           </div>
    //           <p>
    //             Scan and download <br /> Apollo mobile app
    //           </p
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // `
    layout: () => {
      const d1 = document.createElement("div");
      d1.setAttribute("id", "auth");
      d1.classList.toggle("main");
      const d2 = document.createElement("div");
      d2.classList.toggle("overlay");
      const d3 = document.createElement("div");
      d3.classList.toggle("container");
      const img = document.createElement("img");
      img.setAttribute("src", "images/logo.svg");
      img.classList.toggle("main-logo");
      const d4 = document.createElement("div");
      d4.classList.toggle("wrapper");
      const h1 = document.createElement("h6");
      h1.classList.toggle("main-text");
      h1.innerHTML = "1. Login to your mobile app";
      const h2 = document.createElement("h6");
      h2.classList.toggle("main-text");
      h2.innerHTML = "2. Enter the following code";
      const h3 = document.createElement("h6");
      h3.classList.toggle("code-text");
      h3.innerHTML = props.otp;
      const d5 = document.createElement("div");
      d5.classList.toggle("footer");
      const d6 = document.createElement("div");
      const qr = document.createElement("img");
      qr.setAttribute("src", "images/qr.png");
      const p = document.createElement("p");
      p.innerHTML = "Scan and download <br /> Apollo mobile app";

      d6.appendChild(qr);
      d5.appendChild(d6);
      d5.appendChild(p);
      d4.appendChild(h1);
      d4.appendChild(h2);
      d4.appendChild(h3);
      d3.appendChild(img);
      d3.appendChild(d4);
      d3.appendChild(d5);
      d2.appendChild(d3);
      d1.appendChild(d2);
      return d1;
    }
  }
}

function home(props){

  if(props.refresh){
    network.getPlaylists();
  }

  return {
    id: "home",
    // layout: `
    //   <div id="home" class="main">
    //     <div class="overlay">
    //       <div class="container">
    //         <img src="images/logo.svg" class="main-logo" />
    //         <div class="wrapper">
    //           ${(props.details)?
    //             `<p class="title">${props.details.name}</p>
    //             <p class="length">${props.details.count} ITEM${(props.details.count > 1)? "S": ""}</p>
    //             `:``
    //           }
    //         </div>
    //         ${(!props.playlists)?
    //         `<div class="text-wrap">
    //           <p class="main-text">
    //             Select a playlist or work to show here...
    //           </p>
    //         </div>`:
    //         `<div class="playlist-wrapper">
    //           <p>
    //             My Playlists
    //           </p> 
    //           <div class="playlist-container">
    //             ${layout.map(props.playlists.Playlists, (item, i) => (playlistItem({ index: i, item }).layout))}
    //           </div>
    //         </div>`}
    //       </div>
    //     </div>
    //   </div>
    // `
    layout: () => {
      const d1 = document.createElement("div");
      d1.setAttribute("id", "home");
      d1.classList.toggle("main");
      const d2 = document.createElement("div");
      d2.classList.toggle("overlay");
      const d3 = document.createElement("div");
      d3.classList.toggle("container");
      const img = document.createElement("img");
      img.setAttribute("src", "images/logo.svg");
      img.classList.toggle("main-logo");
      d3.appendChild(img);
      const d4 = document.createElement("div");
      d3.appendChild(d4);
      d4.classList.toggle("wrapper");
      if(props.details){
        const p1 = document.createElement("p");
        p1.classList.toggle("title");
        p1.innerHTML = props.details.name;
        const p2 = document.createElement("p");
        p2.classList.toggle("length");
        p2.innerHTML = `${props.details.count} ITEM${(props.details.count > 1)? "S": ""}`;
        d4.appendChild(p1);
        d4.appendChild(p2);
      }
      if(!props.playlists){
        console.log("List", props)
        const d5 = document.createElement("div");
        d5.classList.toggle("text-wrap");
        const p = document.createElement("p");
        p.innerHTML = "Select a playlist or work to show here...";
        p.classList.toggle("main-text");
        d5.appendChild(p);
        d3.appendChild(d5);
      } else {
        const d5 = document.createElement("div");
        d5.classList.toggle("playlist-wrapper");
        const p = document.createElement("p");
        p.innerHTML = "My playlists";
        const d6 = document.createElement("div");
        d6.classList.toggle("playlist-container");
        d5.appendChild(d6);
        if(Array.isArray(props.playlists.Playlists)){
          props.playlists.Playlists.forEach((item, i) => {
            const list = playlistItem({ index: i, item }).layout();
            d6.appendChild(list);
          });
        }
        d3.appendChild(d5);
      }
      d2.appendChild(d3);
      d1.appendChild(d2);
      return d1;
    }
  }
}

function carouselItem(props){
  return {
    id: `item-${props.index}`,
    layout: `
      <div id="item-${props.index}" class="carousel-item ${props.index === 0? "active": ""}">
        <img src="${props.url}" class="carousel-image" />
      </div
    `
  }
}

function playlistItem(props){

  let src = "";
  if(
    props.item && props.item.PlaylistItems && props.item.PlaylistItems[0] && props.item.PlaylistItems[0].Works
    && props.item.PlaylistItems[0].Works[0] && props.item.PlaylistItems[0].Works[0].ArtFile
  ){
    src = props.item.PlaylistItems[0].Works[0].ArtFile.FileURL;
    if(props.item.PlaylistItems[0].Works[0].ArtFile.FileType === "video"){
      src = props.item.PlaylistItems[0].Works[0].ThumbnailFile.FileURL;
    }
  }

  return {
    id: `playlist-${props.index}`,
    // layout: `
    //   <div
    //     id="playlist-${props.index}"
    //     tabindex="1"
    //     class="playlist-item ${(global.target.id === `playlist-${props.index}`)? "focus": ""}"
    //   >
    //     <img src="${src}" />
    //   </div>
    // `
    layout: () => {
      const d1 = document.createElement("div");
      d1.classList.add("playlist-item");
      if(global.target.id === `playlist-${props.index}`){
        d1.classList.add("focus");
      }
      d1.setAttribute("id", `playlist-${props.index}`);
      const img = document.createElement("img");
      img.setAttribute("src", src);
      d1.appendChild(img);
      return d1;
    }
  }
}

function player(props){

  if(!props.playlist){
    return {
      id: "player",
      layout: ""
    }
  }

  let type = "image";
  if((props.playlist.ArtFile.FileType === "video")){
    type = "video";
  }

  return {
    id: "player",
    layout: () => {
      const div1 = document.createElement("div");
      div1.setAttribute("id", "player");
      div1.classList.add("player");
      const inner = document.createElement((type === "image")? "img": "video");
      if(type === "image"){
        inner.setAttribute("src", props.playlist.ArtFile.FileURL);
      } else {
        inner.setAttribute("autoplay", true);
        inner.setAttribute("id", "video");
        inner.setAttribute("loop", true);
        const source = document.createElement("source");
        source.setAttribute("src", props.playlist.ArtFile.FileURL);
        inner.appendChild(source);
      }
      div1.appendChild(inner);
      return div1;
    }
  }
}

function controls(props){
  console.log("PROPS", props)

  if(!props){
    return {
      id: "controls",
      layout: ""
    }
  }

  let artist = "";
  let work = "";

  if(props.current.PlaylistItems && (typeof global.index === "number")){
    if(props.current.PlaylistItems[global.index].Works[0].Artists[0]){
      artist = props.current.PlaylistItems[global.index].Works[0].Artists[0].FirstName + " " + props.current.PlaylistItems[global.index].Works[0].Artists[0].LastName;
    }
    work = props.current.PlaylistItems[global.index].Works[0].Name;
  }

  return {
    id: "controls",
    // layouts: `
    //   <div id="controls" class="controls">
    //     <div class="playlist-wrapper">
    //       <p class="title">
    //         ${props.current.Name}
    //       </p>
    //       <p class="length">
    //         ${props.current.PlaylistItems.length} ITEMS
    //       </p>
    //     </div>
    //     <div class="control-wrapper">
    //       <div class="control-pad">
    //         <button class="duration ${(global.controlIndex === 0)? "select": ""}" id="control-0">
    //           Duration
    //           <span>1H: 30M</span>
    //         </button>
    //         <button class="${global.paused? "play": "pause"} ${(global.controlIndex === 1)? "select": ""}" id="control-1">
    //           <img class="play-icon" src="${global.paused? "images/play.svg": "images/pause.svg"}" />
    //         </button>
    //         <button class="shuffle ${(global.controlIndex === 2)? "select": ""}" id="control-2">
    //           Shuffle
    //           <span>${global.shuffle? "ON": "OFF"}</span>
    //         </button>
    //       </div>
    //     </div>
    //     <div class="artist-wrapper">
      //     <p class="main-text">
      //       ${artist}
      //     </p>
      //     <p class="main-text">
      //       ${work}
      //     </p>
    //     </div>
    //   </div>
    // `
    layout: () => {
      const d1 = document.createElement("div");
      d1.setAttribute("id", "controls");
      d1.classList.toggle("controls");
      const d2 = document.createElement("div");
      d2.classList.toggle("playlist-wrapper");
      const p1 = document.createElement("p");
      p1.classList.add("title");
      p1.innerHTML = props.current.Name;
      const p2 = document.createElement("p");
      p2.classList.add("length");
      p2.innerHTML = `${props.current.PlaylistItems.length} ITEMS`;
      d2.appendChild(p1);
      d2.appendChild(p2);
      d1.appendChild(d2);
      const d3 = document.createElement("div");
      d3.classList.toggle("control-wrapper");
      const d4 = document.createElement("div");
      d4.classList.toggle("control-pad");
      d3.appendChild(d4);
      const b1 = document.createElement("button");
      b1.setAttribute("id", "control-0");
      b1.classList.add("duration");
      if(global.controlIndex === 0){
        b1.classList.add("select");
      }
      b1.innerHTML = "<span>1H: 30M</span>";
      const b2 = document.createElement("button");
      b2.setAttribute("id", "control-1");
      b2.classList.add(global.paused? "play": "pause");
      if(global.controlIndex === 1){
        b2.classList.add("select");
      }
      const icon = document.createElement("img");
      icon.classList.add("play-icon");
      const src = global.paused? "images/play.svg": "images/pause.svg";
      icon.setAttribute("src", src);
      b2.appendChild(icon);
      const b3 = document.createElement("button");
      b3.setAttribute("id", "control-2");
      b3.classList.add("shuffle");
      if(global.controlIndex === 2){
        b3.classList.add("select");
      }
      b3.innerHTML = `<span>${global.shuffle? "ON": "OFF"}</span>`;
      d4.appendChild(b1);
      d4.appendChild(b2);
      d4.appendChild(b3);
      const d5 = document.createElement("div");
      d5.classList.toggle("artist-wrapper");
      const p3 = document.createElement("p");
      p3.classList.add("main-text");
      p3.innerHTML = artist;
      const p4 = document.createElement("p");
      p4.classList.add("main-text");
      p4.innerHTML = work;
      d5.appendChild(p3);
      d5.appendChild(p4);
      d1.appendChild(d2);
      d1.appendChild(d3);
      d1.appendChild(d5);
      return d1;
    }
  }
}

// Classes
class Storage{

  constructor(){
    this.storage = {
      user: {
        auth: false
      },
      carousel: {
        current: 0,
        resources: []
      },
      playlists: {},
      chosen: {},
      media: {}
    }
  }

  get(key){
    return window.localStorage.getItem(key);
  }

  set(key, value){
    let newValue = value;
    if(typeof value !== "string"){
      newValue = JSON.stringify(value);
    }
    window.localStorage.setItem(key, newValue);
  }

  remove(key){
    window.localStorage.removeItem(key);
    this.init();
    return true;
  }

  init(){
    const user = this.get("user");
    const carousel = this.get("carousel");
    const playlists = this.get("playlists");
    const media = this.get("media");
    if(canParse(user)){
      this.storage.user = JSON.parse(user);
    }
    if(canParse(carousel)){
      this.storage.carousel = JSON.parse(carousel);
    }
    if(canParse(playlists)){
      this.storage.playlists = playlists;
    }
    if(canParse(media)){
      this.storage.media = media;
    }
  }

  fetch(key){
    return this.storage[key];
  }

  update(key, value){
    if(this.storage[key]){
      this.storage[key] = value;
      this.set(key, value);
    }
  }
}

const storage = new Storage();

class Navigation{

  constructor(){
    this.navigation = {
      location: "splash"
    }
  }

  getLocation(){
    return this.navigation.location;
  }

  navigate(route){
    this.navigation.location = route;
  }
}

const navigation = new Navigation();

class Renderer{

  constructor(){
    this.root = document.querySelector("#root");
  }

  onMount(){
    this.mount(splash());
  }

  getComponent(component){
    return document.querySelector(`#${component.id}`);
  }

  render(component, animated = false){
    if(!animated){
      this.root.innerHTML = component.layout;
      return true;
    }
    setTimeout(() => {
      this.root.innerHTML = component.layout;
    }, 500);
  }

  add(component){
    this.root.innerHTML += component.layout;
  }

  rerender(component){
    const removableItem = this.getComponent(component);
    if(removableItem){
      this.unmount(component);
      this.add(component);
    }
  }

  unmount(component){
    const removableItem = this.getComponent(component);
    if(removableItem){
      removableItem.style.opacity = 0;
      // setTimeout(() => {
        this.root.removeChild(removableItem);
      // }, 500);
    }
  }

  mount(component){
    const oldNode = this.getComponent(component);
    if(oldNode){
      oldNode.remove();
    }
    const newNode = component.layout();
    this.root.appendChild(newNode);
  }

  map(arr, cb){
    if(Array.isArray(arr) && (typeof cb === "function")){
      const html = arr.reduce((acc, item, idx) => {
        const str = cb(item, idx);
        return acc += str;
      }, ``);
      return html;
    }
    return "";
  }
}

const layout = new Renderer();

class Api{

  constructor(){
    this.baseUrl = "https://app-api.theapollo.com/api";
    this.socket = new WebSocket("wss://app-api.theapollo.com/api/displayapp");

    this.socket.addEventListener("open", this.socketOpen.bind(this));
    this.socket.addEventListener("close", this.socketClose.bind(this));
    this.socket.addEventListener("message", this.onMessage.bind(this));
  }

  getResources(cb){
    fetch(this.baseUrl + "/displayapp/defaultcontent")
      .then(resp => {
        if(resp.status < 205){
          resp.json().then(data => {
            const releventData = data.playlistItems.map(item => item.works[0]);
            storage.update("carousel", {
              current: 0,
              resources: releventData
            });
            if(typeof cb === "function"){
              cb(releventData);
            }
          })
          .catch(err => {
            console.log(err);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  socketOpen(){
    console.log("socket connected");
    if(storage.fetch("user").auth){
      layout.unmount(splash());
      layout.mount(home({ refresh: true }));
      navigation.navigate("home");
      return;
    }
    this.getOtp()
  }

  socketClose(){
    console.log("socket closed")
  }

  onMessage(message){
    console.log(message)
    if(canParse(message.data)){
      const resp = JSON.parse(message.data);
      switch(resp.Type){
        case types.getOtpResp:
          layout.unmount(splash());
          layout.mount(auth({ otp: resp.Body }), true);
          navigation.navigate("auth");
          break;
        case types.deviceActivationResp:
          storage.update("user", { auth: true });
          layout.unmount(auth({}));
          layout.mount(home({ refresh: true }), true);
          navigation.navigate("home");
          break;
        case types.getPlaylistResp:
          const data = JSON.parse(resp.Body);
          layout.mount(home({ playlists: data }));
          storage.update("playlists", data);
          setupPlaylistListeners();
          break;
        case types.playlistUpdateResp:
          this.getPlaylists();
          break;
        case types.changePlaylistResp:
          const current = storage.fetch("chosen");
          const res = JSON.parse(resp.Body);
          if(current){
            if(current.PlaylistId !== res.CurrentPlaylistId){
              const lists = storage.fetch("playlists");
              const newList = lists.Playlists.find(l => (l.PlaylistId === res.CurrentPlaylistId));
              startPlaylist(newList);
            }
          }
          break;
        default:
          return;
      }
    }
  }

  sendMessage(message){
    this.socket.send(message);
  }

  ping(){
    const body = {
      "Type": "Ping",
      "Body": "DEVICE_ID"
    }
    this.sendMessage(JSON.stringify(body));
  }

  getOtp(){
    const authBody = {
      "Type": types.getOtp,
      "Body": "{\"DeviceId\": \"DEVICE_ID\"}"
    }
    this.sendMessage(JSON.stringify(authBody));
  }

  getPlaylists(){
    console.log("playlists called")
    const body = {
      "Type": types.getPlaylist,
      "Body": "DEVICE_ID"
    }
    this.sendMessage(JSON.stringify(body));
  }
}

const network = new Api();

// Validations

function isValid(item){
  return (item !== undefined) && (item !== null) && (item !== NaN);
}

function canParse(stringified){
  if(typeof stringified === "string"){
    const parsed = JSON.parse(stringified);
    return isValid(parsed);
  }
  return false;
}

//  Logic

function init(){
  // show splash screen
  storage.init();
  layout.onMount();

  //get carousel resources
  network.getResources(renderCarousel);

  //ping socket every 30 seconds to keep connection alive
  setInterval(() => {
    console.log("ping")
    network.ping();
  }, 30000);

  document.addEventListener("keypress", clickListner);
}

function renderCarousel(data){
  const carousel = document.querySelector(".carousel");
  if(Array.isArray(data)){
    data.forEach((item, index) => {
      const elem = carouselItem({
        index,
        url: item.artFile.fileURL
      });
      carousel.innerHTML += elem.layout;
    });
    carousel.style.display = "block";
    playCarousel(data.length);
  }

  function playCarousel(length){
    let current = 0;
    setInterval(() => {
      const nextIndex = (current + 1 >= length)? 0: current + 1;
      const visibleItem = document.querySelector(`#item-${current}`);
      const nextItem = document.querySelector(`#item-${nextIndex}`);
      visibleItem.classList.remove("active");
      visibleItem.classList.add("fade");
      nextItem.classList.remove("fade");
      nextItem.classList.add("active");
      current = nextIndex;
    }, 15000);
  }
}

function setupPlaylistListeners(){
  const playlists = document.querySelectorAll(".playlist-item");
  if(playlists){
    playlists.forEach(list => {
      // list.addEventListener("click", focusListener);
    });
  }
    // const item = document.querySelector("#playlist-0");
    // global.target = item;
}

function focusListener(e){
  const lib = storage.fetch("playlists");
  if(lib.Playlists){
    const index = Number(e.id.split("-")[1]);
    const selected = lib.Playlists[index];
    storage.update("chosen", selected);
    layout.mount(home({ playlists: lib, details: { name: selected.Name, count: selected.PlaylistItems.length } }));
  }
}

function clickListner(e){
  const location = navigation.getLocation();
  if(e.key === "Enter"){
    if(location === "home"){
      const playlist = storage.fetch("chosen");
      if(playlist && playlist.PlaylistId){
        startPlaylist(playlist);
      }
    }else if(location === "player"){
      if(layout.getComponent(controls())){
        const selected = document.querySelector(".select");
        handleSelect(selected);
      } else {
        const playlist = storage.fetch("chosen");
        global.controlIndex = 0;
        layout.mount(controls({current: playlist}));
      }
    }
  }
  else if(e.code === "Period"){
    if(location === "home"){
      if(global.target.id){
        const index = Number(global.target.id.split("-")[1]);
        const next = document.querySelector(`#playlist-${index+1}`);
        if(next){
          global.target.classList.toggle("focus");
          next.classList.toggle("focus");
          global.target = next;
          focusListener(next);
        }
      } else {
        const next = document.querySelector(`#playlist-0`);
        if(next){
          next.classList.toggle("focus");
          global.target = next;
          focusListener(next);
        }
      }
    } else if(location === "player"){
      if(layout.getComponent(controls())){
        if(global.controlIndex < 2){
          const prev = document.getElementById(`control-${global.controlIndex}`);
          prev.classList.toggle("select");
          global.controlIndex+=1;
          const next = document.getElementById(`control-${global.controlIndex}`);
          next.classList.toggle("select");
          // layout.rerender(controls({current: storage.fetch("chosen")}));
        }
      }
    }
  }
  else if(e.code === "Comma"){
    if(location === "home"){
      if(global.target.id){
        const index = Number(global.target.id.split("-")[1]);
        const prev = document.querySelector(`#playlist-${index-1}`);
        if(prev){
          global.target.classList.toggle("focus");
          prev.classList.toggle("focus");
          global.target = prev;
          focusListener(prev);
        }
      }
    } else if(location === "player"){
      if(layout.getComponent(controls())){
        if(global.controlIndex > 0){
          const prev = document.getElementById(`control-${global.controlIndex}`);
          prev.classList.toggle("select");
          global.controlIndex-=1;
          const next = document.getElementById(`control-${global.controlIndex}`);
          next.classList.toggle("select");
          // layout.rerender(controls({current: storage.fetch("chosen")}));
        }
      }
    }
  }
  else if(e.code === "KeyB"){
    if(navigation.getLocation() === "player"){
      console.log("clear")
      if(global.playlistTimer){
        clearInterval(global.playlistTimer);
      }
      if(layout.getComponent(controls())){
        layout.unmount(controls());
      } else {
        layout.unmount(player({}));
        navigation.navigate("home");
      }
    }
  }
}

function startPlaylist(playlist){
  let idx = 0;
  global.index = 0;
  const item = playlist.PlaylistItems[idx];
  const length = playlist.PlaylistItems.length;
  if(layout.getComponent(player({}))){
    layout.unmount(player({}));
  }
  layout.mount(player({ playlist: item.Works[0] }));
  navigation.navigate("player");
  idx += 1;
  if(playlist.PlaylistItems.length > 1){
    const interval = setInterval(() => {
      if(!global.paused){
        global.index = idx;
        const nextIndex = ((idx + 1) >= length)? 0: idx + 1;
        const newItem = playlist.PlaylistItems[idx];
        console.log("n id", playlist)
        layout.unmount(player({}));
        layout.mount(player({ playlist: newItem.Works[0] }));
        layout.mount(controls({current: playlist}));
        idx = nextIndex;
      }
    }, 30000);
    global.playlistTimer = interval;
  }
}

function handleSelect(type){
  switch(type.id){
    case "control-0":
      console.log("duration");
      break;
    case "control-1":
      global.paused = !global.paused;
      setTimeout(() => {
        const video = document.querySelector("#video");
        const image = document.querySelector(".play-icon");
        type.classList.toggle("play");
        type.classList.toggle("pause");
        if(video){
          if(video.paused){
            video.play();
            image.setAttribute("src", "images/pause.svg");
          } else {
            video.pause();
            image.setAttribute("src", "images/play.svg");
          }
        } else {
          if(!global.paused){
            image.setAttribute("src", "images/pause.svg");
          } else {
            image.setAttribute("src", "images/play.svg");
          }
        }
      });
      break;
    case "control-2":
      console.log("shuffle", shuffleList(storage.get()));
      break;
  }
}

window.onload = init;