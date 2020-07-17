const shell = require("shelljs")
const path = require("path");

const currentDir = process.cwd();
const outputDir = path.join(currentDir, "src", "proto/echo");
const inputDir = path.join(currentDir, "proto/echo");

shell.rm("-rf", outputDir);
shell.mkdir("-p", outputDir);

const PROTOC_GEN_TS_PATH=path.resolve("./node_modules/.bin/protoc-gen-ts");
const GRPC_TOOLS_NODE_PROTOC_PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"
const GRPC_TOOLS_NODE_PROTOC=path.resolve("./node_modules/.bin/grpc_tools_node_protoc");

let protoGenCommand = `${GRPC_TOOLS_NODE_PROTOC} ` +                    
                    `--js_out=import_style=commonjs,binary:"${outputDir}" ` + 
                    `--grpc_out=${outputDir} ` +
                    `--plugin=protoc-gen-grpc="${GRPC_TOOLS_NODE_PROTOC_PLUGIN}" ` +
                    `-I ${inputDir} ${path.join(inputDir, "*.proto")}`;
        
shell.exec(`${protoGenCommand}`);

protoGenCommand = `${GRPC_TOOLS_NODE_PROTOC} ` +                    
                    `--ts_out=${outputDir} ` +
                    `--plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" ` +
                    `-I ${inputDir} ${path.join(inputDir, "*.proto")}`;

shell.exec(`${protoGenCommand}`);
