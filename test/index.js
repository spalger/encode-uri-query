const expect = require('expect.js')
const encodeUriQuery = require('../');

describe('encodeUriQuery', function() {
  it('should correctly encode uri query and not encode chars defined as pchar set in rfc3986',
      function() {
    //don't encode alphanum
    expect(encodeUriQuery('asdf1234asdf')).to.be('asdf1234asdf');

    //don't encode unreserved
    expect(encodeUriQuery('-_.!~*\'() -_.!~*\'()')).to.be('-_.!~*\'()+-_.!~*\'()');

    //don't encode the rest of pchar
    expect(encodeUriQuery(':@$, :@$,')).to.be(':@$,+:@$,');

    //encode '&', ';', '=', '+', and '#'
    expect(encodeUriQuery('&;=+# &;=+#')).to.be('%26;%3D%2B%23+%26;%3D%2B%23');

    //encode ' ' as '+'
    expect(encodeUriQuery('  ')).to.be('++');

    //encode ' ' as '%20' when a flag is used
    expect(encodeUriQuery('  ', true)).to.be('%20%20');

    //do not encode `null` as '+' when flag is used
    expect(encodeUriQuery('null', true)).to.be('null');

    //do not encode `null` with no flag
    expect(encodeUriQuery('null')).to.be('null');
  });
});
