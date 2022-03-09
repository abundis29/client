module.exports = {
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    testPathIgnorePatterns: [
        '<rootDir>[/\\\\](build|docs|node_modules|scripts)[/\\\\]'
    ],
    testEnvironment: 'jsdom',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(ts|tsx|js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'
    ],
    moduleNameMapper: {
        '^react-native$': 'react-native-web',
        "@v1": "components/v1",
        "@v1/(.*)": "components/v1/$1",
        "@v2": "components/v2",
        "@v2/(.*)": "components/v2/$1"

    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "test.tsx"]
};

