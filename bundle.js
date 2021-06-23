"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//  Types

var global = { target: {}, paused: false, shuffle: false };

var types = {
  getOtp: "GENERATE_ACTIVATION_CODE",
  getOtpResp: "GENERATE_ACTIVATION_CODE_RESPONSE",
  deviceActivationResp: "DEVICE_ACTIVATED",
  getPlaylist: "GET_PLAYLISTS_AND_DISPLAY_STATE",
  getPlaylistResp: "GET_PLAYLISTS_AND_DISPLAY_STATE_RESPONSE",
  playlistUpdateResp: "UPDATED_PLAYLISTS",
  changePlaylistResp: "CHANGE_PLAYLIST"

  //  Components

};function splash() {
  return {
    id: "splash",
    layout: "\n      <div id=\"splash\" class=\"modal\">\n        <div class=\"overlay\">\n          <img src=\"images/logo.svg\" class=\"splash-logo\" />\n        </div>\n      </div>\n    "
  };
}

function auth(props) {
  return {
    id: "auth",
    layout: "\n      <div id=\"auth\" class=\"main\">\n        <div class=\"overlay\">\n          <div class=\"container\">\n            <img src=\"images/logo.svg\" class=\"main-logo\" />\n            <div class=\"wrapper\">\n              <h6 class=\"main-text\">\n                1. Login to your mobile app\n              </h6>\n              <h6 class=\"main-text\">\n                2. Enter the following code\n              </h6>\n              <h6 class=\"code-text\">\n                " + props.otp + "\n              </h6>\n            </div>\n            <div class=\"footer\">\n              <div>\n                <img src=\"images/qr.png\" />\n              </div>\n              <p>\n                Scan and download <br /> Apollo mobile app\n              </p\n            </div>\n          </div>\n        </div>\n      </div>\n    "
  };
}

function home(props) {

  if (props.refresh) {
    network.getPlaylists();
  }

  return {
    id: "home",
    layout: "\n      <div id=\"home\" class=\"main\">\n        <div class=\"overlay\">\n          <div class=\"container\">\n            <img src=\"images/logo.svg\" class=\"main-logo\" />\n            <div class=\"wrapper\">\n              " + (props.details ? "<p class=\"title\">" + props.details.name + "</p>\n                <p class=\"length\">" + props.details.count + " ITEM" + (props.details.count > 1 ? "S" : "") + "</p>\n                " : "") + "\n            </div>\n            " + (!props.playlists ? "<div class=\"text-wrap\">\n              <p class=\"main-text\">\n                Select a playlist or work to show here...\n              </p>\n            </div>" : "<div class=\"playlist-wrapper\">\n              <p>\n                My Playlists\n              </p> \n              <div class=\"playlist-container\">\n                " + layout.map(props.playlists.Playlists, function (item, i) {
      return playlistItem({ index: i, item: item }).layout;
    }) + "\n              </div>\n            </div>") + "\n          </div>\n        </div>\n      </div>\n    "
  };
}

function carouselItem(props) {
  return {
    id: "item-" + props.index,
    layout: "\n      <div id=\"item-" + props.index + "\" class=\"carousel-item " + (props.index === 0 ? "active" : "") + "\">\n        <img src=\"" + props.url + "\" class=\"carousel-image\" />\n      </div\n    "
  };
}

function playlistItem(props) {

  var src = "";
  if (props.item && props.item.PlaylistItems && props.item.PlaylistItems[0] && props.item.PlaylistItems[0].Works && props.item.PlaylistItems[0].Works[0] && props.item.PlaylistItems[0].Works[0].ArtFile) {
    src = props.item.PlaylistItems[0].Works[0].ArtFile.FileURL;
    if (props.item.PlaylistItems[0].Works[0].ArtFile.FileType === "video") {
      src = props.item.PlaylistItems[0].Works[0].ThumbnailFile.FileURL;
    }
  }

  return {
    id: "playlist-" + props.index,
    layout: "\n      <div\n        id=\"playlist-" + props.index + "\"\n        tabindex=\"1\"\n        class=\"playlist-item " + (global.target.id === "playlist-" + props.index ? "focus" : "") + "\"\n      >\n        <img src=\"" + src + "\" />\n      </div>\n    "
  };
}

