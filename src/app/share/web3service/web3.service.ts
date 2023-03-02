import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import TwitterContract from "../../../abi/TwitterContract.json";
import Web3 from "web3";
import {AbiItem} from "web3-utils";
import {Tweet} from "../model/tweet";
import {create} from "ipfs-http-client";

//declare window variable
declare let window: any;

@Injectable()
export class Web3Service {

    protected infuraProjectId = "";
    protected infuraProjectSecret = "";

    protected contractAddress = "0xf8a7039185B1E2fd26D067a4BA24dc8239569137";

    protected web3 = new Web3("ws://localhost:7545");

    protected ipfsClient: any = null;

    protected contractInstance: any;

    protected account: string | null = null;

    public newTweet$ = new Subject<any>();

    public status$ = new Subject<boolean>();

    public constructor() {

        window.Buffer = require('buffer').Buffer;
        const auth = 'Basic ' + window.Buffer
            .from(this.infuraProjectId + ":" + this.infuraProjectSecret)
            .toString('base64');

        this.ipfsClient = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            apiPath: '/api/v0',
            headers: {
                authorization: auth
            }
        })

        this.contractInstance = new this.web3.eth.Contract(TwitterContract.abi as AbiItem[], this.contractAddress)

        this.contractInstance.events.AddTweet({})
            .on('data', (event: any) => {
                this.newTweet$.next(event);
            });

        if (!window.ethereum) {
            alert('Please install MetaMask first.');
        }
        else {
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length > 0) {
                    this.account = accounts[0];
                    this.status$.next(true);
                } else {
                    this.disconnectWallet();
                }
            });
        }

    }

    public async getAllTweets() {
        return this.contractInstance.methods.getAllTweets().call();
    }

    public async publishTweet(tweet: Tweet) {

        if(tweet.imageBuffer != null) {
            //upload to IPFS
            const file = await this.ipfsClient.add(tweet.imageBuffer);
            tweet.image = file.path;
        }

        let gas = await this.contractInstance.methods.addTweet(tweet.message, tweet.image).estimateGas({from: this.account});
        let gasPrice = await this.web3.eth.getGasPrice();

        this.contractInstance.methods.addTweet(tweet.message, tweet.image)
            .send({ from: this.account,
                    gas: this.web3.utils.toHex(gas),
                    gasPrice: this.web3.utils.toHex(gasPrice) });



    }

    public async connectWallet() {
        if (!window.ethereum) {
            alert('Please install MetaMask first.');
        }
        else {
            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.account = accounts[0];
            console.log(this.account);
            this.status$.next(true);
        }
    }

    public disconnectWallet() {
        this.account = null;
        this.status$.next(false);
    }

    public isWalletConnected() {
        return this.account != null;
    }

}