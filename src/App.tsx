import React, { useEffect } from 'react';
import './App.less';
import RouterComp from '@/router/index'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {

  const userInfo = useSelector((state: any) => state.userInfo)
  const history = useHistory()
  const location = useLocation()

  console.log(userInfo, 'app')

  useEffect(() => {
    let isLogin = userInfo.token
    if(!isLogin) {
      history.push('/login')
    }else{
      if(location.pathname === '/login') {
        history.push('/main/home')
      }
    }
  }, [])

  return (
    <div className="App">
      <RouterComp />
    </div>
  );
}

export default App;
