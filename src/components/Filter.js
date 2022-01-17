import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DialogSelect(props) {
  let productData = props.produstData
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

// console.log(renderdata)
  

  const setOutOfStockFilterData = (event) =>{
    
let isOutOfStack = event.target.value
console.log(typeof(isOutOfStack))

let newRenderList = []
if (isOutOfStack === "true"){

    for (let data of productData){
        if (data.quantity === 0){
        console.log(data)

            newRenderList.push(data)
        }
    }
  }
  else{
      console.log("else me aaya")
      for (let data of productData){
        if (data.quantity > 0){
        console.log(data)

            newRenderList.push(data)
        }
    }
  }

  props.setFilteredData(newRenderList)
}



const setExpressDeliveryFilter = (event) =>{
    
    let isOutOfStack = event.target.value
    console.log(productData)
    
    let newRenderList = []
    if (isOutOfStack === "true"){
    
        for (let data of productData){
            if (data.expressDelivery === true){
            console.log(data)
    
                newRenderList.push(data)
            }
        }
      }
      else{
          console.log("else me aaya")
          for (let data of productData){
            if (data.quantity > 0){
            console.log(data)
    
                newRenderList.push(data)
            }
        }
      }
    
      props.setFilteredData(newRenderList)
    }
//  const setOutOfStockFilterData =(event)=>{
//     let isOutOfStack = event.target.value
//     let newRenderList = [];
//     if(isOutOfStack===true){
//       for(let data of productData){
//         if(data.duantity ===0){
//           console.log("out of stock")
//           newRenderList.push(data);
//         }
//       }
//     }
//     else{
//        for(let data of productData){
//          if(data.quantity >0){
//            newRenderList.push(data);
//          }
//        }
//     }
//     props.setFilteredData(newRenderList)
//    }







  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} style={{color:'black',fontSize:20}}>Filters </Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Apply filter</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">OutOfStoke</InputLabel>
              <Select
                native
                // value={age}
                onChange={setOutOfStockFilterData}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={true}>True</option>
                <option value={false}>False</option>
                
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">express delivery</InputLabel>
              <Select
                native
                // value={age}
                onChange={setExpressDeliveryFilter}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={true}>True</option>
                <option value={false}>False</option>
                
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}