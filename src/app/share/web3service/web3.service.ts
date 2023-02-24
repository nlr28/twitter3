import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import TwitterContract from "../../../abi/TwitterContract.json";
import Web3 from "web3";
import {AbiItem} from "web3-utils";
import {Tweet} from "../model/tweet";

//declare window variable
declare let window: any;

@Injectable()
export class Web3Service {

    protected contractAddress = "0x58Aa4B31411e7dA39b25BD85f0BBE59462368b16";

    protected web3 = new Web3("ws://localhost:7545");

    protected contractInstance: any;

    protected account: string | null = null;

    public status$ = new Subject<boolean>();

    public constructor() {
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

    public async initContract() {
        this.contractInstance = new this.web3.eth.Contract(TwitterContract.abi as AbiItem[], this.contractAddress)
    }

    public async getAllTweets() {
        await this.initContract();
        return this.contractInstance.methods.getAllTweets().call();
    }

    public async publishTweet(tweet: Tweet) {
        await this.initContract();
        let gas = await this.contractInstance.methods.addTweet(tweet.message, false).estimateGas({from: this.account});
        let gasPrice = await this.web3.eth.getGasPrice();

        this.contractInstance.methods.addTweet(tweet.message, false)
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