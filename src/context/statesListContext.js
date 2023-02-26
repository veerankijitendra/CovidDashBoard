import React from 'react'

const StatesListContext = React.createContext({
  statesList: [],
  setAscending: () => {},
})

export default StatesListContext
