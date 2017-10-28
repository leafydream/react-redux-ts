const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const config = require('./config');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'babel-polyfill',
        'webpack-hot-middleware/client?reload=true',
        './src/index.tsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: "ts-loader",
                       
                    }
                    
                ],
                include: config.srcPath,
                exclude: config.libPath
            },
            // {
            //     test: /\.(js|jsx)$/,
            //     include: config.srcPath,
            //     exclude: config.libPath,
            //     use: [
            //         {
            //             loader: 'babel-loader'
            //         }
            //     ],
            // },
            {
                test: /\.css$/,
                include: config.srcPath,
                exclude: config.libPath,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]-[local]-[hash:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    broswers: ['last 5 versions']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: config.libPath,
                exclude: config.srcPath,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    broswers: ['last 5 versions']
                                })
                            ]
                        }
                    }
                ]

            },
            {
                test: /\.less$/,
                include: config.srcPath,
                exclude: config.libPath,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 3,
                            localIdentName: '[name]-[local]-[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    broswers: ['last 5 versions']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: config.srcPath,
                exclude: config.libPath,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 3,
                            localIdentName: '[name]-[local]-[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    broswers: ['last 5 versions']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash:5].[ext]'
                },
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.(eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[hash:5].[ext]',
                    limit: 10000,
                },
                exclude: config.libPath
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less', '.scss', '.json', '.ts', '.tsx'],
    },
    plugins: [
        new OpenBrowserPlugin({
            url: 'http://localhost:' + config.port
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            },
            '__DEV__': JSON.stringify('true')
        })
    ]
};


