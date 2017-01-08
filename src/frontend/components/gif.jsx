import React from "react";

class Gif extends React.Component {

  constructor(props){
    super(props);
    this.state = {gifSearch:"", gifIdx:0};
  }

  componentDidMount(){
  }

  handleChange(e){
    this.setState({gifSearch: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    let newGifs = [];
    this.props.getGifs(this.state.gifSearch, this.receivedGifs.bind(this));
  }

  handleClick(direction, e){
    let newIdx;
    // debugger
    if (direction === "left"){
      // debugger
      if (this.state.gifIdx <= 0){
        newIdx = this.props.gifs.length - 1;
      } else {
        newIdx = this.state.gifIdx - 1;
      }
    }else if (direction === "right"){
      // debugger
      newIdx = (this.state.gifIdx + 1) % this.props.gifs.length;
    }
    console.log(newIdx);
    this.setState({gifIdx: newIdx});
  }

  receivedGifs(){
    console.log('got gifs!');
  }
  render(){
    let gifImg;
    console.log(this.state.gifIdx);
    if (this.props.gifs){
      const gif = this.props.gifs[this.state.gifIdx];
      gifImg = <img src={ gif.images.fixed_width_downsampled.url } alt="HTML5 Icon"></img>;
    }
    return (
      <div>
        <div>
          { gifImg }
          <button onClick= { this.handleClick.bind(this, "left") } >left</button>
          <button onClick= { this.handleClick.bind(this, "right") }>right</button>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input onChange={this.handleChange.bind(this)}></input>
          <button type="submit">Submit</button>
        </form>

      </div>
    );
  }
}
// <UserList/>

export default Gif;
