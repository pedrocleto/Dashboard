import React, { findDOMNode } from 'react/addons';
import Settings from '../service/Settings';
import SettingsEnum from '../service/SettingsEnum';
var StyleSheet = { create: function(e) { return e; } };

class DockBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {

	  }

    componentDidMount() {

    }

    render () {
        return (
        	<div style={styles.dockComponent}>
            {this.props.barValuesArray.map(function(result) {
             		return <button key={result.id} style = {styles.textBox}><span>{result.text}</span></button>
          	})}
        	</div>
        );
    }
}

DockBar.defaultProps = {
        barValuesArray: null,
};

var styles = StyleSheet.create({
  dockComponent: {
    width: '100%',
    minHeight:40,
    height: 40,
  	position: 'absolute',
    bottom: 0,
    backgroundColor:'LightGray',
    flexDirection: 'row',
    verticalAlign: 'middle',
    zIndex: 1,
    textRendering:'optimizeLegibility',
    padding: 5,
    boxShadow: '0px -3px 5px rgba(100, 100, 100, 0.49)'
  },
  textBox: {
       margin: 5,
       padding: 2,
       borderWidth: 1,
       borderColor: '#cccccc',
       borderRadius: 3,
       verticalAlign: 'middle',
       textAlign: 'center',
       height : 25,
       width:150,
       ':hover':{
      	borderColor: '#666 #aaa #bbb #888',
      	borderWidth:'4px 3px 3px 4px',
      	color:'#000'
      }
  }
});

export default DockBar;
