(function () {
  var keywords = [
    'if', 'then', 'else', 'when', 'unless', 'and', 'or', 'not', 'is', 'isnt',
    'for', 'in', 'of', 'try', 'catch', 'finally', 'return', 'loop', 'while', 'until', 'do',
    'class', 'super', 'extends', 'new', '\\.{2,3}'
  ];

  var atoms = [
    'true', 'false', 'null', 'undefined', 'yes', 'on', 'no', 'off', 'Infinity'
  ];

  CodeMirror.defineSimpleMode('coffeescript', {
    // TODO variables in double quotation string
    start: [
      { regex: /"(?:[^\\]|\\.)*?"/, token: 'string' }, // double quotation string
      { regex: /'(?:[^\\]|\\.)*?'/, token: 'string' }, // single quotation string
      { regex: /\/.+?\/\w*/, token: 'string string-2' }, // regex
      { regex: '(' + keywords.join('|') + ')\\b', token: 'keyword' }, // keywords
      { regex: '->|require|exports|module', token: 'variable-2 variable-3' }, // method definition and commonjs
      { regex: /[-+\/*=|&<>!]+/, token: 'keyword operator' }, // operators
      { regex: /[a-zA-Z]\w*::[a-zA-Z_]\w*/, token: 'attribute property' }, // coffeescript prototype
      { regex: /[a-zA-Z_]\w*:/, token: 'attribute property' }, // property def
      { regex: /[A-Z]\w*/, token: 'variable-2 variable-3' }, // capital variable always be class or module
      { regex: /(\([^\(\)]*\))\s*(?=->)/, token: 'variable' }, // method signature
      { regex: /(?:@|this\.)[a-z_\.]\w*/, token: 'property' }, // property access
      { regex: /(@|this)(?!\S+)/, token: 'keyword' }, // this keyword
      { regex: '(' + atoms.join('|') + ')\\b', token: 'atom' }, // atoms
      { regex: /0x[a-f\d]+|[-+]?(?:(?:\d+)?\.\d+|\d+)(?:e[-+]?\d+)?/i, token: 'number' }, // numbers
      { regex: /[a-z\._]\w*/, token: 'default' }, // normal variables
      { regex: /###(?!#)/, token: 'comment', next: 'comment' }, // block comment
      { regex: /#.*/, token: 'comment' } // line comment
    ],
    comment: [
      { regex: /\s*#{3,}\s*$/, token: "comment", next: "start" },
      { regex: /.*/, token: "comment" }
    ]
  })
})();
