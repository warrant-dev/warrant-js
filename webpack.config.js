const path = require("path");

module.exports = env => {
    return {
        entry: "./src/index.ts",
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },

        module: {
            rules: [
                // All files with a .ts or .tsx extension will be handled by ts-loader.
                {
                    test: /\.(ts|tsx)?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                },
            ]
        },

        output: {
            library: {
                name: "warrant-js",
                type: "umd"
            },

            filename: "index.js",
            path: path.resolve(__dirname, "dist"),
            globalObject: "this",
            clean: true,
        },
    }
};
