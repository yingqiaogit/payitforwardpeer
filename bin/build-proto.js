const {exec} = require("child_process");
const shell = require("shelljs")
const fs = require("fs");
const path = require("path");

const currentDir = process.cwd();
const outputDir = path.join(currentDir, "src", "proto");
const inputDir = path.join(currentDir, "proto");

shell.rm("-rf", outputDir);
shell.mkdir("-p", outputDir);

const PROTOC_GEN_TS_PATH=path.resolve("./node_modules/.bin/protoc-gen-ts");
// const GRPC_TOOLS_NODE_PROTOC_PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"
const GRPC_TOOLS_NODE_PROTOC=path.resolve("./node_modules/.bin/grpc_tools_node_protoc");

const generating = (entity) => {

    const entityStat = fs.lstatSync(entity);

    if (entityStat.isDirectory()) {
        
        // list directory, and generating 
        // for each entity
        const nextPath = path.join(curPath, entity);
        shell.mkdir("-p", nextPath);

        fs.readdirSync(entity).forEach(it => {

            generating(it, nextPath);
        });
    }
    else {

        if (!entityStat.isFile()) {
            return;
        }

        const outputSubDir = path.join(outputDir,curPath);

        let protoGenCommand = `${GRPC_TOOLS_NODE_PROTOC}  \                    
                    --grpc_out=${outputSubDir} \
                    --ts_out=${outputSubDir} \
                    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
                    -I ${curPath} ${path.join(curPath, entity)}`;
        
        exec(`sh ${protoGenCommand}`);
    }
}

generating(inputDir, "");