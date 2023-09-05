import React, { Component } from 'react';
import {TextInput,View ,Alert,Picker,StyleSheet,Text,FlatList,TouchableOpacity,Image} from 'react-native';



// let homeImage=require('./home.png')
// let marketImage=require('./market.png')
// let officeImage=require('./office.jpg')
// let otherImage=require('./other.jpg')

export default class Basic extends Component {
   constructor(props){
    super(props);
    this.state={addTask:false, todoData : []}
    
  }

  // homeImage={uri:'https://cdn2.iconfinder.com/data/icons/basic-4/512/home-512.png'};
  // marketimage={uri:'http://www.tilthalliance.org/about/basketincircle.png/image'};
  // officeImage={uri:'https://image.flaticon.com/icons/png/512/63/63611.png'};
  // otherImage={uri:''};


  componentDidMount(){
    this.fetchTodoData()
  }

  fetchTodoData=async()=>{
    let todoDataRecived = await fetch('https://shrouded-bayou-65806.herokuapp.com/todo')

    let r = await todoDataRecived.json()
     this.setState({todoData: r})
  }
     
     
     
     
  onPressAdd=()=>{
    this.setState({addTask:true,userInput:"",itemValue:"",categoryValue:""}) 
  }

   onPressSave = async() =>{
     if (this.state.itemValue=='' || this.state.userInput=='')
     {
      Alert.alert(
        'You need to enter task & status'
     )
     }
     else
     {
     console.log(this.state.itemValue)
     console.log(this.state.categoryPosition)
     try{
        await fetch('https://shrouded-bayou-65806.herokuapp.com/todo', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            task:this.state.userInput,
            status:this.state.itemValue
          }),
        });
      }
      catch(error){
        console.log(error)
      }
    
  
    this.fetchTodoData()
    this.setState({addTask:false})
     }
    }
  

  
  
  renderTodoItems = ({item}) => {
    console.log("item", item)
    return(
      <View style={styles.flatListRow}>
     {/*<View style={{flexDirection: "row", justifyContent: "space-between",padding: 15,
     marginBottom: 5}}> */}
      <Text style={styles.flatListText1}>{item.Task}</Text>
      <Text style={styles.flatListText2}>{item.Status}</Text>
      
      </View>
    )
  }
  
  render() 
  {
    console.log("todoData", this.state.todoData, this.state.addTask)
    if (!this.state.addTask)
      {
        return (
       
          <View style={{flex:1,backgroundColor:'black'}}>
          <View style={{alignItems:'center',backgroundColor: '#f0f8ff',borderWidth:4,paddingTop:0,borderColor:'black'}} >
            <Text style={styles.Heading}>To Do List</Text>
          </View>
        
            <FlatList
              data = {this.state.todoData}
              renderItem={this.renderTodoItems}
              keyExtractor={(index) => index.toString()}
              extraData={this.state.todoData}
            />        
          
         
            <TouchableOpacity style={styles.buttonStyle}  
              onPress={this.onPressAdd}>
              <Text style={styles.TextButton}>Add</Text>
            </TouchableOpacity>
       </View>
      );
    }
    else {
      return (
      <View style={{flex:1,
        
      backgroundColor: '#f0f8ff',paddingTop:0,borderColor:'black'}}>
        <View style={{alignItems:'center',backgroundColor: '#f0f8ff',borderWidth:4,paddingTop:0,borderColor:'black'}} >
            <Text style={styles.Heading}>New ToDo Item</Text>
          </View>
       
        <TextInput
          style={{margin:10,borderWidth:1,borderRadius:10}}
          placeholder="Enter a task here"
          onChangeText={(userInput) => this.setState({userInput})} 
          value={this.state.userInput}
          />
      
        <View style={{flex:3}}>
          <Picker  style={styles.pickerStyle}  
                    prompt={'Select'}
                        selectedValue={this.state.itemValue}  
                        onValueChange={(itemValue, itemPosition) =>  
                            this.setState({itemValue,itemPosition})} 
                >  
                    
                    <Picker.Item label="Select status of your  Task" value="0" /> 
                    <Picker.Item label="Complete" value="complete" />  
                    <Picker.Item label="Incomplete" value="incomplete" />  
          </Picker>  
            <Picker  style={styles.pickerStyle}
                     prompt={'Select'}  
                        selectedValue={this.state.categoryValue}  
                        onValueChange={(categoryValue, categoryPosition) =>  
                            this.setState({categoryValue,categoryPosition})} 
                            
                    > 
                    <Picker.Item label="Select category of your Task" value="0" />   
                    <Picker.Item label="Home" value="home" />  
                    <Picker.Item label="Market" value="market" /> 
                    <Picker.Item label="Office" value="office" /> 
                    <Picker.Item label="Other" value="other" />  
          </Picker> 
        </View>
        <View>
            <TouchableOpacity style={styles.buttonStyle}  
              onPress={this.onPressSave}>
              <Text style={styles.TextButton}>Done</Text>
            </TouchableOpacity>
        </View>
      </View>
      );
    }
}
}




const styles = StyleSheet.create({
  Heading: {
    padding:10,
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    color:'black',
    },

  buttonStyle: {
    backgroundColor:'#f0f8ff',
    height:50,
    borderWidth:2,
    
    
    },

  TextButton:{
    color:"black",
    fontSize:20,
    textAlign:"center",
    paddingTop:10,
    fontStyle:'italic',
    fontWeight:'bold'
  },

  pickerStyle:{
    height: 30,  
    alignSelf:'stretch',  
    color: '#344953',
   },

   flatListRow:{
    flexDirection: "row", 
    justifyContent: "space-between",
    backgroundColor: '#deb887',
    padding:20,
    marginBottom:2,
    
   },

   flatListText1:{
     fontSize:16,
     fontWeight:'400',
     color:'black',
     

   },
   flatListText2:{
    fontSize:10,
    fontWeight:'400',
    color:'black',
    
   }
   
  })