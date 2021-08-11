import React, { ReactElement } from 'react';
import { routerList } from '../contants/router'
import { Switch, Route, Redirect } from 'react-router-dom'

interface Props {
  [propName: string]: any;
}

export default function RouterComp({ }: Props): ReactElement {

  const renderRouter = (routerList) => {
    return <Switch>
            {routerList.map((router: any) => {
              let { path, components, key, children } = router
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
                return <Route path={path} component={components} key={key} />
              }
            })}
          </Switch>
  }

  return <>
    {renderRouter(routerList)}
  </>;
}