function player(props) {

  if (!props.playlist) {
    return {
      id: "player",
      layout: ""
    };
  }

  var type = "image";
  if (props.playlist.ArtFile.FileType === "video") {
    type = "video";
  }

  return {
    id: "player",
    layout: "\n      <div id=\"player\" class=\"player\">\n        " + (type === "image" ? "\n        <img src=\"" + props.playlist.ArtFile.FileURL + "\" />\n        " : "\n        <video autoplay loop id=\"video\">\n          <source src=\"" + props.playlist.ArtFile.FileURL + "\" type=\"video/mp4\" />\n        </video>\n        ") + "\n      </div>\n    "
  };
}

function controls(props) {

  if (!props) {
    return {
      id: "controls",
      layout: ""
    };
  }

  var artist = "";
  var work = "";

  if (props.current.PlaylistItems && typeof global.index === "number") {
    if (props.current.PlaylistItems[global.index].Works[0].Artists[0]) {
      artist = props.current.PlaylistItems[global.index].Works[0].Artists[0].FirstName + " " + props.current.PlaylistItems[global.index].Works[0].Artists[0].LastName;
    }
    work = props.current.PlaylistItems[global.index].Works[0].Name;
  }

  return {
    id: "controls",
    layout: "\n      <div id=\"controls\" class=\"controls\">\n        <div class=\"playlist-wrapper\">\n          <p class=\"title\">\n            " + props.current.Name + "\n          </p>\n          <p class=\"length\">\n            " + props.current.PlaylistItems.length + " ITEMS\n          </p>\n        </div>\n        <div class=\"control-wrapper\">\n          <div class=\"control-pad\">\n            <button class=\"duration " + (global.controlIndex === 0 ? "select" : "") + "\" id=\"control-0\">\n              Duration\n              <span>1H: 30M</span>\n            </button>\n            <button class=\"" + (global.paused ? "play" : "pause") + " " + (global.controlIndex === 1 ? "select" : "") + "\" id=\"control-1\">\n              <img class=\"play-icon\" src=\"" + (global.paused ? "images/play.svg" : "images/pause.svg") + "\" />\n            </button>\n            <button class=\"shuffle " + (global.controlIndex === 2 ? "select" : "") + "\" id=\"control-2\">\n              Shuffle\n              <span>" + (global.shuffle ? "ON" : "OFF") + "</span>\n            </button>\n          </div>\n        </div>\n        <div class=\"artist-wrapper\">\n        <p class=\"main-text\">\n          " + artist + "\n        </p>\n        <p class=\"main-text\">\n          " + work + "\n        </p>\n        </div>\n      </div>\n    "
  };
}

// Classes

var Storage = function () {
  function Storage() {
    _classCallCheck(this, Storage);

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
    };
  }

  _createClass(Storage, [{
    key: "get",
    value: function get(key) {
      return window.localStorage.getItem(key);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      var newValue = value;
      if (typeof value !== "string") {
        newValue = JSON.stringify(value);
      }
      window.localStorage.setItem(key, newValue);
    }
  }, {
    key: "remove",
    value: function remove(key) {
      window.localStorage.removeItem(key);
      this.init();
      return true;
    }
  }, {
    key: "init",
    value: function init() {
      var user = this.get("user");
      var carousel = this.get("carousel");
      var playlists = this.get("playlists");
      var media = this.get("media");
      if (canParse(user)) {
        this.storage.user = JSON.parse(user);
      }
      if (canParse(carousel)) {
        this.storage.carousel = JSON.parse(carousel);
      }
      if (canParse(playlists)) {
        this.storage.playlists = playlists;
      }
      if (canParse(media)) {
        this.storage.media = media;
      }
    }
  }, {
    key: "fetch",
    value: function fetch(key) {
      return this.storage[key];
    }
  }, {
    key: "update",
    value: function update(key, value) {
      if (this.storage[key]) {
        this.storage[key] = value;
        this.set(key, value);
      }
    }
  }]);

  return Storage;
}();

