import React,{Component} from 'react';
import { StyleSheet, View,ScrollView,Dimensions,Modal ,TouchableHighlight} from 'react-native';
import {Container,Card,CardItem,Body,Text,Content,Button,Input} from 'native-base';
import {AppLoading} from 'expo';
import {Alert} from "react-native-web";
import {request_view} from "./request/request_view";
import {request_create} from "./request/request_create";
import {request_read} from "./request/request_read";
import {request_update} from "./request/request_update";
import {request_delete} from "./request/request_delete";

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

      id : '',
      createName : '',
      createAge : '',
      createAddress : '',
    }
  }

  setModalVisible(modalType,visible,id) {

    if(modalType === 'create')
    {
      this.setState({createModalVisible: visible});
    }
    if(modalType === 'update'){

      if(this.state.modalVisible === true){
        return this.setState({modalVisible:false});
      }

      if(this.state.modalVisible === false){

        request_read(id).then(res=>{


          return this.setState({
            modalVisible:true,
            id : res[0].id,
            createName : res[0].name,
            createAge : res[0].age,
            createAddress : res[0].address,
          });


        });

        return this.setState({modalVisible:true});
      }




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
    // console.log(this.state.listOfUser);
  };


  createModal = () => {
    return(
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.createModalVisible}
            onRequestClose={() => {
              return this.setState({createModalVisible : false});
            }}>
          <View style={styles.containerScroll}>
            <View style={styles.containerScroll}>

              <Card>
                <CardItem header bordered>
                  <Text>Name :</Text><Input
                    onChangeText={text => this.setState({createName: text})}
                />
                </CardItem>
                <CardItem header bordered>
                  <Text>Age :</Text><Input
                    onChangeText={text => this.setState({createAge: text})}
                />
                </CardItem>
                <CardItem header bordered>
                  <Text>Address :</Text><Input
                    onChangeText={text => this.setState({createAddress: text})}
                />
                </CardItem>
                <CardItem header bordered style={{justifyContent:'space-around'}}>
                  <Button onPress={() =>
                  {

                    const s = this.state;

                    if(s.createName === '' || s.createAge === '' || s.createAddress === ''){

                      alert("Please fill the box!");

                    } else {

                      request_create(s.createName,s.createAge,s.createAddress).then(result =>{

                        // console.log(result);

                        if(result.status === 'error'){
                          alert(result.msg);
                        }else {

                          request_view().then(data => {

                            this.setModalVisible('create',!this.state.createModalVisible);
                            alert(result.msg);

                            return this.setState({
                              listOfUser:data,
                              createName:'',
                              createAge:'',
                              createAddress:''
                            });
                          });

                        }

                      })

                    }}
                  }

                  ><Text>Create</Text></Button>
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
            <View style={styles.containerScroll}>

              <Card>
                <CardItem header bordered>
                  <Text>Name :</Text><Input
                    onChangeText={text => this.setState({createName: text})}
                    value={this.state.createName}
                />
                </CardItem>
                <CardItem header bordered>
                  <Text>Age :</Text><Input
                    onChangeText={text => this.setState({createAge: text})}
                    value={this.state.createAge}
                />
                </CardItem>
                <CardItem header bordered>
                  <Text>Address :</Text><Input
                    onChangeText={text => this.setState({createAddress: text})}
                    value={this.state.createAddress}
                />
                </CardItem>
                <CardItem header bordered style={{justifyContent:'space-around'}}>
                  <Button onPress={() =>
                  {

                    const val = this.state;

                    request_update(val.id,val.createName,val.createAge,val.createAddress).then(res=>{

                      if(res.status === 'success')
                      {

                        request_view().then(data => {

                          alert(res.msg);
                          return this.setState({
                            modalVisible: false,
                            id : '',
                            createName : '',
                            createAge : '',
                            createAddress : '',
                            listOfUser : data,

                          })

                        });


                      }

                    });

                  }
                  }

                  ><Text>Update</Text></Button>
                  <Button onPress={() => {
                    this.setModalVisible('update',!this.state.modalVisible);
                  }}><Text>Close Modal</Text></Button>
                </CardItem>
              </Card>


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
            <Button onPress={() => this.setModalVisible('update',true,listUser.id)}><Text>Update</Text></Button>

            <Button onPress={()=>{

              request_delete(listUser.id).then(res => {
                if(res.status === 'success'){

                  request_view().then(data=>{
                    return this.setState({
                      listOfUser : data
                    });
                  });

                }
                else{
                  alert(res.msg);
                }
              });

            }}><Text>Delete</Text></Button>
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


