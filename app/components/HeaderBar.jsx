import React from 'react';
var StyleSheet = { create: function(e) { return e; } };

class HeaderBar extends React.Component{
  render() {
    return (
      <div style = {styles.headerContainer}>
 		   <span style = {styles.title}>Big Data</span>
      </div>
    );
  }
}

var styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 40,
    backgroundColor: 'LightSkyBlue',
    flexDirection: 'row',
    verticalAlign: 'middle',
    zIndex: 1,
    textRendering:'optimizeLegibility',
    padding: 8,
    boxShadow: '0px 3px 5px rgba(100, 100, 100, 0.49)'
  },
  title: {
    color: 'white',
    fontSize: 18
  },
});
export default HeaderBar;
