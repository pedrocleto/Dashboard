jest.dontMock('../app/components/DockBar.jsx');

import React from 'react/addons';
var TestUtils = React.addons.TestUtils;
const DockBar = require('../app/components/DockBar.jsx');
describe('DockBar', () => {

  it('changes the text after click', () => {

    var barValuesArray= [{id:1, text:'BTN1'},{id:2, text:'BTN2'},{id:3, text:'BTN3'}]
    // Render a checkbox with label in the document
    var dockBar = TestUtils.renderIntoDocument(
      <DockBar barValuesArray = {barValuesArray} />
    );

    var dockBarNode = React.findDOMNode(dockBar);
    expect(dockBarNode).not.toBeUndefined();

    // Simulate a click and verify that it is now On
    //TestUtils.Simulate.change(TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input'));
  });

});
