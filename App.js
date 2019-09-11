import React,{Component} from 'react';
import { StyleSheet, View,ScrollView,Dimensions,Modal ,TouchableHighlight} from 'react-native';
import {Container,Card,CardItem,Body,Text,Content,Button,Input} from 'native-base';
import {AppLoading} from 'expo';
import {Alert} from "react-native-web";
import {request_view} from "./request/request_view";

const {height} = Dimensions.get('window');
export default class App extends Component {
//
  constructor(props){
    super(props);
    this.state = {

      contentHeight : height,
      loading : true,
      modalVisible: false,
      createModalVisible : false,

      listOfUser : [],
    }
  }

  setModalVisible(modalType,visible) {

    if(modalType === 'create')
    {
      this.setState({createModalVisible: visible});
    }
    if(modalType === 'update'){
      this.setState({modalVisible: visible});
    }
  }

  onContentSizeChange = (contentWidth, contentHeight) =>
  {
    this.setState({
      screenHeight:contentHeight
    });
  };


  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });

    request_view().then(data => {
       return this.setState({listOfUser:data});
    });

  }


  componentDidMount() {
    console.log(this.state.listOfUser);
  };


  createModal = () => {
    return(
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.createModalVisible}
            onRequestClose={() => {
              console.log('BB');
            }}>
          <View style={styles.containerScroll}>
            <View style={styles.containerScroll}>

              <Card>
                <CardItem header bordered>
                  <Text>Name :</Text><Input/>
                </CardItem>
                <CardItem header bordered>
                  <Text>Age :</Text><Input/>
                </CardItem>
                <CardItem header bordered>
                  <Text>Address :</Text><Input/>
                </CardItem>
                <CardItem header bordered style={{justifyContent:'space-around'}}>
                  <Button><Text>Create</Text></Button>
                  <Button onPress={() => {
                    this.setModalVisible('create',!this.state.createModalVisible);
                  }}><Text>Close Modal</Text></Button>
                </CardItem>
              </Card>


            </View>
          </View>
        </Modal>
    );
  };

  updateModal = () =>{
    return(
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              return this.setState({modalVisible: false});
            }}>
          <View style={styles.containerScroll}>
            <View>
              <Text>Hello World!</Text>
              <Button onPress={() => {
                this.setModalVisible('update',!this.state.modalVisible);
              }}><Text>Close Modal</Text></Button>
            </View>
          </View>
        </Modal>
    );
  };

  ListOfUser = () => {

    return this.state.listOfUser.map((listUser) =>

      <Card key={listUser.id}>

        <CardItem header bordered>
          <Text>Name : {listUser.name}</Text>
        </CardItem>
        <CardItem header bordered>
          <Text>Age : {listUser.age}</Text>
        </CardItem>
        <CardItem header bordered>
          <Text>Address : {listUser.address}</Text>
        </CardItem>
        <CardItem footer bordered style={{justifyContent:'space-around'}}>
          <Button onPress={() => this.setModalVisible('update',true)}><Text>Update</Text></Button>

          <Button onPress={()=>console.log(this.state.listOfUser)}><Text>Delete</Text></Button>
        </CardItem>
      </Card>

    )

  };

  render(){
    if (this.state.loading) {
      return <AppLoading
          style={{flex:1}}/>;
    }
    return (
        <Container style={{height:this.state.screenHeight}}>
          {this.updateModal()}
          {this.createModal()}
          <ScrollView onContentSizeChange={this.onContentSizeChange}>
            <Content>
              <View style={styles.containerScroll}>
                {this.ListOfUser()}
              </View>
            </Content>
          </ScrollView>
          <CardItem footer style={{justifyContent:'space-around'}}>
            <Button onPress={()=> this.setModalVisible('create',true)}><Text>Insert/Create</Text></Button>
          </CardItem>
        </Container>




    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerScroll:{
    flex: 1,
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    marginTop:30,
  },
});


