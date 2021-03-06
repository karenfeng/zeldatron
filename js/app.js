
var App = function() {
  this.init();
}

App.prototype = {

  elString: '<div id="app" class="unauthenticated">' +
              '<div class="loading">' +
                '<div class="spinner">' +
                  '<div class="double-bounce1"></div>' +
                  '<div class="double-bounce2"></div>' +
                '</div>' +
              '</div>' +
              '<div class="auth">' +
                '<h1>Woah! Looks like you\'re not authenticated!</h1>' +
                '<p>We need to mess with stuff in your drive, click authenticate to let Zelda work his magic!</p>' +
                '<div id="auth-btn" class="btn">Authenticate</div>' +
              '</div>' +
              '<div class="buttons">' +
                '<button>Reset</button>' +
                '<button>Start</button>' +
              '</div>' +
            '</div>',

  init: function() {
    this.createEl();
    this.setBindings();

    this.utils = new window.utils.RealtimeUtils({
      clientId: '683860718220-e01o212upndu1ealc33pmi60kj692vaj.apps.googleusercontent.com'
    });

    this.utils.authorize(this.onAuthComplete, false);

    this.board = new Board();

    this.el.appendChild(this.board.el);

    // Create new instance of Game
    // this.game = new Game();

  },

  setBindings: function() {
    this.onAuthClick = this.onAuthClick.bind(this);
    this.onAuthComplete = this.onAuthComplete.bind(this);
  },

  start: function() {

  },

  onAuthComplete: function(response) {
    if (gapi.auth.getToken()) {
      this.start();
    } else {
      // prevent memory leaks
      // this.el.querySelector('#auth').removeEventListener('click', onAuthClick);
      this.el.querySelector('#auth-btn').addEventListener('click', this.onAuthClick);
      this.utils.authorize(this.onAuthComplete, true);
    }
  },

  onAuthClick: function() {
    this.utils.authorize(this.onAuthComplete, true);
  },

  createEl: function() {
    var div = document.createElement('div');
    div.innerHTML = this.elString;
    this.el = div.children[0];
  }

}