var storage = new Storage();

var Navigation = function () {
  function Navigation() {
    _classCallCheck(this, Navigation);

    this.navigation = {
      location: "splash"
    };
  }

  _createClass(Navigation, [{
    key: "getLocation",
    value: function getLocation() {
      return this.navigation.location;
    }
  }, {
    key: "navigate",
    value: function navigate(route) {
      this.navigation.location = route;
    }
  }]);

  return Navigation;
}();

var navigation = new Navigation();

var Renderer = function () {
  function Renderer() {
    _classCallCheck(this, Renderer);

    this.root = document.querySelector("#root");
  }

  _createClass(Renderer, [{
    key: "onMount",
    value: function onMount() {
      this.render(splash());
    }
  }, {
    key: "getComponent",
    value: function getComponent(component) {
      return document.querySelector("#" + component.id);
    }
  }, {
    key: "render",
    value: function render(component) {
      var _this = this;

      var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!animated) {
        this.root.innerHTML = component.layout;
        return true;
      }
      setTimeout(function () {
        _this.root.innerHTML = component.layout;
      }, 500);
    }
  }, {
    key: "add",
    value: function add(component) {
      this.root.innerHTML += component.layout;
    }
  }, {
    key: "rerender",
    value: function rerender(component) {
      var removableItem = this.getComponent(component);
      if (removableItem) {
        this.unmount(component);
        this.add(component);
      }
    }
  }, {
    key: "unmount",
    value: function unmount(component) {
      var removableItem = this.getComponent(component);
      if (removableItem) {
        removableItem.style.opacity = 0;
        // setTimeout(() => {
        this.root.removeChild(removableItem);
        // }, 500);
      }
    }
  }, {
    key: "map",
    value: function map(arr, cb) {
      if (Array.isArray(arr) && typeof cb === "function") {
        var html = arr.reduce(function (acc, item, idx) {
          var str = cb(item, idx);
          return acc += str;
        }, "");
        return html;
      }
      return "";
    }
  }]);

  return Renderer;
}();

var layout = new Renderer();

