import React from 'react';
import { StyleSheet, Button,Text, View, Image,TextInput, Alert, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginstatus,setLoginstatus] = React.useState("fail")
  const [info,setInfo]= React.useState({"username":"","password":"","nickname":""})
  React.useEffect(() => {getData()}
          ,[info,username,password])
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@userinfo')
      let data = null
      if (jsonValue!=null) {
      data = JSON.parse(jsonValue)
      setInfo(data)
      console.log('just set info')
      } else {
        console.log('just read a null value from Storage')
        setUsername("")
        setPassword("")
        setNickname("")
      }
      } catch(e) {
        console.log("error in getData ")
        console.dir(e)
        }
  };

  const createLoginButtonAlert = () =>
    Alert.alert(
      "Sorry",
      "Username or password is wrong!",
    [
      { text: "OK", onPress: () => console.log("OK Pressed")}
    ]
  );

  return (
    <View style={styles.login}>
      <View style ={{justifyContent: 'flex-start'}}>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text style={{fontSize:35, color:'#f4511e',fontWeight:'bold'}}>Login Teammates</Text>
      <Text></Text>
      <Text style={{fontSize:20, color:'#f4511e',fontWeight:'bold'}}> User Name:</Text>
      <TextInput style={styles.input}
            onChangeText={text => setUsername(text)}
            placeholder="key in your email or phonenumber"
            value={username}
      />
      <Text></Text>
      <Text style={{fontSize:20, color:'#f4511e',fontWeight:'bold'}}> Password:</Text>
      <TextInput style={styles.input}
            onChangeText={text => setPassword(text)}
            placeholder="key in your password"
            value={password}
      />
      <Text></Text>
      </View>
      <View style ={{alignItems: 'center'}}>
      <View style ={{height: 43,width: 100,backgroundColor:"#f4511e",justifyContent:"canter",alignItems:'center'}}>
        <Button
             title={"LOGIN"}
             color="white"
             onPress = {() => {
               if (username==info.username.toString() && password==info.password.toString()) {
                 navigation.navigate('Me')
                 setLoginstatus("Successful")
               }else{
                 setLoginstatus("waiting")
               }
             }}
          />
      </View>
      <Button title="Register" onPress={() =>navigation.navigate('Register')} color='#f4511e'/>
      </View>
      <Text> info: {info.username.toString()}</Text>
      <Text> info: {username}</Text>
      <Text> info: {info.password.toString()}</Text>
      <Text> info: {password}</Text>
      <Text> info: {loginstatus}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  login:{
    backgroundColor: 'whitesmoke',
    height: 860,
    width: 395,
    flexDirection:'column',
    justifyContent: 'flex-start',
    padding:20,
  },
  input:{
    height: 50,
    width: 350,
    borderColor: 'gray',
    borderWidth: 2
  },
});

export default Login;