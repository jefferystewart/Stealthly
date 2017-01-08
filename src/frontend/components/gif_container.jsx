import { connect } from 'react-redux';
import Gif from './gif';
import { getGifs, receiveGifs } from '../actions/room';

const mapStateToProps = ({ room }) => ({
  gifs: room.gifs.data
});

const mapDispatchToProps = (dispatch) => ({
  getGifs: (query, callback) => dispatch(getGifs(query, callback))
});


export default connect(mapStateToProps, mapDispatchToProps)(Gif);
