import React, { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";
import { GoHeartFill } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import OpenItem from "./OpenItem";
import {motion} from "framer-motion";

export type Eats = {
  // albumId: number;
  // id: number;
  // title: string;
  // url: string;
  // thumbnailUrl: string;

  EatID: number;
  EatName: string;
  EatDesc: string;
  EatLink: string;
  EatAdd: string;
  EatImg: string;
  EatCategory: string;
  EatInsta: string;
  EatImgCredit: string;
};

const Home = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));
  const matchDownLg = useMediaQuery(theme.breakpoints.down("md"));

  const [allEats, setAllEats] = useState<Eats[] | null>();
  const [activeEatTag, setActiveEatTag] = useState("all");
  const [myScrollPos, setMyScrollPos] = useState(0);
  const [openedItem, setOpenedItem] = useState<Eats | null>();

  const listOfButtonName: string[] = [
    "cafe",
    "bakery",
    "dessert",
    "small",
    "lunch",
    "asian",
    "european",
    "plant based",
    "boujee",
    "bar",
  ];

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const getMyScrollPos = () => {
    setMyScrollPos(window.pageYOffset);
  };
  const openItem = (item: Eats) => {
    getMyScrollPos();
    setOpenedItem(item);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };
  const closeItem = () =>{
    setOpenedItem(null);
    window.scrollTo({ top: myScrollPos, behavior: 'smooth' });
  }

  const fetchAllEats = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/eats/allEats");
      setAllEats(res.data);
      setActiveEatTag("all");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchByTag = async (tagName: string) => {
    try {
      const res = await axios.get(`http://localhost:8800/api/eats/${tagName}`);
      //console.log(res.data);
      setAllEats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const eatTagOnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    tagName: string
  ) => {
    fetchByTag(tagName);
    setActiveEatTag(e.currentTarget.id);
  };

  useEffect(() => {
    axios.get("http://localhost:8800/api/eats/allEats").then((response) => {
      setAllEats(response.data);
      //console.log(response.data);
    });
    //fetchByTag('cafe');
  }, []);

  // useEffect(() => {
  //   getMyScrollPos();
  // }, [openedItem]);
  useEffect(() =>{
    setOpenedItem(null);
  },[activeEatTag])

  return (
    <motion.div className="home-container" initial={{opacity:0}} animate={{opacity:1, transition: {duration: 1}}}>
      <div className="home-title">
        <h1 className="home-text1">
          AUCKLAND <span>EATS</span>
        </h1>
        <h3>
          A <span>curated</span> selection of Auckland's <span>hottest</span>{" "}
          and <span>trendiest</span> eateries
        </h3>
      </div>
      <div className="eat-tag-container">
        {listOfButtonName.map((btn, i) => (
          <button
            key={i}
            id={i.toString()}
            className={`${activeEatTag === i.toString() ? "activeEatTag" : ""}`}
            onClick={(e) => eatTagOnClick(e, btn)}
          >
            <GoHeartFill
              color="#fff1f3"
              className={`${
                activeEatTag === i.toString()
                  ? "showHeartIcon"
                  : "hideHeartIcon"
              }`}
            />
            <p>{capitalizeFirstLetter(btn)}</p>
          </button>
        ))}
        <button
          className={`${activeEatTag === "all" ? "activeEatTag" : ""}`}
          onClick={() => fetchAllEats()}
        >
          <GoHeartFill
            color="#fff1f3"
            className={`${
              activeEatTag === "all" ? "showHeartIcon" : "hideHeartIcon"
            }`}
          />
          <p>All</p>
        </button>
      </div>
      {openedItem && (
        <OpenItem img={openedItem.EatImg} name={openedItem.EatName} address={openedItem.EatAdd} link={openedItem.EatLink} instagram={openedItem.EatInsta} description={openedItem.EatDesc} closeItem={closeItem} imgCredit={openedItem.EatImgCredit}/>
      )}
      <div className="grid-wrapper">
        <Box>
          <ImageList
            variant="masonry"
            cols={matchDownMd ? 2 : matchDownLg ? 3 : 4}
            gap={8}
          >
            {allEats
              ? allEats.map((item) => (
                  <div className="grid-item" onClick={() => openItem(item)}>
                    <ImageListItem key={item.EatID}>
                      <img
                        id="grid-img"
                        src={`${
                          "/images/" + item.EatImg
                        }?w=248&fit=crop&auto=format`}
                        srcSet={`${item.EatImg}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.EatName}
                        loading="lazy"
                      />
                    </ImageListItem>
                    <div className="grid-item-thumbnail">
                      <h4>{"@" + item.EatName}</h4>
                    </div>
                  </div>
                ))
              : ""}
          </ImageList>
        </Box>
      </div>
    </motion.div>
  );
};

export default Home;
