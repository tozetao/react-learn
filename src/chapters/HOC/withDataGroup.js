import React from 'react'
import commonTypes from '../../util/commonTypes'

export default function withDataGroup(Comp) {
  return class DataGroupWrapper extends React.Component {
    static propTypes = {
      data: commonTypes.options
    }

    render() {
      const comps = this.props.data.map(item => {
        let rest = {...this.props, option: { label: item.label, value: item.value } }
        delete rest.data
  
        return <Comp key={item.value} {...rest} />
      })
      return <>{comps}</>
    } 
  }
}