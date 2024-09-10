module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  root: true,
  extends: [
    // '@react-native',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  parser: '@typescript-eslint/parser', // 코드 분석 파서 설정
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'no-implicit-coercion': 'error', // 암묵적인 타입 강제를 오류로 표시, 3 + "3" = 6
    'no-undef': 'off', // 정의되지 않은 변수 사용에 대한 규칙을 비활성화
    semi: 'error', // 세미콜론 사용에 대한 규칙 여부
    '@typescript-eslint/no-explicit-any': 'warn', // any 타입 사용에 대한 규칙 여부

    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수의 반환 타입 명시 여부
    'react/display-name': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/ban-types': 'warn',
    // 기본 객체 생성자(String, Number, Boolean)를 타입으로 사용여부

    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 모듈 경계에서의 반환 타입에 대한 명시적 선언을 강제하는 규칙

    '@typescript-eslint/no-unused-vars': ['warn', {ignoreRestSiblings: true}],
    // 사용되지 않는 변수를 경고, rest 연산자를 사용해 객체에서 변수를 가져오는 경우

    'no-warning-comments': [
      'warn',
      {
        terms: ['TODO', 'BUG'],
        location: 'anywhere',
      },
    ],
    'no-var': 'error', // var 사용
    '@typescript-eslint/no-floating-promises': 'off', // Promises의 반환값을 적절하게 처리하지 않을 때 발생하는 오류
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['camelCase', 'UPPER_CASE'],
        selector: 'variable', // 변수
        leadingUnderscore: 'allow', // 첫글자 (_) 언더스코어로 허용
      },
      {format: ['camelCase', 'PascalCase'], selector: 'function'},
      {format: ['PascalCase'], selector: 'interface'},
      {format: ['PascalCase'], selector: 'typeAlias'},
    ], // 네이밍 컨벤션

    'react-hooks/rules-of-hooks': 'error', // react hooks의 조건부 로직 안에서 호출되는 여부 규칙
    'react-hooks/exhaustive-deps': 'off', // react hooks의 종속성 배열 누락
    '@typescript-eslint/no-var-requires': 'warn', // require 사용안하는 규칙
    'react/react-in-jsx-scope': 'off', // React 임포트 여부 (17 이후, 임포트 안해도됨)

    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'no-empty-pattern': 'off',
  },
};
