// Import Dependencies
import React, { useEffect } from "react";
import styled from "styled-components";
// import { gsap } from "gsap";

import { Link } from "react-router-dom";

// Styled Components
const Card = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  max-width: 1000px;
  justify-content: space-between;
  margin: 0 auto;
  background: #badfdb;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  @media (max-width: 800px) {
    width: 100%;
    display: block;
  }
`;

const CardImg = styled.img`
  width: 40%;
  border-radius: 10px;
  margin-right: 25px;
  @media (max-width: 800px) {
    width: 100%;
    height: auto;
  }
`;

const CardInfo = styled.div`
  position: relative;
  width: 58%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const CardHeading = styled.p`
  font-style: italic;
  color: #0f4c5c;
`;

const CardTitle = styled.h3`
  font-weight: normal;
  font-size: 20px;
`;

const TitleSeparator = styled.hr`
  width: 50px;
  margin: 15px 0;
  height: 1px;
  background-color: #000;
  border: none;
`;

const CardMeta = styled.p`
  font-style: italic;
  color: #5f0f40;
`;

const CardDescription = styled.p`
  margin-bottom: 80px;
  margin-top: 30px;
  margin-left: 10px;
`;

// const CardPrice = styled.p`
//   position: absolute;
//   bottom: 0;
//   right: 0;

//   @media (max-width: 800px) {
//     position: static;
//     margin-top: 25px;
//     margin-bottom: 10px;
//   }
// `;

const CardButtons = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  @media (max-width: 800px) {
    position: static;
  }
`;

const CardButton = styled.button`
  width: 100px;
  cursor: pointer;
  background: #5f0f40;
  color: white;
  border: none;
  text-align: center;
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 18px;
  &:hover {
    background: #0f4c5c;
  }
  &:disabled {
    background: #5f0f40 !important;
    opacity: 0.5;
  }
`;

export default function ListingCard(props) {
  //  Context provides the props
  console.log("props", props.listing.id);

  // Confirm first whether or not to delete listing
  const confirmDeletion = () => {
    const prompt = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (prompt === true) {
      props.deleteListing(props.listing.id);
    }
  };

  // Do a small animation when the component first renders
  // useEffect(() => {
  //   const delay = props.delay / 10 + 0.01;

  //   gsap.from(`#listing-${props.listing.id}`, {
  //     opacity: 0,
  //     x: -100,
  //     duration: 1,
  //     delay: delay,
  //   });
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card id={`listing-${props.listing.id}`} className="listing-wrapper">
      <CardImg src={props.listing.featuredImg} alt={props.listing.title} />

      <CardInfo>
        <CardHeading>
          {props.listing.type} in {props.listing.street_address},{" "}
          {props.listing.city} {props.listing.state} by {props.listing.location}
        </CardHeading>
        <CardTitle>{props.listing.title}</CardTitle>

        <TitleSeparator />

        <CardMeta>
          {props.listing.guests} guests . {props.listing.bedrooms} bedrooms .{" "}
          {props.listing.beds} beds . {props.listing.baths} baths
        </CardMeta>

        {/* <CardMeta>
          {props.listing.amenity.map((amenity, index) => {
            return (
              <span key={index}>
                {index ? " . " : ""} {amenity.amenity_name}
              </span>
            );
          })}
        </CardMeta> */}

        {props.listing.description !== undefined && (
          <CardDescription>{props.listing.description}</CardDescription>
        )}
        {/* 
        <CardPrice>
          <span style={{ fontWeight: "bold" }}>${props.listing.price}</span> /
          night
        </CardPrice> */}

        <CardButtons>
          <Link to={`/EditListing/${props.listing.id}`}>
            <CardButton disabled={props.isDeleting}>Edit</CardButton>
          </Link>
          <CardButton onClick={confirmDeletion} disabled={props.isDeleting}>
            Remove
          </CardButton>
        </CardButtons>
      </CardInfo>
    </Card>
  );
}
