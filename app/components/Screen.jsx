import React from 'react';
var StyleSheet = { create: function(e) { return e; } };

class Screen extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){

  }

  rowGetter(rowIndex) {
    return rows[rowIndex];
  }


	render() {
	    return (
	        <div style={styles.main}>
        	</div>
	    );
  	}
}

var styles = StyleSheet.create({
  main: {
    display: 'block',
    position: 'absolute',
    top: 42,
    right: 0,
    bottom: 40,
    left:0
  }
});


export default Screen;
