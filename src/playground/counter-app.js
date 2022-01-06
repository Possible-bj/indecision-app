class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.addOne = this.addOne.bind(this)
    this.minusOne = this.minusOne.bind(this)
    this.reset = this.reset.bind(this)
    this.state = {
      count: 0
    }
  }
  addOne() {
    this.setState((prevstate) => {
      return {
        count: prevstate.count +1
      }
    })
  }
  minusOne() {
    this.setState((prevstate) => {
      return {
        count: prevstate.count -1
      }
    })
  }
  reset() {
    this.setState(() => {
      return {
        count: 0
      }
    })
  }
  componentDidMount() {
    try {
      const count = +localStorage.getItem('count')
      if ( !isNaN(count) ) {
        this.setState(() => ({ count }))
      }
    } catch (e) {

    }
  }
  componentDidUpdate(prevProps, prevstate) {
    if ( prevstate.count !== this.state.count ) {
      localStorage.setItem('count', this.state.count)
    }
  }
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.addOne}>+1</button>
        <button onClick={this.minusOne}>-1</button>
        <button onClick={this.reset}>reset</button>
      </div>
    )
  }
}
// const getLocation = (location) => {
//   if (location) {
//     return <p> Location: {location}</p>
//   }
// }
// const user = {
//   name: 'Benjamin Possible',
//   age: 25
//   location: 'Lagos Nigeria'
// }
// let count = 0
// const addOne = () => {
//   count++
//   renderCountApp()
// }
// const minusOne = () => {
//   count--
//   renderCountApp()
// }
// const reset = () => {
//   count = 0
//   renderCountApp()
// }

// console.log(templateTwo)
// const multiplier = {
//   numbers: [10, 20, 30],
//   multiplyBy: 3,
//   multiply() {
//     return this.numbers.map((number) => number * this.multiplyBy)
//   }
// }
// console.log(multiplier.multiply())

// const renderCountApp = () => {
//   const templateTwo = (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={addOne}>+1</button>
//       <button onClick={minusOne}>-1</button>
//       <button onClick={reset}>Reset</button>
//     </div>
//   );
  ReactDOM.render(<Counter />, document.querySelector('#app'))
// }

// renderCountApp()