module.exports = {
  keywords: {
    'and': '23',
    'array': '9',
    'begin': '6',
    'call': '11',
    'case': '29',
    'const': '3',
    'do': '17',
    'else': '15',
    'end': '7',
    'for': '27',
    'goto': '12',
    'if': '13',
    'integer': '8',
    'label': '2',
    'not': '24',
    'of': '10',
    'or': '22',
    'procedure': '5',
    'program': '1',
    'readln': '20',
    'repeat': '18',
    'then': '14',
    'to': '28',
    'until': '19',
    'var': '4',
    'while': '16',
    'writeln': '21',
    '-': '31',
    ',': '46',
    ';': '47',
    ':': '39',
    ':=': '38',
    '.': '49',
    '..': '50',
    "'": '48',
    '(': '36',
    ')': '37',
    '[': '34',
    ']': '35',
    '*': '32',
    '/': '33',
    '+': '30',
    '<': '43',
    '<>': '45',
    '<=': '44',
    '=': '40',
    '>': '41',
    '>=': '42',
    '$': '51'
  },
  inteiro: '26',
  identificador: '25',
  notTerminal: {
    'programa': '52',
    'bloco': '53',
    'dclrot': '54',
    'lid': '55',
    'repident': '56',
    'dclconst': '57',
    'ldconst': '58',
    'dclvar': '59',
    'ldvar': '60',
    'tipo': '61',
    'dclproc': '62',
    'defpar': '63',
    'corpo': '64',
    'repcomando': '65',
    'comando': '66',
    'rcomid': '67',
    'rvar': '68',
    'parametros': '69',
    'reppar': '70',
    'elseparte': '71',
    'variavel': '72',
    'variavel1': '73',
    'repvariavel': '74',
    'itemsaida': '75',
    'repitem': '76',
    'expressao': '77',
    'repexpsimp': '78',
    'expsimp': '79',
    'repexp': '80',
    'termo': '81',
    'reptermo': '82',
    'fator': '83',
    'condcase': '84',
    'contcase': '85',
    'rpinteiro': '86',
    'sem efeito': '87'
  },
  getToken: function (word) {
    const allTokens = {};
    Object.assign(allTokens, this.keywords, this.notTerminal, {'inteiro': '26','identificador': '25'})
    return allTokens[word.toLowerCase()]
  },
  isTerminal: function (token) {
    return parseInt(token) < 52
  },
  isCategory: function (token) {
    return parseInt(token) >=1 && parseInt(token) <=5
  },
  isIdentifier: function (token) {
    return parseInt(token) == 25
  },
  isTokenLevel: function(token) {
    let tk = parseInt(token)

    if(tk == 13) {
      return 'if'
    } else if(tk == 1) {
      return 'program'
    } else if(tk == 5) {
      return 'procedure'
    } else if(tk == 29) {
      return 'case'
    } else if(tk == 27) {
      return 'for'
    } else if(tk == 16){
      return 'while'
    }
  },
  derivationToDerivate: function (derivation) {
    return {
      token: this.getToken(derivation),
      word: derivation
    }
  }
}