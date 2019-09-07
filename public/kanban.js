const React = require('react')
const ReactDOM = require('react-dom')
class Board extends React.Component {
  constructor (props) {
    super(props)
    this.ta = React.createRef();
  }
  updateArr=()=>{
    this.props.saveParent(this.ta.current.value, this.props.index)
  }
  render () {
    let toDoDiv = this.props.boardArr.map((v,i)=>{
      return (
        <div className="eachToDo">
          <div className = "lArrow"
            onClick={()=>{
              this.props.saveParent(this.props.boardArr[i],this.props.index-1)
              this.props.deleteParent(this.props.index,i)
            }}
          > {(this.props.index == 0)?'':'<' } </div>
          <div className="toDo" 
            onClick={()=>{
              this.props.deleteParent(this.props.index, i)
            }}
          >{v}</div>
          <div className="rArrow"
            onClick={()=>{
              this.props.saveParent(this.props.boardArr[i], this.props.index+1)
              this.props.deleteParent(this.props.index,i)
            }}
          >  {(this.props.index == 3)?'':'>'} </div>
        </div>
      )
    })
    return (
      <div>
        <div className='kboard'>
          <div className='title' style={{ backgroundColor: this.props.color }}>
            {this.props.title}
          </div>
          <div className='toDoList'> {toDoDiv}</div>
          <div className='input'>
            <textarea className='textin' ref={this.ta}
            ></textarea>
            <button class='submit'
              onClick={ this.updateArr}
            >Submit</button>
          </div>
        </div>
      </div>
    )
  }
}
class BoardInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      boards: [
        { arr: [], color: 'red', title: 'To-Do' }, { arr: [], color: 'orange', title: 'Doing' }, { arr: [], color: 'lime', title: 'Done' }, { arr: [], color: 'aqua', title: 'Approved' }
      ]
    }
  }
  saveToParent=(toDo, index)=>{
    this.setState((state)=>{
      state.boards[index].arr.push(toDo)
      return state
    })
  }
  deleteFromParentArr=(index,i)=>{
    this.setState((state)=>{
      state.boards[index].arr.splice(i,1)
      return state
    })
  }
  render () {
    const allBoards = this.state.boards.map((v, index) => {
      return <div><Board
          index={index}
          title={v.title}
          color={v.color}
          boardArr={v.arr}
          saveParent={this.saveToParent}
          deleteParent={this.deleteFromParentArr}
        /></div>
    })
    return (
      <div className='allBoardStyle'>
        {allBoards}
      </div>
    )
  }
}
ReactDOM.render(<BoardInfo />, document.getElementById('loc'))
