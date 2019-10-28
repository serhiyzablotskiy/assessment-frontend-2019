import React from 'react'

export const AppContext = React.createContext({})

export function withAppContext(Component, customProps) {
  return function ContextComponent(props) {
    return (
      <AppContext.Consumer>
        {context => <Component {...context} {...props} {...customProps} />}
      </AppContext.Consumer>
    )
  }
}
