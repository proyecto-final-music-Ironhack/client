import React, { useEffect, useState } from "react";
import discoService from "../../services/disco.service";
import { Link } from "react-router-dom";

export default function DiscoProfile({ disco, followers, isFollowing, id }) {
  return (
    <div>
      <img style={{ width: "50%" }} src={disco.image} alt="DiscoImg" />
      <h1>{disco.name},</h1>
      <h2>Disco</h2>

      <div>
        <p>
          <span>{disco.followers}</span> followers
        </p>
      </div>
      <Link to="/events/create">Create event!</Link>
    </div>
  );
}
