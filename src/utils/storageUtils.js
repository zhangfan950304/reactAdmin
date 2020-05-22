import store from 'store'
const USER_KEY ='user_key'

export default{
	saveUser (user){
		/*localstroage.setItem(USER_KEY,JSON.stringify(user));*/
		store.set(USER_KEY,user)
	},
	getUser(){
		/*return JSON.parse(localStroage.getItem(USER_KEY) || '{}')*/
		return store.get(USER_KEY) || {}
	},	
	removeUser(){
		//localStorage.removeItem(USER_KEY);
		store.remove(USER_KEY)
	}

}