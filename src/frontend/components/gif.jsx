import React from "react";

class Gif extends React.Component {

  constructor(props) {
    super(props);
    this.state = { gifSearch:"", gifIdx:0, currentGif:null, showGif:false };
  }

  handleChange(e) {
    this.setState({gifSearch: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let newGifs = [];
    this.props.getGifs(this.state.gifSearch, this.receivedGifs.bind(this));
    this.setState({showGif: true});
  }

  handleClick(direction, e) {
    let newIdx;
    if (direction === "left") {
      if (this.state.gifIdx <= 0) {
        newIdx = this.props.gifs.length - 1;
      } else {
        newIdx = this.state.gifIdx - 1;
      }
    }else if (direction === "right") {
      newIdx = (this.state.gifIdx + 1) % this.props.gifs.length;
    }
    const gif = this.props.gifs[newIdx];
    const currentGif = <img src={ gif.images.fixed_width_downsampled.url } alt="HTML5 Icon"></img>;
    this.setState({ gifIdx: newIdx, currentGif: currentGif });
  }

  receivedGifs(){
    const gif = this.props.gifs[0];
    const currentGif = <img src={ gif.images.fixed_width_downsampled.url } alt="HTML5 Icon"></img>;
    this.setState({ currentGif: currentGif });
  }

  addGif(){
    this.props.addGif(this.state.currentGif);
    this.setState({ currentGif: null, gifIdx:0, gifSearch:"", showGif:false});
  }
  render(){
    let gifOptions;
    if (this.state.showGif) {
      gifOptions = (
        <div>
          <div>
            <button onClick= { this.handleClick.bind(this, "left") } >left</button>
            { this.state.currentGif }
            <button onClick= { this.handleClick.bind(this, "right") }>right</button>
          </div>
          <div>
            <button onClick= { this.addGif.bind(this) }>add</button>
          </div>
        </div>
      );
    }
    return (
      <div>
          { gifOptions }
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input onChange={this.handleChange.bind(this)} value= {this.state.gifSearch}></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
// <UserList/>

export default Gif;
