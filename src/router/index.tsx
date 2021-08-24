import React, { ReactElement } from 'react';
import { routerList } from '../contants/router'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

interface Props {
  [propName: string]: any;
}

export default function RouterComp({ }: Props): ReactElement {

  const userInfo = useSelector((state: any) => state.userInfo)

  const renderRouter = (routerList) => {
    return <Switch>
            {routerList.map((router: any) => {
              let { path, components, key, children, redirect } = router
              if (children && children.length) {
                return <Route path={path} key={key} render={() => {
                  let WrapperComp = components
                  return (
                    <>
                      <WrapperComp>
                        {renderRouter(children)}
                      </WrapperComp>
                    </>
                  )
                }} />
              } else {
                return redirect ? <Redirect to={redirect} from={path} key={key}/> : <Route path={path} component={components} key={key} />
              }
            })}
          </Switch>
  }

  console.log(renderRouter(routerList))

  return <>
    {renderRouter(routerList)}
  </>;
}
