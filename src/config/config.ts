import * as dotenv from 'dotenv'

import * as path from "path"; 

const env: string = process.env.NODE_ENV || "development"

dotenv.config()

const configs: any = {
    base: {
        accounts: [
            {
                name: "home",
                address: 'one1z2d3evx4lu0k80rxpk2pzwmqdeu7r5a46j8r8e',
                privateKey: process.env.HOME_PRIVATEKEY
            },
            {
                name: "alice",
                address: 'one1jj2vh8le5y7jsxd2cg5r0stcphnw4w8uwskmgm',
                privateKey: process.env.ALICE_PRIVATEKEY,
                contractPath: path.join(process.cwd(), 'src', 'contracts/Wallet.json'),
                contractAddress: env === "development"? 
                    process.env.ALICE_CONTRACTADDRESS_DEV 
                    : process.env.ALICE_CONTRACTADDRESS_PROD
            },
            {
                name: "newlandfund",
                address: 'one100530hg4zqknnpztx8v5grqfzrnn9x7ef338fm',
                privateKey: process.env.NEWLANDFUND_PRIVATEKEY,
                contractPath: path.join(process.cwd(), 'src', 'contracts/Fund.json'),
                contractAddress: env === "development"? 
                    process.env.NEWLANDFUND_CONTRACTADDRESS_DEV 
                    : process.env.NEWLANDFUND_CONTRACTADDRESS_PROD
            }
        ]
    },
    development: {
        network: 'https://api.s0.b.hmny.io'
    },
    production: {
        network: 'https://api.s0.t.hmny.io'        
    }
};

const config: any = Object.assign(configs.base, configs[env]);

export { config }