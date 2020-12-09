/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {getArtist} from '../redux/actions/music.actions';
import {getMovieTrending} from '../redux/actions/movie.actions';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Rect} from 'react-native-svg';
import {SharedElement} from 'react-navigation-shared-element';
import {PAUSE} from 'redux-persist';

//
const {width, height} = Dimensions.get('window');

//
const ITEMS_SIZE = width * 0.72;
const ITEM_SIZE = width * 0.65;
const PADDING = width * 0.02;
//
const Loading = () => {
  return <ActivityIndicator color="red" />;
};

const Background = ({data, scrollX}) => {
  return (
    <View
      style={{
        height: height / 2,
        width,
        position: 'absolute',
      }}>
      <FlatList
        data={data}
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: height / 2}}
        renderItem={({item, index}) => {
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEMS_SIZE, (index - 1) * ITEMS_SIZE],
            outputRange: [-width, 0],
            // extrapolate:'clamp'
          });
          if (!item.backdrop_path) {
            return null;
          }
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                width,
                height,
                overflow: 'hidden',
                transform: [{translateX}],
                position: 'absolute',
              }}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
                }}
                style={{
                  width,
                  height: height / 2,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
        keyExtractor={(_, i) => i.toString()}
      />
      <LinearGradient
        colors={['transparent', '#000']}
        style={{
          position: 'absolute',
          bottom: 0,
          width,
          height: height / 2,
        }}
      />
    </View>
  );
};

const Items = ({data, navigation}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('detailMovie', {data});
      }}>
      <View
        style={{
          width: ITEM_SIZE,
          margin: width * 0.02,
          padding: width * 0.02,
          borderRadius: 20,
          overflow: 'hidden',
          justifyContent: 'space-between',
        }}>
        <View>
          <SharedElement id={`item.${data.id}.photo`}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
              }}
              style={{
                width: ITEM_SIZE - width * 0.04,
                height: ITEMS_SIZE + width * 0.1,
                borderRadius: 20,
              }}
            />
          </SharedElement>
          <Text
            style={{
              textAlign: 'center',
              fontSize: width * 0.03,
              marginTop: width * 0.01,
              color: '#888',
            }}>
            {data.release_date}
          </Text>
        </View>

        <View>
          <SharedElement id={`item.${data.title}.title`}>
            <Text
              numberOfLines={2}
              style={{
                fontWeight: 'bold',
                fontSize: width * 0.04,
                textAlign: 'center',
                color: '#fff',
              }}>
              {data.title}
            </Text>
          </SharedElement>
          <Text
            numberOfLines={2}
            style={{
              fontSize: width * 0.035,
              textAlign: 'center',
              color: '#888',
            }}>
            {data.overview}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export class RecommendMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      intervalStop: 15,
    };
    this.scrollX = new Animated.Value(0);
  }
  componentDidMount() {
    this.getMovie();
  }
  getMovie() {
    this.props.getMovieTrending();
  }

  render() {
    const {movie} = this.props;
    if (movie.isLoading) {
      return <Loading />;
    }
    const reducers_data = movie.data[0] ? movie.data[0].results : [];
    const translateX = (index) =>
      this.scrollX.interpolate({
        inputRange: [
          (index - 2) * ITEMS_SIZE,
          (index - 1) * ITEMS_SIZE,
          index * ITEMS_SIZE,
        ],
        outputRange: [0, -50, 0],
      });
    const data = [{}, ...reducers_data, {}];
    return (
      <>
        <StatusBar translucent={true} backgroundColor="transparent" />

        <View
          style={{
            flex: 1,
            backgroundColor: '#000',
          }}>
          <Background data={data} scrollX={this.scrollX} />
          <Animated.FlatList
            horizontal
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: this.scrollX}}}],
              {useNativeDriver: false},
            )}
            snapToInterval={ITEMS_SIZE}
            scrollEventThrottle={16}
            bounces={false}
            data={data}
            contentContainerStyle={{
              alignItems: 'flex-end',
            }}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            renderToHardwareTextureAndroid
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.5}
            renderItem={({item, index}) => {
              if (!item.title) {
                return (
                  <View
                    style={{
                      width: (width - ITEMS_SIZE) / 2,
                    }}
                  />
                );
              }
              return (
                <Animated.View
                  style={{
                    transform: [{translateY: translateX(index)}],
                    width: ITEMS_SIZE,
                    alignItems: 'center',
                  }}>
                  <Items
                    data={item}
                    key={index}
                    navigation={this.props.navigation}
                  />
                </Animated.View>
              );
            }}
            keyExtractor={(_, i) => i.toString()}
          />
          <View
            style={{
              padding: PADDING,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('BottomNavigator');
              }}
              style={{
                backgroundColor: 'red',
                padding: PADDING,
                borderRadius: 100,
                paddingHorizontal: PADDING * 2,
              }}>
              <Text
                style={{
                  fontSize: width * 0.035,
                  color: '#fff',
                }}>
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
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
    getArtist: (id) => dispatch(getArtist(id)),
    getMovieTrending: () => dispatch(getMovieTrending()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RecommendMovie);
