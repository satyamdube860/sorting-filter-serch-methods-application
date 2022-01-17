import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import data from "../api/data";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blue, red } from "@material-ui/core/colors";
import PaginationBar from "../components/PaginationBar";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from "axios";



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    padding: 70,
    backgroundColor: blue,
    margin: 30,
  },
  media: {
    width: 200,
    // height: 10,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    marginRight: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },


  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
    paper: {
    backgroundColor: 'grey',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height:500,
    width:1200
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [initialdata, setInitialData] = useState([]);
  const [searchterm, setSearchTerm] = useState("");
  const [renderData, setRenderData] = useState([]);
  const [currentpage, setCurrentPage] = useState(0);
  const [modaldata,setModalData] = useState({})


  const [open, setOpen] = React.useState(false);

  
  
  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async (page) => {
    const response = await data.get("/products/?pageNumber=" + page);
    try {
      setInitialData(response.data);
      setRenderData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData(0);
  }, []); 
  // console.log(initialdata)
  

  const setFilteredData = (data) => {
    // console.log(data)
    setRenderData(data);
  };

 const sortProduct = (data) =>{
  //  console.log(data)
   const renderData_ = [...data] 
  setRenderData(renderData_);

 }

  const submitSearch = (event) => {
    console.log(searchterm);
    let searchedObject = [];
    if (searchterm.length === 0) {
      // setRenderData(initialdata)
      event.preventDefault();
      console.log(currentpage);
      fetchData(currentpage);
    } else {
      // if(searchterm.split(" ").length>1){

      // }
      for (let x of initialdata) {
        console.log(x.title);
        let termList = x.title.split(" ");
        console.log(termList);
        for (let y of termList) {
          console.log(y);
          if (searchterm.toLowerCase() === y.toLowerCase()) {
            searchedObject.push(x);
          }
        }

        console.log(searchedObject);
        setRenderData(searchedObject);
        event.preventDefault();
      }
    }
  }

  const searchChange = (event) => {
  setSearchTerm(event.target.value);
    console.log(searchterm);
  };

  const paginationChange = (event, page) => {
    console.log(page);
    let pageNo = page - 1;
    setCurrentPage(pageNo);
    // console.log(paginationState)

    fetchData(pageNo);
  };
  const showDetails = async (id) => {
    setOpen(true);
    await axios.get(`http://mocsyamtestapi-env.eba-dvawv2zg.ap-south-1.elasticbeanstalk.com/products/${id}`).then((response)=>{
      setModalData(response.data)
    })
    console.log(modaldata,id)
  };
  console.log(modaldata)
  return (
    <Fragment>
      <div
        style={{
          position: "relative",
          paddingRight: "20%",
          backgroundColor: "#03fce3",
        }}
      >
        <div style={{ display: "flex", width: "100vw" }}>
          <div style={{ flex: 6 }}>
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{modaldata.title}</h2>
           
            <p id="transition-modal-description">{modaldata.description}</p>
           
             <p>{modaldata.discountPrice}</p>
            {modaldata.productImage === undefined ? null : modaldata.productImage.map(x=>  {
            return <img style={{width:150,height:150,margin:30}} src={x.imageUrl} alt='wcwe'/>
            })}
            
            <p style={{textDecoration:'line-through',color:'red'}}>Original Price : {modaldata.originalPrice}</p>
            <p>Discount : {modaldata.discountPercent} %</p>
            <p>
              Price : {modaldata.price}</p>
          </div>
        </Fade>
      </Modal>
    </div>



            <form onSubmit={submitSearch} style={{margin:10,display:"flex"}}>
              <label style={{ fontFamily: "sans-serif" }}>
                <input
                  type="text"
                  name="name"
                  value={searchterm}
                  onChange={searchChange}
                  style={{
                    borderRadius: 5,
                    width: 500,
                    backgroundColor: "#9eb5b3",
                    opacity: 0.5,
                    marginTop:18,
                    height:30
                  }}
                />
              </label>
              <div style={{display:'flex'}}>
              <input
                type="submit"
                value="search"
                style={{ backgroundColor: "#05635b",alignSelf:'center',marginLeft:5,cursor:"pointer",fontSize:20, marginTop:15 }}
              />
              <div style={{flex: 1, marginLeft:400 ,border:"1px solid",borderRadius:"5px",backgroundColor:"white",color:"black"}}>
                <Filter
                  produstData={initialdata}
                  setFilteredData={setFilteredData}
                />
              </div>

            </div>
            </form>
          </div>



          <Sort productData={initialdata} sortProduct={sortProduct}/>
        </div>

        {renderData.length !== 0 ? (
          renderData.map((renderData) => (
            <div key={renderData.id}
              style={{float:'left',display:"flex",marginLeft:100, height:500,width:500,alignItems:"centre"}}
              onClick={() => {
                showDetails(renderData.id);
              }}
            >
              <Card className={classes.root} style={{ cursor: "pointer" }} >
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      {/* <MoreVertIcon /> */}
                    </IconButton>
                  }
                  title={
                    renderData.title.split(" ")[0] +
                    " " +
                    renderData.title.split(" ")[1] +
                    " " +
                    renderData.title.split(" ")[2]
                  }
                  subheader={renderData.createdDate}
                  
                />
                <div style={{display:"flex"}}>
             <span><i className="fa fa-rupee"></i></span>    <p>{renderData.price}</p>
             </div>
                {/* {
      initialdata.productImage.map((x => <CardMedia
        className={classes.media}
        image={x.imageUrl}
        title="Paella dish"
      /> */}
                <CardMedia
                  className={classes.media}
                  image={renderData.productImage[0].imageUrl}
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {renderData.description.slice(0, 60) + "..."}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <h1>NO related product found</h1>
        )}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 650,
            width: "100%",
            marginTop: 100,
          }}
        >
          <PaginationBar paginationChange={paginationChange} />
        </div>
      </div>
    </Fragment>
  );
}