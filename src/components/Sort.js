import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const options = ['Default','Price High - Low', 'Price Low - High', 'Latest Product', 'Oldest Product'];

export default function SplitButton(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const productData = props.productData
  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    let sortName = options[index];
    console.log(options[index])
 if(sortName === "Price High - Low"){

    
    //   console.log(productData)
      const arr = sortByKeyDec(productData,"price")
      console.log(arr)
      props.sortProduct(arr.reverse())
 }

 if(sortName === "Price Low - High"){

    
    console.log(productData)
    const arr = sortByKeyAsc(productData,"price")
    console.log(arr)
    props.sortProduct(arr)

}
 if(sortName === "Latest Product"){

    
    // console.log(productData)
    const arr = sortByKeyDec(productData,"createdDate")
    props.sortProduct(arr)

}
if(sortName === "Oldest Product"){

    
    console.log(productData)
    const arr = sortByKeyAsc(productData,"createdDate")
    // console.log(arr)
    props.sortProduct(arr.reverse())

}

 function sortByKeyAsc(array, key) {
    return array.sort(function(a, b) {
        if(key==="createdDate"){
            var x = new Date(a[key]); var y = new Date(b[key]);
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
        else{
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
    });
}

function sortByKeyDec(array, key) {
    return array.sort(function(a, b) {
        if(key==="createdDate"){
            var x = new Date(a[key]); 
            var y = new Date(b[key]);
            console.log(x,y)     
            let ascList = ((x < y) ? -1 : ((x > y) ? 1 : 0))  
            console.log(typeof(ascList))  
            console.log(ascList)  
            return  ascList
        }
        else{
            var x = a[key]; var y = b[key];
            console.log(x,y)     

            let ascList = ((x < y) ? -1 : ((x > y) ? 1 : 0))    
            return  ascList
             
        }
    });
}


  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center" style={{marginTop:20}}>
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick}>{options[selectedIndex]}</Button>
          <Button
            color="primary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        // disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}