var Api = function () {
  function Api() {
    _classCallCheck(this, Api);

    this.baseUrl = "https://app-api.theapollo.com/api";
    this.socket = new WebSocket("wss://app-api.theapollo.com/api/displayapp");

    this.socket.addEventListener("open", this.socketOpen.bind(this));
    this.socket.addEventListener("close", this.socketClose.bind(this));
    this.socket.addEventListener("message", this.onMessage.bind(this));
  }

  _createClass(Api, [{
    key: "getResources",
    value: function getResources(cb) {
      fetch(this.baseUrl + "/displayapp/defaultcontent").then(function (resp) {
        if (resp.status < 205) {
          resp.json().then(function (data) {
            var releventData = data.playlistItems.map(function (item) {
              return item.works[0];
            });
            storage.update("carousel", {
              current: 0,
              resources: releventData
            });
            if (typeof cb === "function") {
              cb(releventData);
            }
          }).catch(function (err) {
            console.log(err);
          });
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "socketOpen",
    value: function socketOpen() {
      console.log("socket connected");
      if (storage.fetch("user").auth) {
        layout.unmount(splash());
        layout.render(home({ refresh: true }));
        navigation.navigate("home");
        return;
      }
      this.getOtp();
    }
  }, {
    key: "socketClose",
    value: function socketClose() {
      console.log("socket closed");
    }
  }, {
    key: "onMessage",
    value: function onMessage(message) {
      console.log(message);
      if (canParse(message.data)) {
        var resp = JSON.parse(message.data);
        switch (resp.Type) {
          case types.getOtpResp:
            layout.unmount(splash());
            layout.render(auth({ otp: resp.Body }), true);
            navigation.navigate("auth");
            break;
          case types.deviceActivationResp:
            storage.update("user", { auth: true });
            layout.unmount(auth({}));
            layout.render(home({ refresh: true }), true);
            navigation.navigate("home");
            break;
          case types.getPlaylistResp:
            var data = JSON.parse(resp.Body);
            layout.render(home({ playlists: data }));
            storage.update("playlists", data);
            setupPlaylistListeners();
            break;
          case types.playlistUpdateResp:
            this.getPlaylists();
            break;
          case types.changePlaylistResp:
            var current = storage.fetch("chosen");
            var res = JSON.parse(resp.Body);
            if (current) {
              if (current.PlaylistId !== res.CurrentPlaylistId) {
                var lists = storage.fetch("playlists");
                var newList = lists.Playlists.find(function (l) {
                  return l.PlaylistId === res.CurrentPlaylistId;
                });
                startPlaylist(newList);
              }
            }
            break;
          default:
            return;
        }
      }
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(message) {
      this.socket.send(message);
    }
  }, {
    key: "ping",
    value: function ping() {
      var body = {
        "Type": "Ping",
        "Body": "DEVICE_ID"
      };
      this.sendMessage(JSON.stringify(body));
    }
  }, {
    key: "getOtp",
    value: function getOtp() {
      var authBody = {
        "Type": types.getOtp,
        "Body": "{\"DeviceId\": \"DEVICE_ID\"}"
      };
      this.sendMessage(JSON.stringify(authBody));
    }
  }, {
    key: "getPlaylists",
    value: function getPlaylists() {
      console.log("playlists called");
      var body = {
        "Type": types.getPlaylist,
        "Body": "DEVICE_ID"
      };
      this.sendMessage(JSON.stringify(body));
    }
  }]);

  return Api;
}();

var network = new Api();

// Validations

function isValid(item) {
  return item !== undefined && item !== null && item !== NaN;
}

function canParse(stringified) {
  if (typeof stringified === "string") {
    var parsed = JSON.parse(stringified);
    return isValid(parsed);
  }
  return false;
}

//  Logic

function init() {
  // show splash screen
  storage.init();
  layout.onMount();

  //get carousel resources
  network.getResources(renderCarousel);

  //ping socket every 30 seconds to keep connection alive
  setInterval(function () {
    console.log("ping");
    network.ping();
  }, 30000);

  document.addEventListener("keypress", clickListner);
}

function renderCarousel(data) {
  var carousel = document.querySelector(".carousel");
  if (Array.isArray(data)) {
    data.forEach(function (item, index) {
      var elem = carouselItem({
        index: index,
        url: item.artFile.fileURL
      });
      carousel.innerHTML += elem.layout;
    });
    carousel.style.display = "block";
    playCarousel(data.length);
  }

  function playCarousel(length) {
    var current = 0;
    setInterval(function () {
      var nextIndex = current + 1 >= length ? 0 : current + 1;
      var visibleItem = document.querySelector("#item-" + current);
      var nextItem = document.querySelector("#item-" + nextIndex);
      visibleItem.classList.remove("active");
      visibleItem.classList.add("fade");
      nextItem.classList.remove("fade");
      nextItem.classList.add("active");
      current = nextIndex;
    }, 15000);
  }
}

function setupPlaylistListeners() {
  var playlists = document.querySelectorAll(".playlist-item");
  if (playlists) {
    playlists.forEach(function (list) {
      // list.addEventListener("click", focusListener);
    });
  }
  // const item = document.querySelector("#playlist-0");
  // global.target = item;
}

function focusListener(e) {
  var lib = storage.fetch("playlists");
  if (lib.Playlists) {
    var index = Number(e.id.split("-")[1]);
    var selected = lib.Playlists[index];
    storage.update("chosen", selected);
    layout.render(home({ playlists: lib, details: { name: selected.Name, count: selected.PlaylistItems.length } }));
  }
}

function clickListner(e) {
  var location = navigation.getLocation();
  if (e.key === "Enter") {
    if (location === "home") {
      var playlist = storage.fetch("chosen");
      if (playlist && playlist.PlaylistId) {
        startPlaylist(playlist);
      }
    } else if (location === "player") {
      if (layout.getComponent(controls())) {
        var selected = document.querySelector(".select");
        handleSelect(selected);
      } else {
        var _playlist = storage.fetch("chosen");
        global.controlIndex = 0;
        layout.add(controls({ current: _playlist }));
      }
    }
  } else if (e.code === "Period") {
    if (location === "home") {
      if (global.target.id) {
        var index = Number(global.target.id.split("-")[1]);
        var next = document.querySelector("#playlist-" + (index + 1));
        if (next) {
          global.target.classList.toggle("focus");
          next.classList.toggle("focus");
          global.target = next;
          focusListener(next);
        }
      } else {
        var _next = document.querySelector("#playlist-0");
        if (_next) {
          _next.classList.toggle("focus");
          global.target = _next;
          focusListener(_next);
        }
      }
    } else if (location === "player") {
      if (layout.getComponent(controls())) {
        if (global.controlIndex < 2) {
          var prev = document.getElementById("control-" + global.controlIndex);
          prev.classList.toggle("select");
          global.controlIndex += 1;
          var _next2 = document.getElementById("control-" + global.controlIndex);
          _next2.classList.toggle("select");
          // layout.rerender(controls({current: storage.fetch("chosen")}));
        }
      }
    }
  } else if (e.code === "Comma") {
    if (location === "home") {
      if (global.target.id) {
        var _index = Number(global.target.id.split("-")[1]);
        var _prev = document.querySelector("#playlist-" + (_index - 1));
        if (_prev) {
          global.target.classList.toggle("focus");
          _prev.classList.toggle("focus");
          global.target = _prev;
          focusListener(_prev);
        }
      }
    } else if (location === "player") {
      if (layout.getComponent(controls())) {
        if (global.controlIndex > 0) {
          var _prev2 = document.getElementById("control-" + global.controlIndex);
          _prev2.classList.toggle("select");
          global.controlIndex -= 1;
          var _next3 = document.getElementById("control-" + global.controlIndex);
          _next3.classList.toggle("select");
          // layout.rerender(controls({current: storage.fetch("chosen")}));
        }
      }
    }
  } else if (e.code === "KeyB") {
    if (navigation.getLocation() === "player") {
      console.log("clear");
      if (global.playlistTimer) {
        clearInterval(global.playlistTimer);
      }
      if (layout.getComponent(controls())) {
        layout.unmount(controls());
      } else {
        layout.unmount(player({}));
        navigation.navigate("home");
      }
    }
  }
}

function startPlaylist(playlist) {
  var idx = 0;
  global.index = 0;
  var item = playlist.PlaylistItems[idx];
  var length = playlist.PlaylistItems.length;
  if (layout.getComponent(player({}))) {
    layout.unmount(player({}));
  }
  layout.add(player({ playlist: item.Works[0] }));
  navigation.navigate("player");
  idx += 1;
  if (playlist.PlaylistItems.length > 1) {
    var interval = setInterval(function () {
      if (!global.paused) {
        global.index = idx;
        var nextIndex = idx + 1 >= length ? 0 : idx + 1;
        var newItem = playlist.PlaylistItems[idx];
        console.log("n id", playlist);
        layout.unmount(player({}));
        layout.add(player({ playlist: newItem.Works[0] }));
        layout.rerender(controls({ current: playlist }));
        idx = nextIndex;
      }
    }, 10000);
    global.playlistTimer = interval;
  }
}

function handleSelect(type) {
  switch (type.id) {
    case "control-0":
      console.log("duration");
      break;
    case "control-1":
      global.paused = !global.paused;
      setTimeout(function () {
        var video = document.querySelector("#video");
        var image = document.querySelector(".play-icon");
        type.classList.toggle("play");
        type.classList.toggle("pause");
        if (video) {
          if (video.paused) {
            video.play();
            image.setAttribute("src", "images/pause.svg");
          } else {
            video.pause();
            image.setAttribute("src", "images/play.svg");
          }
        }
      });
      break;
    case "control-2":
      console.log("shuffle");
      break;
  }
}

window.onload = init;
