/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {
  getMovieTopRated,
  getMovieNowPlaying,
} from '../redux/actions/movie.actions';
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
import {API_KEY_THE_MOVIE_DB} from '@env';

import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {THEME_DARK} from '../styles/colors';
import {Components} from '../components';
import {set} from 'react-native-reanimated';
import {client_movie} from '../config/client';
const {width, height} = Dimensions.get('window');
const PADDING = width * 0.02;
const TOP_RATED_SIZE = width * 0.9;
const ITEM_SIZE = width / 2 - PADDING * 2;
const theme = THEME_DARK;

const LoadingCarousel = () => (
  <View
    style={{
      width: width - PADDING * 2,
      height: width / 3,
      overflow: 'hidden',
      margin: PADDING,
      borderRadius: 10,
      backgroundColor: '#ccc',
    }}>
    <Text
      style={{
        position: 'absolute',
        bottom: PADDING,
        left: PADDING,
        width: width / 2.5,
        backgroundColor: '#aaa',
        borderRadius: 10,
      }}
    />
  </View>
);

const LabelContent = ({label}) => (
  <Text
    style={{
      fontSize: width * 0.035,
      color: '#fff',
      fontWeight: 'bold',
      marginVertical: PADDING,
    }}>
    {label}
  </Text>
);

