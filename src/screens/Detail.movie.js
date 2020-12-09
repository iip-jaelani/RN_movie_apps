/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Animated,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
const {width, height} = Dimensions.get('window');
import {SharedElement} from 'react-navigation-shared-element';
import {
  getMovieDetail,
  getMovieVideos,
  getMovieSimilar,
} from '../redux/actions/movie.actions';
import * as Animatable from 'react-native-animatable';
import YouTube from 'react-native-youtube';

import {connect} from 'react-redux';
import {Components} from '../components';
import {THEME_DARK} from '../styles/colors';
const PADDING = width * 0.02;
const theme = THEME_DARK;
//
//
const Spacer = () => (
  <View
    style={{
      padding: PADDING * 2,
    }}
  />
);

const Genre = ({data, index}) => {
  return (
    <Animatable.View
      delay={index * 400}
      duration={400 * index}
      animation="bounceInLeft"
      style={{
        marginHorizontal: PADDING,
        borderRadius: 100,
        padding: PADDING / 2,
        paddingHorizontal: PADDING * 1.5,
        borderWidth: 1,
        borderColor: '#aaa',
      }}>
      <Animatable.Text
        style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: width * 0.03,
        }}>
        {data.name}
      </Animatable.Text>
    </Animatable.View>
  );
};

const Play = ({onPress}) => {
  return (
    <Animatable.View
      delay={400}
      duration={300}
      animation="fadeInUp"
      style={styles.containerButtonPaly}>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPress}>
        <Entypo name="controller-play" color="#fff" size={20} />
      </TouchableOpacity>
    </Animatable.View>
  );
};

const Gradient = ({bottom, top, colors}) => {
  return (
    <LinearGradient
      style={[
        styles.gradient,
        {
          bottom,
          top,
        },
      ]}
      colors={colors}
    />
  );
};

const ItemRelated = ({data, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          width: width / 2 - PADDING * 2,
          height: width * 0.7,
          margin: PADDING,
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          }}
          style={{
            ...StyleSheet.absoluteFillObject,
            resizeMode: 'cover',
            position: 'absolute',
          }}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.0)', '#000']}
          style={{
            ...StyleSheet.absoluteFillObject,
            position: 'absolute',
            bottom: 0,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: PADDING,
            left: PADDING,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#fff',
              fontSize: width * 0.04,
            }}>
            {data.original_title}
          </Text>
          <Components.Rating count={data.vote_average} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

class DetailMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playVideo: false,
    };
    this.scrollY = new Animated.Value(0);
  }

  componentDidMount() {
    this.getData();
  }
  getData() {
    const {data} = this.props.route.params;
    this.props.getMovieDetail(data.id);
    this.props.getMovieVideos(data.id);
    this.props.getMovieSimilar(data.id);
  }

  toDetailMovie(data) {
    this.props.navigation.push('detailMovie', {
      data,
    });
  }

  render() {
    const {route, movie} = this.props;
    const {
      movie_data,
      isLoadingDetail,
      movie_video,
      isLoadingMovie,
      isLoadingMovieSimilar,
      similar_movie,
    } = movie;
    const {data} = route.params;
    const opacity = this.scrollY.interpolate({
      inputRange: [height / 2, height / 2],
      outputRange: [0, 1],
    });

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
            {
              useNativeDriver: true,
              listener: (event) => {
                // do something special
              },
            },
          )}>
          <View>
            <View style={[styles.HeadingContainer]}>
              <SharedElement
                id={`item.${data.id}.photo`}
                style={styles.headingImage}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
                  }}
                  style={styles.image}
                />
              </SharedElement>
              <Gradient colors={[theme.BLACK, 'rgba(0,0,0,0.0)']} top={0} />
              <Gradient colors={['rgba(0,0,0,0.0)', theme.BLACK]} bottom={0} />
              <SharedElement
                style={styles.titleContainer}
                id={`item.${data.title}.title`}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.title,
                    {
                      width: width - width * 0.1,
                      textAlign: 'left',
                      marginLeft: PADDING,
                    },
                  ]}>
                  {data.title}Ea ullamco ut consectetur laborum labore.
                </Text>
              </SharedElement>
              <Play
                onPress={() =>
                  this.setState({
                    playVideo: true,
                  })
                }
              />
            </View>
            <View
              style={{
                padding: PADDING,
              }}>
              <Components.Rating count={data.vote_average} sizeIcon={15} />
            </View>
          </View>
          <Spacer />
          {!isLoadingDetail && (
            <View>
              <FlatList
                data={movie_data.genres ? movie_data.genres : []}
                horizontal
                renderItem={({item, index}) => {
                  if (!item.name) {
                    return null;
                  }
                  return <Genre data={item} index={index} />;
                }}
              />
              <View
                style={{
                  padding: PADDING,
                }}>
                <Animatable.Text
                  duration={500}
                  delay={400}
                  animation="fadeInUp"
                  style={{
                    color: '#fff',
                    fontSize: width * 0.03,
                    fontWeight: 'bold',
                  }}>
                  {data.title || ''}
                </Animatable.Text>
                <Animatable.Text
                  duration={500}
                  delay={400}
                  animation="fadeInUp"
                  style={{
                    color: '#E5E8E8',
                    fontSize: width * 0.03,
                  }}>
                  {movie_data.overview || ''}
                </Animatable.Text>
              </View>
            </View>
          )}
          <Spacer />
          <Animatable.Text
            duration={600}
            delay={600}
            animation="fadeInUp"
            style={{
              fontWeight: 'bold',
              fontSize: width * 0.04,
              color: '#fff',
              margin: PADDING,
            }}>
            Related
          </Animatable.Text>
          {isLoadingMovieSimilar ? (
            <View>
              <ActivityIndicator color="red" />
            </View>
          ) : (
            <FlatList
              numColumns={2}
              data={similar_movie.results || []}
              renderItem={({item, index}) => (
                <ItemRelated
                  data={item}
                  index={index}
                  onPress={() => this.toDetailMovie(item)}
                />
              )}
            />
          )}
        </Animated.ScrollView>
        {this.state.playVideo && !isLoadingMovie && (
          <View>
            <YouTube
              controls={1}
              play={this.state.playVideo}
              fullscreen={true}
              apiKey="AIzaSyDW6yWCHJk3_IkNvxUzUG-ZoR7Gv7MvS7E"
              videoId={movie_video.results[0] ? movie_video.results[0].key : ''} // The YouTube video ID
              resumePlayAndroid
              style={{
                alignSelf: 'stretch',
              }}
            />
          </View>
        )}
        <Animated.View
          style={{
            backgroundColor: theme.BLACK,
            width,
            minHeight: width * 0.15,
            paddingTop: StatusBar.currentHeight + PADDING,
            padding: PADDING,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            opacity,
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={[styles.title, {textAlign: 'left', flex: 1}]}>
            {data.title}
          </Text>
          <Play
            onPress={() =>
              this.setState({
                playVideo: true,
              })
            }
          />
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
    getMovieDetail: (id) => dispatch(getMovieDetail(id)),
    getMovieVideos: (id) => dispatch(getMovieVideos(id)),
    getMovieSimilar: (id) => dispatch(getMovieSimilar(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BLACK,
  },
  HeadingContainer: {
    width,
    height: height / 2,
  },
  headingImage: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    backgroundColor: theme.BLACK,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    resizeMode: 'cover',
    width,
    height: height / 2,
  },
  gradient: {
    width,
    height: height * 0.1,
    position: 'absolute',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  containerButtonPaly: {
    backgroundColor: 'red',
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 100,
    position: 'absolute',
    bottom: PADDING,
    right: PADDING,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
