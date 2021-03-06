# React Photo Crop #

## [**See Demo**](http://34.66.39.240/demo/react-photo-crop/dev/) ##

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
// SomeComponent.jsx

import { 
    RPCCtxState, 
    RPCStyles, 
    RPCModal, 
    RPCButton, 
    useRPC 
} from 'ReactPhotoCrop';

const useState = React.useState;

function SomeComponent() {

    const [src, setSrc] = useState("");
    const rpc = useRPC();

    function handler(e) {
        e.preventDefault();

        // call a function
        // with quality parameter from 0 to 1
        // 0 - worst
        // 1 - best
        // defaults to 0.85, if undefined
        rpc.getDataURL(0.86) 
            // get the data
            // do whatever you want...
            // in this case it's setting src attribute
            // for <img /> tag
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
        
            <img src={src} alt="" />
        </>
    )
}

```

## Styling ##

### CSS ### 
this is preferable option
```css
/* css available class selectors  */
.rpc-modal { /* ... */ };
.rpc-window { /* ... */ };
.rpc-crop-out { /* ... */ };
.rpc-crop { /* ... */ };
.rpc-crop-in { /* ... */ };
.rpc-photo-crop { /* ... */ };
.rpc-img { /* ... */ };
.rpc-after { /* ... */ };
.rpc-range-wrap { /* ... */ };
.rpc-range-val { /* ... */ };
.rpc-cancel-btn { /* ... */ };
.rpc-action-btn { /* ... */ };
.rpc-input-file { /* ... */ };

/* css available id selectors  */
#rpc-photo-crop { /* ... */ };
#rpc-img { /* ... */ };
#rpc-zoom { /* ... */ };
#rpc-buttons { /* ... */ };
#rpc-input-file-btn { /* ... */ };
```

### Inline styling ###

```javascript
import { 
    RPCCtxState, 
    RPCStyles, 
    RPCModal, 
    RPCButton, 
    useRPC 
} from 'ReactPhotoCrop';

const useState = React.useState;
const target = document.getElementById('root');

// adding classNames to elements
RPCStyles.addClassName(
    '<targetElement>', 
    ['classNameToAdd1', 'classNameToAdd2']
);

// styling elements
RPCStyles.addStyles(
    '<targetElement>', 
    { color: 'green', backGround: '#000' }
);

// see available target elements

function SomeComponent() {

    // ...code

    return (
        <>  
            <RPCCtxState>
                {/* pass adjusted RPCStyles to the the component as shown below */}
                <RPCButton {...RPCStyles.config} />

                {/* ...code */}

            </RPCCtxState>
        
        </>
    )
}
```
#### available target elements ####

```javascript
// available target elements for adding inline styles and classes
'modal', 'window', 'cropOut',
'crop', 'cropIn', 'photoCrop', 'img',
'after', 'zoom', 'rangeWrap',
'range', 'rangeVal', 'buttons', 'cancelBtn', 
'actionBtn', 'inputFileBtn'

// example adding inline styles
RPCStyles.addStyles(
    'inputFileBtn', // <- target element
    { display: 'flex', flexDicrection: 'col' }
);


// example adding classNames
RPCStyles.addClassName(
    'inputFileBtn', 
    ['arrayOf', 'classes']
);

// or 
RPCStyles.addClassName(
    'inputFileBtn', 
    'single'
);
```

