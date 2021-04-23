
export const initialState = {
    test: "test piece o' state"
  }

const reducer = (state=initialState, action)=>{
    console.log(state)
    switch (action.type){
            
        default:
            return state;


}

}
  
  export default reducer