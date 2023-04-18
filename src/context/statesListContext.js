import React from 'react'

const StatesListContext = React.createContext({
  statesList: [],
  setAscending: () => {},
  isAscending: true,
})

export default StatesListContext
