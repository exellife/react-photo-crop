/**
 * THIS FILE USED FOR DEVELOPMENT PURPOSES
 */

import { RPCCtxState, RPCStyles, RPCModal, RPCButton, useRPC } from 'ReactPhotoCrop';
const useState = React.useState;
const target = document.getElementById('root');

console.log(RPCCtxState, RPCStyles, RPCModal, RPCButton, useRPC)

function Test() {

    const [src, setSrc] = useState("");
    const rpc = useRPC();

    function handler(e) {
        e.preventDefault();
        rpc.getDataURL()
            .then(data => setSrc(data))
            .catch(e => console.log(e));
    }

    return (
        <>
            <RPCCtxState>
                <RPCButton {...RPCStyles.config} />

                <RPCModal
                    {...RPCStyles.config}
                    // defaultSrc={"https://images-na.ssl-images-amazon.com/images/I/81PGeOlXGYL._AC_SL1500_.jpg"}

                    defaultSrc={"https://media.gettyimages.com/photos/manhattan-bridge-new-york-picture-id625418406?s=612x612"}

                    // defaultSrc={"https://miro.medium.com/max/601/1*CjEqlt11pvJQCRLTO_FTRw.png"}

                    rpcHandler={handler/** needs to be provided in order to retriev data */}
                />
            </RPCCtxState>

            <img src={src} alt="" />
        </>
    )
}

ReactDOM.render(<Test />, target)