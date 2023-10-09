import React from "react";
import { FiInstagram } from "react-icons/fi";
import { BiWorld } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";

interface Item {
    img: string;
    name: string;
    address: string;
    link: string;
    instagram?: string;
    description: string;
    imgCredit: string;
    closeItem: () => void;
}

function getInstagramUsername(uname: string): string{
    let replaced =  uname.substring(26);
    let name = replaced.slice(0, -1);
    return name
}

const OpenItem = (props: Item) => {
  return (
    <div className="openItem-container">
      <div className="openItem-img-container">
        <img
          id="openItem-img"
          src={`${"/images/" + props.img}?w=248&fit=crop&auto=format`}
          srcSet={`${props.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={props.name}
        />
      </div>
      <button className="back-wrapper" onClick={() => props.closeItem()}>
        <BsArrowLeft />
        <p>Back</p>
      </button>
      <div className="item-content-wrapper">
        <div className="item-title-wrapper">
          <h3>{props.name.toUpperCase()}</h3>
        </div>
        <div className="item-icons">
          <MdLocationOn size="20px" />
          <p>{props.address}</p>
          {props.link && (
            <>
              <BiWorld size="20px" />
              <a href={props.link}>{props.link}</a>
            </>
          )}
          {props.instagram && (
            <>
              <FiInstagram size="20px" />
              <a href={props.instagram}>@{getInstagramUsername(props.instagram)}</a>
            </>
          )}
        </div>
        <p className="openItem-description">{props.description || ""}</p>
      </div>
      {props.imgCredit && (
        <p className="openItem-imgCredit">{"Image by: " + props.imgCredit}</p>
      )}
      
    </div>
  );
};

export default OpenItem;
