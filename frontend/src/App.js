import * as React from 'react';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

function App() {
  const [cartOpen, setCartOpen] = React.useState(false);

  return (
    <div className="App">
      <h1>Robot Market</h1>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        Hello
      </Drawer>

      <Button variant="contained" color="primary" onClick={() => setCartOpen(true)}>
        Hello World
      </Button>

    </div>
  );
}

export default App;
