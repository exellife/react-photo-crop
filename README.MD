# React Photo Crop #

## [**Demo**](http://34.66.39.240/demo/react-photo-crop/dev/) ##

## Installation ##

#### npm ###
```
npm install react-photo-crop@1.0.0-beta-f
```

### CDN ###
```html
<script type="text/javascript" src="https://unpkg.com/react-photo-crop@1.0.0-beta-f/dist/umd/react-photo-crop.min.js"></script>
```

## Usage ##

```javascript
// App.jsx

import { 
    RPCCtxState, 
    RPCStyles, 
    RPCModal, 
    RPCButton, 
    useRPC 
} from 'ReactPhotoCrop';

const useState = React.useState;
const target = document.getElementById('root');

function App() {

    const [src, setSrc] = useState("");
    const rpc = useRPC();

    function handler(e) {
        e.preventDefault();

        // call a function
        rpc.getDataURL() 
            // get the data
            // do whatever you want...
            // in this case it's setting src attribute
            // for <img> tag
            .then(data => setSrc(data)) 
            .catch(e => console.log(e));
    };


    return (
        <>  
            <RPCCtxState>
                <RPCButton {...RPCStyles.config} />

                <RPCModal
                    {...RPCStyles.config}
                    
                    {/* handler function needs to be 
                    provided in order to retriev data */}

                    rpcHandler={handler}    
                />
            </RPCCtxState>
        
            {/* 
                the cropped part will appear here,
                this is used for demo purposes...
                see handler function above
             */}
            <img src={src} alt="" />
        </>
    )
}

ReactDOM.render(<App />, target)
```