//Configure paths
requirejs.config({
    baseUrl: '',
    paths: {
        core: '/core_components',
        project: '/project_components',
        controllers: '/controllers',
        lib: '/lib',
    }
});

//Load library dependencies
requirejs([
  'lib/tweenjs/lib/tweenjs-0.6.2.min',
  'lib/easeljs/lib/easeljs-0.8.2.min',
  'lib/soundjs/lib/soundjs-0.6.2.min'
]);

//Load core dependencies
requirejs([
  'core/stage/index'
]);

//Load project dependencies
requirejs([
  'project/balloon_head/index'
]);

//Load song-controllers
requirejs([
  'controllers/song1'
]);

//Load main controller
requirejs([
  'index'
]);