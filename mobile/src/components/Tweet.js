import React, { Component } from 'react'
import api from '../services/api'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

export default class Tweet extends Component {
  state = {
    IconColor: '#999',
    IconName: 'ios-heart-empty',
  }
  handleLike = async () => {
    const {_id } = this.props.tweet;

    try {
      await api.post(`likes/${_id}`);
        this.setState({ IconName: 'ios-heart', IconColor: '#F00' }); 

    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { tweet } = this.props
    return (
      <View style={styles.container}>
        <Text styles={styles.author}>{tweet.author}</Text>
        <Text styles={styles.content}>{tweet.content}</Text>

        <TouchableOpacity onPress={this.handleLike} style={styles.likeButton}>
          <Icon name={this.state.IconName} size={20} color={this.state.IconColor} />
          <Text style={styles.likeText}>{tweet.likes}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },

  author: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1C2022'
  },

  content: {
    fontSize: 15,
    lineHeight: 20,
    color: '#1C2022',
    marginVertical: 10
  },

  likeButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  likeText: {
    color: '#999',
    marginLeft: 5
  }
})