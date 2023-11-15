import React, { useState , useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BackHandler } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';




const HomeScreen = ({ navigation }) => {
  
  const data = [
    { id: '1', title: 'Burger', image: require('../images/item1.png') },
    { id: '2', title: 'Pizza', image: require('../images/item2.png') },
    { id: '5', title: 'Fried Chicken', image: require('../images/item5.png') },
    { id: '4', title: 'Shawarma', image: require('../images/item4.png') },
    { id: '6', title: 'Sandwich', image: require('../images/item6.png') },
    { id: '3', title: 'Sides', image: require('../images/item3.png') },
    // Add more items as needed
  ];

const route = useRoute();
const userId = route.params.userId;

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => {   navigation.navigate('SearchCategoriesScreen', {
        itemId: item.id,
        itemImage: item.image,
        userId: userId ,
      });}}>
      <Image source={item.image} style={styles.gridItemImage} />
      <Text style={styles.gridItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchButton} onPress={() => { navigation.navigate('CommandeScreen', {
        userId: userId ,
      });}}>
          <Icon name="shopping-basket" size={23} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('ProfileScreen', { userId: userId }); }}>
            <Image
              source={require('../images/profile.png')}
              style={styles.circularImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.midRow}>
        <View style={styles.midRowRow1}>
          <View style={styles.column1}>
            <Text style={styles.text}>All categories</Text>
          </View>
          <View style={styles.column2}>
          </View>
        </View>
        <View style={styles.midRowRow2}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={data.length}
            />
          </ScrollView>
        </View>
      </View>
      <View style={styles.lowerRow}>
        <View style={styles.lowerRowRow1}>
          <View style={styles.column11}>
            <Text style={styles.text}>Open Restaurants</Text>
          </View>
          <View style={styles.column22}>
            <TouchableOpacity onPress={() => {  navigation.navigate('SearchRestaurantsScreen', { userId: userId  });}}>
              <Text style={styles.clickableText}>See All   &gt; </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lowerRowRow2}>
          <CustomCard
            image={require('../images/cardImage.jpg')}
            title1="Rose Garden Restaurant"
            title2="Burger  -  Chiken  -  Riche  -  Wings"
          />
        </View>
      </View>
    </View>
  );
};

const CustomCard = ({ image, title1 , title2  }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.cardText1}>{title1}</Text>
      <Text style={styles.cardText2}>{title2}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon}>
          <Icon name="star" size={20} color="#ff7424" />
          <Text style={styles.cardText11}>4.7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="truck" size={20} color="#ff7424" />
          <Text style={styles.cardText22}>Free</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="clock-o" size={20} color="#ff7424" />
          <Text style={styles.cardText22}>20 min</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff7424',
  },
  circularImage: {
    width: 50,
    height: 50,
    borderRadius: 1000,
    marginLeft: 280,
    backgroundColor: 'grey',
  },
  searchRow: {
    flex: 0.2,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  searchButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignSelf: 'flex-start',
    marginLeft: 16,
  },
  midRow: {
    flex: 0.3,
    backgroundColor: 'white',
  },
  midRowRow1: {
    flex: 0.2,
    flexDirection: 'row',
  },
  midRowRow2: {
    flex: 0.8,
  },
  column1: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 16,
  },
  column2: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 16,
  },
  lowerRow: {
    flex: 0.8,
    backgroundColor: 'white',
  },
  column11: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 16,
  },
  column22: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 16,
  },
  lowerRowRow1: {
    flex: 0.1,
    flexDirection: 'row',
  },
  lowerRowRow2: {
    flex: 0.9,
  },
  clickableText: {
    color: 'grey',
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  gridItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginLeft: 6,
  },
  gridItemImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  gridItemText: {
    marginTop: 8,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  cardImage: {
    width: '95%',
    height: '60%',
    borderRadius: 20,
    resizeMode: 'contain',
  },
  cardText1: {
    marginTop: 8,
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
  },
  cardText2: {
    marginTop: 8,
    fontSize: 16,
    color: 'gray',
  
  },
  cardText11: {
    marginTop: 8,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  cardText22: {
    marginTop: 8,
    fontSize: 16,
    color: 'gray',
  
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex',
    width: '100%',
    marginTop: 8,
    
  },
  icon: {
    flex: 1,
    alignItems: 'center',
  },
});

export default HomeScreen;
