import React from "react";

class Gif extends React.Component {

  constructor(props) {
    super(props);
    this.state = { gifSearch:"", gifIdx:0, currentGif:null, showGif:false, gifUrl:null };
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
    e.preventDefault();
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
    const url =  gif.images.fixed_width_downsampled.url;
    const currentGif = <img src={ url } alt="HTML5 Icon" className="gif"></img>;
      console.log(url);
    this.setState({ gifIdx: newIdx, currentGif: currentGif, gifUrl: url });
  }

  receivedGifs(){
    const gif = this.props.gifs[0];
    const url =  gif.images.fixed_width_downsampled.url;
    const currentGif = <img src={ url } alt="HTML5 Icon" className="gif"></img>;
    this.setState({ currentGif: currentGif, gifUrl: url });
  }

  addGif(){
    this.props.addGif(this.state.gifUrl);
    this.setState({ currentGif: null, gifIdx:0, gifSearch:"", showGif:false, gifUrl:null});
  }
  render(){
    let gifOptions;
    if (this.state.showGif) {
      gifOptions = (
        <div>
          <div className="gifs" >
            <span className="center-gif-helper"></span>
            { this.state.currentGif }
            <button onClick= { this.handleClick.bind(this, "left")} className="left-arrow transparent-button" >{"<"}</button>
            <button onClick= { this.handleClick.bind(this, "right") } className="right-arrow transparent-button">{">"}</button>
            <button onClick= { this.addGif.bind(this) } className="add-gif transparent-button">+</button>
          </div>
        </div>
      );
    }
    return (
      <div>
          { gifOptions }
        <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-group">
            <span className="input-group-addon">GIF</span>
            <input className= "form-control" type="text" onChange={this.handleChange.bind(this)} value= {this.state.gifSearch}></input>
            <span className="input-group-btn">
              <button type="submit" value="Submit" className="btn btn-default">Search</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}
// <UserList/>

export default Gif;
