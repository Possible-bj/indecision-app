import React from 'react'
import AddOption from './AddOption'
import Options from './Options'
import Action from './Action'
import Header from './Header'
import OptionModal from './OptionModal'
// 333745
export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  }
  handleDeleteOptions = () => {
    this.setState(() => ({options: []}))
  }
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }))
  } 
  handlePick = () => {
    const randomPick = Math.floor(Math.random() * this.state.options.length)
    const option = this.state.options[randomPick]
    this.setState(() => ({ selectedOption: option }))
    // alert(option)
  } 
  hideModal = () => {
    this.setState(() => ({ selectedOption: undefined }))
  }
  addOption = (option) => {
    if (!option) {
      return "Enter Valid Value to Item"
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Option already Exist!'
    }
    this.setState((prevState) => ({options: prevState.options.concat(option)}))
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem('options')
      const options = JSON.parse(json)
      if (options) {
        this.setState(() => ({options}))
      }
    } catch (e) {
      // do nothing at all
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options)
      localStorage.setItem('options', json)
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <Action
            hasOptions={this.state.options.length > 0} 
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options 
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
              hasOptions={this.state.options.length > 0}
            />
            <AddOption addOption={this.addOption}/>
          </div>
        </div>
        <OptionModal 
          selectedOption={this.state.selectedOption}
          hideModal={this.hideModal}
        />
      </div>
    )
  }
}