QUnit.test('Ajax tests', function(assert){
  assert.expect( 2 );
  var done1 = assert.async();
  var done2 = assert.async();
  setTimeout(function() {
    assert.ok( true, "test resumed from async operation 1" );
    done1();
  }, 500 );
  setTimeout(function() {
    assert.ok( true, "test resumed from async operation 2" );
    done2();
  }, 150);
});
