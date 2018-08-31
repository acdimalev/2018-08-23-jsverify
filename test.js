// canonical base of a URI
// (drop everything after the last slash)
function canonbase(s)
{ return s.substr(0, s.lastIndexOf('/')+1);
}

var jsc = require("jsverify");

// polyfill
require("string.prototype.startswith");
require("string.prototype.includes");

// directory name is never longer than path name
jsc.assertForall
( "string"
, function(s)
  { return s.length >= canonbase(s).length; }
);

// path name extends directory name
jsc.assertForall
( "string"
, function(s)
  { return s.startsWith(canonbase(s)); }
);

// empty directory name implies path does not contain a slash
// conversely, a path with a slacsh implies directory name is not empty
jsc.assertForall
( "string"
, function(s)
  { return !s.includes("/") || !!canonbase(s); }
);

// directory name, if not empty, always ends with a slash
jsc.assertForall
( "string"
, function(s)
  { var t = canonbase(s); return !t || t.slice(-1) == "/"; }
);
