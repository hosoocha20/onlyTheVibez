import React, { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";
import { GoHeartFill } from "react-icons/go";
import OpenItem from "./OpenItem";
import {motion} from "framer-motion";

export type Todo = {
  funId: number;
  funName: string;
  funDesc: string;
  funAdd: string;
  funLink: string;
  funImg: string;
  funCategory: string;
  funImgCredit: string;
};
const Do = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));
  const matchDownLg = useMediaQuery(theme.breakpoints.down("md"));

  const [allTodo, setAllTodo] = useState<Todo[] | null>();
  const [activeTodoTag, setActiveTodoTag] = useState("all");
  const [myScrollPos, setMyScrollPos] = useState(0);
  const [openedItem, setOpenedItem] = useState<Todo | null>();

  const listOfButtonName: string[] = [
    "creative",
    "entertainment",
    "healing",
    "active",
  ];

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const getMyScrollPos = () => {
    setMyScrollPos(window.pageYOffset);
  };
  const openItem = (item: Todo) => {
    getMyScrollPos();
    setOpenedItem(item);
    window.scrollTo({ top: 100, behavior: "smooth" });
  };
  const closeItem = () => {
    setOpenedItem(null);
    window.scrollTo({ top: myScrollPos, behavior: "smooth" });
  };

  const fetchAllTodo = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/todos/allTodos");
      setAllTodo(res.data);
      setActiveTodoTag("all");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchByTag = async (tagName: string) => {
    try {
      const res = await axios.get(`http://localhost:8800/api/todos/${tagName}`);
      //console.log(res.data);
      setAllTodo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const todoTagOnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    tagName: string
  ) => {
    fetchByTag(tagName);
    setActiveTodoTag(e.currentTarget.id);
  };

  useEffect(() => {
    axios.get("http://localhost:8800/api/todos/allTodos").then((response) => {
      setAllTodo(response.data);
      //console.log(response.data);
    });
  }, []);

  useEffect(() => {
    setOpenedItem(null);
  }, [activeTodoTag]);
  return (
    <motion.div className="do-container" initial={{opacity:0}} animate={{opacity:1, transition: {duration: 1}}}>
      <div className="do-title">
        <h1 className="do-text1">
          <span>TO DO</span> AUCKLAND
        </h1>
        <h3>
          A list of Auckland's <span>activities</span> and{" "}
          <span>attractions</span>
        </h3>
      </div>
      <div className="do-tag-container">
        {listOfButtonName.map((btn, i) => (
          <button
            key={i}
            id={i.toString()}
            className={`${
              activeTodoTag === i.toString() ? "activeTodoTag" : ""
            }`}
            onClick={(e) => todoTagOnClick(e, btn)}
          >
            <GoHeartFill
              color="#edfcfe"
              className={` ${
                activeTodoTag === i.toString()
                  ? "showHeartIcon"
                  : "hideHeartIcon"
              }`}
            />
            <p>{capitalizeFirstLetter(btn)}</p>
          </button>
        ))}
        <button
          className={`${activeTodoTag === "all" ? "activeTodoTag" : ""}`}
          onClick={() => fetchAllTodo()}
        >
          <GoHeartFill
            color="#edfcfe"
            className={` ${
              activeTodoTag === "all" ? "showHeartIcon" : "hideHeartIcon"
            }`}
          />
          <p>All</p>
        </button>
      </div>

      {openedItem && (
        <OpenItem img={openedItem.funImg} name={openedItem.funName} address={openedItem.funAdd} link={openedItem.funLink}  description={openedItem.funDesc} closeItem={closeItem} imgCredit={openedItem.funImgCredit}/>
      )}
      <div className="do-grid-wrapper">
        <Box>
          <ImageList
            variant="masonry"
            cols={matchDownMd ? 2 : matchDownLg ? 3 : 4}
            gap={8}
          >
            {allTodo
              ? allTodo.map((item) => (
                  <div className="grid-item" onClick={() => openItem(item)}>
                    <ImageListItem key={item.funId}>
                      <img
                        id="do-grid-img"
                        src={`${
                          "/images/" + item.funImg
                        }?w=248&fit=crop&auto=format`}
                        srcSet={`${item.funImg}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.funName}
                        loading="lazy"
                      />
                    </ImageListItem>
                    <div className="grid-item-thumbnail">
                      <h4>{"@" + item.funName}</h4>
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

export default Do;