const ListParty = ({item, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles._nowPlayContainer}>
        <SharedElement
          id={`item.${item.id}.photo`}
          style={styles._nowPlayImage}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={styles._nowPlayImage}
          />
        </SharedElement>
        <LinearGradient
          colors={['transparent', '#000']}
          style={styles._nowPlayGradient}
        />
        <View style={styles._nowPlayContainerDesc}>
          <SharedElement
            id={`item.${item.title}.title`}
            style={styles._nowPlayTitle}>
            <Text style={styles._nowPlayTitle}>{item.title}</Text>
          </SharedElement>
          <Text style={styles._nowPlayDate}>{item.release_date}</Text>
          <Components.Rating count={item.vote_average} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      searchResult: [],
    };
    this._scrollX = new Animated.Value(0);
    this.scrollY = new Animated.Value(0);
    this.clamp = new Animated.diffClamp(this.scrollY, 0, width * 0.1);
  }
  componentDidMount() {
    this.getTopRated();
    this.getNowPlaying();
  }
  getTopRated() {
    this.props.getMovieTopRated();
  }
  getNowPlaying() {
    this.props.getMovieNowPlaying(this.state.page);
  }
  toDetailMovie(data) {
    this.props.navigation.navigate('detailMovie', {
      data,
    });
  }
  searchMovie = (text) => {
    if (text === '') {
      this.setState({
        searchResult: [],
      });
      return;
    }
    const url = `search/keyword?api_key=${API_KEY_THE_MOVIE_DB}&query=${text}&page=1`;
    client_movie.get(url).then((res) => {
      this.setState({
        searchResult: res.data.results || [],
      });
    });
  };
  render() {
    const {movie} = this.props;
    const {
      top_rated_movie,
      isLoadingMovieTopRated,
      isLoadingNowPlaying,
      now_playing_movie,
    } = movie;
    const searchAnimated = this.clamp.interpolate({
      inputRange: [0, width * 0.1],
      outputRange: [0, -width * 0.15],
    });
    return (
      <View style={{...StyleSheet.absoluteFill, backgroundColor: theme.BLACK}}>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={theme.BLACK}
        />
        <ScrollView
          scrollEventThrottle={16}
          bounces={false}
          style={{
            paddingTop: width * 0.11 + PADDING * 2,
          }}
          onScroll={(e) => {
            this.scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}>
          {isLoadingMovieTopRated ? (
            <LoadingCarousel />
          ) : (
            <Animated.FlatList
              data={top_rated_movie.results || []}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: this._scrollX}}}],
                {useNativeDriver: true},
              )}
              renderItem={({item, index}) => {
                const inputRange = [
                  (index - 1) * width,
                  index * width,
                  (index + 1) * width,
                ];
                const translateX = this._scrollX.interpolate({
                  inputRange,
                  outputRange: [-width * 0.7, 0, width * 0.7],
                });
                return (
                  <TouchableWithoutFeedback
                    onPress={() => this.toDetailMovie(item)}>
                    <View style={styles._carouselContainer}>
                      <Animated.Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
                        }}
                        style={[
                          styles._carouselImage,
                          {transform: [{translateX}]},
                        ]}
                      />
                      <LinearGradient
                        colors={['transparent', '#000']}
                        style={styles._carouselGradient}
                      />
                      <Text style={styles._carouselTitle}>{item.title}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
              keyExtractor={(item, i) => i.toString()}
            />
          )}
          <View
            style={{
              padding: PADDING,
              paddingBottom: width * 0.11 + PADDING * 2,
            }}>
            <LabelContent label="Stream Party" />
            <FlatList
              data={now_playing_movie}
              numColumns={2}
              renderItem={({item, index}) => {
                return (
                  <Animatable.View
                    delay={70 * index}
                    animation="fadeInUp"
                    duration={250}>
                    <ListParty
                      item={item}
                      onPress={() => this.toDetailMovie(item)}
                    />
                  </Animatable.View>
                );
              }}
              keyExtractor={(item, i) => i.toString()}
            />
            {isLoadingNowPlaying === true ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: PADDING,
                }}>
                <ActivityIndicator color="red" />
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: PADDING,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState(
                      {
                        page: this.state.page + 1,
                      },
                      () => {
                        this.getNowPlaying();
                      },
                    );
                  }}
                  style={{
                    backgroundColor: theme.BLACK,
                    borderWidth: 1,
                    borderColor: theme.WHITE,
                    padding: PADDING / 2,
                  }}>
                  <Text
                    style={{
                      color: theme.WHITE,
                    }}>
                    LOAD MORE
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
        <Animated.View
          style={{
            position: 'absolute',
            width,
            padding: PADDING,
            left: 0,
            right: 0,
            backgroundColor: theme.BLACK,
            paddingVertical: PADDING / 2,
            transform: [{translateY: searchAnimated}],
          }}>
          <Text
            style={{
              fontSize: width * 0.04,
              fontWeight: 'bold',
              color: theme.WHITE,
              paddingVertical: PADDING / 2,
            }}>
            MoodMovie
          </Text>
          <TextInput
            style={{
              backgroundColor: '#566573',
              borderRadius: 5,
              height: width * 0.07,
              padding: PADDING,
              fontSize: width * 0.03,
            }}
            placeholder="Search..."
            onChangeText={this.searchMovie}
          />
          {this.state.searchResult.length > 0 && (
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 5,
                padding: PADDING / 2,
                marginTop: PADDING / 2,
              }}>
              <FlatList
                data={this.state.searchResult}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        paddingVertical: PADDING,
                      }}>
                      <Text>{item.name}</Text>
                    </View>
                  );
                }}
                keyExtractor={(_, i) => i.toString()}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      borderBottomColor: theme.DOFF_BLACK,
                      borderBottomWidth: 1,
                    }}
                  />
                )}
              />
            </View>
          )}
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movie: state.movie,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMovieTopRated: () => dispatch(getMovieTopRated()),
    getMovieNowPlaying: (page) => dispatch(getMovieNowPlaying(page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  _nowPlayContainer: {
    width: ITEM_SIZE,
    padding: PADDING,
    backgroundColor: theme.WHITE,
    margin: PADDING,
    marginHorizontal: PADDING / 2,
    borderRadius: 10,
    overflow: 'hidden',
    minHeight: height / 3,
  },
  _nowPlayImage: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    borderRadius: 10,
  },
  _nowPlayGradient: {
    position: 'absolute',
    bottom: 0,
    width,
    height: width / 4,
  },
  _nowPlayContainerDesc: {
    position: 'absolute',
    bottom: 0,
    padding: PADDING,
  },
  _nowPlayTitle: {
    color: theme.WHITE,
    fontWeight: 'bold',
    fontSize: width * 0.035,
  },
  _nowPlayDate: {
    color: theme.WHITE,
    fontSize: width * 0.03,
  },
  //------------------------------------------- carousel
  _carouselTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.035,
    position: 'absolute',
    bottom: PADDING,
    left: PADDING,
  },
  _carouselGradient: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: width / 4,
  },
  _carouselContainer: {
    width: width - PADDING * 2,
    height: width / 3,
    overflow: 'hidden',
    margin: PADDING,
    borderRadius: 10,
  },
  _carouselImage: {
    width: width + 50,
    height: width / 2,
    position: 'absolute',
  },
});
