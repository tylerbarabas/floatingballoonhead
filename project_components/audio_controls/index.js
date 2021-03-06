define([
  'lib/tweenjs/lib/tweenjs-0.6.2.min'
],function(){

  function AudioControls () {
    this.playing = false;
  }

  AudioControls.prototype = {

    init: function() {
      this.dom = document.getElementById('audio-controls-container');

      this.pauseBtn = document.getElementById('btn-pause');
      this.pauseBtn.addEventListener('click',this.pauseBtnClick.bind(this));
      this.pauseBtn.baseClass = 'fa fa-pause audio-controls';

      this.playBtn = document.getElementById('btn-play');
      this.playBtn.addEventListener('click',this.playBtnClick.bind(this));
      this.playBtn.baseClass = 'fa fa-play audio-controls';

      this.loadingIcon = document.getElementById('loading');
      this.loading = true;
      this.setTransition('1s',false,this.loadingIcon);
      this.toggleLoadingIcon(true);

      this.setTransition('1s');
    },
    show: function() {
      this.dom.style.opacity = 1;
    },
    playBtnClick: function(evt) {
      if (this.loading) return;

      this.playing = true;
      this.togglePlayPauseBtn(true);
      this.dispatchEvent('play-btn');
    },
    pauseBtnClick: function(evt) {
      this.playing = false;
      this.togglePlayPauseBtn(false);
      this.dispatchEvent('pause-btn');
    },
    spacebar: function(evt) {
      if (evt.keyCode !== 32) return;
      if (this.playing) {
        this.pauseBtnClick();
      } else {
        this.playBtnClick();
      }
    },
    togglePlayPauseBtn: function (playing) {
      if (playing) {
        this.pauseBtn.style.display = "block";
        this.playBtn.style.display = "none";
      } else {
        this.pauseBtn.style.display = "none";
        this.playBtn.style.display = "block";
      }
    },
    toggleLoadingIcon: function(loading) {
      if (loading) {
        this.loadingIcon.style.display = 'block';
      } else {
        this.loadingIcon.style.display = 'none';
      }
    },
    addEvent: function(evtName,func) {
      this.dom.addEventListener(evtName,func);
    },
    dispatchEvent: function(evtName) {
      var evt = document.createEvent('Event');
      evt.initEvent(evtName,true,true);

      this.dom.dispatchEvent(evt);
    },
    setTransition: function(transition,setChildren,element) {

      setChildren = setChildren || false;
      element = element || this.dom;

      element.style.transition = transition;
      element.style.WebkitTransition = transition;
      element.style.MozTransition = transition;

      if (!setChildren) return;

      var children = element.childNodes;
      for (var i=0;i<children.length;i++) {
        children[i].style.transition = transition;
        children[i].style.WebkitTransition = transition;
        children[i].style.MozTransition = transition;

        if (children[i].childNodes.length > 0) this.setTransition(transition,true,children[i]);
      }

    }
  };

  if (typeof window['audio-controls'] === 'undefined') {
    window['audio-controls'] = new AudioControls();
  }

  return window['audio-controls'];

});
