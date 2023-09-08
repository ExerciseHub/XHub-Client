const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { 
    mode: "development", 
    entry: {
        main: './scripts/index.js',
        login: './scripts/login-out.js',
    },
    output: { 
        path: path.resolve(__dirname, 'dist'), 
        filename: "bundle.js" 
    }, 
    devtool: 'source-map', 
    devServer: { 
        static: {
            directory: path.join(__dirname, 'dist'),
        }, 
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'auth/login.html',
            chunks: ['login'],
        }),
    ],
    module: { 
        rules: [ 
            { 
                test: /\.css$/, 
                use: [ "style-loader", "css-loader" ] 
            }, 
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: { 
                loader: "babel-loader", 
                options: { 
                    presets: [ "@babel/preset-env" ] 
                } 
                } 
            }, 
        ]
    }
};
