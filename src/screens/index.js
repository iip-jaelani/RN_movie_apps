const {default: Chat} = require('./Chat');
const {default: Feed} = require('./Feed');
const {default: Home} = require('./Home');
const {default: Other} = require('./Other');
const {default: Profile} = require('./Profile');
const {default: RecommendMovie} = require('./Recommend.movie');
const {default: DetailMovie} = require('./Detail.movie');

export const BottomScreen = {
  Home,
  Feed,
  Other,
  Chat,
  Profile,
};

export const StackScreen = {
  DetailMovie,
  RecommendMovie,
};
